"use client"
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
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon
} from 'lucide-react';
import NextImage from 'next/image'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import SidebarComponent from '@/components/Sidebar';
import { createPost, getPosts, likePost, createComment, getComments } from '@/utils/api';

export default function CommunitySpaceComponent() {
  const [postContent, setPostContent] = useState('')
  const [posts, setPosts] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedImagePreview, setSelectedImagePreview] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedPostForShare, setSelectedPostForShare] = useState(null)
  const [comments, setComments] = useState({})
  const [showComments, setShowComments] = useState({})
  const [newCommentContent, setNewCommentContent] = useState({})
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsData = await getPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch posts. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setSelectedImagePreview(URL.createObjectURL(file));
    }
  }

  


  const fetchComments = async (postId) => {
    try {
      const commentsData = await getComments(postId);
      setComments(prev => ({
        ...prev,
        [postId]: commentsData
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch comments. Please try again.",
        variant: "destructive",
      });
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
      
      await createPost(formData);
      
      setPostContent('');
      setSelectedImage(null);
      setSelectedImagePreview(null);
      await fetchPosts();
      toast({
        title: "Success",
        description: "Post created successfully!",
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  }

  const handleToggleComments = async (postId) => {
    setShowComments(prev => {
      const newState = { ...prev, [postId]: !prev[postId] };
      if (newState[postId]) {
        fetchComments(postId);
      }
      return newState;
    });
  };

  const handleCommentSubmit = async (postId, e) => {
    e.preventDefault();
    
    try {
      const content = newCommentContent[postId];
      if (!content || content.trim().length === 0) {
        toast({
          title: "Error",
          description: "Comment cannot be empty",
          variant: "destructive",
        });
        return;
      }

      const newComment = await createComment(postId, content);
      
      // Update comments in state
      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment]
      }));
      
      // Clear comment input
      setNewCommentContent(prev => ({ ...prev, [postId]: '' }));
      
      // Refresh comments
      await fetchComments(postId);
      
      toast({
        title: "Success",
        description: "Comment added successfully!",
      });
    } catch (error) {
      console.error('Error creating comment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await likePost(postId);
      await fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
      toast({
        title: "Error",
        description: "Failed to like post. Please try again.",
        variant: "destructive",
      });
    }
  }

  const handleShare = async (postId, platform) => {
    const postUrl = `${window.location.origin}/post/${postId}`;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(postUrl);
          toast({
            title: "Success",
            description: "Link copied to clipboard!",
          });
          return;
        } catch (error) {
          console.error('Error copying to clipboard:', error);
          toast({
            title: "Error",
            description: "Failed to copy link. Please try again.",
            variant: "destructive",
          });
          return;
        }
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setShowShareModal(false);
  }
  
  
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarComponent />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto p-4">
          {/* Create Post Card */}
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
                   
                  </div>
                  <Button type="submit">Post</Button>
                </div>              </form>
            </CardContent>
          </Card>

          {/* Posts List */}
          {posts.map((post) => (
            <Card key={post._id} className="mb-8">
              <CardHeader className="flex flex-row items-center">
                <Avatar className="mr-4">
                  <AvatarImage src={post.author.avatar || '/placeholder.svg'} alt={post.author.username} />
                  <AvatarFallback>{post.author.username?.charAt(0).toUpperCase()}</AvatarFallback>
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
              <CardFooter className="flex flex-col">
                <div className="flex justify-between w-full mb-4">
                  <Button variant="ghost" size="sm" onClick={() => handleLikePost(post._id)}>
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleToggleComments(post._id)}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {post.comments?.length || 0}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedPostForShare(post._id)}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Share this post</DialogTitle>
                        <DialogDescription>
                          Choose a platform to share this post
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex flex-col space-y-4">
                        <Button variant="outline" onClick={() => handleShare(post._id, 'facebook')}>
                          <Facebook className="w-4 h-4 mr-2" />
                          Share on Facebook
                        </Button>
                        <Button variant="outline" onClick={() => handleShare(post._id, 'twitter')}>
                          <Twitter className="w-4 h-4 mr-2" />
                          Share on Twitter
                        </Button>
                        <Button variant="outline" onClick={() => handleShare(post._id, 'linkedin')}>
                          <Linkedin className="w-4 h-4 mr-2" />
                          Share on LinkedIn
                        </Button>
                        <Button variant="outline" onClick={() => handleShare(post._id, 'copy')}>
                          <LinkIcon className="w-4 h-4 mr-2" />
                          Copy Link
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                            </div>

                {/* Comments section */}
                {showComments[post._id] && (
                  <div className="w-full">
                    {/* Comment form */}
                    <form onSubmit={(e) => handleCommentSubmit(post._id, e)} className="mb-4">
                    <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/images/user_image.png" alt="User" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Input
                          placeholder="Write a comment..."
                          value={newCommentContent[post._id] || ''}
                          onChange={(e) => setNewCommentContent(prev => ({
                            ...prev,
                            [post._id]: e.target.value
                          }))}
                          className="flex-grow"
                        />
                        <Button type="submit" size="sm">Post</Button>
                      </div>                    </form>
                    
                    {/* Comments list */}
                    <div className="space-y-4">
                      {comments[post._id]?.map((comment) => (
                        <div key={comment._id} className="flex items-start gap-2">
                          <Avatar className="w-8 h-8">
                          <AvatarImage src={post.author.avatar || '/placeholder.svg'} alt={post.author.username} />
                          <AvatarFallback>{post.author.username?.charAt(0).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div className="flex-grow bg-gray-50 rounded-lg p-2">
                            <p className="font-semibold text-sm">{comment.author.username}</p>
                            <p className="text-sm">{comment.content}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(comment.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}