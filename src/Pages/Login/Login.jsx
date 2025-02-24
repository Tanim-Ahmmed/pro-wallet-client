import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
   const { userLogin, setUser } = useAuth();
    const [showPin, setShowPin] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || '/';

    const handleLogin = (e) =>{
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const pin = form.pin.value;
      const password = `Secure${pin}`;

      userLogin(email, password)

      .then(res => {
          const user = res.user;
          setUser(user);
          navigate(from);
          toast.success("Welcome ! Your Login successfull ", {
              position: "top-center",
              autoClose: 3000,
            });
      })
      .catch(error =>{
          toast.error('login failed! please try again. ', {
              position: "top-center",
              autoClose: 3000,
            });
            setErr(error.code)
      })
  }

    return (
      <div className="min-h-screen pt-16 bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
              <p className="text-gray-600 mt-2">
                Please sign in to your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-control relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pin
                </label>
                <input
                  type={showPin ? "text" : "password"}
                  name="pin"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                  placeholder="Enter your pin"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="btn rounded-none btn-xs bg-gray-200 absolute right-3 top-10"
                >
                  {showPin ? <BsFillEyeFill /> : <RiEyeCloseFill />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>

              <div>
                {err && <p className="text-red-500 text-center">{err}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Don't have an account?
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Login;