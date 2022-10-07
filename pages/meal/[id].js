import { useRouter } from 'next/router'

const individualMealPage = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>individualMealPage: {id}</p>
}

export default individualMealPage