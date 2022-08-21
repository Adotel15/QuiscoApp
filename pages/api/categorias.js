
// Esta carpeta de Api siempre se ejecuta del lado del servidor
// Sirve para crear una Api en Next.js
// Si busco http://localhost:3000/api/categorias => Sale la Api en formato Json
// No se puede leer una DB desde el cliente, osea que no se puede instanciar Prisma si no es en el servidor


import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient()

export default async function handler(req, res) {

    // Find Many te trae las categorias, y el include es porque cada categoria
    // incluye un array de productos, para que los traiga tambien se hace includes true
    // Esto se llama eager loading, cargar todo de una, eficiente en proyectos pequeños
    const categorias = await Prisma.categoria.findMany({
        include : {
            productos : true
        }
    })

    // Devuelve el json (Html request 200) de categorias
    res.status(200).json(categorias)
}
