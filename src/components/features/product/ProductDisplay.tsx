'use client'

import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroupItem, RadioGroup } from '@/components/ui/radio-group'
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select
} from '@/components/ui/select'
import PaymentForm from '../payment/PaymentForm'

type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  ratings: number
  options: {
    colors: string[]
    sizes: string[]
  }
}

export default function ProductDisplay() {
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetch('/productData.json')
      .then((response) => response.json())
      .then((data: Product) => {
        setProduct(data)
      })
      .catch((error) => console.error('Fetching product data failed', error))
  }, [])

  if (!product) {
    return <div>Loading...</div>
  }
  return (
    <div className='grid max-w-6xl items-start gap-6 px-4 py-6 lg:grid-cols-12 lg:gap-12 lg:px-6'>
      <div className='grid items-start gap-3 md:grid-cols-5'>
        <div className='md:col-span-4'>
          <img
            alt='Product Image'
            className='w-full overflow-hidden rounded-lg border border-gray-200 object-cover dark:border-gray-800'
            height={900}
            src={product.image}
            style={{
              aspectRatio: '600/900',
              objectFit: 'cover'
            }}
            width={600}
          />
        </div>
      </div>
      <div className='flex flex-col gap-4 lg:col-span-7 lg:col-start-1'>
        <div className='grid items-start gap-4 md:gap-10'>
          <h1 className='text-3xl font-bold lg:text-5xl'>{product.name}</h1>
          <h2 className='text-2xl font-bold lg:text-5xl'>${product.price}</h2>
          <div>
            <p>{product.description}</p>
          </div>
        </div>
        <form className='grid gap-4 md:gap-10'>
          <div className='grid gap-2'>
            <Label className='text-base' htmlFor='color'>
              Color
            </Label>
            <RadioGroup
              className='flex items-center gap-2'
              defaultValue='black'
              id='color'
            >
              <Label
                className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                htmlFor='color-black'
              >
                <RadioGroupItem id='color-black' value='black' />
                Black
              </Label>
            </RadioGroup>
          </div>
          <div className='grid gap-2'>
            <Label className='text-base' htmlFor='size'>
              Size
            </Label>
            <RadioGroup
              className='flex items-center gap-2'
              defaultValue='m'
              id='size'
            >
              <Label
                className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                htmlFor='size-xs'
              >
                <RadioGroupItem id='size-xs' value='xs' />
                XS
              </Label>
              <Label
                className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                htmlFor='size-s'
              >
                <RadioGroupItem id='size-s' value='s' />S
                {'\n                          '}
              </Label>
              <Label
                className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                htmlFor='size-m'
              >
                <RadioGroupItem id='size-m' value='m' />M
                {'\n                          '}
              </Label>
              <Label
                className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                htmlFor='size-l'
              >
                <RadioGroupItem id='size-l' value='l' />L
                {'\n                          '}
              </Label>
              <Label
                className='flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800'
                htmlFor='size-xl'
              >
                <RadioGroupItem id='size-xl' value='xl' />
                XL
              </Label>
            </RadioGroup>
          </div>
          <div className='grid gap-2'>
            <Label className='text-base' htmlFor='quantity'>
              Quantity
            </Label>
            <Select defaultValue='1'>
              <SelectTrigger className='w-24'>
                <SelectValue placeholder='Select' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='1'>1</SelectItem>
                <SelectItem value='2'>2</SelectItem>
                <SelectItem value='3'>3</SelectItem>
                <SelectItem value='4'>4</SelectItem>
                <SelectItem value='5'>5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <PaymentForm product={product} />
        </form>
      </div>
    </div>
  )
}
