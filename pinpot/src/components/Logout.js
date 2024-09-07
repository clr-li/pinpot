// Filename - Logout.js
import { GoogleLogout } from 'react-google-login';

const clientId = process.env.OAUTH_CLIENT_ID;

function Logout() {
    const onSuccess = () => {};

    return (
        <div id="signOutButton">
            <GoogleLogout clientId={clientId} buttonText={'Logout'} onSuccess={onSuccess} />
        </div>
    );
}
export default Logout;
