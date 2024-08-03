import React, { useState } from "react";
import axios from "axios";
import LoadingModal from "../components/LoadingModal";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailaddress: "",
    password: "",
    // role: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://quizapi.laspg-online.com/api/Account/Authenticate",
        formData
      );
      console.log("Sign-up successful:", response.data);
      toast.success("Sign in successful");
      const token = response.data.token;
      const user = JSON.stringify(response.data.details);
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      setIsLoading(false);
      navigate("/");
    } catch (error: any) {
      console.error("Error during sign-up:", error.response.data.errorMessage);
      toast.error(error.response.data.errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-screen  flex-1 items-center justify-center min-h-screen bg-gray-100">
      <LoadingModal loading={isLoading} />
      <div className="sm:w-[90%] w-[50%] p-8 sm:p-4 space-y-6 bg-white rounded shadow-md flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center text-black">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="emailaddress"
            placeholder="Email Address"
            value={formData.emailaddress}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />

          {/* <input
            type="number"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          /> */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Sign In
          </button>

          <div className="flex flex-row justify-center">
            <div className="mr-1">Don't have an account, </div>
            <Link to={"/sign-up"}>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
