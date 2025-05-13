import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Avatar from "../components/common/Avatar";
import "./styles/UsersPage.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const res = await userApi.getUsers();
      setUsers(res);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const start = (currentPage - 1) * usersPerPage;
    const end = start + usersPerPage;
    setDisplayedUsers(filtered.slice(start, end));
  }, [users, searchTerm, currentPage]);

  const totalPages = Math.ceil(
    users.filter((u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / usersPerPage
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="users-page">
      <h1 className="title">USER LIST</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                <Avatar name={u.name} size={40} />
              </td>
              <td>{u.name}</td>
              <td>
                <a href={`mailto:${u.email}`} className="link">
                  {u.email}
                </a>
              </td>
              <td>
                <a href={`tel:${u.phone}`} className="link">
                  {u.phone}
                </a>
              </td>
              <td>
                <a
                  href={`http://${u.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {u.website}
                </a>
              </td>
              <td>
                <Link to={`/users/${u.id}`} className="view-button">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`page-button ${currentPage === i + 1 ? "active" : ""
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
