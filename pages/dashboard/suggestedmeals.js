import { useRouter } from 'next/router'

const SuggestedMeals = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>SuggestedMeals: {id}</p>
}

export default SuggestedMeals