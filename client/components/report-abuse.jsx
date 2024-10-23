'use client'

import { useState } from 'react'
import { Bell, ChevronLeft, Home, Layout, Menu, MessageSquare, Settings, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ReportAbuseComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted')
  }

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
            { icon: Home, label: 'Dashboard' },
            { icon: MessageSquare, label: 'Community Space' },
            { icon: Layout, label: 'Connect With Counselor' },
            { icon: MessageSquare, label: 'Resources' },
            { icon: Bell, label: 'Report Abuse', active: true },
            { icon: Settings, label: 'Settings' },
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
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 lg:hidden"
              aria-label="Toggle sidebar">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex items-center text-sm">
              <ChevronLeft className="w-4 h-4 mr-1" />
              <span className="text-gray-500">Back</span>
              <span className="mx-2 text-gray-300">/</span>
              <span className="text-purple-600">Dashboard</span>
              <span className="mx-2 text-gray-300">/</span>
              <span className="text-gray-500">Report Abuse</span>
            </div>
          </div>
        </header>

        {/* Report Abuse Form */}
        <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
          <div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-3xl font-bold text-red-500 mb-4 sm:mb-0">Report Abuse</h2>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Emergency Contact +250786436776
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="text" placeholder="Full Name" required />
            <Input type="email" placeholder="Email" required />
            <Input type="text" placeholder="Type Of Abuse" required />
            <Textarea placeholder="Address" required />
            <div className="flex flex-col sm:flex-row gap-4">
              <Input type="tel" placeholder="Contact" className="flex-1" required />
              <Input type="number" placeholder="Age" className="w-full sm:w-32" required />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 text-lg">
              Submit
            </Button>
          </form>
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