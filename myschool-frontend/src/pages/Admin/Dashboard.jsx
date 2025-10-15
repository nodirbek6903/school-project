import  {useGetMeQuery} from "../../features/auth/authApi"
const Dashboard = () => {
  

  const {data:me} = useGetMeQuery()

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      {me ? (
        <p className="mt-4 text-lg">Xush kelibsiz, <span className="font-semibold">{me?.fullName}</span> </p>
      ) : (
        <p className="mt-4 text-gray-500">Foydalanuvchi ma’lumotlari yuklanmoqda...</p>
      )}
    </div>
  );
};

export default Dashboard;
