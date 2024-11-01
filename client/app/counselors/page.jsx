'use client'

import { useState } from 'react'
import { Bell, ChevronLeft, Filter, Home, Layout, Menu, MessageSquare, Search, X } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import SidebarComponent from '@/components/Sidebar';

const initialCounselors = Array(6).fill(null).map((_, index) => ({
  id: index + 1,
  avatar: '/images/user_image.png?height=80&width=80',
  name: `Counselor ${index + 1}`,
  expertise: 'Three years of Expertise. Specialized in physical and mental health',
  availability: 'Monday to Friday, 9 AM - 5 PM'
}))

export default function ConnectWithCounselors() {
  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [counselors, setCounselors] = useState(initialCounselors)


  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase()
    setSearchTerm(term)
    if (term === '') {
      setCounselors(initialCounselors)
    } else {
      const filtered = initialCounselors.filter(counselor => 
        counselor.name.toLowerCase().includes(term) || 
        counselor.expertise.toLowerCase().includes(term))
      setCounselors(filtered)
    }
  }

  const handleFilter = () => {
    const filtered = initialCounselors.sort((a, b) => a.name.localeCompare(b.name))
    setCounselors(filtered)
  }

  return (
    (<div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens / Drawer for smaller screens */}
      <SidebarComponent />
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 lg:px-6">
            <div className="flex items-center">
              
              <Input
                type="search"
                placeholder="Search here..."
                className="w-full max-w-s rounded-[10px] bg-gray-100 border-none"
                value={searchTerm}
                onChange={handleSearch}
                starticon={<Search className="w-4 h-4 text-gray-400" />} />
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-500" />
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <div className="flex items-center px-4 py-2 text-sm overflow-x-auto lg:px-6">
            <ChevronLeft className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-gray-500 whitespace-nowrap">Back</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-purple-600 whitespace-nowrap">Dashboard</span>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-500 whitespace-nowrap">Meet Your Counselors</span>
            <div className="flex-1"></div>
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 whitespace-nowrap"
              onClick={() => setSearchTerm('')}>
              <Search className="w-4 h-4 mr-1" />
              Clear Search
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="whitespace-nowrap"
              onClick={handleFilter}>
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
          </div>
        </header>
        <div className='mt-20' />

        {/* Counselor Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 lg:p-6">
          {counselors.map((counselor) => (
            <div
              key={counselor.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <Image
                src={counselor.avatar}
                alt={`Counselor ${counselor.name}`}
                width={120}
                height={120}
                className="rounded-full mb-4" />
              <h3 className="text-lg font-semibold mb-2">{counselor.name}</h3>
              <p className="text-center text-sm mb-4">{counselor.expertise}</p>
              <Button
                className="bg-[#D917EB] hover:bg-purple-600 text-white"
                onClick={() => setSelectedCounselor(counselor)}>
                Book a session
              </Button>
            </div>
          ))}
        </div>
      </main>
      {/* Overlay for smaller screens when sidebar is open */}
      
      {/* Booking Modal */}
      <Dialog
        open={!!selectedCounselor}
        onOpenChange={() => setSelectedCounselor(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book a Session with {selectedCounselor?.name}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p>Expertise: {selectedCounselor?.expertise}</p>
            <p>Availability: {selectedCounselor?.availability}</p>
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => window.open('https://calendly.com/p-asare-alustudent/30min', '_blank')}>
              Book via Calendly
            </Button>
          
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>)
  );
}