import { useRouter } from 'next/router';
import Head from "next/head";

const individualProductPage = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Product Page</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        individualProductPage: {id}</div>
}

export default individualProductPage