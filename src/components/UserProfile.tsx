import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { User } from "lucide-react";

export function UserProfile() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const response = await axios.get(`${BACKEND_URL}/profile/user-profile`,{
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if(response.status === 201){
        setProfile(response.data.profile);
        console.log("details", response.data)
        }
      } catch (err) {
        console.log("error",err)
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-3xl overflow-hidden max-w-md w-full">
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="absolute -bottom-12 left-4">
            <Link to="/authorProfile">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
              <User className="w-full h-full text-gray-300 bg-gray-100" />
            </div>
            </Link>
          </div>
        </div>

        <div className="pt-16 pb-6 px-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Profile</h2>
          {profile && (
            <div className="space-y-3">
              <p className="text-black font-bold">{profile.name}</p>
              <p className="text-gray-700">{profile.education}</p>
              <p className="text-black font-bold">{profile.occupation}</p>
            </div>
          )}
        </div>
        <Link to="/editProfile">
          <h1 className="text-blue-600 underline decoration-2 mb-5">edit profile 🖋</h1>
        </Link>
      </div>
    </div>
  );
}
