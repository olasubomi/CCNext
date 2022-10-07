import { useRouter } from 'next/router'

const individualProductPage = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>individualProductPage: {id}</p>
}

export default individualProductPage