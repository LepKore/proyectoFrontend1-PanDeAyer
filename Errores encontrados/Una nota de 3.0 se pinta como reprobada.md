# Una nota de 3.0 se pinta como reprobada

## Area del error
Frontend

## Archivos
`src/app/(app)/estudiante/notas/page.tsx`

## Diagnostico
Se aprueba con 3.0 o mas, pero la celda usaba `value <= PASSING` para el color rojo.

## Plan implementado de solucion
Se usa `value < PASSING` (igual que la nota final).

## Verificacion
Revisado; `tsc` sin errores.
