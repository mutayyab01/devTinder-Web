import React, { useState, useEffect } from "react";
import UserCard from "./userCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { apiService } from "../utils/apiService";
import Toast from "./Toast";

const EditProfile = ({ user }) => {
  // Initialize state with user data or empty values
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [company, setCompany] = useState("");
  const [education, setEducation] = useState("");
  const [interests, setInterests] = useState([]);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const dispatch = useDispatch();

  // Update form fields whenever user prop changes (after fresh data fetch)
  useEffect(() => {
    console.log('EditProfile useEffect triggered with user:', user);
    
    if (user) {
      console.log('User data found, updating form fields...');
      console.log('User object:', JSON.stringify(user, null, 2));
      
      // Handle both direct user object and API response wrapped user object
      const userData = user.data ? user.data : user;
      console.log('Extracted userData:', JSON.stringify(userData, null, 2));
      
      setFirstname(userData.firstName || "");
      setLastName(userData.lastName || "");
      setPhotoURL(userData.photoURL || userData.photo || userData.picture || userData.avatar || "");
      setAge(userData.age ? String(userData.age) : "");
      setGender(userData.gender || "");
      setAbout(userData.about || "");
      setSkills(Array.isArray(userData.skills) ? userData.skills : []);
      setLocation(userData.location || "");
      setOccupation(userData.occupation || "");
      setCompany(userData.company || "");
      setEducation(userData.education || "");
      setInterests(Array.isArray(userData.interests) ? userData.interests : []);
      setGithub(userData.githubURL || "");
      setLinkedin(userData.linkedinURL || "");
      setPortfolio(userData.portfolioURL || "");
      
      console.log('Form fields updated with values:', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        age: userData.age,
        location: userData.location,
        about: userData.about,
        photoURL: userData.photoURL || userData.photo,
        gender: userData.gender,
        company: userData.company,
        education: userData.education,
        occupation: userData.occupation
      });
    } else {
      console.log('No user data available yet');
    }
  }, [user]); // Re-run whenever user prop changes

  const saveProfile = async () => {
    setError("");
    setLoading(true);
    
    try {
      const profileData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        photoURL: photoURL.trim(), // Backend might expect 'photo' field
        age: age ? parseInt(age) : undefined,
        gender,
        about: about.trim(),
        skills: Array.isArray(skills) ? skills.filter(skill => skill.trim()) : [],
        location: location.trim(),
        occupation: occupation.trim(),
        company: company.trim(),
        education: education.trim(),
        interests: Array.isArray(interests) ? interests.filter(interest => interest.trim()) : [],
        githubURL: github.trim(),
        linkedinURL: linkedin.trim(),
        portfolioURL: portfolio.trim()
      };

      // Remove empty fields
      Object.keys(profileData).forEach(key => {
        if (profileData[key] === "" || profileData[key] === undefined) {
          delete profileData[key];
        }
      });

      console.log('Updating profile with data:', profileData);
      console.log('All form field values:', {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        photoURL: photoURL.trim(),
        age: age,
        gender: gender,
        about: about.trim(),
        skills: skills,
        location: location.trim(),
        occupation: occupation.trim(),
        company: company.trim(),
        education: education.trim(),
        interests: interests,
        github: github.trim(),
        linkedin: linkedin.trim(),
        portfolio: portfolio.trim()
      });
      const response = await apiService.updateProfile(profileData);
      console.log('Profile update response:', response);
      
      if (response.success) {
        // Update Redux store with the latest user data
        dispatch(addUser(response.data));
        console.log('Updated user data in Redux:', response.data);
        
        // Show success message
        setToastMessage("Profile updated successfully! 🎉");
        setToastType("success");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        
        // Note: Form fields will be automatically updated by useEffect when Redux state changes
      }
    } catch (error) {
      console.error("Profile update error:", error);
      setError(error.message || "Failed to update profile");
      setToastMessage("Failed to update profile. Please try again.");
      setToastType("error");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  const calculateProfileCompletion = () => {
    const fields = [firstName, lastName, photoURL, about, skills.length > 0, age, gender, location, occupation];
    const completedFields = fields.filter(field => field && field !== "").length;
    return Math.round((completedFields / fields.length) * 100);
  };

  return (
    <>
      {/* Show loading state if user data is not ready */}
      {!user && (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your profile data...</p>
          </div>
        </div>
      )}
      
      {user && (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 py-8 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-28 h-28 bg-purple-300 rounded-full blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-blue-300 rounded-full blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
              ✨ Perfect Your Profile
            </h1>
            <p className="text-gray-600 text-lg">Make yourself irresistible to fellow developers</p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 shadow-sm">
                🔥 Hot profile gets more matches
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
            {/* Enhanced Form Section */}
            <div className="lg:w-1/2">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in">
                {/* Profile Completion Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
                    <span className="text-sm font-bold text-pink-600">
                      {calculateProfileCompletion()}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${calculateProfileCompletion()}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {calculateProfileCompletion() < 70 ? "Complete your profile to get more matches!" : "Great! Your profile looks amazing!"}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstname(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Age
                      </label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Profile Photo URL
                    </label>
                    <input
                      type="url"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                      placeholder="https://example.com/your-photo.jpg"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        📍 Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                        placeholder="New York, USA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        💼 Occupation
                      </label>
                      <input
                        type="text"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                        placeholder="Software Developer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🏢 Company
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                        placeholder="Google, Microsoft, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        🎓 Education
                      </label>
                      <input
                        type="text"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                        placeholder="Computer Science, MIT"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      💻 Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      value={Array.isArray(skills) ? skills.join(", ") : skills}
                      onChange={(e) => setSkills(e.target.value.split(",").map(skill => skill.trim()))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                      placeholder="JavaScript, React, Node.js, Python"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      🎯 Interests (comma separated)
                    </label>
                    <input
                      type="text"
                      value={Array.isArray(interests) ? interests.join(", ") : interests}
                      onChange={(e) => setInterests(e.target.value.split(",").map(interest => interest.trim()))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                      placeholder="Gaming, Travel, Music, Photography"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📝 About You
                    </label>
                    <textarea
                      rows="4"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none resize-none"
                      placeholder="Tell us about yourself, your interests, and what you're looking for..."
                    />
                  </div>

                  {/* Social Links */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">🔗 Social Links</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          GitHub Profile
                        </label>
                        <input
                          type="url"
                          value={github}
                          onChange={(e) => setGithub(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                          placeholder="https://github.com/yourusername"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          LinkedIn Profile
                        </label>
                        <input
                          type="url"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                          placeholder="https://linkedin.com/in/yourusername"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Portfolio Website
                        </label>
                        <input
                          type="url"
                          value={portfolio}
                          onChange={(e) => setPortfolio(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 outline-none"
                          placeholder="https://yourportfolio.com"
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-xl text-sm flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </div>
                  )}

                  <button
                    className={`w-full font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 ${
                      loading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 active:scale-95'
                    } text-white`}
                    onClick={saveProfile}
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Saving Profile...
                      </div>
                    ) : (
                      'Save Profile'
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="sticky top-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Live Preview</h3>
                <UserCard
                  user={{ 
                    firstName, 
                    lastName, 
                    photoURL, 
                    photoUrl: photoURL, // For compatibility
                    photo: photoURL, // For compatibility
                    about, 
                    age, 
                    gender, 
                    skills,
                    location,
                    occupation,
                    company,
                    education,
                    interests,
                    github,
                    linkedin,
                    portfolio
                  }}
                />
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">This is how your profile will appear to others</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default EditProfile;
