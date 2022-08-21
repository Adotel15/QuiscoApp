
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {

    const [ categorias, setCategorias ] = useState([])
    const [ categoriaActual, setCategoriaActual ] = useState({})
    const [ producto, setProducto ] = useState({})
    const [ modal, setModal ] = useState(false)
    const [ pedido, setPedido ] = useState([])

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

    const handleClickCategoria = id => {
        
        const categoria = categorias.filter ( cat => cat.id === id)
        setCategoriaActual(categoria[0])

    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    // Los párametros de entrada, van a sacar del objeto con destructuring, categoriaId, e imagen, y me quedo con el resto que si es útil
    const handleAgregarPedido = ({categoriaId, imagen, ...producto}) => {

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
                pedido
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