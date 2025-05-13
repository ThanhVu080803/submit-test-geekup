import { Routes, Route, Navigate } from 'react-router-dom';
import AlbumsPage from '../pages/AlbumsPage';
import AlbumDetailPage from '../pages/AlbumDetailPage';
import UsersPage from '../pages/UsersPage';
import UserDetailPage from '../pages/UserDetailPage';
import './AppRoutes.css';
import MainLayout from '../layouts/MainLayout';

function AppRoutes() {
    return (
        <div className='AppRoutes'>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Navigate to="/albums" />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/:id" element={<UserDetailPage />} />
                    <Route path="albums" element={<AlbumsPage />} />
                    <Route path="albums/:id" element={<AlbumDetailPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default AppRoutes;
