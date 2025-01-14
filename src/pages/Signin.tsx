import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Signinput } from "../utils/zod";
import { Navbar2 } from "../components/Navbar2";

export function Signin() {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const sendRequest = async () => {
    setErrors({});

    const result = Signinput.safeParse(postInputs);

    if (!result.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      result.error.errors.forEach((e) => {
        if (e.path[0] === "email") {
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
      const response = await axios.post(`${BACKEND_URL}/author/signin`, postInputs);
      const authToken = response.data.token;
      console.log(authToken);
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("id", response.data.id);
      console.log(authToken);
      alert("Login successful.");
      navigate("/dashboard");
    } catch (e) {
      alert("you entered wrong inputes.");
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
      <Navbar2/>
    <div className="h-full flex justify-center items-center bg-white">
      <div className="bg-white shadow-md rounded-lg p-2 md:p-10 w-full max-w-md mx-4 sm:mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">Please Login</h1>
        </div>

        <div>
          <div className="mb-6">
            <label htmlFor="email-input" className="block mb-2 text-sm font-semibold text-gray-700 text-left">
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
            <label htmlFor="password-input" className="block mb-2 text-sm font-semibold text-gray-700 text-left">
              Password
            </label>
            <input
              onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
              type="password"
              id="password-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
              placeholder="Enter your password"
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
            className="w-full mt-6 text-white bg-blue-600 hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5"
            disabled={loading}
          >
            {loading ? (
              <span className="flex justify-center items-center">
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-sm mt-4 font-medium text-gray-900">
            Don't have an account?{" "}
            <a href="/signup" className="hover:underline dark:text-red-600">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
