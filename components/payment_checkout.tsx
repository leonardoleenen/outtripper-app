/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React, { useState } from 'react'
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import bs, { formatter } from '../services/business'


const stripePromise = loadStripe('pk_test_tOIZAnFg0LE20AvfgQu8mqTG')

interface Item {
  id: string,
  name: string,
  amount: number,
  checked?: boolean

}
interface Props {
  chargeDescription: string
  items: Array<Item>
  callFunction: Function
  chargeServiceFeeToCustomer: boolean
  serviceChargeFeeSettings: {
    serviceChargeFeePercentage: number; serviceChargeFeeFixedAmount: number
  }
}

interface ContentProps {
  visible: boolean
}

export default (props: Props) => {
  const {
    items, chargeDescription, callFunction, chargeServiceFeeToCustomer, serviceChargeFeeSettings,
  } = props

  const [itemsCopy, setItemsCopy] = useState<Array<Item>>(items)
  const [payBalance, setPayBalance] = useState<boolean>(false)
  const totalSelected = !payBalance && itemsCopy.filter((i:Item) => i.checked).length === 0 ? 0 : payBalance ? items.map((i:Item) => i.amount).reduce((t, v) => t += v) : itemsCopy.filter((i:Item) => i.checked).map((i:Item) => i.amount).reduce((t, v) => t += v)
  // totalSelected = chargeServiceFeeToCustomer ? totalSelected
  const [transactionSuccess, setTransactionSuccess] = useState(false)
  const [transactionError, setTransactionError] = useState(null)
  const [show, setShow] = useState(false)
  const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    // const amountToPay : number = itemsCopy.map((i:Item) => i.amount).reduce((t, v) => t += v)

    const handleSubmit = async (event) => {
      // setProcessIsRunning(true)
      document.querySelector('.buttonPay').classList.add('hidden')
      document.querySelector('.buttonLoading').classList.remove('hidden')
      setTransactionError(null)

      event.preventDefault()
      // eslint-disable-next-line dot-notation


      bs.createCreditCardPaymentStripeIntent(totalSelected).then((clientSecret: string) => {
        stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              // eslint-disable-next-line react/prop-types
              name: chargeDescription,
            },
          },
        }).then((result) => {
          setTransactionSuccess(true)
          callFunction(result, payBalance ? itemsCopy : itemsCopy.filter((i:Item) => i.checked))
          // bs.setAPayment(invoice, amountToPay, PaymentMode.CREDITCARD, new Date().getTime(), 'Payment With Credit Card', customer).then(() => setShowSuccess(true))
        })
          .catch((err) => {
            setTransactionError(err)
            console.log(err)
          })
      }).catch((err) => {
        setTransactionError(err)
        console.log('Error 500', err)
      })
      // setIsLoading(true)
    }

    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <CardElement />

        <div className="flex justify-center mt-4 hidden buttonLoading">
          <button type="button">
            <img className="w-8 h-8" alt="loading" src="/icons/payment_loading.svg" />
          </button>
        </div>

        <div className="flex justify-center mt-4 buttonPay ">
          <button type="submit" disabled={!stripe} className={`py-2 px-8  ${itemsCopy.filter((i:Item) => i.checked).length === 0 ? 'bg-gray-300' : 'bg-teal-500'} text-white font-semibold rounded-lg`}>{totalSelected === 0 ? 'Select an Item' : `Pay ${formatter.format(chargeServiceFeeToCustomer ? totalSelected + ((totalSelected * serviceChargeFeeSettings.serviceChargeFeePercentage) / 100) : totalSelected)} Now`}</button>
        </div>


        <footer className="p-4 flex justify-center text-xs">
          <div className="text-gray-600 font-semibold">Powered By </div>
          <div className="text-purple-600 font-semibold">Stripe</div>
        </footer>

      </form>
    )
  }


  const PaymentContent = (propsPaymentContent: ContentProps) => {
    const { visible } = propsPaymentContent

    return (
      <div className={`mt-4 ${!visible ? 'hidden' : ''}`}>
        <div className="px-4 flex">
          <div className="w-full text-lg font-semibold">Items to pay</div>
          <div
            onClick={() => {
              const clearList : Array<Item> = []
              itemsCopy.forEach((i:Item) => {
                i.checked = false
                clearList.push(i)
              })
              setItemsCopy(clearList)
              setPayBalance(!payBalance)
            }}
            className="text-gray-700 w-24 flex justify-end"
          >
            <span>{payBalance ? 'Clear' : 'Select All'}</span>

          </div>
        </div>
        <article className="p-4">
          {itemsCopy.map((i:Item, index:number) => (
            <div
              key={`item${i.id}`}
              className="flex py-2"
            >
              <input
                onChange={() => {
                  itemsCopy[index].checked = !itemsCopy[index].checked

                  if (itemsCopy[index].checked) { setPayBalance(false) }

                  setItemsCopy(Object.assign([], itemsCopy))
                }}
                className="w-6 h-6"
                checked={i.checked || false}
                type="checkbox"
              />
              <div className="px-4 w-full text-sm">{i.name}</div>
              <div className="text-base font-semibold">{formatter.format(i.amount)}</div>
            </div>
          ))}


          <div className="flex py-2 mt-4 border-t">
            <div className="px-4 w-full text-sm">Total Selected</div>
            <div>{formatter.format(totalSelected)}</div>
          </div>
          {chargeServiceFeeToCustomer ? (
            <div className="flex py-2">
              <div className="px-4 w-full text-sm">Service Charge</div>
              <div className="font-semibold">{formatter.format((totalSelected * serviceChargeFeeSettings.serviceChargeFeePercentage) / 100)}</div>
            </div>
          ) : '' }

          <div className="flex py-2">
            <div className="px-4 w-full text-sm">Total to pay</div>
            <div className="font-semibold">{formatter.format(chargeServiceFeeToCustomer ? totalSelected + ((totalSelected * serviceChargeFeeSettings.serviceChargeFeePercentage) / 100) : totalSelected)}</div>
          </div>


          <div className="mt-4 py-2 border-t">
            <span className="text-lg font-semibold">Insert your credit card info</span>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </article>
        <footer className="h-24" />
      </div>
    )
  }


  const SuccessContent = (propsSuccessContent: ContentProps) => {
    const { visible } = propsSuccessContent
    return (
      <div className={`mt-4 ${!visible ? 'hidden' : ''}`}>
        <SuccessIcon />
        <div className="flex justify-center mt-4">
          <span className="text-3xl font-bold text-center">Thank you</span>
        </div>
        <div className="mt-4 flex">
          <span className="text-sm text-center px-4">{`Your payment for ${formatter.format(chargeServiceFeeToCustomer ? totalSelected + ((totalSelected * serviceChargeFeeSettings.serviceChargeFeePercentage) / 100) : totalSelected)} has been correctly processed`}</span>
        </div>
      </div>
    )
  }

  const ErrorContent = (propsErrorContent: ContentProps) => {
    const { visible } = propsErrorContent
    return (
      <div className={`mt-4 ${!visible ? 'hidden' : ''}`}>
        <div><ErrorIcon /></div>

        <div className="flex justify-center mt-4">
          <span className="text-3xl font-bold text-center">Your payment failed</span>
        </div>
        <div className="mt-4 flex">
          <span className="text-sm text-center px-4">There was a problem processing your payment. Please, try again with a different card.</span>
        </div>
        <div className="mt-4 flex justify-center" onClick={() => setTransactionError(null)}>
          <span className="text-sm underline">Edit your selection</span>
        </div>
      </div>
    )
  }
  return (
    <div className="text-black">

      {items.length > 0 ? (
        <div className={`flex justify-center mt-4 ${!show ? '' : 'hidden'}`}>
          <div className="flex-cols">
            <button type="button" className="px-8 py-4 bg-teal-700 text-white rounded-lg" onClick={() => setShow(true)}>
              <span>Pay now with credit card</span>
            </button>
            {chargeServiceFeeToCustomer ? <div className="text-gray-600 text-xs font-thin text-center mt-2">{`${serviceChargeFeeSettings.serviceChargeFeePercentage}% will be charge as Service Fee`}</div> : '' }
          </div>
        </div>
      ) : '' }


      <div className={`absolute inset-x-0 bottom-0 bg-gray-100 rounded-lg ${!show ? 'hidden' : ''}`} style={{ height: '85%' }}>
        <header className="p-4 flex justify-end ">
          <div
            className="text-teal-700 text-base font-semibold"
            onClick={() => {
              setShow(false)
              setTransactionError(null)
              setTransactionSuccess(false)
            }}
          >
Close

          </div>
        </header>
        <PaymentContent visible={!!(!transactionError && !transactionSuccess)} />
        <SuccessContent visible={transactionSuccess} />
        <ErrorContent visible={transactionError} />
      </div>
    </div>
  )
}

const SuccessIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 60C46.4118 60 60 46.4118 60 30C60 13.6176 46.3824 0 29.9706 0C13.5882 0 0 13.6176 0 30C0 46.4118 13.6176 60 30 60ZM30 55C16.1176 55 5.02941 43.8824 5.02941 30C5.02941 16.1471 16.0882 5 29.9706 5C43.8529 5 54.9706 16.1471 55 30C55.0294 43.8824 43.8824 55 30 55ZM26.2941 44.7059C27.2647 44.7059 28.0588 44.2353 28.6765 43.3235L43.2059 20.4706C43.5882 19.8824 43.9118 19.2059 43.9118 18.5588C43.9118 17.2059 42.7353 16.3824 41.5 16.3824C40.7353 16.3824 39.9706 16.8235 39.4412 17.7059L26.1765 38.9706L19.3529 30.1471C18.6765 29.2647 17.9706 28.9412 17.1765 28.9412C15.8824 28.9412 14.8529 30 14.8529 31.3235C14.8529 31.9706 15.1176 32.5882 15.5588 33.1471L23.7647 43.3235C24.5588 44.2941 25.3235 44.7059 26.2941 44.7059Z" fill="#4FD1C5" />
  </svg>
)

const ErrorIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="27.5" stroke="#FC8181" strokeWidth="5" />
    <path d="M19.2266 37.8536C18.4609 38.6329 18.4199 40.0684 19.2539 40.8887C20.0879 41.7227 21.5098 41.6954 22.2891 40.9161L30 33.2051L37.6973 40.9024C38.5039 41.7227 39.8984 41.709 40.7188 40.875C41.5527 40.0547 41.5527 38.6602 40.7461 37.8536L33.0488 30.1563L40.7461 22.4454C41.5527 21.6387 41.5527 20.2442 40.7188 19.4239C39.8984 18.5899 38.5039 18.5899 37.6973 19.3965L30 27.0938L22.2891 19.3829C21.5098 18.6172 20.0742 18.5762 19.2539 19.4102C18.4336 20.2442 18.4609 21.6661 19.2266 22.4454L26.9375 30.1563L19.2266 37.8536Z" fill="#FC8181" />
  </svg>
)
