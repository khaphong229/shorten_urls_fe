import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DashBoard from './pages/DashBoard';
import ApiLink from './pages/ApiLink';
import ShortLink from './pages/ShortLink';
import Quick from './pages/Quick';
import ChangePassword from './pages/ChangePassword'
import Profile from './pages/Profile'

function App() {
    return (
        <>
            <main>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/dashboard" element={<DashBoard />}></Route>
                    <Route path="/link" element={<ApiLink />}></Route>
                    <Route path="/shortlink" element={<ShortLink />}></Route>
                    <Route path="/quick" element={<Quick />}></Route>
                    <Route path="/change-password" element={<ChangePassword />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                </Routes>
            </main>
        </>
    );
}

export default App;
