import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function Login() {
    const onSuccess = (res) => {
        const decoded = jwtDecode(res?.credential);
        console.log(decoded);
    }

    const onFailure = (res) => {
        console.log("Login failed. res: ", res);
    }

    return (
        <div id="signInButton">
            <GoogleLogin
                onSuccess={onSuccess}
                onFailure={onFailure}
                />
        </div>
    )
}

export default Login;