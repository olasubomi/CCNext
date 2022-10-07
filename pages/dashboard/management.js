import { useRouter } from 'next/router'

const Management = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>Management: {id}</p>
}

export default Management