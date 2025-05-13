import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AlbumsPage from "./pages/AlbumsPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import UserDetailPage from "./pages/UserDetailPage";
import UsersPage from "./pages/UsersPage";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <div className="App">
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

export default App;
