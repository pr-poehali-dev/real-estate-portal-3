CREATE TABLE IF NOT EXISTS t_p43807817_real_estate_portal_3.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p43807817_real_estate_portal_3.applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p43807817_real_estate_portal_3.users(id),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    operation_type VARCHAR(50) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    area DECIMAL(10, 2) NOT NULL,
    location VARCHAR(500) NOT NULL,
    description TEXT,
    estimated_value DECIMAL(15, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO t_p43807817_real_estate_portal_3.users (name, email, phone, password, role) 
VALUES ('Администратор', 'admin@estate.com', '+7 (999) 000-00-00', 'admin', 'admin')
ON CONFLICT (email) DO NOTHING;