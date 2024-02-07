import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface CardDetails {
  cardNumber: string
  expiryDate: string
  cvv: string
  cardHolderName: string
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function detectCardType(
  cardNumber: string
): 'Unknown' | 'Visa' | 'MasterCard' {
  const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/
  const masterCardPattern = /^5[1-5][0-9]{14}$/

  if (visaPattern.test(cardNumber)) {
    return 'Visa'
  } else if (masterCardPattern.test(cardNumber)) {
    return 'MasterCard'
  } else {
    return 'Unknown'
  }
}

export function simulatePaymentAPI(
  paymentData: CardDetails
): Promise<{ success: boolean; message: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        paymentData.cardNumber &&
        detectCardType(paymentData.cardNumber) !== 'Unknown'
      ) {
        resolve({ success: true, message: 'Transaction successful!' })
      } else {
        reject({
          success: false,
          message: 'Transaction failed. Invalid card data.'
        })
      }
    }, 1000)
  })
}
