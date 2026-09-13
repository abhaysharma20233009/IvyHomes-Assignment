import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Ivy Homes <ivy-homes></ivy-homes>
      </Link>

      <div className="nav-links">
        {isAuthenticated && (
          <>
            <Link to="/">Listings</Link>
            <Link to="/rentals">Rentals</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/analytics">
  Analytics
</Link>
            <Link to="/saved">Saved</Link>

            <button onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}