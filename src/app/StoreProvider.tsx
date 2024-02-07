"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../lib/store' // Asegúrate de que la ruta sea correcta

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  return <Provider store={store}>{children}</Provider>
}
