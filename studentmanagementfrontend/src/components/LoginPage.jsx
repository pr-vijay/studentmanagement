import React, { useState } from "react";
import { setBasicAuth } from "../api/auth";
import schoolImage from "../assets/school-login.jpg";
import "./LoginPage.css";

function LoginPage({ onLoginSuccess }) {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("admin123");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            setBasicAuth(username, password);
            onLoginSuccess(username);
        } catch (err) {
            setError("Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-root">
            <div className="login-card">
                <div className="login-left">
                    <div className="login-header">
                        <div className="logo-mark"></div>
                        <div className="logo-text">SMS</div>
                    </div>

                    <div className="login-body">
                        <h1 className="login-title">Student Management Service</h1>
                        <p className="login-subtitle">Please log in to your account.</p>

                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                    required
                                />
                            </div>

                            {error && <p className="error-text">{error}</p>}

                            <button type="submit" className="login-btn" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </button>

                            <p className="login-footer">
                                By logging in you accept our terms and school policies.
                            </p>
                        </form>
                    </div>
                </div>

                <div className="login-divider">
                    <div className="divider-dot"></div>
                </div>

                <div
                    className="login-right"
                    style={{ backgroundImage: `url(${schoolImage})` }}
                >
                    <div className="login-right-overlay">
                        <span className="school-tag">PM Shri Kendriya Vidyalaya, Dewas</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
