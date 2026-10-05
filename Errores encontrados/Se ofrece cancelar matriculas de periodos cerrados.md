# Se ofrece cancelar matriculas de periodos cerrados

## Area del error
Frontend

## Archivos
`src/app/(app)/estudiante/materias/page.tsx`

## Diagnostico
El boton "Cancelar" aparecia en toda matricula `activa`, aunque el subtitulo dice que solo se puede cancelar mientras el periodo siga abierto (el backend lo rechaza).

## Plan implementado de solucion
El boton solo se muestra si la matricula esta activa y el periodo esta `abierto`.

## Verificacion
Con Playwright: 2 botones (las dos matriculas de 2026-2); ninguno en 2026-1.
