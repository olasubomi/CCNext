import { useRouter } from 'next/router';
import Head from "next/head";


const Orders = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Orders</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        Orders: {id}</div>
}

export default Orders