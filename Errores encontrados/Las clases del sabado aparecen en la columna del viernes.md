# Las clases del sabado aparecen en la columna del viernes

## Area del error
Frontend

## Archivos
`src/components/week-schedule.tsx`

## Diagnostico
Cada columna juntaba los dias con `Math.min(indice, 4) === col`: las clases del sabado se mostraban en viernes y la columna Sabado quedaba siempre vacia.

## Plan implementado de solucion
Cada columna usa solo `byDay[dia]`.

## Verificacion
Con Playwright la clase del miercoles aparece en su columna. Los datos de prueba de Laura no tienen clases de sabado, asi que ese caso se reviso en el codigo.
