import { useRouter } from 'next/router';
import Head from "next/head";


const OrderGroups = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Order Group Pages</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        OrderGroups: {id}</div>
}

export default OrderGroups