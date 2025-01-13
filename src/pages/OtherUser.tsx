import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { Navbar } from "../components/Navbar";
import { UserIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

// interface User {
//   userId: number;
// }

export function OtherUser() {
  const [otherUser, setOtherUser] = useState<any>(null);

  const location = useLocation(); // Access the location

  // Get the userId from location.state
  const userId = location.state?.userId;

  useEffect(() => {
    const fetchOthers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BACKEND_URL}/user/details/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          console.log("Fetched other user details", response.data.user);
          setOtherUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchOthers();
  }, [userId]);

  if (!otherUser) {
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
      <div key={otherUser.id} className="flex justify-center items-center mt-6">
        <div className="max-w-sm w-full rounded-lg shadow-lg bg-white p-6">
          <div className="flex justify-center mb-6">
            <UserIcon className="w-32 h-32 rounded-full text-gray-300 bg-gray-100 object-cover" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">{otherUser.username}</h2>
            <p className="text-gray-600">{otherUser.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
