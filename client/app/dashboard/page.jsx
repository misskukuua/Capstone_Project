'use client'
import ProtectedRoute from '@/components/ProtectedRoute';
import { Bell, Calendar, Home, Layout, Menu, MessageSquare, Search, Sidebar, X } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SidebarComponent from "@/components/Sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getProfile } from '@/utils/api';

const dashboardItems = [
  { title: 'Community Space', icon: MessageSquare, description: 'Please add your content here. Keep it short and simple. And smile :)' },
  { title: 'Access Resources', icon: Layout, description: 'Please add your content here. Keep it short and simple. And smile :)' },
  { title: 'Connect with a counselor', icon: MessageSquare, description: 'Please add your content here. Keep it short and simple. And smile :)' },
  { title: 'Report Abuse', icon: Bell, description: 'Please add your content here. Keep it short and simple. And smile :)' },
]

export default function DashboardComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const router = useRouter();
  const [dateTime, setDateTime] = React.useState(new Date());

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
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (

    (<div className="flex h-screen bg-gray-100">
            <SidebarComponent />

      {/* Main Content */}
      <div className="p-8 mr-">
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
                            <h1 className="text-3xl font-bold mb-2">Welcome {getProfile.firstName},</h1>
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
                        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
                            <div className="bg-gray-300 h-40 mb-4"></div>
                            <h2 className="text-xl font-bold mb-2">Community Space</h2>
                            <p className="text-gray-600 mb-4">Please add your content here. Keep it short and simple. And smile :)</p>
                            <button className="bg-[#D917EB] text-white py-2 px-4 rounded-md w-full">Get Started</button>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
                            <div className="bg-gray-300 h-40 mb-4"></div>
                            <h2 className="text-xl font-bold mb-2">Access Resources</h2>
                            <p className="text-gray-600 mb-4">Please add your content here. Keep it short and simple. And smile :)</p>
                            <button className="bg-[#D917EB] text-white py-2 px-4 rounded-md w-full">Get Started</button>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
                            <div className="bg-gray-300 h-40 mb-4"></div>
                            <h2 className="text-xl font-bold mb-2">Connect with a counselor</h2>
                            <p className="text-gray-600 mb-4">Please add your content here. Keep it short and simple. And smile :)</p>
                            <button className="bg-[#D917EB] text-white py-2 px-4 rounded-md w-full">Get Started</button>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
                            <div className="bg-gray-300 h-40 mb-4"></div>
                            <h2 className="text-xl font-bold mb-2">Report Abuse</h2>
                            <p className="text-gray-600 mb-4">Please add your content here. Keep it short and simple. And smile :)</p>
                            <button className="bg-[#D917EB] text-white py-2 px-4 rounded-md w-full">Get Started</button>
                        </div>
                    </div>
                </div>
      {/* Overlay for smaller screens when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}></div>
      )}
    </div>)
  );
}