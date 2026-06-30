import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    '''
    Business: Получение списка заявок из чата для отображения в админ-панели студии MIRÉLLE.
    Поддерживает фильтрацию по статусу и обновление статуса заявки.
    '''
    method: str = event.get('httpMethod', 'GET')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
    }

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if method == 'GET':
        cur.execute(
            "SELECT id, name, phone, message, status, created_at FROM chat_requests ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()

        requests = [
            {
                'id': r[0],
                'name': r[1] or '',
                'phone': r[2] or '',
                'message': r[3],
                'status': r[4],
                'created_at': r[5].strftime('%d.%m.%Y %H:%M') if r[5] else '',
            }
            for r in rows
        ]
        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'requests': requests}, ensure_ascii=False),
        }

    if method == 'PATCH':
        body_data = json.loads(event.get('body', '{}'))
        request_id = int(body_data.get('id', 0))
        new_status = (body_data.get('status') or '').strip()

        allowed = ('new', 'in_progress', 'done')
        if not request_id or new_status not in allowed:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {**cors_headers, 'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Invalid data'}),
            }

        cur.execute(f"UPDATE chat_requests SET status = '{new_status}' WHERE id = {request_id}")
        conn.commit()
        cur.close()
        conn.close()

        return {
            'statusCode': 200,
            'headers': {**cors_headers, 'Content-Type': 'application/json'},
            'body': json.dumps({'success': True}),
        }

    cur.close()
    conn.close()
    return {
        'statusCode': 405,
        'headers': {**cors_headers, 'Content-Type': 'application/json'},
        'body': json.dumps({'error': 'Method not allowed'}),
    }
