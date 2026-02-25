Manejo de usuarios

- implementacion robusta, implementando documentos de usuarios, roles y permisos, lo que permite que sea escalable.
-


Crear Dueño

curl -X POST http://localhost:3000/api/duenos/crear-dueno -H "Content-Type: application/json" -d '{"nombre":"Juan","apellido":"Perez
","email":"juan.perez@mail.com","telefono":"1122334455"}'

Crear Mascota




cors cookie-parser => las instalé para poder conectar el front con el back, son las opciones del header