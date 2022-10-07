import { useRouter } from 'next/router'

const CreateStore = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>CreateStore: {id}</p>
}

export default CreateStore