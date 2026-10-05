# Mis grupos muestra cupo e inscritos invertidos

## Area del error
Frontend

## Archivos
`src/app/(app)/docente/grupos/page.tsx`

## Diagnostico
La insignia mostraba `{capacity} / {enrolled} estudiantes` (p. ej. 40 / 35), al reves que en el detalle del grupo y en admin.

## Plan implementado de solucion
Ahora `{enrolled} / {capacity}`.

## Verificacion
Revisado en el codigo; `tsc` sin errores. La pagina carga sin errores con Playwright.
