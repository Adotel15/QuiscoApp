
import { categorias } from './data/categorias'
import { productos } from './data/productos'
//  Para hacer el seeding (Poner mucha información en la base de datos)
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () : Promise<void> => {

    try {

        // Coge el modelo de categoria, crea muchos, sino seria create a secas,
        // y data : la array de categorias
        await prisma.categoria.createMany({
            data : categorias
        })

        await prisma.producto.createMany({
            data : productos
        })

    } catch (error) {

        console.log(error)

    }
}

main()