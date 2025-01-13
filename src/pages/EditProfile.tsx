import { useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { ProfileCreateUpdate } from "../utils/zod";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function EditProfile() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    religion: "",
    location: "",
    maritalStatus: "",
    education: "",
    occupation: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const religions = ["Hindu", "Muslim", "Christian", "Buddhist", "Other"];
  const genders = ["Male", "Female", "Other"];
  const maritalStatuses = ["Single", "Married", "Divorced"];
  const locations = [
    "Hyderabad", "Bengaluru", "Chennai", "Gurgaon", "Pune", "Delhi", "Mumbai", 
    "Noida", "Warangal", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validationResult = ProfileCreateUpdate.safeParse(profile);
      console.log("validation",validationResult);
      if (!validationResult.success) {
        setErrors(validationResult.error.errors.reduce((acc: any, error: any) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {}));
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("authToken");
      console.log(token)

      const response = await axios.put(`${BACKEND_URL}/profile/update`, validationResult.data, { 
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type" : "application/json"
        },
      });
      console.log("Valid Profile Data:", validationResult);

      if(response.status===201){
      alert("Profile saved successfully!");
      navigate("/dashboard")
      console.log("Profile details", response.data);
      }
      if (!response) {
        console.error("Failed to save profile:", response);
        alert("Error saving profile.");
        return;
      }
    } catch (error) {
      console.error("error", error);
      alert("Error during profile creation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-lg rounded-full p-8 max-w-4xl w-full">
          <h1 className="text-2xl font-bold mb-6 text-black underline decoration-2 text-center">Edit your Profile</h1>
          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
                className={`w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={profile.dateOfBirth}
                onChange={handleInputChange}
                required
                className={`w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
                required
                className={`w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.gender ? 'border-red-500' : ''}`}
              >
                <option value="">Select Gender</option>
                {genders.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">Religion</label>
              <select
                name="religion"
                value={profile.religion}
                onChange={handleInputChange}
                required
                className={`w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.religion ? 'border-red-500' : ''}`}
              >
                <option value="">Select Religion</option>
                {religions.map((religion, index) => (
                  <option key={index} value={religion}>
                    {religion}
                  </option>
                ))}
              </select>
              {errors.religion && <p className="text-red-500 text-sm">{errors.religion}</p>}
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">Marital Status</label>
              <select
                name="maritalStatus"
                value={profile.maritalStatus}
                onChange={handleInputChange}
                required
                className={`w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.maritalStatus ? 'border-red-500' : ''}`}
              >
                <option value="">Select Status</option>
                {maritalStatuses.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.maritalStatus && <p className="text-red-500 text-sm">{errors.maritalStatus}</p>}
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">Location</label>
              <select
                name="location"
                value={profile.location}
                onChange={handleInputChange}
                required
                className={`w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.location ? 'border-red-500' : ''}`}
              >
                <option value="">Select Location</option>
                {locations.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">Education</label>
              <input
                type="text"
                name="education"
                value={profile.education}
                onChange={handleInputChange}
                required
                className={`w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.education ? 'border-red-500' : ''}`}
              />
              {errors.education && <p className="text-red-500 text-sm">{errors.education}</p>}
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 text-left">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={profile.occupation}
                onChange={handleInputChange}
                required
                className={`w-full p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-600 ${errors.occupation ? 'border-red-500' : ''}`}
              />
              {errors.occupation && <p className="text-red-500 text-sm">{errors.occupation}</p>}
            </div>
  
            <button
              type="submit"
              disabled={loading}
              className={`mt-6 w-full p-3 ${loading ? "bg-gray-500" : "bg-blue-600"} text-white rounded-full hover:bg-gray-800 transition`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}  