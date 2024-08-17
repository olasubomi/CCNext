import { useEffect, useState } from 'react';
import styles from '../../../src/components/Checkout/style.module.css';
// import PayPalLogo from '/assets/checkout/paypal-logo.svg'

const PaymentMethod = () => {
    const [paymentMethod, setPaymentMethod] = useState('');

    const changePaymentMethod = (method) => {
        setPaymentMethod(method);
        console.log(method)
    } 

    useEffect(() => {
        if (!paymentMethod){
            changePaymentMethod('card')
        }
    }, [paymentMethod])

  return (
    <div className={styles.paymentMethod}>
        <div className={styles.paymentHeader}>
            <h2 className={styles.sectionHeaderText}>Payment Method</h2>
            <p>Complete your purchase items by providing your payment details </p>
        </div>
        <div className={styles.paymentTypeSelection}>
            <span onClick={() => changePaymentMethod('card')} className={paymentMethod === 'card' ? styles.activeCardSelection : ''}>
                <img src='/assets/checkout/CreditCard.svg'/>
                Card
            </span>
            <span onClick={() => changePaymentMethod('paypal')} className={paymentMethod === 'paypal' ? styles.activeCardSelection : ''}>
                <img src='/assets/checkout/paypal-logo.svg'/>
            </span>
            <span onClick={() => changePaymentMethod('sezzle')} className={paymentMethod === 'sezzle' ? styles.activeCardSelection : ''}>
                Sezzle
            </span>
        </div>
        {paymentMethod === 'card' ? 
        <div className={styles.cardDetailsInput}>
            <div className={styles.cardTypeSelection}>
                <p>Choose card type</p>
                <div className={styles.availableCards}>
                    <label>
                        <input type='radio' name='cardtype' id='cardtype' />
                        <span>
                            <img src='/assets/checkout/masterCardLogo.svg' />
                        </span>
                    </label>
                    <label>
                        <input type='radio' name='cardtype' id='cardtype' />
                        <span>
                            <img src='/assets/checkout/visaLogo.svg' />
                        </span>
                    </label>
                    <label>
                        <input type='radio' name='cardtype' id='cardtype' />
                        <span>
                            <img src='/assets/checkout/americanExpressLogo.svg' />
                        </span>
                    </label>
                </div>
            </div>
            <hr />
            <div className={styles.inputs}>
                <div>
                    <label htmlFor='fullname'>Fullname</label>
                    <input type='text' name='fullname' id='fullname' />
                </div>
                <div>
                    <label htmlFor='card_number'>Card number</label>
                    <input type='text' name='card_number' id='card_number' />
                </div>
                <div>
                    <input type='text' placeholder='DD' /> / <input type='text' placeholder='MM' /> / <input type='text' placeholder='YY' /> 
                </div>
                <div>
                    <input type='text' placeholder='CVV' />
                </div>
            </div>
            <div className={styles.billingAddress}>
                <p className={styles.sectionHeaderText}>Billing Address</p>
                <div>
                    <label className={styles.billingAddressCheck}>
                        <input type='checkbox' id='bill'  />
                        <p>Billing Address is same as shipping address </p>
                    </label>

                </div>
            </div>
        </div>  :  (paymentMethod === 'paypal' ?  <div className='cardDetailsInput'>
            <h2>Paypal not availbale for now</h2>
        </div> :  <div className='cardDetailsInput'>
            <h2>Sezzle not availbale for now</h2>
        </div> )
        
    
    }
    </div>
  )
}

export default PaymentMethod