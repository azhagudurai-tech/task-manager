import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";



export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleLogin(event) {
        event.preventDefault();
        try {
            await login(email, password);
            navigate('/tasks')
            setError('');
        } catch (error) {
            setError(error.message);
            console.log("Can't login");
        }
    }

    return (
        <div className="loginForm">
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    id="useremail"
                    placeholder="Enter User Mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />
                <br />

                <input
                    placeholder="Enter Credential Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p>{error}</p>}

                <br />
                <br />

                <button type="submit">Login</button>

            </form>

        </div>
    );
}