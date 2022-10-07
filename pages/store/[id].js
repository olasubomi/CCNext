import { useRouter } from 'next/router'

const IndividualStorePage = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>IndividualStorePage: {id}</p>
}

export default IndividualStorePage