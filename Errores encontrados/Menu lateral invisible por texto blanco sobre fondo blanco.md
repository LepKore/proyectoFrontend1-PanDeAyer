# Menu lateral invisible por texto blanco sobre fondo blanco

## Area del error
Frontend

## Archivos
`src/components/app-shell.tsx`

## Diagnostico
Los enlaces no activos del menu y los titulos de seccion usaban `text-white`, pero la barra lateral tiene fondo `bg-surface` (blanco). Solo se veia el enlace activo; el resto del menu (Facultades, Programas, Notificaciones, Mi cuenta...) era invisible. Con Playwright: color del enlace `rgb(255,255,255)` sobre fondo `rgb(255,255,255)`.

## Plan implementado de solucion
Enlaces no activos y titulos de seccion pasan a `text-muted` (el hover ya usaba `hover:text-ink`).

## Verificacion
Captura con Playwright: todas las opciones del menu se leen; el enlace activo sigue en violeta con texto blanco.
