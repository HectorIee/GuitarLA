import { useEffect, useState, useMemo } from "react";
import { db } from '../data/db'

export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []

    }

    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (item) => {
        const ExistItem = cart.findIndex(guitar => guitar.id === item.id)
        if (ExistItem >= 0) {  //Does the item exist in the cart
            console.log('ya existe...')
            const UpdateCart = [...cart]
            UpdateCart[ExistItem].count++
            setCart(UpdateCart)
        } else {
            console.log('no existe, agregando...')
            item.count = 1
            setCart([...cart, item])
        }
    }

    function removeFromCart(id) {
        console.log('Eliminando....', id)
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseAmount(id) {
        console.log('Incremento....', id)
        const updatedCart = cart.map(item => {
            return item.id === id && item.count < MAX_ITEMS ? { ...item, count: item.count + 1 } : item
        })
        setCart(updatedCart)
    }

    function decreaseAmount(id) {
        console.log('Decremento....', id)
        const updatedCart = cart.map(item => {
            return item.id === id && item.count > MIN_ITEMS ? { ...item, count: item.count - 1 } : item
        })
        setCart(updatedCart)
    }

    function clearCart() {
        setCart([])
    }


    // derivative state
    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.price * item.count), 0), [cart])


    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseAmount,
        decreaseAmount,
        clearCart,
        isEmpty,
        cartTotal
    }
}