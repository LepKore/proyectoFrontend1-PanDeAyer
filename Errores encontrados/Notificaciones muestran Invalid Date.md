# Notificaciones muestran Invalid Date

## Area del error
Frontend

## Archivos
`src/app/(app)/notificaciones/notification-list.tsx`

## Diagnostico
Con una fecha invalida o ausente (`createdAt: "ayer"` en los datos) se mostraba "Invalid Date".

## Plan implementado de solucion
`when()` devuelve "—" si la fecha no es valida. (El dato tambien se corrigio.)

## Verificacion
Con Playwright: el texto "Invalid Date" ya no aparece.
