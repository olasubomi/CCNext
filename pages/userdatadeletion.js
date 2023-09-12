import Head from "next/head";

const UserDataDeletion = () => {
    return <div>
        <Head>
            <title>Chop Chow User Data Deletion Instructions</title>
            <meta key="title" name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <h1>Data Deletion Control</h1>
        <p>Apps that access user data must provide a way for users to request
            that their data be deleted.<br></br>Chop Chow satisfies this requirement
            by providing instructions to inform people how to delete their
            data from this app.</p><br></br>

        <b>Facebook Data Deletion Instructions:</b><br></br>
        <br></br>
        <p>
            In order to delete your data from this app, follow the instructions below:<br></br><br></br>

            1) Log into your acccount using your login credentials<br></br><br></br>

            2) From the top header of the app, go to your app dashboard<br></br><br></br>

            3) From the menu on the left panel of your dashboard , click the 'Settings' option<br></br><br></br>

            4) In the settings page scroll down to Privacy section and find the button to request to delete your facebook account data from this app.<br></br><br></br>

            You can also find the ability to delete all of your data including your account and its affiliated data from the app permanently. This can not be reversed.
        </p>

    </div>
}

export default UserDataDeletion;