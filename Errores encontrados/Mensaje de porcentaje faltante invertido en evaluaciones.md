# Mensaje de porcentaje faltante invertido en evaluaciones

## Area del error
Frontend

## Archivos
`src/app/(app)/docente/grupos/[id]/evaluations-panel.tsx`

## Diagnostico
`remaining = total - 100`: con 60% decia "Te pasaste 40%" y con 110% decia "Faltan 10%".

## Plan implementado de solucion
`remaining = 100 - total`.

## Verificacion
Con Playwright (grupo con 110%): "Te pasaste 10%".
