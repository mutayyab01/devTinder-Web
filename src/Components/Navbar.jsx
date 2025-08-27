import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/20 shadow-sm animate-[slideInDown_0.6s_ease-out]">
        <div className="navbar max-w-7xl mx-auto px-4 lg:px-8">
          {/* Logo */}
          <div className="flex-1">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 group-hover:rotate-12">
                  <img src="assests/devtinder.png" alt="Logo" />
                </div>
              </div>
              <div className="group-hover:translate-x-1 transition-transform duration-300">
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 via-red-500 to-orange-500 bg-clip-text text-transparent">
                  DevTinder
                </span>
                <div className="text-xs text-gray-500 -mt-1">
                  For Developers
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex-none">
            <div className="flex items-center space-x-1 lg:space-x-2">
              <Link
                to="/"
                className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-pink-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span className="font-medium">Discover</span>
              </Link>

              <Link
                to="/connections"
                className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-pink-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="font-medium">Matches</span>
              </Link>

              <Link
                to="/chats"
                className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-pink-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="font-medium">Chats</span>
              </Link>

              <Link
                to="/requests"
                className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-full text-gray-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-red-50 hover:text-pink-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                <span className="font-medium">Requests</span>
              </Link>
            </div>
          </div>

          {user && <div>Welcome Back {user.firstName}!</div>}
          {/* Profile Photo & Dropdown */}
          {user && (
            <div className="flex gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="User Profile Photo" src={user.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
