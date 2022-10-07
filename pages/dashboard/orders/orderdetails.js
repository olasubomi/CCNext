import { useRouter } from 'next/router'

const OrderDetails = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>OrderDetails: {id}</p>
}

export default OrderDetails