import React, { useState } from "react";
import "./TeachersTab.css";

function TeachersTab({
                         teachers,
                         loading,
                         error,
                         filterText,
                         onFilterChange,
                         selectedTeachers,
                         onToggleSelect,
                         onToggleSelectAll,
                         onOpenForm,
                         onEditTeacher,
                         onDeleteTeacher,
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

    const filteredTeachers = teachers.filter((t) => {
        const text = `${t.name} ${t.department}`.toLowerCase();
        return text.includes(filterText.toLowerCase());
    });

    return (
        <section className="tab-section">
            <h2 className="section-title">Teachers</h2>
            <p className="section-subtitle">Manage teachers, their salary, and leave information.</p>

            {loading && <p className="loading">Loading teachers...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && (
                <>
                    <div className="controls-row">
                        <input
                            type="text"
                            placeholder="Filter by name or department..."
                            value={filterText}
                            onChange={(e) => onFilterChange(e.target.value)}
                            className="filter-input"
                        />
                        <button className="btn btn-primary" onClick={() => onOpenForm("CREATE")}>
                            + Add Teacher
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
                                            selectedTeachers.length === filteredTeachers.length &&
                                            filteredTeachers.length > 0
                                        }
                                        onChange={onToggleSelectAll}
                                    />
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Department</th>
                                <th>Subject</th>
                                <th>Salary</th>
                                <th>Paid/Used</th>
                                <th>Unpaid</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredTeachers.length > 0 ? (
                                filteredTeachers.map((t) => (
                                    <tr key={t.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedTeachers.includes(t.id)}
                                                onChange={() => onToggleSelect(t.id)}
                                            />
                                        </td>
                                        <td>{t.name}</td>
                                        <td>{t.email}</td>
                                        <td>{t.phone}</td>
                                        <td>{t.department}</td>
                                        <td>{t.subject}</td>
                                        <td>₹{t.monthlySalary}</td>
                                        <td>
                                            {t.usedPaidLeaves}/{t.paidLeavesPerYear}
                                        </td>
                                        <td>{t.unpaidLeaves}</td>
                                        <td>{t.active ? "Yes" : "No"}</td>
                                        <td>
                                            <button
                                                className="btn-link btn-info"
                                                onClick={() => onEditTeacher(t)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn-link btn-danger"
                                                onClick={() => onDeleteTeacher(t.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11" className="text-center">
                                        No teachers match this filter.
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
                                    {formMode === "CREATE" ? "Add Teacher" : "Edit Teacher"}
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
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={(e) => onFormChange("name", e.target.value)}
                                            required
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
                                        <input
                                            type="text"
                                            placeholder="Department"
                                            value={formData.department}
                                            onChange={(e) =>
                                                onFormChange("department", e.target.value)
                                            }
                                        />
                                        <input
                                            type="text"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={(e) => onFormChange("subject", e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Monthly Salary"
                                            value={formData.monthlySalary}
                                            onChange={(e) =>
                                                onFormChange("monthlySalary", e.target.value)
                                            }
                                        />
                                        <input
                                            type="number"
                                            placeholder="Paid Leaves Per Year"
                                            value={formData.paidLeavesPerYear}
                                            onChange={(e) =>
                                                onFormChange("paidLeavesPerYear", e.target.value)
                                            }
                                        />
                                        <input
                                            type="number"
                                            placeholder="Used Paid Leaves"
                                            value={formData.usedPaidLeaves}
                                            onChange={(e) =>
                                                onFormChange("usedPaidLeaves", e.target.value)
                                            }
                                        />
                                        <input
                                            type="number"
                                            placeholder="Unpaid Leaves"
                                            value={formData.unpaidLeaves}
                                            onChange={(e) =>
                                                onFormChange("unpaidLeaves", e.target.value)
                                            }
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

export default TeachersTab;
