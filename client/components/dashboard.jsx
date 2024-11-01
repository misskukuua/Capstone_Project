'use client'

import { useState } from 'react'
import { Bell, Calendar, Home, Layout, Menu, MessageSquare, Search, X } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const dashboardItems = [
  { title: 'Community Space', icon: MessageSquare, description: 'Please add your content here. Keep it short and simple. And smile :)' },
  { title: 'Access Resources', icon: Layout, description: 'Please add your content here. Keep it short and simple. And smile :)' },
  { title: 'Connect with a counselor', icon: MessageSquare, description: 'Please add your content here. Keep it short and simple. And smile :)' },
  { title: 'Report Abuse', icon: Bell, description: 'Please add your content here. Keep it short and simple. And smile :)' },
]

export function DashboardComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    (<div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens / Drawer for smaller screens */}
      <aside
        className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-auto
        `}>
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-purple-800">HerArtSpace</h1>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <nav className="mt-6">
          {[
            { icon: Home, label: 'Dashboard', active: true },
            { icon: MessageSquare, label: 'Community Space' },
            { icon: Layout, label: 'Connect With Counselor' },
            { icon: MessageSquare, label: 'Resources' },
            { icon: Bell, label: 'Report Abuse' },
          ].map((item, index) => (
            <Link
              key={index}
              href="#"
              className={`flex items-center px-6 py-3 text-gray-600 hover:bg-purple-50 hover:text-purple-700 ${
                item.active ? 'bg-purple-100 text-purple-700' : ''
              }`}>
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <div className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="User"
              width={40}
              height={40}
              className="rounded-full" />
            <div className="ml-3">
              <p className="text-sm font-medium">Chisom Uche</p>
              <p className="text-xs text-gray-500">David@rayna.ui</p>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-4 lg:hidden"
                aria-label="Toggle sidebar">
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <Input
                type="search"
                placeholder="Search here..."
                className="w-full max-w-xs"
                startIcon={<Search className="w-4 h-4 text-gray-400" />} />
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          <div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Welcome Miss Chisom,</h2>
              <p className="text-gray-600">It's a sunny day today, we hope you're taking good care of your health 😊</p>
            </div>
            <div
              className="mt-4 sm:mt-0 flex items-center bg-white rounded-lg px-3 py-1 shadow">
              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-sm">Today's Date</span>
              <span className="text-sm font-semibold ml-2">1st July, 2023</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardItems.map((item, index) => (
              <Card key={index} className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">Get Started</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      {/* Overlay for smaller screens when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}></div>
      )}
    </div>)
  );
}