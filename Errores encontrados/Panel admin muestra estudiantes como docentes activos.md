# Panel admin muestra estudiantes como docentes activos

## Area del error
Frontend

## Archivos
`src/app/(app)/admin/page.tsx`

## Diagnostico
La tarjeta "Docentes activos" mostraba `d.active.students` (98, igual que estudiantes).

## Plan implementado de solucion
Se usa `d.active.teachers`.

## Verificacion
Con Playwright: valores distintos para estudiantes y docentes.
