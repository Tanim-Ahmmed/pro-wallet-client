import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAllUsers from "../../../hooks/useAllUsers";
import { toast } from "react-toastify";

const CashOut = () => {
  const axiosPublic = useAxiosPublic();
  const [allUsers] = useAllUsers();
  const [currentUser, refetch] = useCurrentUser();
  const [showPin, setShowPin] = useState(false);
  const [err, setErr] = useState("");

  const handleCashOut = (e) => {
    e.preventDefault();
    setErr("");
    const form = e.target;
    const sender = currentUser?.phone;
    const receiver = form.phone.value;
    const pin = form.pin.value;
    const amount = Number(form.amount.value);
    const fee = (amount * 1.5) / 100;
    const userAvailable = allUsers.find(
      (user) => user.phone === receiver && user.role === "agent"
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
      setErr("There is no agent in this account");
      return;
    }

    if (sender === receiver) {
      setErr("Can't Cash Out to your won account");
      return;
    }

    if (currentUser?.balance < amount + fee) {
      setErr("Insufficient Balance");
      return;
    }

    const transectionInfo = {
      sender,
      receiver,
      amount
    };

    axiosPublic.post("/cashOut", transectionInfo).then((res) => {
      if (res.data.insertedId) {
        toast.success(`${amount} Tk Cash Out successfull To ${receiver}`, {
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
          <h2 className="text-3xl font-bold text-gray-900">Cash Out</h2>
          <p className="text-gray-600 mt-2">User to Agent</p>
        </div>

        <form onSubmit={handleCashOut} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agent Account Number
            </label>
            <input
              type="number"
              required
              name="phone"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
              placeholder="Enter agent number"
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
            Cash Out
          </button>
        </form>
      </div>
         ) : (
          <h2 className="text-2xl p-4 font-extrabold bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent">
          Your access has been temporarily restricted by the admin.
          </h2>
        )
      }
    </div>
  );
};

export default CashOut;
