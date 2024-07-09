import styles from '../../../src/components/Checkout/style.module.css';

const PlaceOrderBtn = () => {
  return (
    <div className={styles.PlaceOrderBtn_container}>
        <p>
            By placing your order you agree to our <a href='#'>Terms & Conditions</a>, <a href='#'>Privacy and returns policies</a>
        </p>
        <button>Place an order</button>
        <a>Dummy Button for Guest Place Order</a>
    </div>
  )
}

export default PlaceOrderBtn