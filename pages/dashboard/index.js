import { useRouter } from 'next/router';
import Head from "next/head";


const DashboardHomePage = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Dashboard Home Page</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        DashboardHomePage: {id}</div>
}

export default DashboardHomePage