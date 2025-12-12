import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Управление заявками на недвижимость (создание и получение списка)
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        if method == 'GET':
            cur.execute("""
                SELECT id, name, email, phone, operation_type, property_type, 
                       area, location, description, estimated_value, status, 
                       created_at::text
                FROM t_p43807817_real_estate_portal_3.applications
                ORDER BY created_at DESC
            """)
            
            applications = []
            for row in cur.fetchall():
                applications.append({
                    'id': row[0],
                    'name': row[1],
                    'email': row[2],
                    'phone': row[3],
                    'operation_type': row[4],
                    'property_type': row[5],
                    'area': float(row[6]),
                    'location': row[7],
                    'description': row[8],
                    'estimated_value': float(row[9]),
                    'status': row[10],
                    'created_at': row[11]
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'applications': applications}),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            required_fields = ['name', 'email', 'phone', 'operation_type', 'property_type', 'area', 'location', 'estimated_value']
            if not all(body_data.get(field) for field in required_fields):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Все обязательные поля должны быть заполнены'}),
                    'isBase64Encoded': False
                }
            
            cur.execute("""
                INSERT INTO t_p43807817_real_estate_portal_3.applications 
                (name, email, phone, operation_type, property_type, area, location, description, estimated_value, status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 'new')
                RETURNING id
            """, (
                body_data['name'],
                body_data['email'],
                body_data['phone'],
                body_data['operation_type'],
                body_data['property_type'],
                body_data['area'],
                body_data['location'],
                body_data.get('description', ''),
                body_data['estimated_value']
            ))
            
            application_id = cur.fetchone()[0]
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'application_id': application_id,
                    'message': 'Заявка успешно создана'
                }),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
