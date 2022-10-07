import { useRouter } from 'next/router'

const OrderGroups = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>OrderGroups: {id}</p>
}

export default OrderGroups