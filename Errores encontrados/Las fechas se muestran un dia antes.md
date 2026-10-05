# Las fechas se muestran un dia antes

## Area del error
Frontend

## Archivos
`src/lib/format.ts`

## Diagnostico
`date()` formateaba sin `timeZone`. El backend guarda los dias como medianoche UTC (`2026-08-03T00:00:00Z`) y en una zona horaria negativa (America) eso es el dia anterior: el periodo 2026-2 aparecia del "2 de ago" al "11 de dic" en vez del 3 de ago al 12 de dic.

## Plan implementado de solucion
Se formatea con `timeZone: "UTC"`, como ya hacia el inicio del estudiante.

## Verificacion
Con Playwright (zona America/Buenos_Aires), Periodos muestra 2026-2 del "3 de ago de 2026" al "12 de dic de 2026".
