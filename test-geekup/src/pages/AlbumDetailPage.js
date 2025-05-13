import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import albumApi from "../api/albumApi";
import photoApi from "../api/photoApi";
import userApi from "../api/userApi";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Avatar from "../components/common/Avatar";
import "./styles/AlbumDetailPage.css";

const AlbumDetailPage = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [albumRes, photosRes] = await Promise.all([
        albumApi.getAlbum(id),
        photoApi.getPhotosByAlbumId(id),
      ]);
      setAlbum(albumRes);
      setPhotos(photosRes);
      const userRes = await userApi.getUser(albumRes.userId);
      setUser(userRes);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="album-detail-container">

      <div className="breadcrumb">
        <img
          src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
          alt="Users Icon"
          className="breadcrumb-icon"
        />
        <Link to="/albums" className="breadcrumb-link">Albums</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Show</span>
      </div>

      <div className="page-header">
        <Link to="/users" className="back-button">←</Link>
        <h1 className="page-title">Show Album</h1>
      </div>

      <h1 className="album-title">📖 Album Detail</h1>


      <div className="user-info">
        <Avatar name={user?.name} size={48} />
        <div>
          <Link to={`/users/${user?.id}`} className="user-name">
            {user?.name}
          </Link>
          <p>
            <a href={`mailto:${user?.email}`} className="user-email">
              {user?.email}
            </a>
          </p>
        </div>
      </div>

      <h2 className="album-subtitle">📔 {album.title}</h2>

      <div className="photos-grid">
        {photos.map((p) => (
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            key={p.id}
            className="photo-item"
          >
            <img
              src={p.thumbnailUrl}
              alt={p.title}
              className="photo-thumbnail"
            />
            <div className="photo-title">{p.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
