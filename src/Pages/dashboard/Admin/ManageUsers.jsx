import { RxCrossCircled } from "react-icons/rx";
import useAllUsers from "../../../hooks/useAllUsers";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const [ allUsers, refetch ] = useAllUsers();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const users = allUsers?.filter((user) => user.role === "user").filter((user) =>
    user.phone.toLowerCase().includes(search.toLowerCase())
  );

  const handleBlock = (user) => {
      axiosSecure.patch(`/users/user/${user.phone}`)
      .then(res =>{
       if(res.data.modifiedCount > 0 ){
           refetch();
           Swal.fire({
               position: "top-end",
               icon: "success",
               title: "Your work has been saved",
               showConfirmButton: false,
               timer: 1500
             });
       }
      }) 
  }; 
  return (
    <div className="text-center mt-6">
      <div>
        <h1 className="text-3xl font-semibold text-center py-6 pt-10">
          Total Users : {users?.length}
        </h1>
        <input
          type="text"
          value={search}
            onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by account numbers"
          className="input input-bordered  w-full rounded-3xl "
        />
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Account No</th>
                <th>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td className="flex items-center justify-center">
                      <Link
                        to={`/dashboard/user-transactions/${user.phone}`}
                        className="text-lg  text-indigo-400 pr-6"
                      >
                        {user.name}
                      </Link>
                  </td>
                  <td>{user.phone}</td>
                  <td>{user.balance}</td>
                    <td className="flex items-center justify-center">
                    { user.status === 'approved' ? 
                    <button 
                    onClick={() => handleBlock(user)}
                    className="text-2xl text-red-400 pr-6 hover:cursor-pointer">
                     <RxCrossCircled />
                    </button> : "Blocked" }
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
