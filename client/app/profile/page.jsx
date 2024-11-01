// components/ProfileSettings.js
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SidebarComponent from "@/components/Sidebar";
import { updateProfile, getProfile } from "@/utils/api";
import { generateUsername } from "@/utils/profile";

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
    age: "",
    avatar: "/icons/user.svg",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeProfile = async () => {
      try {
        let username = localStorage.getItem("username");

        if (!username) {
          const email = localStorage.getItem("userEmail");
          if (email) {
            username = generateUsername(email);
            if (username) {
              localStorage.setItem("username", username);
              await updateProfile({ username });
            }
          }
        }

        if (!username) {
          setError("No user identification found");
          return;
        }

        await fetchProfile(username);
      } catch (error) {
        console.error("Error initializing profile:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initializeProfile();
  }, []);

  const fetchProfile = async (username) => {
    try {
      const response = await getProfile(username);
      const profileData = response.data || response;
      
      if (profileData.email) {
        localStorage.setItem("userEmail", profileData.email);
      }
      
      setProfileData(profileData);
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prevData) => ({
          ...prevData,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      setError("");
  
      // Make the API call to update the profile
      const response = await updateProfile(profileData);
      const updatedProfileData = response.data || response;
  
      // Clear previous data from localStorage
      localStorage.removeItem("username");
      localStorage.removeItem("userEmail");
  
      // Update localStorage with the new profile data
      if (updatedProfileData.username) {
        localStorage.setItem("username", updatedProfileData.username);
      }
      if (updatedProfileData.email) {
        localStorage.setItem("userEmail", updatedProfileData.email);
      }
  
      // Update the profileData state and exit editing mode
      setProfileData(updatedProfileData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile");
    }
  };
  

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SidebarComponent />
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="text-xl">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SidebarComponent />
        <div className="flex-1 p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarComponent />
      <div className="flex-1 p-6">
        <div className="mb-8">
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Link href="/dashboard" className="flex items-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </Link>
            <span className="mx-2">/</span>
            <span>Profile Settings</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">
              Welcome, {profileData.firstName || "User"}
            </h1>
            <Image
              src={profileData.avatar || "/icons/user.svg"}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>

          <div className="bg-[#D917EB] h-32 rounded-lg mb-6"></div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Image
                src={profileData.avatar || "/icons/user.svg"}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-500">{profileData.username}</p>
                <p className="text-gray-400 text-sm">{profileData.email}</p>
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-2"
                  />
                )}
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-[#D917EB] text-white px-4 py-2 rounded-lg"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={profileData.firstName || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={profileData.lastName || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={profileData.username || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={profileData.bio || ""}
                onChange={handleInputChange}
                rows="3"
                disabled={!isEditing}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={profileData.age || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          {isEditing && (
            <div className="mt-6">
              <button
                onClick={handleSave}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
