import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PaymentData {
  name: string
  cardNumber: string
  expiry: string
  cvv: string
}

export interface PaymentState {
  paymentData?: PaymentData
}

const initialState: PaymentState = {}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentData: (state, action: PayloadAction<PaymentData>) => {
      console.log('Payment Data:', action.payload)
      state.paymentData = action.payload
    }
  }
})

export const { setPaymentData } = paymentSlice.actions

export default paymentSlice.reducer
