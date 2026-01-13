import React from "react";
import "./Sidebar.css";

function Sidebar({ activeTab, onTabChange }) {
    const tabs = [
        { id: "overview", label: "Dashboard Home" },
        { id: "students", label: "Students" },
        { id: "teachers", label: "Teachers" },
        { id: "courses", label: "Courses" },
        { id: "profile", label: "My Profile" },
    ];

    return (
        <sidebar className="sidebar">
            <nav className="nav-menu">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`nav-item ${activeTab === tab.id ? "active" : ""}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </sidebar>
    );
}

export default Sidebar;
