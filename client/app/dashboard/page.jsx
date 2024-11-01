'use client'
import ProtectedRoute from '@/components/ProtectedRoute';
import { Bell, Calendar, Home, Layout, Menu, MessageSquare, Search, Sidebar, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SidebarComponent from "@/components/Sidebar";
import { getProfile } from '@/utils/api';


const dashboardItems = [
  { 
    title: 'Community Space', 
    icon: MessageSquare, 
    description: 'Join our community space to connect and collaborate with peers.', 
    link: '/community',
    imageUrl: '/images/community.jpeg'
  },
  { 
    title: 'Access Resources', 
    icon: Layout, 
    description: 'Find valuable learning resources and tools to support your journey.', 
    link: '/resources',
    imageUrl: '/images/resources.png'
  },
  { 
    title: 'Connect with a Counselor', 
    icon: MessageSquare, 
    description: 'Schedule a session with a counselor for guidance and support.', 
    link: '/counselor',
    imageUrl: '/images/counselor.png'
  },
  { 
    title: 'Report Abuse', 
    icon: Bell, 
    description: 'Report any abusive behavior in a safe and confidential manner.', 
    link: '/report-abuse',
    imageUrl: '/images/report.jpeg'
  },
];

export default function DashboardComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const router = useRouter();
  const [dateTime, setDateTime] = React.useState(new Date());
  const [profile, setProfile] = useState(null); // State to hold profile data



useEffect(() => {
    const fetchProfile = async () => {
      try {
        const username = localStorage.getItem('username');
        if (username) {
          const profileData = await getProfile(username);
          setProfile(profileData); // Set both 'username' and 'userEmail'
        } else {
          console.warn('Username not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
  
    fetchProfile();
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    if (token) {
      localStorage.setItem('token', token);
      router.push('/dashboard');
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarComponent />

      {/* Main Content */}
      <div className="p-8 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex flex-col items-center w-full md:w-1/3 mb-4 md:mb-0">
            <img src="/icons/logo.png" alt="Logo" className="block md:hidden mb-4" />
            <div className="relative w-full">
              <input type="text" placeholder="Search here..." className="p-2 pl-10 border rounded-full w-full" />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          <div className="w-8 h-8 border rounded-full"></div>
        </div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome {profile?.username || 'Loading Username...'}!</h1>
            <p className="text-lg">It's a sunny day today, we hope you're taking good care of your health <span role="img" aria-label="smile">😊</span></p>
          </div>
          <div className="hidden md:block p-4 border rounded-lg w-48">
            <div className="flex items-center">
              <i className="fas fa-calendar-alt mr-2"></i>
              <span>Today's Date</span>
            </div>
            <div className="font-bold">{formatDate(dateTime)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {dashboardItems.map((item, index) => (
            <div key={index} className="bg-purple-50 p-6 rounded-lg shadow-md">
              <div className="h-40 mb-4">
                <Image src={item.imageUrl} alt={item.title} width={160} height={160} className="w-full h-full object-cover rounded-lg" />
              </div>
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <Link href={item.link}>
                <button className="bg-[#D917EB] text-white py-2 px-4 rounded-md w-full">Get Started</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for smaller screens when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
