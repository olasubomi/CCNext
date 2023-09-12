import Head from "next/head";

const UserDataDeletion = () => {
    return <div>
        <Head>
            <title>Chop Chow User Data Deletion Instructions</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <h1>Data Deletion Control</h1>
        <p>Apps that access user data must provide a way for users to request
            that their data be deleted.t<br></br>Chop Chow satisfies this requiremen
            by providing  instructions to inform people how to delete their
            data from this app.</p>

        <b>Facebook Data Deletion Instructions</b>
        <br></br>
        <p>
            In order to delelte your data from this app, follow the instructions bellow:

            Log into your acccount using your login credentials

            From the header of the app, go to your app dashboard

            On the left panel menu of your dashboard menu, select the Settings text

            In the settings page scroll down to Privacy section and find the control button to request to delete your facebook account data from our this app.

            You can also find the ability to delete all of your data including your account and its affiliated data from the app permanently. This can not be reversed.
        </p>

    </div>
}

export default UserDataDeletion;