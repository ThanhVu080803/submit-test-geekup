import { useEffect, useState } from "react";
import albumApi from "../api/albumApi";
import userApi from "../api/userApi";
import { Link, useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Avatar from "../components/common/Avatar";
import "./styles/AlbumsPage.css";

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromURL = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromURL);
  const albumsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [albumRes, userRes] = await Promise.all([
        albumApi.getAlbums(),
        userApi.getUsers(),
      ]);
      setAlbums(albumRes);
      setUsers(userRes);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  const filteredAlbums = albums.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAlbums.length / albumsPerPage);
  const start = (currentPage - 1) * albumsPerPage;
  const displayedAlbums = filteredAlbums.slice(start, start + albumsPerPage);

  const getUserById = (id) => users.find((u) => u.id === id);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-5">
      <h1 className="album-title">ALBUM LIST</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by album title..."
          className="album-search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="album-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedAlbums.map((a) => {
              const user = getUserById(a.userId);
              return (
                <tr key={a.id}>
                  <td className="text-center">{a.id}</td>
                  <td>{a.title}</td>
                  <td>
                    <div className="album-user-cell">
                      <Avatar name={user?.name} size={32} />
                      <Link
                        to={`/users/${user?.id}`}
                        className="text-blue-600 underline"
                      >
                        {user?.name}
                      </Link>
                    </div>
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/albums/${a.id}`}
                      className="album-view-button"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      <div className="album-pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`album-page-button ${currentPage === i + 1 ? "active" : ""
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlbumsPage;
