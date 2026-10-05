# El formulario de usuarios no se puede cerrar con cambios sin guardar

## Area del error
Frontend

## Archivos
`src/components/admin/resource-manager.tsx`, `src/components/admin/configs.tsx`

## Diagnostico
Se habia agregado una opcion `keepOpenIfDirty` (activada solo en Usuarios) que ignoraba Cancelar, la X, Escape y el clic en el fondo mientras el formulario tuviera cambios, sin mostrar ningun mensaje: el administrador quedaba atrapado y tenia que deshacer los cambios a mano. Ademas la deteccion de cambios comparaba con la fila cruda del backend, asi que en edicion siempre daba "con cambios" y el formulario no se cerraba ni sin tocar nada.

## Plan implementado de solucion
Se elimino la opcion (`keepOpenIfDirty`, el `useRef` de cambios y `onDirty`): cerrar el formulario siempre lo cierra, como en los demas recursos.

## Verificacion
Con Playwright, en Usuarios: Editar, cambiar el nombre y Cancelar cierra el formulario; tambien lo cierran Escape y el clic en el fondo.
