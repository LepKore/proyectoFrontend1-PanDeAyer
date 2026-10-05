# Las notas se truncan en vez de redondearse

## Area del error
Frontend

## Archivos
`src/lib/format.ts`

## Diagnostico
`grade()` usaba `Math.floor(value * 10) / 10`: un 2.96 se mostraba como 2.9 y un 4.99 como 4.9, lo que puede mostrar como reprobada una nota que redondea a 3.0.

## Plan implementado de solucion
Se usa `Math.round(value * 10) / 10` antes de `toFixed(1)`.

## Verificacion
Notas e historial muestran el valor redondeado.
