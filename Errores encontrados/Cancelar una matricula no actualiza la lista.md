# Cancelar una matricula no actualiza la lista

## Area del error
Frontend

## Archivos
`src/app/(app)/estudiante/materias/cancel-button.tsx`

## Diagnostico
Despues de cancelar, el boton solo cerraba la confirmacion: la pagina (componente de servidor) no se volvia a pedir y la materia seguia apareciendo "En curso" con su boton Cancelar hasta recargar.

## Plan implementado de solucion
Tras cancelar se llama a `router.refresh()`, que vuelve a pedir la pagina con la matricula ya cancelada.

## Verificacion
Revisado en el codigo; `tsc` y ESLint sin errores. No se cancelo una matricula real para no modificar los datos de prueba.
