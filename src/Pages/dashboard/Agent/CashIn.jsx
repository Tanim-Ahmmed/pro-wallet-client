import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useAllUsers from "../../../hooks/useAllUsers";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CashIn = () => {
  const axiosSecure = useAxiosSecure();
  const [currentUser, refetch] = useCurrentUser();
  const [allUsers] = useAllUsers();
  const [showPin, setShowPin] = useState(false);
  const [err, setErr] = useState("");

  const handleCashIn = (e) => {
    e.preventDefault();
    setErr("");
    const form = e.target;
    const sender = currentUser?.phone;
    const receiver = form.phone.value;
    const amount = Number(form.amount.value);
    const pin = form.pin.value;

    const userAvailable = allUsers.find(
      (user) => user.phone === receiver && user.role === "user"
    );

    if (amount <= 0) {
      setErr("Amount must be greater than zero");
      return;
    }
   

    if (currentUser?.pin !== pin) {
      setErr("Pin didn't match");
      return;
    }

    if (!userAvailable) {
      setErr("There is no users in this account");
      return;
    }

    if (sender === receiver) {
      setErr("Can't Cash in to your won account");
      return;
    }

    if (currentUser?.balance < amount) {
      setErr("insufficient Balance");
      return;
    }
    const transectionInfo = {
      sender,
      receiver,
      amount,
    };

    axiosSecure.post("/cashIn", transectionInfo).then((res) => {
      if (res.data.insertedId) {
        toast.success(`${amount} Tk Cash In successfull to ${receiver}`, {
          position: "top-center",
          autoClose: 3000,
        });
        form.reset();
        refetch();
      }
    });
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      {
        currentUser.status === "approved"? (
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Cash In</h2>
            <p className="text-gray-600 mt-2">Agent to User</p>
          </div>
  
          <form onSubmit={handleCashIn} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Account Number
              </label>
              <input
                type="number"
                required
                name="phone"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter user number"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                required
                name="amount"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter amount "
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
  
            <div>{err && <p className="text-red-500 text-center">{err}</p>}</div>
  
            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all"
            >
              Cash In
            </button>
          </form>
        </div>
        ) : (
          <h2 className="text-2xl p-4 font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
             Your Agent account is not verified yet. Your approval request has been sent to the admin for review.
          </h2>
        )
      }
    </div>
  );
};

export default CashIn;
