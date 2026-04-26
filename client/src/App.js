import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected Dashboard */}
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

const Dashboard = () => {
    const username = localStorage.getItem('username');
    return (
        <div>
            <h1>Welcome, {username}!</h1>
            <p>This is a private dashboard only visible to logged-in users.</p>
            <button onClick={() => { localStorage.clear(); window.location.href='/login'; }}>Logout</button>
        </div>
    );
};

export default App;