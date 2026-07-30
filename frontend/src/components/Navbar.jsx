import { useAuth } from "../context/AuthContext";

function Navbar({ activeView, onNavigate }) {
  const { user, isAuthenticated, logout } = useAuth();

  const links = [
    { id: "browse", label: "Browse" },
    { id: "watchlist", label: "Watchlist" },
    { id: "add", label: "Add Movie" },
  ];

  return (
    <nav className="bg-gray-900 px-6 py-4 text-white shadow-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-bold">🎬 Movie Collection</h1>

        <ul className="flex gap-2">
          {links.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => onNavigate(link.id)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  activeView === link.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-300">Hi, {user?.name}</span>
              <button
                type="button"
                onClick={logout}
                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onNavigate("login")}
                className="rounded-md px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => onNavigate("register")}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;