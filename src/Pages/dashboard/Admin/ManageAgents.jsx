import { MdVerifiedUser } from "react-icons/md";
import { Link } from "react-router-dom";
import useAllUsers from "../../../hooks/useAllUsers";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageAgents = () => {
    const axiosSecure = useAxiosSecure();
    const [ allUsers, refetch ] = useAllUsers();
  const agents = allUsers?.filter((user) => user.role === "agent")

  const handleApprove = (user) => {
    axiosSecure.patch(`/users/agents/${user.phone}`)
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
            Total Agents : {agents?.length}
          </h1>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Account No</th>
                  <th>Balance</th>
                  <th >Status</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                {agents?.map((user) => (
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
                    <td>{user.status}</td>
                    <td className="flex items-center justify-center">
                    { user.status == 'requested' ? 
                    <button 
                    onClick={() => handleApprove(user)}
                    className="text-xl text-green-400 pr-6 hover:cursor-pointer">
                     <MdVerifiedUser />
                    </button> : "veified" }
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

export default ManageAgents;