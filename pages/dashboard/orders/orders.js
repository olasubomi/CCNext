import { useRouter } from 'next/router'

const Orders = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>Orders: {id}</p>
}

export default Orders