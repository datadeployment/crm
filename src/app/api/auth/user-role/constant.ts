export const create_user_role_table_query = `create table if not exists UserRole (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) unique not null,
    createdAt VARCHAR(20) NOT NULL,
    updatedAt VARCHAR(20) NOT NULL
)`

export const userRoles = [
    {
        name: "super-admin"
    },
    {
        name: "admin"
    },
    {
        name: "employee"
    },
    {
        name: "client"
    }
]