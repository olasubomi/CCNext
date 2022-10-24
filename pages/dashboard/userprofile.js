import { useRouter } from 'next/router';
import Head from "next/head";

const UserProfile = () => {
    const router = useRouter()
    const { id } = router.query

    return <div>
        <Head>
            <title>User Profile</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        UserProfile: {id}</div>
}

export default UserProfile