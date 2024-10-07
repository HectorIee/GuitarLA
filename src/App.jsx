import { useEffect, useState } from "react";
import CardGuitar from "./components/CardGuitar"
import Header from "./components/Header"
import { db } from './data/db'

function App() {
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

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseAmount={increaseAmount}
        decreaseAmount={decreaseAmount}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => {
            return (
              <CardGuitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}

              />
            )
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0"> GuitarLA - Todos los derechos Reservados </p>
        </div>
      </footer>
    </>
  )
}

export default App