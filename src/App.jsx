import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './utils/useAuth';
import { ProtectedRoute } from './components/other/ProtectedRoute';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DashBoard from './pages/Home/DashBoard';
import ApiLink from './pages/ApiLink/ApiLink';
import ShortLink from './pages/ShortLink/ShortLink';
import Quick from './pages/Quick';
import ChangePassword from './pages/Auth/ChangePassword';
import Profile from './pages/User/Profile';
import NotFound from './pages/NotFound';
import DashboardLayout from './components/DashboardLayout';
import AddApiLink from './pages/ApiLink/AddApiLink';
import UpdateApiLink from './pages/ApiLink/UpdateApiLink';
import NavigateLink from './pages/NavigateLink'

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="dashboard" element={<DashBoard />} />
                    <Route path="/link" element={<ApiLink />}>
                        <Route path="add" element={<AddApiLink />} />
                        <Route path="edit/:id" element={<UpdateApiLink />} />
                    </Route>
                    <Route path="/shortlink" element={<ShortLink />} >
                        {/* <Route path="add" element={<AddShortLink />} />
                        <Route path="edit/:id" element={<UpdateShortLink />} /> */}
                    </Route>
                    <Route path="quick" element={<Quick />} />
                    <Route
                        path="change-password"
                        element={<ChangePassword />}
                    />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
                <Route path="/:alias" element={<NavigateLink />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
