
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {

    const [ categorias, setCategorias ] = useState([])
    const [ categoriaActual, setCategoriaActual ] = useState({})
    const [ producto, setProducto ] = useState({})
    const [ modal, setModal ] = useState(false)
    const [ pedido, setPedido ] = useState([])
    const [ nombre, setNombre ] = useState('')
    const [ total, setTotal ] = useState(0)

    const router = useRouter()

    const obtenerCategorias = async () => {

        const { data } = await axios('/api/categorias')
        setCategorias(data)
        console.log( data )

    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect (() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {

        // .reduce es un acumulador, total es el acumulador que lo iniciamos a 0, y el prodcuto es el iterador,
        // vamos sumando por cada producto precio * cantidad, y se lo sumamos a totals
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)

        setTotal(nuevoTotal)

    }, [pedido])

    const handleClickCategoria = id => {
        
        const categoria = categorias.filter ( cat => cat.id === id)
        setCategoriaActual(categoria[0])

        router.push('/')


    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    // Los párametros de entrada, van a sacar del objeto con destructuring, categoriaId, e imagen, y me quedo con el resto que si es útil
    const handleAgregarPedido = ({categoriaId, ...producto}) => {

        // .some itera todo el array y devuelve true si se cumple una condicion
        if(pedido.some( productoState => productoState.id === producto.id)){

            const pedidoActualizado = pedido.map( productoState => 
                productoState.id === producto.id ? 
                    producto : productoState)

            setPedido(pedidoActualizado)
            toast.success("Pedido actualizado")

        } else {

            setPedido([...pedido, producto])
            toast.success(`+${producto.cantidad} de ${producto.nombre}`)

        }
        setModal(false) 
    }

    const handleEditarCantidades = id => {
        const productoActulizar = pedido.filter( producto => producto.id === id)
        
        setProducto(productoActulizar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)

        setPedido(pedidoActualizado)
    }

    const colocarOrden = async e => {
        e.preventDefault()

    }


    return (
        <QuioscoContext.Provider
            value = {{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            { children }
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext;