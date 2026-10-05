# Cancelar matricula usa PATCH en vez de POST

## Area del error
Frontend

## Archivos
`src/app/(app)/estudiante/materias/cancel-button.tsx`, `src/components/admin/operations.tsx`

## Diagnostico
El backend expone `POST /enrollments/:id/cancel`, pero el estudiante y el administrador llamaban con `PATCH`: la API respondia 404 `Cannot PATCH ...` y nunca se cancelaba.

## Plan implementado de solucion
Ambos llaman con `method: "POST"`.

## Verificacion
Con un ID inexistente: `POST` llega al servicio (404 "Matricula no encontrada"); `PATCH` responde "Cannot PATCH".
