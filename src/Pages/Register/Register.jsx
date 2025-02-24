import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, updateUser, setUser } = useAuth();
  const [showPin, setShowPin] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const pin = form.pin.value;
    const password = `Secure${pin}`;
    const phone = form.phone.value;
    const nid = form.nid.value;
    const role = form.role.value;
    const user = { name, email, role, pin, password, phone, nid };
    createUser(email, password)
    .then(res =>{
        const user = res.user;
        setUser(user);

        updateUser({displayName:name })
        .then(res =>{
          navigate("/")
          toast.success("Welcome ! Your successfull ", {
            position: "top-center",
            autoClose: 3000,
          });
  
        })
        .catch(error =>{
          setErr(error)
        })

    })
    .catch(error =>{
        
       setErr(error.code);
    })
  

  };


  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NID
              </label>
              <input
                name="nid"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter your National ID (NID)"
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
                placeholder="Create a secure pin"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="btn rounded-none btn-xs bg-gray-200 absolute right-3 top-10"
              >
                {showPin ? <BsFillEyeFill /> : <RiEyeCloseFill />}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                name="role"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              >
                <option value="user">User</option>
                <option value="agent">Agent</option>
              </select>
            </div>

            <div>
                {err && <p className="text-red-500 text-center">{err}</p>}
              </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
