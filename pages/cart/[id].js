import { useRouter } from 'next/router'

const Cart = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>Cart: {id}</p>
}

export default Cart