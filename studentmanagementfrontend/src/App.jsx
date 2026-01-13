import React, { useState, useEffect } from "react";
import "./App.css";

import LoginPage from "./components/LoginPage";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import OverviewTab from "./components/OverviewTab";
import StudentsTab from "./components/StudentsTab";
import TeachersTab from "./components/TeachersTab";
import CoursesTab from "./components/CoursesTab";
import ProfileTab from "./components/ProfileTab";

import { clearAuth, getAuth, isAuthenticated } from "./api/auth";
import studentApi from "./api/studentApi";
import client from "./api/client";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [activeTab, setActiveTab] = useState("overview");
    const [isInitializing, setIsInitializing] = useState(true);

    // ===== CHECK AUTH ON APP MOUNT =====
    useEffect(() => {
        const auth = getAuth();
        if (auth && isAuthenticated()) {
            setUsername(auth.username);
            setIsLoggedIn(true);
        }
        setIsInitializing(false);
    }, []);

    // ===== STATS =====
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        totalCourses: 0,
    });
    const [statsLoading, setStatsLoading] = useState(false);
    const [statsError, setStatsError] = useState("");

    // ===== STUDENTS =====
    const [students, setStudents] = useState([]);
    const [studentsLoading, setStudentsLoading] = useState(false);
    const [studentsError, setStudentsError] = useState("");
    const [studentFilter, setStudentFilter] = useState("");
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [showStudentForm, setShowStudentForm] = useState(false);
    const [studentFormMode, setStudentFormMode] = useState("CREATE");
    const [studentFormData, setStudentFormData] = useState({
        id: "",
        admissionNumber: "",
        firstName: "",
        lastName: "",
        standard: "",
        stream: "",
        className: "",
        section: "",
        email: "",
        phone: "",
        active: true,
    });

    // ===== TEACHERS =====
    const [teachers, setTeachers] = useState([]);
    const [teachersLoading, setTeachersLoading] = useState(false);
    const [teachersError, setTeachersError] = useState("");
    const [teacherFilter, setTeacherFilter] = useState("");
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [showTeacherForm, setShowTeacherForm] = useState(false);
    const [teacherFormMode, setTeacherFormMode] = useState("CREATE");
    const [teacherFormData, setTeacherFormData] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        department: "",
        subject: "",
        monthlySalary: "",
        paidLeavesPerYear: "",
        usedPaidLeaves: "",
        unpaidLeaves: "",
        active: true,
    });

    // ===== COURSES =====
    const [courseList, setCourseList] = useState([]);
    const [coursesLoading, setCoursesLoading] = useState(false);
    const [coursesError, setCoursesError] = useState("");
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [showCourseForm, setShowCourseForm] = useState(false);
    const [courseFormMode, setCourseFormMode] = useState("CREATE");
    const [courseFormData, setCourseFormData] = useState({
        id: "",
        courseName: "",
        courseCode: "",
        semester: "",
        description: "",
        active: true,
    });

    // ===== LOAD ALL DATA WHEN LOGGED IN =====
    useEffect(() => {
        if (isLoggedIn && !isInitializing) {
            loadStats();
            loadStudents();
            loadTeachers();
            loadCourses();
        }
    }, [isLoggedIn, isInitializing]);

    // ===== LOADERS =====
    const loadStats = async () => {
        try {
            setStatsLoading(true);
            const studentRes = await studentApi.getAllStudents();
            const teacherRes = await client.get("/api/teachers");
            const courseRes = await client.get("/api/courses");

            setStats({
                totalStudents: studentRes.length || 0,
                totalTeachers: teacherRes.data.length || 0,
                totalCourses: courseRes.data.length || 0,
            });
            setStatsError("");
        } catch (err) {
            console.error("Stats load error:", err);
            setStatsError("Failed to load stats");
        } finally {
            setStatsLoading(false);
        }
    };

    const loadStudents = async () => {
        try {
            setStudentsLoading(true);
            const res = await studentApi.getAllStudents();
            setStudents(res || []);
            setStudentsError("");
        } catch (err) {
            console.error("Student load error:", err);
            setStudentsError("Failed to load students: " + err.message);
        } finally {
            setStudentsLoading(false);
        }
    };

    const loadTeachers = async () => {
        try {
            setTeachersLoading(true);
            const res = await client.get("/api/teachers");
            setTeachers(res.data || []);
            setTeachersError("");
        } catch (err) {
            console.error("Teacher load error:", err);
            setTeachersError("Failed to load teachers: " + err.message);
        } finally {
            setTeachersLoading(false);
        }
    };

    const loadCourses = async () => {
        try {
            setCoursesLoading(true);
            const res = await client.get("/api/courses");
            setCourseList(res.data || []);
            setCoursesError("");
        } catch (err) {
            console.error("Course load error:", err);
            setCoursesError("Failed to load courses: " + err.message);
        } finally {
            setCoursesLoading(false);
        }
    };

    // ===== AUTH =====
    const handleLoginSuccess = (user) => {
        setUsername(user || "admin");
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        clearAuth();
        setIsLoggedIn(false);
        setUsername("");
        setActiveTab("overview");
    };

    // ===== STUDENTS HANDLERS =====
    const filteredStudents = students.filter((s) => {
        const text = `${s.firstName} ${s.lastName} ${s.className}`.toLowerCase();
        return text.includes(studentFilter.toLowerCase());
    });

    const toggleSelectStudent = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleSelectAllStudents = () => {
        if (selectedStudents.length === filteredStudents.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(filteredStudents.map((s) => s.id));
        }
    };

    const openStudentForm = (mode, student = null) => {
        setStudentFormMode(mode);
        if (mode === "EDIT" && student) {
            setStudentFormData({
                id: student.id,
                admissionNumber: student.admissionNumber || "",
                firstName: student.firstName || "",
                lastName: student.lastName || "",
                standard:
                    student.standard !== undefined && student.standard !== null
                        ? String(student.standard)
                        : "",
                stream: student.stream || "",
                className: student.className || "",
                section: student.section || "",
                email: student.email || "",
                phone: student.phone || "",
                active: student.active ?? true,
            });
        } else {
            setStudentFormData({
                id: "",
                admissionNumber: "",
                firstName: "",
                lastName: "",
                standard: "",
                stream: "",
                className: "",
                section: "",
                email: "",
                phone: "",
                active: true,
            });
        }
        setShowStudentForm(true);
    };

    const closeStudentForm = () => setShowStudentForm(false);

    const updateStudentFormField = (field, value) => {
        setStudentFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleStudentSubmit = async () => {
        try {
            const payload = {
                ...studentFormData,
                standard: studentFormData.standard
                    ? Number(studentFormData.standard)
                    : null,
            };

            if (studentFormMode === "CREATE") {
                await studentApi.createStudent(payload);
                await loadStudents();
            } else {
                await studentApi.updateStudent(studentFormData.id, payload);
                await loadStudents();
            }
            closeStudentForm();
            loadStats();
        } catch (err) {
            console.error("Save student error:", err);
            alert(err.response?.data?.message || "Error saving student");
        }
    };

    const handleDeleteStudent = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await studentApi.deleteStudent(id);
                await loadStudents();
                loadStats();
            } catch (err) {
                console.error("Delete student error:", err);
                alert("Error deleting student");
            }
        }
    };

    // ===== TEACHERS HANDLERS =====
    const filteredTeachers = teachers.filter((t) => {
        const text = `${t.name} ${t.department}`.toLowerCase();
        return text.includes(teacherFilter.toLowerCase());
    });

    const toggleSelectTeacher = (id) => {
        setSelectedTeachers((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleSelectAllTeachers = () => {
        if (selectedTeachers.length === filteredTeachers.length) {
            setSelectedTeachers([]);
        } else {
            setSelectedTeachers(filteredTeachers.map((t) => t.id));
        }
    };

    const openTeacherForm = (mode, teacher = null) => {
        setTeacherFormMode(mode);
        if (mode === "EDIT" && teacher) {
            setTeacherFormData({
                id: teacher.id,
                name: teacher.name || "",
                email: teacher.email || "",
                phone: teacher.phone || "",
                department: teacher.department || "",
                subject: teacher.subject || "",
                monthlySalary:
                    teacher.monthlySalary !== undefined &&
                    teacher.monthlySalary !== null
                        ? String(teacher.monthlySalary)
                        : "",
                paidLeavesPerYear:
                    teacher.paidLeavesPerYear !== undefined &&
                    teacher.paidLeavesPerYear !== null
                        ? String(teacher.paidLeavesPerYear)
                        : "",
                usedPaidLeaves:
                    teacher.usedPaidLeaves !== undefined &&
                    teacher.usedPaidLeaves !== null
                        ? String(teacher.usedPaidLeaves)
                        : "",
                unpaidLeaves:
                    teacher.unpaidLeaves !== undefined &&
                    teacher.unpaidLeaves !== null
                        ? String(teacher.unpaidLeaves)
                        : "",
                active: teacher.active ?? true,
            });
        } else {
            setTeacherFormData({
                id: "",
                name: "",
                email: "",
                phone: "",
                department: "",
                subject: "",
                monthlySalary: "",
                paidLeavesPerYear: "",
                usedPaidLeaves: "",
                unpaidLeaves: "",
                active: true,
            });
        }
        setShowTeacherForm(true);
    };

    const closeTeacherForm = () => setShowTeacherForm(false);

    const updateTeacherFormField = (field, value) => {
        setTeacherFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleTeacherSubmit = async () => {
        try {
            const payload = {
                ...teacherFormData,
                monthlySalary: teacherFormData.monthlySalary
                    ? Number(teacherFormData.monthlySalary)
                    : null,
                paidLeavesPerYear: teacherFormData.paidLeavesPerYear
                    ? Number(teacherFormData.paidLeavesPerYear)
                    : null,
                usedPaidLeaves: teacherFormData.usedPaidLeaves
                    ? Number(teacherFormData.usedPaidLeaves)
                    : null,
                unpaidLeaves: teacherFormData.unpaidLeaves
                    ? Number(teacherFormData.unpaidLeaves)
                    : null,
            };

            if (teacherFormMode === "CREATE") {
                await client.post("/api/teachers", payload);
                await loadTeachers();
            } else {
                await client.put(`/api/teachers/${teacherFormData.id}`, payload);
                await loadTeachers();
            }
            closeTeacherForm();
            loadStats();
        } catch (err) {
            console.error("Save teacher error:", err);
            alert(err.response?.data?.message || "Error saving teacher");
        }
    };

    const handleDeleteTeacher = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await client.delete(`/api/teachers/${id}`);
                await loadTeachers();
                loadStats();
            } catch (err) {
                console.error("Delete teacher error:", err);
                alert("Error deleting teacher");
            }
        }
    };

    // ===== COURSES HANDLERS =====
    const toggleSelectCourse = (id) => {
        setSelectedCourses((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const toggleSelectAllCourses = () => {
        if (selectedCourses.length === courseList.length) {
            setSelectedCourses([]);
        } else {
            setSelectedCourses(courseList.map((c) => c.id));
        }
    };

    const openCourseForm = (mode, course = null) => {
        setCourseFormMode(mode);
        if (mode === "EDIT" && course) {
            setCourseFormData({
                id: course.id,
                courseName: course.courseName || "",
                courseCode: course.courseCode || "",
                semester:
                    course.semester !== undefined && course.semester !== null
                        ? String(course.semester)
                        : "",
                description: course.description || "",
                active: course.active ?? true,
            });
        } else {
            setCourseFormData({
                id: "",
                courseName: "",
                courseCode: "",
                semester: "",
                description: "",
                active: true,
            });
        }
        setShowCourseForm(true);
    };

    const closeCourseForm = () => setShowCourseForm(false);

    const updateCourseFormField = (field, value) => {
        setCourseFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleCourseSubmit = async () => {
        try {
            const payload = {
                ...courseFormData,
                semester: courseFormData.semester
                    ? Number(courseFormData.semester)
                    : null,
            };

            if (courseFormMode === "CREATE") {
                await client.post("/api/courses", payload);
                await loadCourses();
            } else {
                await client.put(`/api/courses/${courseFormData.id}`, payload);
                await loadCourses();
            }
            closeCourseForm();
            loadStats();
        } catch (err) {
            console.error("Save course error:", err);
            alert(err.response?.data?.message || "Error saving course");
        }
    };

    const handleDeleteCourse = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await client.delete(`/api/courses/${id}`);
                await loadCourses();
                loadStats();
            } catch (err) {
                console.error("Delete course error:", err);
                alert("Error deleting course");
            }
        }
    };

    // ===== RENDER =====
    if (!isLoggedIn) {
        return (
            <LoginPage
                onLoginSuccess={handleLoginSuccess}
                isInitializing={isInitializing}
            />
        );
    }

    return (
        <div className="app-root">
            <Header username={username} onLogout={handleLogout} />
            <div className="app-body">
                <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} />

                <main className="app-main">
                    {activeTab === "overview" && (
                        <OverviewTab
                            stats={stats}
                            loading={statsLoading}
                            error={statsError}
                        />
                    )}

                    {activeTab === "students" && (
                        <StudentsTab
                            students={filteredStudents}
                            loading={studentsLoading}
                            error={studentsError}
                            filterText={studentFilter}
                            onFilterChange={setStudentFilter}
                            selectedStudents={selectedStudents}
                            onToggleSelect={toggleSelectStudent}
                            onToggleSelectAll={toggleSelectAllStudents}
                            onOpenForm={() => openStudentForm("CREATE")}
                            onEditStudent={(s) => openStudentForm("EDIT", s)}
                            onDeleteStudent={handleDeleteStudent}
                            showForm={showStudentForm}
                            formMode={studentFormMode}
                            formData={studentFormData}
                            onFormChange={updateStudentFormField}
                            onFormSubmit={handleStudentSubmit}
                            onCloseForm={closeStudentForm}
                        />
                    )}

                    {activeTab === "teachers" && (
                        <TeachersTab
                            teachers={filteredTeachers}
                            loading={teachersLoading}
                            error={teachersError}
                            filterText={teacherFilter}
                            onFilterChange={setTeacherFilter}
                            selectedTeachers={selectedTeachers}
                            onToggleSelect={toggleSelectTeacher}
                            onToggleSelectAll={toggleSelectAllTeachers}
                            onOpenForm={() => openTeacherForm("CREATE")}
                            onEditTeacher={(t) => openTeacherForm("EDIT", t)}
                            onDeleteTeacher={handleDeleteTeacher}
                            showForm={showTeacherForm}
                            formMode={teacherFormMode}
                            formData={teacherFormData}
                            onFormChange={updateTeacherFormField}
                            onFormSubmit={handleTeacherSubmit}
                            onCloseForm={closeTeacherForm}
                        />
                    )}

                    {activeTab === "courses" && (
                        <CoursesTab
                            courses={courseList}
                            loading={coursesLoading}
                            error={coursesError}
                            selectedCourses={selectedCourses}
                            onToggleSelect={toggleSelectCourse}
                            onToggleSelectAll={toggleSelectAllCourses}
                            onOpenForm={() => openCourseForm("CREATE")}
                            onEditCourse={(c) => openCourseForm("EDIT", c)}
                            onDeleteCourse={handleDeleteCourse}
                            showForm={showCourseForm}
                            formMode={courseFormMode}
                            formData={courseFormData}
                            onFormChange={updateCourseFormField}
                            onFormSubmit={handleCourseSubmit}
                            onCloseForm={closeCourseForm}
                        />
                    )}

                    {activeTab === "profile" && <ProfileTab username={username} />}
                </main>
            </div>
        </div>
    );
}

export default App;
