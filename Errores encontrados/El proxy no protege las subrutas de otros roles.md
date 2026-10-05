# El proxy no protege las subrutas de otros roles

## Area del error
Frontend

## Archivos
`src/proxy.ts`

## Diagnostico
La revision de rol solo comparaba `pathname === p`, asi que `/admin` redirigia a un estudiante pero `/admin/usuarios`, `/docente/grupos`, etc. no. Un estudiante podia abrir las pantallas de administracion.

## Plan implementado de solucion
Se compara tambien el prefijo: `pathname === p || pathname.startsWith(`${p}/`)`.

## Verificacion
Con sesion de estudiante, `/admin/usuarios`, `/docente/grupos` y `/admin` redirigen a `/estudiante`.
