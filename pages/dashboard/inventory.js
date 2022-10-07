import { useRouter } from 'next/router'

const Inventory = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>Inventory: {id}</p>
}

export default Inventory