import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PaymentState {
  paymentData: any
}

const initialState: PaymentState = {
  paymentData: null
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentData: (state: PaymentState, action: PayloadAction<any>) => {
      state.paymentData = action.payload
    },
    clearPaymentData: (state: PaymentState) => {
      state.paymentData = null
    }
  }
})

export const { setPaymentData, clearPaymentData } = paymentSlice.actions

export default paymentSlice.reducer
