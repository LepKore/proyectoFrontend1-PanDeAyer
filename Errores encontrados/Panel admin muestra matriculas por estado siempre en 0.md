# Panel admin muestra matriculas por estado siempre en 0

## Area del error
Frontend

## Archivos
`src/app/(app)/admin/page.tsx`

## Diagnostico
Se buscaba `enrollmentsByStatus[label]` ("Activas") pero el backend usa la clave del estado (`activa`). Siempre daba 0 aunque habia 107 cupos ocupados.

## Plan implementado de solucion
Se usa `enrollmentsByStatus[key]`.

## Verificacion
Revisado contra `reports.service.ts` (dashboard).
