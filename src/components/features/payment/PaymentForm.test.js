import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../lib/store'
import PaymentForm from './PaymentForm'

test('renders PaymentForm and submits data', async () => {
  const productMock = {
    name: 'Producto de prueba',
    price: 100,
    image:
      'https://trueshop.co/cdn/shop/files/Camiseta_Logo_Curvy_Negra_1_1800x1800.jpg?v=1705016322'
  }
  const { getByText, getByLabelText } = render(
    <Provider store={store}>
      <PaymentForm product={productMock} />
    </Provider>
  )

  fireEvent.click(getByText(/pay with credit card/i))

  const cardNumberInput = getByLabelText(/card number/i)
  fireEvent.change(cardNumberInput, { target: { value: '1234567890123456' } })
})
