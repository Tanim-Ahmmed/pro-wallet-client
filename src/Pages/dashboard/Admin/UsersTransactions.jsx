import { useParams } from "react-router-dom";
import useTransactions from "../../../hooks/useTransactions";

const UsersTransactions = () => {
  const { phone } = useParams();
  const [transactions] = useTransactions();
  const userTransactions = transactions.filter(
    (item) => item.sender === phone || item.receiver === phone
  );
  return (
    <div>
      <h1 className="text-center py-10 text-3xl font-semibold ">
        Transections: {userTransactions?.length}
      </h1>
      {userTransactions?.map((item, index) => (
        <div
          key={index}
          className="flex p-6 items-center shadow-xl rounded-2xl gap-3"
        >
          <div className="w-full">
            <div className=" py-3 ">
              <h2 className="text-xl font-bold">
                Time: {item.timestamp.split("T")[0]}
              </h2>
            </div>
            <p>
              {item.type} performed from account {item.sender} to account
              {item.receiver}
            </p>
            <p className="text-lg font-bold py-3">Money: {item.amount} tk</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersTransactions;
