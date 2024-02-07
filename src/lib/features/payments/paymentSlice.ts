import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

const simulatePaymentAPI = async (
  paymentData: PaymentData
): Promise<PaymentData> => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/
  const masterCardPattern = /^5[1-5][0-9]{14}$/
  if (visaPattern.test(paymentData.cardNumber)) {
    throw new Error('Payment failed: Invalid card number')
  }
  if (masterCardPattern.test(paymentData.cardNumber)) {
    throw new Error('Payment failed: Invalid card number')
  }
  return paymentData
}

export const processPayment = createAsyncThunk(
  'payment/processPayment',
  async (paymentData: PaymentData, { rejectWithValue }) => {
    try {
      const response = await simulatePaymentAPI(paymentData)
      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export interface PaymentData {
  name: string
  cardNumber: string
  expiry: string
  cvv: string
}

export interface PaymentState {
  isLoading: boolean
  paymentStatus: string | null
  errorMessage: string
  paymentData?: PaymentData
}

const initialState: PaymentState = {
  isLoading: false,
  paymentStatus: null,
  errorMessage: ''
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentData: (state, action: PayloadAction<PaymentData>) => {
      console.log('Payment Data:', action.payload)
      state.paymentData = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(processPayment.pending, (state) => {
        state.isLoading = true
        state.errorMessage = ''
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.isLoading = false
        state.paymentStatus = 'success'
        state.paymentData = action.payload
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.isLoading = false
        state.paymentStatus = 'failed'
        state.errorMessage = action.payload as string // Asegúrate de manejar el tipo correctamente
      })
  }
})

export const { setPaymentData } = paymentSlice.actions

export default paymentSlice.reducer
