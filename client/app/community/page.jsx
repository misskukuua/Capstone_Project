'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Bell,
  Bookmark,
  Home,
  Image as ImageIcon,
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
import SidebarComponent from '@/components/Sidebar';
import { createPost, getPosts, likePost } from '@/utils/api';

export default function CommunitySpaceComponent() {
  const [postContent, setPostContent] = useState('')
  const [posts, setPosts] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImagePreview, setSelectedImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await getPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append('content', postContent);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
      
      const response = await createPost(formData);
      console.log('Post creation response:', response);
      
      setPostContent('');
      setSelectedImage(null);
      setSelectedImagePreview(null);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setSelectedImagePreview(URL.createObjectURL(file));
    }
  }

  const handleLikePost = async (postId) => {
    try {
      await likePost(postId);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarComponent />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-4">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <form onSubmit={handlePostSubmit}>
                <div className="flex items-center mb-4">
                  <Avatar className="mr-4">
                    <AvatarImage src="/images/user_image.png" alt="User" />
                    <AvatarFallback>CU</AvatarFallback>
                  </Avatar>
                  <Textarea
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="flex-grow"
                  />
                </div>
                {selectedImagePreview && (
                  <div className="mb-4 relative">
                    <NextImage
                      src={selectedImagePreview}
                      alt="Selected image"
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setSelectedImage(null);
                        setSelectedImagePreview(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mr-2"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <ImageIcon className="w-4 h-4 mr-2 text-blue-500" />
                      Image
                    </Button>
                    <Button type="button" variant="ghost" size="sm">
                      <Video className="w-4 h-4 mr-2 text-blue-500" />
                      Videos
                    </Button>
                  </div>
                  <Button type="submit">Post</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {posts.map((post) => (
            <Card key={post._id} className="mb-8 border-2 border-pink-300">
              <CardHeader className="flex flex-row items-center">
                <Avatar className="mr-4">
                  <AvatarImage src={post.author.avatar || '/placeholder.svg'} alt={post.author.username} />
                  <AvatarFallback>{post.author.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{post.author.username}</h3>
                  <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.content}</p>
                {post.image && (
                  <div className="relative w-full h-[300px]">
                    <NextImage
                      src={`http://localhost:5001${post.image}`}
                      alt="Post image"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" onClick={() => handleLikePost(post._id)}>
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
    </div>
  );
}