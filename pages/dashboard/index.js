import { useRouter } from 'next/router'

const DashboardHomePage = () => {
    const router = useRouter()
    const { id } = router.query

    return <p>DashboardHomePage: {id}</p>
}

export default DashboardHomePage