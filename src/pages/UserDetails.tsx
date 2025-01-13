

import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useLocation } from "react-router-dom";
import { UserIcon } from "lucide-react";
import { Navbar } from "../components/Navbar";

interface User {
  username: string;
  email: string;
}

interface Profile {
  name: string;
  gender: string;
  maritalStatus: string;
  occupation: string;
  education: string;
  dateOfBirth: string;
  religion: string;
}

export function UserDetails() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${BACKEND_URL}/user/details/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          console.log("Fetched other user details", response.data);
          setUser(response.data.user);
          setProfile(response.data.profile[0]); 
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  return (
    <div className="flex flex-col min-h-screen pt-16">
        <Navbar/>
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 mb-6">
        {user ? (
          <>
            <UserIcon className="bg-gray-200 w-24 h-24 rounded-full mb-4" />
            <h2 className="text-xl font-bold mb-2">{user.username}</h2>
            <p className="text-sm text-gray-500 mb-4">{user.email}</p>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="hidden md:flex bg-blue-400 p-6 rounded-lg text-white flex flex-col items-center justify-center">
          <p className="text-lg italic text-center mb-4">
            "Together, let's turn dreams into reality and build a life full of love, adventure, and unforgettable memories. 
              Life is an adventure—let's embark on it together."
          </p>
           <div className="text-4xl font-extrabold">🖤💚</div>
        </div>

        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Profile Details</h3>
          {profile ? (
            <ul>
              <li className="mb-2"><strong>Name:</strong> {profile.name}
              </li>
              <li className="mb-2"><strong>Gender:</strong> {profile.gender}
              </li>
              <li className="mb-2"><strong>Marital Status:</strong> {profile.maritalStatus}
              </li>
              <li className="mb-2"><strong>Occupation:</strong> {profile.occupation}
              </li>
              <li className="mb-2"><strong>Education:</strong> {profile.education}
              </li>
              <li className="mb-2"><strong>Date of Birth:</strong> {new Date(profile.dateOfBirth).toLocaleDateString()}
              </li>
              <li className="mb-2"><strong>Religion:</strong> {profile.religion}
              </li>
            </ul>
          ) : (
            <p>Loading profile details...</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
