
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export function Matches() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [loading, setLoading] = useState(false); 

  const fetchMatches = async (page: number) => {
    const token = localStorage.getItem("authToken");
    setLoading(true);

    try {
      const response = await axios.get(
        `${BACKEND_URL}/profile/matches?page=${page}&limit=2`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Fetched successfully", response.data);

        setProfiles((prev) => {
          const existingProfileIds = prev.map((profile) => profile.id);
          const newProfiles = response.data.profiles.filter(
            (profile:any) => !existingProfileIds.includes(profile.id)
          );
          return [...prev, ...newProfiles];
        });
        if (page === 1) {
          setUser(response.data.user[0]);
        }
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchMatches(1); 
  }, []); 

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchMatches(nextPage);
    }
  };

  if (!profiles.length && !loading) {
    return <div className="text-center text-gray-800">Loading matches...</div>;
  }
  if(!profiles){
    return <div className="text-center text-2xl text-gray-800 underline decoration-2">No Matches</div>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
            <Link to="/user">
              <div className="absolute -bottom-12 left-4">
                <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                  <User className="w-full h-full text-gray-300 bg-gray-100" />
                </div>
              </div>
            </Link>
          </div>
          
          <div className="pt-16 pb-6 px-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Profile</h2>
            {user && (
              <div className="space-y-3">
                <p className="text-gray-700"><span className="font-medium">Name:</span> @{user.name}</p>
                <p className="text-gray-700"><span className="font-medium">MaritalStatus:</span>{" "}{user.maritalStatus}</p>
                <p className="text-gray-700"><span className="font-medium">Location:</span> {user.location}</p>
              </div>
            )}
          </div>
          <Link to="/editProfile"><h1 className="text-blue-600 underline decoration-2">Edit Profile 🖋</h1></Link>
        </div>

        <div className="bg-white shadow-lg rounded-3xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Matched Profiles</h2>
            <div className="space-y-6">
              {profiles.map((profile: any) => (
                <div key={profile.id}
                  className="bg-gradient-to-r from-purple-100 to-pink-100 shadow-md rounded-lg p-4 flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-white">
                    <User className="w-full h-full text-purple-300 bg-purple-100" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">@{profile.name}</h3>
                    <p className="text-gray-600"><span className="font-medium">MaritalStatus:</span>{" "}{profile.maritalStatus}
                    </p>
                    <p className="text-gray-600"><span className="font-medium">Location:</span>{" "}{profile.location}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 disabled:opacity-50"
                onClick={handleLoadMore}
                disabled={loading || currentPage >= totalPages}>
                {loading ? "Loading..." : "Load More Matches"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
