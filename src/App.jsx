import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashBoard from './pages/DashBoard';
import ApiLink from './pages/ApiLink';
import ShortLink from './pages/ShortLink';
import Quick from './pages/Quick';
import ChangePassword from './pages/ChangePassword';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import DashboardLayout from './components/GeneralComponent';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<DashboardLayout />}>
                <Route path="dashboard" element={<DashBoard />} />
                <Route path="link" element={<ApiLink />} />
                <Route path="shortlink" element={<ShortLink />} />
                <Route path="quick" element={<Quick />} />
                <Route path="change-password" element={<ChangePassword />} />
                <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
