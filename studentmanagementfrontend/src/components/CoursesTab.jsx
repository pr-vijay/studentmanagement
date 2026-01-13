import React, { useState } from "react";
import "./CoursesTab.css";

function CoursesTab({
                        courses,
                        loading,
                        error,
                        selectedCourses,
                        onToggleSelect,
                        onToggleSelectAll,
                        onOpenForm,
                        onEditCourse,
                        onDeleteCourse,
                        showForm,
                        formMode,
                        formData,
                        onFormChange,
                        onFormSubmit,
                        onCloseForm,
                    }) {
    const [submitLoading, setSubmitLoading] = useState(false);

    const handleFormSubmit = async () => {
        setSubmitLoading(true);
        try {
            await onFormSubmit();
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <section className="tab-section">
            <h2 className="section-title">Courses</h2>
            <p className="section-subtitle">Manage available courses.</p>

            {loading && <p className="loading">Loading courses...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && (
                <>
                    <div className="controls-row">
                        <button className="btn btn-primary" onClick={() => onOpenForm("CREATE")}>
                            + Add Course
                        </button>
                    </div>

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedCourses.length === courses.length &&
                                            courses.length > 0
                                        }
                                        onChange={onToggleSelectAll}
                                    />
                                </th>
                                <th>Course Name</th>
                                <th>Code</th>
                                <th>Semester</th>
                                <th>Description</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {courses.length > 0 ? (
                                courses.map((c) => (
                                    <tr key={c.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedCourses.includes(c.id)}
                                                onChange={() => onToggleSelect(c.id)}
                                            />
                                        </td>
                                        <td>{c.courseName}</td>
                                        <td>{c.courseCode}</td>
                                        <td>{c.semester}</td>
                                        <td>{c.description}</td>
                                        <td>{c.active ? "Yes" : "No"}</td>
                                        <td>
                                            <button
                                                className="btn-link btn-info"
                                                onClick={() => onEditCourse(c)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn-link btn-danger"
                                                onClick={() => onDeleteCourse(c.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No courses yet. Add one!
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {showForm && (
                        <div className="modal-overlay" onClick={onCloseForm}>
                            <div className="modal" onClick={(e) => e.stopPropagation()}>
                                <h3 className="modal-title">
                                    {formMode === "CREATE" ? "Add Course" : "Edit Course"}
                                </h3>
                                <form
                                    className="modal-form"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleFormSubmit();
                                    }}
                                >
                                    <div className="form-grid">
                                        <input
                                            type="text"
                                            placeholder="Course Name"
                                            value={formData.courseName}
                                            onChange={(e) =>
                                                onFormChange("courseName", e.target.value)
                                            }
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Course Code"
                                            value={formData.courseCode}
                                            onChange={(e) =>
                                                onFormChange("courseCode", e.target.value)
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Semester"
                                            value={formData.semester}
                                            onChange={(e) => onFormChange("semester", e.target.value)}
                                        />
                                    </div>

                                    <textarea
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            onFormChange("description", e.target.value)
                                        }
                                        className="description-input"
                                    />

                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.active}
                                            onChange={(e) =>
                                                onFormChange("active", e.target.checked)
                                            }
                                        />
                                        Active
                                    </label>

                                    <div className="modal-actions">
                                        <button type="submit" className="btn btn-primary" disabled={submitLoading}>
                                            {submitLoading
                                                ? formMode === "CREATE"
                                                    ? "Adding..."
                                                    : "Updating..."
                                                : formMode === "CREATE"
                                                    ? "Add"
                                                    : "Update"}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={onCloseForm}
                                            disabled={submitLoading}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default CoursesTab;
