# BACKEND_URL de ejemplo apunta al puerto 3005

## Area del error
Frontend

## Archivos
`.env.example`

## Diagnostico
`.env.example` traia `BACKEND_URL=http://localhost:3005`, pero la API corre en `http://localhost:3000` (README del backend y valor por defecto de `src/lib/server.ts`). Al copiar `.env.example` a `.env.local` como dice el README, el frontend no encontraba la API: el login respondia `No se pudo conectar con el servidor` y las paginas privadas fallaban.

## Plan implementado de solucion
Se cambio a `BACKEND_URL=http://localhost:3000`.

## Verificacion
Con `.env.local` copiado de `.env.example`, el login contra la API funciona.
