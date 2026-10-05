# Los filtros del administrador se pierden al cambiar de pagina

## Area del error
Frontend

## Archivos
`src/components/admin/resource-manager.tsx`

## Diagnostico
Los filtros solo se enviaban si `page === 1`: en la pagina 2 la lista volvia a mostrar todos los registros sin filtrar.

## Plan implementado de solucion
Los filtros se envian en todas las paginas.

## Verificacion
Revisado; `tsc` y ESLint sin errores.
