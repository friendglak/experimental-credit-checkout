import { Button } from '@/components/ui/button'
import { DialogContent, DialogTrigger, Dialog } from '@/components/ui/dialog'
import { CreditCardIcon } from 'lucide-react'
import { useAppDispatch } from '@/lib/hooks'
import { processPayment } from '@/lib/features/payments/paymentSlice'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'

interface Product {
  name: string
  price: number
  image: string
}

export default function PaymentDetails({ product }: { product: Product }) {
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const handlePayment = async () => {
    try {
      const paymentData = {
        name: 'John Doe',
        cardNumber: '1234 5678 9101 1121',
        expiry: '12/23',
        cvv: '123'
      }
      await dispatch(processPayment(paymentData)).unwrap()
      console.log()
      toast({
        variant: 'default',
        title: 'Payment successful',
        description: `You have successfully purchased ${product.name}.`
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your payment.'
      })
    }
  }

  return (
    <>
      <Dialog>
        <div className='flex h-full flex-col'>
          <DialogTrigger asChild>
            <Button
              type='button'
              className='w-full'
              variant='default'
              onClick={handlePayment}
            >
              Pay
            </Button>
          </DialogTrigger>
          <DialogContent className='flex flex-1 flex-col justify-center space-y-4'>
            <div className='flex items-center space-x-2'>
              <CreditCardIcon className='h-4 w-4' />
              <span className='text-sm font-medium'>Payment Details</span>
            </div>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>{product.price}</span>
              </div>
              <div className='flex justify-between'>
                <span>Taxes</span>
                <span>$0</span>
              </div>
              <div className='flex justify-between font-medium'>
                <span>Total</span>
                <span>{product.price}</span>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  )
}
