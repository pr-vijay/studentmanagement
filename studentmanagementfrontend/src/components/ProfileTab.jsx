import React from "react";
import "./ProfileTab.css";

function ProfileTab({ username }) {
    return (
        <section className="tab-section profile-section">
            <h2 className="section-title">Admin Profile</h2>
            <p className="section-subtitle">Your account information.</p>

            <div className="profile-card">
                <h3 className="profile-name">{username}</h3>
                <p className="profile-item">
                    <strong>Username:</strong> {username}
                </p>
                <p className="profile-item">
                    <strong>Email:</strong> {username}@school.in
                </p>
                <p className="profile-item">
                    <strong>Role:</strong> Administrator
                </p>
                <p className="profile-item">
                    <strong>School:</strong> PM Shri Kendriya Vidyalaya, Dewas
                </p>
            </div>
        </section>
    );
}

export default ProfileTab;
