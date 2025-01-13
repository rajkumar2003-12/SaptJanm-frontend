import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { Navbar } from "../components/Navbar";
import { UserIcon } from "lucide-react";

export function User() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BACKEND_URL}/user/details`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          console.log("user details,", response.data);
          setUser(response.data.user[0]);
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen pt-16">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <span className="text-gray-800 text-xl">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <Navbar />
      <div className="flex justify-center items-center mt-6">
        <div className="max-w-sm w-full rounded-lg shadow-lg bg-white p-6">
          <div className="flex justify-center mb-6">
            <UserIcon className="w-32 h-32 rounded-full text-gray-300 bg-gray-100 object-cover" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
