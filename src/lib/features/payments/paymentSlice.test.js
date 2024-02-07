import paymentReducer, {
  setPaymentData,
  clearPaymentData,
  processPayment
} from './paymentSlice'

const initialState = {
  paymentData: null,
  isLoading: false,
  paymentStatus: null,
  errorMessage: ''
}

describe('payment slice', () => {
  test('should return the initial state', () => {
    expect(paymentReducer(initialState, {})).toEqual(initialState)
  })

  test('should handle a payment being set to the state', () => {
    const paymentInfo = {
      name: 'Test User',
      cardNumber: '4242424242424242',
      expiry: '12/24',
      cvv: '123'
    }
    const action = setPaymentData(paymentInfo)
    const updatedState = paymentReducer(initialState, action)
    expect(updatedState.paymentData).toEqual(paymentInfo)
  })
})
