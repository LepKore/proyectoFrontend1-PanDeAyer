# Clic en el fondo no cierra las ventanas modales

## Area del error
Frontend

## Archivos
`src/components/ui/modal.tsx`

## Diagnostico
El `<dialog>` no tenia el manejador que cierra al hacer clic en el fondo oscuro, asi que solo se podia cerrar con la X o con los botones.

## Plan implementado de solucion
`onClick` cierra cuando el clic cae sobre el propio `<dialog>` (el fondo), no sobre su contenido.

## Verificacion
Con Playwright: el clic en el fondo cierra; el clic dentro del formulario no.
