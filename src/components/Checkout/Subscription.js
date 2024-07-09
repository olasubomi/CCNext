import styles from '../../../src/components/Checkout/style.module.css'

const Subscription = () => {
  return (
    <div className={styles.box_subscription}>
        <div>
            <label>
                <input type='radio' name='subscription' />
                <p>Subscribe and save (5%)</p>
            </label>
            <label>
                <input type='radio' name='subscription' />
                <p>One- Time Purchase</p>
            </label>
        </div>
        <div>
            <label>Deliver Every </label>
            <select>
                <option>1 week <i>(most common)</i></option>
                <option>2 weeks </option>
                <option>3 weeks </option>
            </select>
        </div>
    </div>
  )
}

export default Subscription