import { useRouter } from 'next/router';
import Head from "next/head";

const Cart = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Cart Page</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        Cart: {id}</div>
}

export default Cart