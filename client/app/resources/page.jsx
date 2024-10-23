// pages/resources.js
"use client"
import SidebarComponent from '@/components/Sidebar';
import Image from 'next/image';

export default function Resources() {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarComponent />

      <div className="container mx-auto p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                        <div className="flex flex-col items-center w-full sm:w-auto mb-4 sm:mb-0">
                            <img src="/icons/logo.png" alt="Logo" className=" sm:hidden" />
                            <div className="relative w-full max-w-md">
                                <input type="text" placeholder="Search here..." className="p-3 pl-10 border border-gray-300 rounded-full w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600" />
                                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                        </div>
                        <div className="ml-4">
                            <i className="fas fa-circle text-gray-800"></i>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Access Our Resources</h1>
                    <p className="text-gray-600 mb-8">
                        Even princess and everything na lie na lie and everything na lie na lie Even princess and everything na lie na lie and everything na lie na lie Even princess and everything na lie na lie and everything na lie na lie
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array(6).fill().map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="relative">
                                    <img src="/images/resource.png" alt="Hands holding each other" className="w-full h-48 object-cover" />
                                    <span className="absolute top-2 left-2 bg-[#D917EB] text-white text-xs font-semibold px-2 py-1 rounded">New</span>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center mb-2">
                                        <span className="text-purple-600 font-semibold">By Princess</span>
                                        <img src="/images/user_image.png" alt="Author's profile picture" className="w-8 h-8 rounded-full ml-auto" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-2">What if?</h2>
                                    <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                                    <button className="bg-[#D917EB] text-white font-semibold py-2 px-4 rounded w-full">Read Article</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    </div>
  );
}