import { useRouter } from 'next/router';
import Head from "next/head";


const Checkout = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Checkout</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        Checkout: {id}</div>
}

export default Checkout