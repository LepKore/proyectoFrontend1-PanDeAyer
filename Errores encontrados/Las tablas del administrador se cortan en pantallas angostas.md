# Las tablas del administrador se cortan en pantallas angostas

## Area del error
Frontend

## Archivos
`src/components/admin/resource-manager.tsx`

## Diagnostico
La tabla tiene `min-w-[40rem]` dentro de una tarjeta con `overflow-hidden` y sin contenedor desplazable: en movil las columnas (incluida Acciones) quedaban recortadas.

## Plan implementado de solucion
El contenedor de la tabla usa `overflow-x-auto`, como las demas tablas del proyecto.

## Verificacion
Revisado; mismo patron que historial y reportes.
