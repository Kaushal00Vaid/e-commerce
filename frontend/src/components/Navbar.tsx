import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItemClass =
    "px-4 py-2 text-[15px] font-medium hover:text-primary transition";

  return (
    <nav className="w-full fixed top-0 left-0 z-40 bg-[#faf7f2]/80 backdrop-blur-xl shadow-sm border-b border-[#e8dfd2]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link
            to="/"
            className="text-xl font-bold tracking-wide text-[#7a4d2b]"
          >
            CraftNest
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" className={navItemClass}>
              Home
            </NavLink>
            <NavLink to="/products" className={navItemClass}>
              All Products
            </NavLink>
            <NavLink to="/about" className={navItemClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navItemClass}>
              Contact
            </NavLink>

            <NavLink to="/cart" className="relative">
              <ShoppingCart size={22} className="text-[#7a4d2b]" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e86f5c] text-white text-[11px] px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {!token ? (
              <button
                onClick={() => navigate("/login")}
                className="ml-4 px-5 py-2 rounded-full bg-primary text-white font-semibold shadow-sm hover:shadow-md transition"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-4 px-5 py-2 rounded-full bg-[#e86f5c] text-white font-semibold shadow-sm hover:shadow-md transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* MOBILE ICON */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200/50 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#faf7f2] border-b border-[#e8dfd2] shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-3">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="py-2 text-[16px] font-medium"
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              onClick={() => setOpen(false)}
              className="py-2 text-[16px] font-medium"
            >
              All Products
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setOpen(false)}
              className="py-2 text-[16px] font-medium"
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="py-2 text-[16px] font-medium"
            >
              Contact
            </NavLink>

            <NavLink
              to="/cart"
              onClick={() => setOpen(false)}
              className="py-2 text-[16px] font-medium flex items-center gap-2"
            >
              <ShoppingCart size={18} /> Cart
              {cartCount > 0 && (
                <span className="ml-auto bg-[#e86f5c] text-white text-[11px] px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {!token ? (
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="w-full mt-2 px-5 py-2 rounded-full bg-primary text-white font-semibold shadow-sm"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full mt-2 px-5 py-2 rounded-full bg-[#e86f5c] text-white font-semibold shadow-sm"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
