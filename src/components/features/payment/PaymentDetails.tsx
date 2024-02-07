import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CreditCardIcon } from 'lucide-react'

interface Product {
  name: string
  price: number
  image: string
}

export default function PaymentDetails({ product }: { product: Product }) {
  return (
    <Dialog>
      <div className='flex h-full flex-col'>
        <DialogTrigger asChild>
          <Button variant='default'>Pay with credit card</Button>
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
  )
}
