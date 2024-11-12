import { Link } from "react-router-dom";
function JourneyPage() {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/wishlist">Blogs</Link>
          <Link to="/my-journey">My Journey</Link>
          <Link to="/account">Account</Link>
          {/* <Link to="/contact-us">Contact Us</Link> */}
        </li>
      </ul>
    </nav>
  );
}

export default JourneyPage;
