import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
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

  // Text: Light Cream, Hover: Gold
  const navItemClass =
    "px-4 py-2 text-[15px] font-medium text-[#F3E5AB] hover:text-[#D4AF37] transition duration-300";

  // Active Link Styling (optional helper)
  const activeClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? `${navItemClass} text-[#D4AF37] underline underline-offset-4 decoration-[#D4AF37]`
      : navItemClass;

  return (
    // Background: Deep Royal Purple with glass effect, Border: Subtle Gold
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#2E1A47]/90 backdrop-blur-xl shadow-md border-b border-[#D4AF37]/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-serif font-bold tracking-wide text-[#D4AF37] drop-shadow-sm"
          >
            Hind Cultural Crafts
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAdmin && (
              <>
                <NavLink to="/" className={activeClass}>
                  Home
                </NavLink>
                <NavLink to="/products" className={activeClass}>
                  All Products
                </NavLink>
                <NavLink to="/orders" className={activeClass}>
                  My Orders
                </NavLink>
                <NavLink to="/contact" className={activeClass}>
                  Contact
                </NavLink>

                {/* Cart */}
                <NavLink to="/cart" className="relative group">
                  <ShoppingCart
                    size={22}
                    className="text-[#F3E5AB] group-hover:text-[#D4AF37] transition"
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#2E1A47] font-bold text-[11px] px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </>
            )}

            {/* ADMIN NAVBAR */}
            {isAdmin && (
              <>
                <NavLink to="/admin/products" className={activeClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/admin/products/new" className={activeClass}>
                  Add Product
                </NavLink>
                <NavLink to="/admin/orders" className={activeClass}>
                  Orders
                </NavLink>
              </>
            )}

            {/* Auth Buttons */}
            {!isUser && !isAdmin ? (
              <button
                onClick={() => navigate("/login")}
                className="ml-4 px-6 py-2 rounded-full bg-[#D4AF37] text-[#2E1A47] font-semibold shadow-md hover:bg-[#C5A065] transition transform hover:scale-105"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-4 px-6 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] font-semibold hover:bg-[#D4AF37] hover:text-[#2E1A47] transition duration-300"
              >
                Logout
              </button>
            )}
          </div>

          {/* MOBILE ICON */}
          <button
            className="md:hidden p-2 rounded text-[#F3E5AB] hover:bg-[#D4AF37]/10 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#2E1A47] border-b border-[#D4AF37]/30 shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-3">
            {!isAdmin && (
              <>
                <NavLink
                  to="/"
                  className="text-[#F3E5AB] py-2"
                  onClick={() => setOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/products"
                  className="text-[#F3E5AB] py-2"
                  onClick={() => setOpen(false)}
                >
                  All Products
                </NavLink>
                <NavLink
                  to="/orders"
                  className="text-[#F3E5AB] py-2"
                  onClick={() => setOpen(false)}
                >
                  My Orders
                </NavLink>
                <NavLink
                  to="/contact"
                  className="text-[#F3E5AB] py-2"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/cart"
                  className="text-[#F3E5AB] py-2 flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <ShoppingCart size={18} /> Cart
                  {cartCount > 0 && (
                    <span className="bg-[#D4AF37] text-[#2E1A47] text-xs font-bold px-2 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </>
            )}

            {isAdmin && (
              <>
                <NavLink
                  to="/admin/products"
                  className="text-[#F3E5AB] py-2"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/admin/products/new"
                  className="text-[#F3E5AB] py-2"
                  onClick={() => setOpen(false)}
                >
                  Add Product
                </NavLink>
                <NavLink
                  to="/admin/orders"
                  className="text-[#F3E5AB] py-2"
                  onClick={() => setOpen(false)}
                >
                  Orders
                </NavLink>
              </>
            )}

            {!isAdmin && !isUser ? (
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/login");
                }}
                className="w-full mt-2 px-5 py-2 rounded-full bg-[#D4AF37] text-[#2E1A47] font-bold"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="w-full mt-2 px-5 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-[#2E1A47]"
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
