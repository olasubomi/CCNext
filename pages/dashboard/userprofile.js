import { useRouter } from 'next/router'

const UserProfile = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>UserProfile: {id}</p>
}

export default UserProfile