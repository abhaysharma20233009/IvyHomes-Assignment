import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink to="/">Listings</NavLink>
      <NavLink to="/rentals">Rentals</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/saved">Saved Listings</NavLink>
    </aside>
  );
}