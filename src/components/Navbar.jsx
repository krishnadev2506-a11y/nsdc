import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="brand">Astra</div>
        <nav className="navlinks">
          <NavLink end to="/" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? 'navlink active' : 'navlink')}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
