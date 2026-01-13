import React from "react";
import "./OverviewTab.css";

function OverviewTab({ stats, loading, error }) {
    return (
        <section className="overview-section">
            <h2 className="section-title">Overview</h2>
            <p className="section-subtitle">Quick snapshot of your school data.</p>

            {loading && <p className="loading">Loading stats...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && (
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3 className="stat-label">Total Students</h3>
                        <p className="stat-value">{stats.totalStudents}</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-label">Total Teachers</h3>
                        <p className="stat-value">{stats.totalTeachers}</p>
                    </div>
                    <div className="stat-card">
                        <h3 className="stat-label">Courses</h3>
                        <p className="stat-value">{stats.totalCourses}</p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default OverviewTab;
