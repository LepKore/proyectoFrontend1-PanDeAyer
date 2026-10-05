# Una notificacion de tipo desconocido tumba la pagina

## Area del error
Frontend

## Archivos
`src/app/(app)/notificaciones/notification-list.tsx`

## Diagnostico
`TYPE[n.type]` se desestructuraba sin respaldo; con un tipo fuera del mapa (`aviso_urgente` en los datos) la pagina de notificaciones del estudiante fallaba: `Cannot destructure property 'icon' of 'TYPE[n.type]'`.

## Plan implementado de solucion
Si el tipo no existe se usa el de `aviso`. (El dato tambien se corrigio en la base de datos.)

## Verificacion
Con Playwright: `/notificaciones` del estudiante carga sin errores.
