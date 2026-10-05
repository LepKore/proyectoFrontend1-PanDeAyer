# Mis grupos no filtra por el periodo abierto por defecto

## Area del error
Frontend

## Archivos
`src/app/(app)/docente/grupos/page.tsx`

## Diagnostico
Sin `?period=` el selector mostraba el periodo abierto, pero la consulta no enviaba `period` y listaba grupos de todos los periodos.

## Plan implementado de solucion
Se filtra por el periodo seleccionado salvo que sea "todos".

## Verificacion
Revisado en el codigo; `tsc` sin errores. La pagina carga sin errores con Playwright.
