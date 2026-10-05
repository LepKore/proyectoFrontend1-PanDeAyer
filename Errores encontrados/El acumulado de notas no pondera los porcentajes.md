# El acumulado de notas no pondera los porcentajes

## Area del error
Frontend

## Archivos
`src/app/(app)/estudiante/notas/page.tsx`

## Diagnostico
El "Acumulado" era el promedio simple de las notas registradas, ignorando el peso de cada evaluacion; no coincidia con el acumulado de la planilla del docente (backend: suma de nota x peso/100).

## Plan implementado de solucion
Se calcula `sum(nota * peso / 100)`, igual que el backend.

## Verificacion
Revisado contra `academic.service.ts` (gradeSheet).
