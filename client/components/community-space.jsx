'use client'

import { useState } from 'react'
import {
  Bell,
  Bookmark,
  Home,
  Image,
  Layout,
  Menu,
  MessageSquare,
  Search,
  Share2,
  ThumbsUp,
  Video,
  X,
} from 'lucide-react';
import NextImage from 'next/image'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

const posts = [
  {
    id: 1,
    author: 'Mimi Jeff',
    avatar: '/placeholder.svg?height=40&width=40',
    timestamp: '08:39 am',
    content: 'Lorem ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Fringilla Natoque Id Aenean.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-15%20at%2023.47.30-g2fwBGm91pwGjme0jdf4jGK1AqhBoQ.png',
    likes: 1964,
    comments: 135,
  },
  // Add more posts here if needed
]

export function CommunitySpaceComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [postContent, setPostContent] = useState('')

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const handlePostSubmit = (e) => {
    e.preventDefault()
    console.log('New post:', postContent)
    setPostContent('')
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
            { icon: MessageSquare, label: 'Community Space', active: true },
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
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>CU</AvatarFallback>
            </Avatar>
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
            <Input
              type="search"
              placeholder="Search here..."
              className="w-full max-w-xs"
              startIcon={<Search className="w-4 h-4 text-gray-400" />} />
          </div>
        </header>

        {/* Community Space Content */}
        <div className="max-w-2xl mx-auto p-4">
          {/* Post Creation */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <form onSubmit={handlePostSubmit}>
                <div className="flex items-center mb-4">
                  <Avatar className="mr-4">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>CU</AvatarFallback>
                  </Avatar>
                  <Textarea
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="flex-grow" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <Button variant="ghost" size="sm" className="mr-2">
                      <Image className="w-4 h-4 mr-2" />
                      Image
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4 mr-2" />
                      Videos
                    </Button>
                  </div>
                  <Button type="submit">Post</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Posts */}
          {posts.map((post) => (
            <Card key={post.id} className="mb-6">
              <CardHeader className="flex flex-row items-center">
                <Avatar className="mr-4">
                  <AvatarImage src={post.avatar} alt={post.author} />
                  <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{post.author}</h3>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.content}</p>
                <NextImage
                  src={post.image}
                  alt="Post image"
                  width={500}
                  height={300}
                  className="rounded-lg w-full" />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </CardFooter>
            </Card>
          ))}
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