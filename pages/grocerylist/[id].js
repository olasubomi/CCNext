import { useRouter } from 'next/router'

const GroceryPage = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>GroceryPage: {id}</p>
}

export default GroceryPage