'use client'

import { configureStore } from '@reduxjs/toolkit'
import paymentReducer, {
  PaymentState
} from '@/lib/features/payments/paymentSlice'

function loadFromLocalStorage(): PaymentState | undefined {
  try {
    const serializedState = localStorage.getItem('paymentData')
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (e) {
    console.error('Could not load state:', e)
    return undefined
  }
}

function saveToLocalStorage(state: PaymentState): void {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('paymentData', serializedState)
  } catch (e) {
    console.error('Could not save state:', e)
  }
}

const preloadedState = loadFromLocalStorage()

export const store = configureStore({
  reducer: {
    payment: paymentReducer
  },
  preloadedState: preloadedState ? { payment: preloadedState } : undefined
})

store.subscribe(() => {
  saveToLocalStorage(store.getState().payment)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
