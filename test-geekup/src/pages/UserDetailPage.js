import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import userApi from "../api/userApi";
import albumApi from "../api/albumApi";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Avatar from "../components/common/Avatar";
import "./styles/UserDetailPage.css";

const UserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [userRes, albumRes] = await Promise.all([
        userApi.getUser(id),
        albumApi.getAlbums(),
      ]);
      setUser(userRes);
      setAlbums(albumRes.filter((a) => a.userId === Number(id)));
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="user-detail-container">


      <div className="breadcrumb">
        <img
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          alt="Users Icon"
          className="breadcrumb-icon"
        />
        <Link to="/users" className="breadcrumb-link">Users</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Show</span>
      </div>


      <div className="page-header">
        <Link to="/users" className="back-button">←</Link>
        <h1 className="page-title">Show User</h1>
      </div>

      <div className="user-info">
        <Avatar name={user.name} size={60} />
        <div>
          <h2 className="user-name">{user.name}</h2>
          <p>
            <a href={`mailto:${user.email}`} className="user-email">
              {user.email}
            </a>
          </p>
        </div>
      </div>

      <h3 className="albums-title">Albums</h3>

      <table className="user-album-table">
        <thead>
          <tr>
            <th>Album Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr key={album.id}>
              <td>{album.title}</td>
              <td>
                <Link to={`/albums/${album.id}`} className="album-view-button">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDetailPage;
