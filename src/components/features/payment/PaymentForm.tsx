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
import { setPaymentData } from '@/lib/features/payments/paymentSlice'
import { useAppDispatch } from '@/lib/hooks'
import PaymentDetails from './PaymentDetails'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

interface PaymentInfo {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardHolderName: string
}

interface Product {
  name: string
  price: number
  image: string
}

export default function PaymentForm({ product }: { product: Product }) {
  const dispatch = useAppDispatch()

  // const handlePayment = (paymentInfo: PaymentInfo) => {
  //   // Aquí asumimos que handlePayment se ajustará para manejar correctamente los datos de pago
  //   // Tal vez necesites un estado local para manejar los valores de los inputs
  //   console.log(paymentInfo) // Placeholder para tu lógica de manejo de pagos
  //   dispatch(setPaymentData(paymentInfo))
  // }

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
          <span className='flex flex-row items-center text-balance text-center'>
            <img
              alt='Product Image'
              className='w-full max-w-40 overflow-hidden rounded-lg border border-gray-200 object-cover  dark:border-gray-800'
              src={product.image}
              height={100}
              width={100}
            />
            <DialogDescription>
              {product.name} - $ {product.price}{' '}
            </DialogDescription>
          </span>
        </DialogHeader>
        <form>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='Enter your name' />
            </div>
            <div className='relative space-y-2'>
              <Label htmlFor='cardNumber'>Card Number</Label>
              <Input id='cardNumber' placeholder='Enter your card number' />
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
                <Input id='expiry' placeholder='MM/YY' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='cvv'>CVV</Label>
                <Input id='cvv' placeholder='CVV' />
              </div>
            </div>
          </div>
        </form>
        <DialogFooter>
          <PaymentDetails product={product} />
        </DialogFooter>
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
