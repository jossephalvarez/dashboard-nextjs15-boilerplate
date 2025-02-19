'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { postStore } from '@/store/postStore';
import Link from 'next/link';

const PostList = () => {
  const { posts, loading, error, getPosts } = postStore();

  useEffect(() => {
    getPosts();
  }, []);

  const [filterPost, setFilterPost] = useState('');

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      return post.title.toLowerCase().includes(filterPost.toLowerCase());
    });
  }, [posts, filterPost]);

  if (loading) return <p>...Loading</p>;
  if (error) return <p>...Error</p>;
  return (
    <div>
      <input
        type="text"
        value={filterPost}
        onChange={(e) => setFilterPost(e.target.value)}
        placeholder="Buscar post..."
      />
      <ul>
        {filteredPosts.map((p) => (
          <li
            key={p.id}
            className="p-2 bg-gray-100 rounded-md shadow-md hover:bg-gray-200"
          >
            <Link href={`/post/${p.id}`}>
              {p.title}-{p.body}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
