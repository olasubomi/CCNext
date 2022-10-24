import { useRouter } from 'next/router';
import Head from "next/head";


const OrderDetails = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Order Details</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        OrderDetails: {id}</div>
}

export default OrderDetails