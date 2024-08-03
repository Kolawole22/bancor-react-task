import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api";
import LoadingModal from "../components/LoadingModal";

type UserDetails = {
  firstname: string;
  lastname: string;
};

function Home() {
  const navigation = useNavigate();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [walletDetails, setWalletDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (!token) {
      console.log("not logged in");
      navigation("/log-in");
    }
  }, [navigation]);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/user/profile")
      .then((res) => {
        console.log("res", res.data.data.profile);
        setUserDetails(res.data.data.profile);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/wallet/mywallet")
      .then((res) => {
        console.log("res", res.data.data);
        setWalletDetails(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      });
  }, []);

  function formatNaira(amount) {
    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    });

    return formatter.format(amount);
  }

  return (
    <div className="flex-1 flex-col justify-start  w-screen px-4">
      <LoadingModal loading={isLoading} />
      <div className="flex flex-row justify-between ">
        <div>
          <div className="text-2xl sm:text-lg font-semibold">Welcome back,</div>
          <div className="text-2xl sm:text-lg font-semibold">
            {userDetails?.firstname}, {userDetails?.lastname}
          </div>
        </div>
        <div>
          <div className="text-2xl font-semibold sm:text-lg ">My Balance</div>
          <div className="text-2xl font-semibold sm:text-lg">
            {formatNaira(walletDetails?.balance)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
