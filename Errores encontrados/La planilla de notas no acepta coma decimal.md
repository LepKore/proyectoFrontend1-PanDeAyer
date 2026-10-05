# La planilla de notas no acepta coma decimal

## Area del error
Frontend

## Archivos
`src/app/(app)/docente/grupos/[id]/grade-sheet-panel.tsx`

## Diagnostico
El comentario dice "acepta coma o punto" pero el regex solo aceptaba punto: `4,5` se marcaba como nota invalida.

## Plan implementado de solucion
Se reemplaza la coma por punto antes de validar.

## Verificacion
Revisado; `tsc` sin errores.
