# Materias matriculadas cuenta todo el historial

## Area del error
Frontend

## Archivos
`src/app/(app)/estudiante/page.tsx`

## Diagnostico
La tarjeta dice "Matriculas activas este periodo" pero pedia `/enrollments/mine?limit=1` sin filtros: contaba matriculas de todos los periodos y estados (4 en vez de 2 para Juliana).

## Plan implementado de solucion
Se consulta `/enrollments/mine?limit=1&status=activa&period=<periodo abierto>` (solo si hay periodo abierto).

## Verificacion
Con Playwright: la tarjeta muestra 2.
