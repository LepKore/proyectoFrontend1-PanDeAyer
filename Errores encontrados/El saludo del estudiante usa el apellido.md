# El saludo del estudiante usa el apellido

## Area del error
Frontend

## Archivos
`src/app/(app)/estudiante/page.tsx`

## Diagnostico
El titulo usaba `me.name.split(" ")[1]`, por eso Juliana Herrera veia "Hola, Herrera" (el docente si usaba `[0]`).

## Plan implementado de solucion
Se usa el primer nombre: `split(" ")[0]`.

## Verificacion
Con Playwright: "Hola, Juliana".
