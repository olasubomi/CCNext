import { useRouter } from 'next/router'

const Checkout = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>Checkout: {id}</p>
}

export default Checkout