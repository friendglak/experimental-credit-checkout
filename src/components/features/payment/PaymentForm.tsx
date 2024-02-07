'use client'

import { Button } from '@/components/ui/button'
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import PaymentDetails from './PaymentDetails'
import { useState } from 'react'
import { setPaymentData } from '@/lib/features/payments/paymentSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { RootState } from '@/lib/store'


interface Product {
  name: string
  price: number
  image: string
}

export default function PaymentForm({ product }: { product: Product }) {
  const dispatch = useAppDispatch()

  const previousPaymentData = useAppSelector(
    (state: RootState) => state.payment.paymentData
  )

  const [name, setName] = useState(previousPaymentData?.name || '')
  const [cardNumber, setCardNumber] = useState(
    previousPaymentData?.cardNumber || ''
  )

  const [expiry, setExpiry] = useState(previousPaymentData?.expiry || '')
  const [cvv, setCvv] = useState(previousPaymentData?.cvv || '')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const paymentInfo = { name, cardNumber, expiry, cvv }
    dispatch(setPaymentData(paymentInfo))
    console.log('Payment Info:', paymentInfo)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    switch (id) {
      case 'name':
        setName(value)
        break
      case 'cardNumber':
        setCardNumber(value)
        break
      case 'expiry':
        setExpiry(value)
        break
      case 'cvv':
        setCvv(value)
        break
      default:
        break
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>Pay with credit card</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>
            Enter your payment details to complete the purchase.
          </DialogDescription>
          <span className='flex flex-row items-center justify-between text-balance text-center'>
            <img
              alt='Product Image'
              className='w-full max-w-[50%] overflow-hidden rounded-lg border border-gray-200 object-cover  dark:border-gray-800'
              src={product.image}
              height={100}
              width={100}
            />
            <DialogDescription>
              {product.name} - $ {product.price}{' '}
            </DialogDescription>
          </span>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                value={name}
                onChange={handleInputChange}
                placeholder='Enter your name'
              />
            </div>
            <div className='relative space-y-2'>
              <Label htmlFor='cardNumber'>Card Number</Label>
              <Input
                id='cardNumber'
                value={cardNumber}
                onChange={handleInputChange}
                placeholder='Enter your card number'
              />
              <Button
                className='absolute bottom-1 right-1 h-7 w-7'
                size='icon'
                variant='ghost'
              >
                <CreditCardIcon className='h-4 w-4' />
                <span className='sr-only'>Credit Card</span>
              </Button>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='expiry'>Expiry Date</Label>
                <Input
                  id='expiry'
                  value={expiry}
                  onChange={handleInputChange}
                  placeholder='MM/YY'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='cvv'>CVV</Label>
                <Input
                  id='cvv'
                  value={cvv}
                  onChange={handleInputChange}
                  placeholder='CVV'
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <PaymentDetails product={product} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function CreditCardIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect width='20' height='14' x='2' y='5' rx='2' />
      <line x1='2' x2='22' y1='10' y2='10' />
    </svg>
  )
}
