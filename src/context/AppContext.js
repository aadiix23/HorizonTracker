import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tasksData, setTasksData] = useState([
    { id: 1, title: 'Design Home Screen', assignee: 'Divyansh Pandey', status: 'In Progress', due: '2026-02-08', priority: 'High', color: '#FF9800' },
    { id: 2, title: 'Fix Login Bug', assignee: 'Alok Verma', status: 'Pending', due: '2026-02-09', priority: 'High', color: '#F44336' },
    { id: 3, title: 'API Integration', assignee: 'Rohan Gupta', status: 'In Progress', due: '2026-02-10', priority: 'Medium', color: '#FF9800' },
    { id: 4, title: 'Write Tests', assignee: 'Isha Patel', status: 'Completed', due: '2026-02-05', priority: 'Low', color: '#4CAF50' },
    { id: 5, title: 'Setup AWS CI/CD', assignee: 'Vikram Singh', status: 'Pending', due: '2026-02-15', priority: 'Medium', color: '#F44336' },
    { id: 6, title: 'Finalize UI Kit', assignee: 'Kritika Roy', status: 'In Progress', due: '2026-02-08', priority: 'Low', color: '#FF9800' },
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Divyansh Pandey', email: 'divyansh@devhorizon.in', role: 'UI/UX Designer', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Alok Verma', email: 'alok@devhorizon.in', role: 'Frontend Developer', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Rohan Gupta', email: 'rohan@devhorizon.in', role: 'Backend Engineer', image: 'https://randomuser.me/api/portraits/men/46.jpg' },
    { id: 4, name: 'Isha Patel', email: 'isha@devhorizon.in', role: 'QA Lead', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { id: 5, name: 'Vikram Singh', email: 'vikram@devhorizon.in', role: 'DevOps', image: 'https://randomuser.me/api/portraits/men/85.jpg' },
  ]);

  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: 'Divyansh Pandey', role: 'UI/UX Designer', timeIn: '09:00 AM', timeOut: '06:00 PM', status: 'Present', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Alok Verma', role: 'Frontend Developer', timeIn: '09:15 AM', timeOut: '--:-- PM', status: 'Late', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Rohan Gupta', role: 'Backend Engineer', timeIn: '--:-- AM', timeOut: '--:-- PM', status: 'Absent', image: 'https://randomuser.me/api/portraits/men/46.jpg' },
    { id: 4, name: 'Isha Patel', role: 'QA Lead', timeIn: '08:50 AM', timeOut: '05:30 PM', status: 'Present', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
    { id: 5, name: 'Vikram Singh', role: 'DevOps', timeIn: '--:-- AM', timeOut: '--:-- PM', status: 'On Leave', image: 'https://randomuser.me/api/portraits/men/85.jpg' },
  ]);

  const addTask = (task) => {
    setTasksData([{ id: Date.now(), ...task }, ...tasksData]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasksData(tasksData.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    ));
  };

  const addTeamMember = (member) => {
    setTeamMembers([{ id: Date.now(), image: 'https://randomuser.me/api/portraits/lego/1.jpg', ...member }, ...teamMembers]);
    setAttendanceData([{ id: Date.now(), ...member, timeIn: '--:-- AM', timeOut: '--:-- PM', status: 'Absent' }, ...attendanceData]);
  };

  const markAttendance = (memberId, status, timeIn, timeOut) => {
    setAttendanceData(attendanceData.map(a => 
      a.id === memberId ? { ...a, status, timeIn, timeOut } : a
    ));
  };

  return (
    <AppContext.Provider value={{
      tasksData, addTask, updateTaskStatus,
      teamMembers, addTeamMember,
      attendanceData, markAttendance
    }}>
      {children}
    </AppContext.Provider>
  );
};
