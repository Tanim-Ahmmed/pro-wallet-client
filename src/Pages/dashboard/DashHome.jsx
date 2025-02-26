import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DashHome = () => {
  const { user } = useAuth();
  return (
    <div className="container mx-auto px-6 py-24 text-center">
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Welcome, {user?.displayName || "Guest"}!
        </span>
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        <span className="font-semibold text-indigo-600">ProWallet</span> is your
        trusted digital finance companion. Manage transactions
        and stay in control of your finances—all in one place.
      </p>
      <Link
        to="/"
        className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default DashHome;
