import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export function GetUsers() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get(`${BACKEND_URL}/profile/all-profiles`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 201) {
          console.log("all users", response.data);
          setUsers(response.data.profile);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUsers();
  }, []);

  if (!users.length) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <span className="text-gray-800 text-xl flex">Loading...</span>
        </div>
      );      
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        You can see other profiles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-lg rounded-3xl overflow-hidden"
          >
            <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
            <Link to="/otheruser" state={{userId:Number(user.userId)}}>
              <div className="absolute -bottom-12 left-4">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden flex items-center justify-center bg-gray-100">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              </div>
              </Link>
            </div>
            <div className="pt-16 pb-6 px-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {user.name}
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Gender:</span> {user.gender}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Education:</span>{" "}
                  {user.education}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Marital Status:</span>{" "}
                  {user.maritalStatus}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Occupation:</span>{" "}
                  {user.occupation}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Location:</span> {user.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
