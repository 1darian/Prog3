@echo off
echo ===== PRUEBAS DE ENDPOINTS DE TURNOS =====

:: Obtener token de autenticación primero
echo.
echo 1. Obteniendo token de autenticación...
curl -X POST http://localhost:3000/api/v1/pacientes/login -H "Content-Type: application/json" -d "{\"email\":\"email@gmail.com\",\"password\":\"12345\"}" > token.txt

set /p TOKEN=<token.txt
echo Token obtenido: %TOKEN%

:: Eliminar las comillas del token
set TOKEN=%TOKEN:"=%

:: Prueba 1: Obtener turnos de un paciente existente (ID 1)
echo.
echo 2. Probando GET /api/v1/turnos/1 (Paciente existente)...
curl -X GET http://localhost:3000/api/v1/turnos/1 -H "Authorization: %TOKEN%"

:: Prueba 2: Obtener turnos de un paciente inexistente (ID 999)
echo.
echo 3. Probando GET /api/v1/turnos/999 (Paciente inexistente)...
curl -X GET http://localhost:3000/api/v1/turnos/999 -H "Authorization: %TOKEN%"

:: Prueba 3: Obtener turnos con ID inválido
echo.
echo 4. Probando GET /api/v1/turnos/abc (ID inválido)...
curl -X GET http://localhost:3000/api/v1/turnos/abc -H "Authorization: %TOKEN%"

:: Prueba 4: Cancelar un turno existente (ID 2)
echo.
echo 5. Probando DELETE /api/v1/turnos/2 (Turno existente)...
curl -X DELETE http://localhost:3000/api/v1/turnos/2 -H "Authorization: %TOKEN%"

:: Prueba 5: Cancelar un turno ya cancelado (ID 3)
echo.
echo 6. Probando DELETE /api/v1/turnos/3 (Turno ya cancelado)...
curl -X DELETE http://localhost:3000/api/v1/turnos/3 -H "Authorization: %TOKEN%"

:: Prueba 6: Cancelar un turno inexistente (ID 999)
echo.
echo 7. Probando DELETE /api/v1/turnos/999 (Turno inexistente)...
curl -X DELETE http://localhost:3000/api/v1/turnos/999 -H "Authorization: %TOKEN%"

:: Prueba 7: Cancelar un turno con ID inválido
echo.
echo 8. Probando DELETE /api/v1/turnos/abc (ID inválido)...
curl -X DELETE http://localhost:3000/api/v1/turnos/abc -H "Authorization: %TOKEN%"

:: Limpiar archivo temporal
del token.txt

echo.
echo ===== FIN DE LAS PRUEBAS =====