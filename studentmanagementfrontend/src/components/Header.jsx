import React from "react";
import "./Header.css";

function Header({ username, onLogout }) {
    return (
        <header className="header">
            <div className="header-left">
                <h1 className="app-title">Student Management Service</h1>
                <p className="app-subtitle">PM Shri K.V. Dewas</p>
            </div>

            <div className="header-right">
                <span className="role-chip">Admin</span>
                <div className="profile-section">
                    <div className="avatar">{username?.charAt(0).toUpperCase()}</div>
                    <div className="profile-info">
                        <p className="username">{username}</p>
                        <p className="email">{username}@school.in</p>
                    </div>
                </div>
                <button className="logout-btn" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
