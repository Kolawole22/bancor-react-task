import React, { useState } from "react";
import axios from "axios";
import LoadingModal from "../components/LoadingModal";
import apiClient from "../api";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailaddress: "",
    activationCode: "",
    // role: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://quizapi.laspg-online.com/api/Account/confirmactivationcode",
        formData
      );
      console.log(response, "res");
      if (response.status === 200) {
        console.log("verification successful:", response.data);
        toast.success("Verification successful");
        navigate("/log-in");
      } else {
        console.log("error:", response.data.message);
        setIsLoading(false);
        toast.error(response.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error during sign-up:", error.response.data.errorMessage);
      toast.error(error.response.data.errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-screen flex-1 items-center justify-center min-h-screen bg-gray-100">
      <LoadingModal loading={isLoading} />
      <div className="w-[50%] sm:w-[90%] p-8 space-y-6 bg-white rounded shadow-md flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center text-black">
          Confirm your Email
        </h2>
        <div>Enter the code sent to your Email</div>
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
            type="activationCode"
            name="activationCode"
            placeholder="Code"
            value={formData.activationCode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Confirm
          </button>

          {/* <div className="flex flex-row justify-center">
            <div className="mr-1">Don't have an account, </div>
            <Link to={"/sign-up"}>Sign up</Link>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default ConfirmEmail;
