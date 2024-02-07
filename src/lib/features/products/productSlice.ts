// features/product/productSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProductState {
  currentProduct: {
    name: string
    price: number
  }
}

const initialState: ProductState = {
  currentProduct: {
    name: '',
    price: 0
  }
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (
      state,
      action: PayloadAction<{ name: string; price: number }>
    ) => {
      state.currentProduct = action.payload
    }
  }
})

export const { setProduct } = productSlice.actions

export default productSlice.reducer
