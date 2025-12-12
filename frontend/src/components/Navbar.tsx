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
  const adminToken = localStorage.getItem("adminToken");

  const isAdmin = Boolean(adminToken);
  const isUser = Boolean(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
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
          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAdmin && (
              <>
                <NavLink to="/" className={navItemClass}>
                  Home
                </NavLink>
                <NavLink to="/products" className={navItemClass}>
                  All Products
                </NavLink>
                <NavLink to="/orders" className={navItemClass}>
                  My-Orders
                </NavLink>
                <NavLink to="/contact" className={navItemClass}>
                  Contact
                </NavLink>

                {/* Cart only for users */}
                <NavLink to="/cart" className="relative">
                  <ShoppingCart size={22} className="text-[#7a4d2b]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#e86f5c] text-white text-[11px] px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </>
            )}

            {/* ADMIN NAVBAR */}
            {isAdmin && (
              <>
                <NavLink to="/admin/products" className={navItemClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/admin/products/new" className={navItemClass}>
                  Add Product
                </NavLink>
                <NavLink to="/admin/orders" className={navItemClass}>
                  Orders
                </NavLink>
              </>
            )}

            {/* Auth Buttons */}
            {!isUser && !isAdmin ? (
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
            {/* User Menu */}
            {!isAdmin && (
              <>
                <NavLink
                  to="/"
                  className="py-2 text-[16px]"
                  onClick={() => setOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className="py-2 text-[16px]"
                  onClick={() => setOpen(false)}
                >
                  All Products
                </NavLink>
                <NavLink
                  to="/about"
                  className="py-2 text-[16px]"
                  onClick={() => setOpen(false)}
                >
                  About
                </NavLink>
                <NavLink
                  to="/contact"
                  className="py-2 text-[16px]"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </NavLink>

                <NavLink
                  to="/cart"
                  className="py-2 flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <ShoppingCart size={18} /> Cart
                  {cartCount > 0 && (
                    <span className="ml-auto bg-[#e86f5c] text-white text-[11px] px-2 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </>
            )}

            {/* Admin Menu */}
            {isAdmin && (
              <>
                <NavLink
                  to="/admin/products"
                  className="py-2 text-[16px]"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/admin/add-product"
                  className="py-2 text-[16px]"
                  onClick={() => setOpen(false)}
                >
                  Add Product
                </NavLink>
                <NavLink
                  to="/admin/orders"
                  className="py-2 text-[16px]"
                  onClick={() => setOpen(false)}
                >
                  Orders
                </NavLink>
              </>
            )}

            {/* Auth Buttons */}
            {!isAdmin && !isUser ? (
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="w-full mt-2 px-5 py-2 rounded-full bg-primary text-white font-semibold"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full mt-2 px-5 py-2 rounded-full bg-[#e86f5c] text-white font-semibold"
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
