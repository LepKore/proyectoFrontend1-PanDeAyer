# Mis materias ordena del periodo mas antiguo al mas reciente

## Area del error
Frontend

## Archivos
`src/app/(app)/estudiante/materias/page.tsx`

## Diagnostico
El comentario indica "el mas reciente primero" pero el orden era `a.localeCompare(b)` (ascendente).

## Plan implementado de solucion
Se ordena con `b.localeCompare(a)`.

## Verificacion
Con Playwright: Periodo 2026-2, 2026-1, 2025-1.
