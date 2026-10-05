# Login con clave incorrecta muestra sesion vencida

## Area del error
Frontend

## Archivos
`src/lib/api.ts`

## Diagnostico
`api()` trataba cualquier respuesta 401 como sesion vencida y redirigia a `/login?expired=1`. El login con clave incorrecta tambien responde 401, por lo que el usuario veia "Tu sesion vencio" en vez del error real. Lo detectaban las pruebas `bugs.spec.ts` y `roles.spec.ts`.

## Plan implementado de solucion
El 401 de `/auth/login` ya no redirige: se muestra el mensaje del backend. Para las demas rutas el comportamiento no cambia.

## Verificacion
`npx playwright test`: 48/48 pruebas pasan (antes fallaban 2).
