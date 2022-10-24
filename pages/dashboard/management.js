import { useRouter } from 'next/router';
import Head from "next/head";

const Management = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>Chop Chow Management</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        Management: {id}</div>
}

export default Management