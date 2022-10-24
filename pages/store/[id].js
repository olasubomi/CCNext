import { useRouter } from 'next/router';
import Head from "next/head";

const IndividualStorePage = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Store Page</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        IndividualStorePage: {id}</div>
}

export default IndividualStorePage