import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''
    Business: Приём заявок из чата на сайте студии маникюра и сохранение их в базу данных.
    Args: event - dict с httpMethod, body (name, phone, message); context - объект с request_id.
    Returns: HTTP-ответ с подтверждением сохранения заявки.
    '''
    method: str = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body_data = json.loads(event.get('body', '{}'))
    name = (body_data.get('name') or '').strip()
    phone = (body_data.get('phone') or '').strip()
    message = (body_data.get('message') or '').strip()

    if not message:
        return {
            'statusCode': 400,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Сообщение не может быть пустым'}),
        }

    name_safe = name.replace("'", "''")
    phone_safe = phone.replace("'", "''")
    message_safe = message.replace("'", "''")

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO chat_requests (name, phone, message) "
        f"VALUES ('{name_safe}', '{phone_safe}', '{message_safe}') RETURNING id"
    )
    request_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'success': True, 'id': request_id}),
        'isBase64Encoded': False,
    }
