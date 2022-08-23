
import { PrismaClient } from '@prisma/client'

// req => Request (Lo que le pides al servidor)
// res => Response (Lo que te devuelve)
export default async function handler(req, res) {

    const Prisma = new PrismaClient()

    if(req.method === 'POST') {

        // Usamos la instancia de Prisma para llamar a orden.create
        // La informacion está dentro de un objeto llamado data : {}
        // el valor de la izquierda tiene que ser el mismo nombre que tiene
        // en la DB, y luego a la derecha, coges la info con req.body y .
        // el nombre de la variable que estas pasando. Todo son objetos
        const orden = await Prisma.orden.create({
            data : {
                nombre: req.body.nombre,
                total: req.body.total,
                pedido: req.body.pedido,
                fecha: req.body.fecha
            }
        })

        // Esto imprime en el terminal el contenido de lo que estamos haciendo POST
        console.log(req.body)

        // El servidor contesta a través de la variable respuesta
        res.json({
            orden
        })
    }

}