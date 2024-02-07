import { configureStore } from '@reduxjs/toolkit'
import paymentReducer from './features/payments/paymentSlice'
import productReducer from './features/products/productSlice'

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('paymentData')
    if (serializedState === null) return undefined
    return { payment: JSON.parse(serializedState) } // Ajuste aquí
  } catch (e) {
    console.warn(e)
    return undefined
  }
}

const saveToLocalStorage = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('paymentData', serializedState)
  } catch (e) {
    console.warn(e)
  }
}

export const makeStore = () => {
  const preloadedState = loadFromLocalStorage()

  const store = configureStore({
    reducer: {
      payment: paymentReducer,
      product: productReducer
    },
    preloadedState
  })

  store.subscribe(() => {
    saveToLocalStorage(store.getState())
  })

  return store
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
