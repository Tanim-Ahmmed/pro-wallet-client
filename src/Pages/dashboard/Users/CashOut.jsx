import { useState } from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";


const CashOut = () => {
       const [showPin, setShowPin] = useState(false);
        const [err, setErr] = useState("");
    const handleCashOut = (e) =>{

    }
    return (
                <div className="min-h-screen flex items-center justify-center">
                     <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-900">Cash Out</h2>
                      <p className="text-gray-600 mt-2">
                        User to Agent
                      </p>
                    </div>
        
                    <form onSubmit={handleCashOut} className="space-y-6">
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                         Agent Account Number
                        </label>
                        <input
                          type="number"
                          required
                          name="number"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                          placeholder="Enter agent number"
                        />
                      </div>
        
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
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
        
                      <div>
                        {err && <p className="text-red-500 text-center">{err}</p>}
                      </div>
        
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all"
                      >
                        Send Money
                      </button>
                    </form>
                  </div>
                </div>
    );
};

export default CashOut;