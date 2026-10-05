# Escape no cierra las ventanas modales

## Area del error
Frontend

## Archivos
`src/components/ui/modal.tsx`

## Diagnostico
`onCancel` hacia `preventDefault()` sin avisar al componente: Escape no cerraba ningun modal.

## Plan implementado de solucion
`onCancel` llama a `onClose()`, asi Escape sigue las mismas reglas que el boton cerrar (por ejemplo, no cierra mientras se esta guardando).

## Verificacion
Revisado; `tsc` sin errores.
