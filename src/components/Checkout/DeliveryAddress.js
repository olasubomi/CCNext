import styles from '../../../src/components/Checkout/style.module.css'
const DeliveryAddress = () => {
  return (
    <div className={styles.box_deliveryAddress}>
        <h2 className={styles.sectionHeaderText}>Delivery Address</h2>
        <div className={styles.deliveryAddress}>
            <div className={styles.deliveryAddressUpper}>
                <div>
                    <label htmlFor='fistname'>Sreet address 1</label>
                    <input type='text' name='firstname' id='fistname' />
                </div>
                <div>
                    <label htmlFor='lastname'>Street address 2</label>
                    <input type='text'name='lastname' id='lastname' />
                </div>
                <div>
                    <label htmlFor='email'>State / Province</label>
                    <input type='email' name='email' id='email' />
                </div>
                <div>
                    <label htmlFor='phone'>City</label>
                    <input type='tel' name='phone' id='phone' />
                </div>
                <div>
                    <label htmlFor='address'>Zip / Postal code</label>
                    <input type='text' name='address' id='address' />
                </div>
                <div>
                    <label htmlFor='address'>Country</label>
                    <input type='text' name='address' id='address' />
                </div>
            </div>
            <hr />
            <div className={styles.deliveryAddressLower}>
                <div>
                    <label htmlFor='fistname'>Delivery Note</label>
                    <textarea></textarea>
                </div>
            </div>
        </div>
        </div>

  )
}

export default DeliveryAddress