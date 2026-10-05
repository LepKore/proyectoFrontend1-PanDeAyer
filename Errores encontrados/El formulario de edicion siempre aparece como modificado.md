# El formulario de edicion siempre aparece como modificado

## Area del error
Frontend

## Archivos
`src/components/admin/resource-manager.tsx`

## Diagnostico
Se comparaban los valores del formulario con la fila cruda (`row`), que tiene otra forma (ids poblados, `_id`, fechas...). En edicion siempre daba "con cambios"; en Usuarios (`keepOpenIfDirty`) Cancelar no cerraba el formulario aunque no se hubiera tocado nada.

## Plan implementado de solucion
Se compara con `config.initial(row)`.

## Verificacion
Con Playwright: en Usuarios, Editar -> Cancelar sin cambios cierra el formulario.
