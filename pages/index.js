import Head from 'next/head'
import Image from 'next/image'
import { PrismaClient } from '@prisma/client'


export default function Home({ categorias }) {

    console.log(categorias)
    return (
      <h1>NextJS</h1>
    )
}

// -------- Nota ----------
// Server side props se ejecuta cada vez que se renderiza la página, el return props se puede extraer
//  directamente en el componente, y pasa del lado del servidor al lado del cliente
// Usar ServerSideProps o Static Props cuando la necesitas renderizar en el componente
// Api cuando quieras ponerlo en el state
export const getServerSideProps = async () => {
  // Para consultar la base de datos con Prisma, instancia
  const Pr = new PrismaClient()

  // Instancia de la base de datos.nombre del modelo.funcion (Prisma Doc)
  const categorias = await Pr.categoria.findMany()

  return {
    props : {
      categorias,
    }
  }
}
