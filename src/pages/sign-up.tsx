import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingModal from "../components/LoadingModal";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    emailaddress: "",
    phonenumber: "",
    role: 0,
    password: "",
  });

  useEffect(() => {
    axios
      .get("https://quizapi.laspg-online.com/api/Role/Roles")
      .then((res) => {
        console.log("res", res.data.data);
        setRoles(res.data.data);
      })

      .catch((err) => {
        console.log("error", err.response);
      });
  }, []);

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
        "https://quizapi.laspg-online.com/api/Account/register",
        formData
      );
      console.log(response, "res");
      if (response.status === 201 || response.status === 200) {
        console.log("Sign-up successful:", response.data);
        //localStorage.setItem("token", response.data.token);
        toast.success("Sign up successful");
        navigate("/confirm-email");
        setIsLoading(false);
      } else {
        console.log("error:", response.data.message);
        setIsLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error(error.response.data.errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-screen flex-1 items-center justify-center min-h-screen bg-gray-100">
      <LoadingModal loading={isLoading} />
      <div className="w-[50%] sm:w-[90%] p-8 sm:p-4 space-y-6 bg-white rounded shadow-md flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-center text-black">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="middlename"
            placeholder="Middle Name"
            value={formData.middlename}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="email"
            name="emailaddress"
            placeholder="Email Address"
            value={formData.emailaddress}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
            value={formData.phonenumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          {/* <input
            type=""
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          /> */}
          <div className="mb-4">
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            >
              <option value="">Select Role</option>
              {roles.map((item) => (
                <option value={item.roleID}>{item.roleName}</option>
              ))}
            </select>
          </div>
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
            disabled={isLoading}
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
          <div className="flex flex-row justify-center">
            <div className="mr-1">Have an account, </div>
            <Link to={"/log-in"}>Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
