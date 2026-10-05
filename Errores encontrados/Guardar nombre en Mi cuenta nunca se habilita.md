# Guardar nombre en Mi cuenta nunca se habilita

## Area del error
Frontend

## Archivos
`src/app/(app)/cuenta/account-forms.tsx`

## Diagnostico
El boton exigia `dirty`, un estado que empezaba en `false` y nunca se actualizaba: era imposible cambiar el nombre.

## Plan implementado de solucion
Se elimino `dirty`; el boton se habilita cuando el nombre no esta vacio y es distinto al actual.

## Verificacion
Con Playwright: antes el boton seguia deshabilitado tras escribir; ahora se habilita.
