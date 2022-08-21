import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout/Layout'
import useQuiosco from '../hooks/useQuiosco'
import Producto from '../components/Producto'


export default function Home() {

  const { categoriaActual } = useQuiosco()


    return (
      <Layout pagina = {`Menú ${categoriaActual?.nombre}`}>
        <h1 className = 'text-4xl font-black'>{ categoriaActual?.nombre }</h1>
        <p className = 'text-xl my-10'>
          Elige y personaliza tu pedido a continuación
        </p>

        <div className = 'grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
          { categoriaActual?.productos?.map ( producto => (
            <Producto 
              key = {producto.id}
              producto = {producto}
            />
          ))}
        </div>
      </Layout>
    )
}


/*
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
*/
