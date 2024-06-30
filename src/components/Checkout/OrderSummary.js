import { useSelector } from 'react-redux';
import styles from '../../../src/components/Checkout/style.module.css';

const [tax, setTax] = useState(40);
const {cartItems: items} = useSelector((state) => {return state.Cart});


//const totalQuantity = `${items.reduce((a, c) => a + c.amount, 0)} items`
const SubTotal = items.reduce((a, c) => a + (c.price * c.amount), 0).toFixed(2)

const TotalPrice = SubTotal + tax;

const orderData = [
    {
        name : 'Onion',
        quantity : 3,
        price : '16.85'
    },
    {
        name : 'Austalian Rice',
        quantity : 3,
        price : '16.85'
    },
    {
        name : 'Banana Hanger',
        quantity : 3,
        price : '16.85'
    },
]

const OrderSummary = () => {
  return (
    <div>
        <p className={styles.sectionHeaderText}>Order Summary</p>
        <div className={styles.orderContainer}>
            {
                items.map((value, key) => {
                    return(
                        <div key={key} className={styles.order}>
                            <span>{value.name}</span>
                            <span>x{value.amount}</span>
                            <span>${value.price}</span>
                        </div>
                    )
                })
            }
            <div className={styles.calculations}>
                <div>
                    <p>Subtotal</p>
                    <hr />
                    <span>${SubTotal}</span>
                </div>
                <div>
                    <p>Sales tax</p>
                    <hr />
                    <span>$40.88</span>
                </div>
                <div>
                    <p>Total</p>
                    <hr />
                    <span>${TotalPrice}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderSummary