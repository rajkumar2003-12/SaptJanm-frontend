import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SignupUpdate } from "../utils/zod"; 
import { Navbar } from "../components/Navbar";

export function EditUser() {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

  const sendRequest = async () => {
    setErrors({});

    const result = SignupUpdate.safeParse(postInputs);

    if (!result.success) {
      const fieldErrors: { username?: string; email?: string; password?: string } = {};
      result.error.errors.forEach((e) => {
        if (e.path[0] === "username") {
          fieldErrors.username = e.message;
        } else if (e.path[0] === "email") {
          fieldErrors.email = e.message;
        } else if (e.path[0] === "password") {
          fieldErrors.password = e.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/user/updated`, postInputs);
      const authToken = response.data.token;
      console.log(authToken);
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("id", response.data.id);
      alert("Successfully updated.");
      navigate("/dashboard");
    } catch (e) {
      alert("Please update all Inputes.");
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      sendRequest(); 
    }
  };

  return (
     <div className="flex flex-col min-h-screen pt-16">
        <Navbar/>
    <div className="h-full flex justify-center items-center bg-white p-1">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-10 w-full max-w-md mx-4 sm:mx-auto">
        <div className="text-center mb-6">
          <h1 className=" text-xl  text-black underline decoration-2">Edit details</h1>
        </div>

        <div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">
              Username
            </label>
            <input
              onChange={(e) => setPostInputs({ ...postInputs, username: e.target.value })}
              type="text"
              id="username-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              placeholder="username-em-john"
              required
              onKeyDown={handleKeyPress}
            />
            {errors.username && <div className="text-red-500 text-sm mt-2">{errors.username}</div>}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">
              Email
            </label>
            <input
              onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })}
              type="email"
              id="email-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              placeholder="email@example.com"
              required
              onKeyDown={handleKeyPress}
            />
            {errors.email && <div className="text-red-500 text-sm mt-2">{errors.email}</div>}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">
              Password
            </label>
            <input
              onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
              type="password"
              id="password-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              placeholder="At least 6 characters.."
              required
              onKeyDown={handleKeyPress}
            />
            {errors.password && <div className="text-red-500 text-sm mt-2">{errors.password}</div>}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              sendRequest();
            }}
            type="button"
            className="w-full mt-6 text-white bg-blue-600 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-white font-medium rounded-full text-sm px-5 py-2.5"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center">
                Updating...
              </span>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
