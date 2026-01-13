import React, { useState } from "react";
import "./StudentsTab.css";

function StudentsTab({
                         students,
                         loading,
                         error,
                         filterText,
                         onFilterChange,
                         selectedStudents,
                         onToggleSelect,
                         onToggleSelectAll,
                         onOpenForm,
                         onEditStudent,
                         onDeleteStudent,
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

    const filteredStudents = students.filter((s) => {
        const text = `${s.firstName} ${s.lastName} ${s.className}`.toLowerCase();
        return text.includes(filterText.toLowerCase());
    });

    return (
        <section className="tab-section">
            <h2 className="section-title">Students</h2>
            <p className="section-subtitle">Manage all registered students in the system.</p>

            {loading && <p className="loading">Loading students...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && (
                <>
                    <div className="controls-row">
                        <input
                            type="text"
                            placeholder="Filter by name or class..."
                            value={filterText}
                            onChange={(e) => onFilterChange(e.target.value)}
                            className="filter-input"
                        />
                        <button className="btn btn-primary" onClick={() => onOpenForm("CREATE")}>
                            + Add Student
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
                                            selectedStudents.length === filteredStudents.length &&
                                            filteredStudents.length > 0
                                        }
                                        onChange={onToggleSelectAll}
                                    />
                                </th>
                                <th>Adm No</th>
                                <th>Name</th>
                                <th>Std</th>
                                <th>Stream</th>
                                <th>Class</th>
                                <th>Phone</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((s) => (
                                    <tr key={s.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedStudents.includes(s.id)}
                                                onChange={() => onToggleSelect(s.id)}
                                            />
                                        </td>
                                        <td>{s.admissionNumber}</td>
                                        <td>
                                            {s.firstName} {s.lastName}
                                        </td>
                                        <td>{s.standard}</td>
                                        <td>{s.stream}</td>
                                        <td>
                                            {s.className} ({s.section})
                                        </td>
                                        <td>{s.phone}</td>
                                        <td>{s.active ? "Yes" : "No"}</td>
                                        <td>
                                            <button
                                                className="btn-link btn-info"
                                                onClick={() => onEditStudent(s)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn-link btn-danger"
                                                onClick={() => onDeleteStudent(s.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        No students match this filter.
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
                                    {formMode === "CREATE" ? "Add Student" : "Edit Student"}
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
                                            placeholder="Admission Number"
                                            value={formData.admissionNumber}
                                            onChange={(e) =>
                                                onFormChange("admissionNumber", e.target.value)
                                            }
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={(e) =>
                                                onFormChange("firstName", e.target.value)
                                            }
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={(e) =>
                                                onFormChange("lastName", e.target.value)
                                            }
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Standard"
                                            value={formData.standard}
                                            onChange={(e) =>
                                                onFormChange("standard", e.target.value)
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Stream"
                                            value={formData.stream}
                                            onChange={(e) => onFormChange("stream", e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Class Name"
                                            value={formData.className}
                                            onChange={(e) =>
                                                onFormChange("className", e.target.value)
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Section"
                                            value={formData.section}
                                            onChange={(e) =>
                                                onFormChange("section", e.target.value)
                                            }
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={(e) => onFormChange("email", e.target.value)}
                                        />
                                        <input
                                            type="tel"
                                            placeholder="Phone"
                                            value={formData.phone}
                                            onChange={(e) => onFormChange("phone", e.target.value)}
                                        />
                                    </div>

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

export default StudentsTab;
