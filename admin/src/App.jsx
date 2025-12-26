import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import AddDoctor from './pages/AddDoctor';
import AllDoctor from './pages/AllDoctor';
import EditDoctor from './pages/EditDoctor';
import Appointments from './pages/Appointments';
import Feedback from './pages/Feedback';

const App = () => {

const {showLogin}=useContext(AppContext);


  if (showLogin) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-[#F2F3FF] flex flex-col">
      <Toast />
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F2F3FF]">
          <Routes>
            <Route path="/" element={<AllDoctor />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/all-doctors" element={<AllDoctor />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/edit-doctor/:id" element={<EditDoctor />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </main>
      </div>
    </div>

   
  )
}

export default App
