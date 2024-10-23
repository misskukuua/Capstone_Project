"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SidebarComponent from '@/components/Sidebar';
import { updateProfile, getProfile } from '@/utils/api';

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    age: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile(localStorage.getItem('username')); // Assuming you store the username in localStorage
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(profileData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarComponent />
      <div className="flex-1 p-6">
        <div className="mb-8">
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Link href="/dashboard" className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
            <span className="mx-2">/</span>
            <span>Profile Settings</span>
          </div>
        </div>
        <div className="mt-20" />

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Welcome, {profileData.firstName || 'User'}</h1>
            <Image src="/images/user_image.png" alt="Profile" width={40} height={40} className="rounded-full" />
          </div>

          <div className="bg-[#D917EB] h-32 rounded-lg mb-6"></div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Image src="/images/user_image.png" alt="Profile" width={100} height={100} className="rounded-full mr-4" />
              <div>
                <h2 className="text-xl font-semibold">{profileData.firstName} {profileData.lastName}</h2>
                <p className="text-gray-500">{profileData.username || 'username'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-[#D917EB] text-white px-4 py-2 rounded-lg"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={profileData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={profileData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={profileData.username}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={profileData.bio}
                onChange={handleInputChange}
                rows="3"
                disabled={!isEditing}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="text"
                name="age"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={profileData.age}
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