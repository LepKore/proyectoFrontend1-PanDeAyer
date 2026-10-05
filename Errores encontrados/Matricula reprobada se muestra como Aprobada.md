# Matricula reprobada se muestra como Aprobada

## Area del error
Frontend

## Archivos
`src/lib/format.ts`

## Diagnostico
`STATUS_LABEL.reprobada` era `"Aprobada"`: en notas, materias, historial, planilla y matriculas una materia perdida aparecia como aprobada (aunque con insignia roja).

## Plan implementado de solucion
Se corrigio a `"Reprobada"`.

## Verificacion
Revisado el mapa de etiquetas; `tsc` sin errores.
