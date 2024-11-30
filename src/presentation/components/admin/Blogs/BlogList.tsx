"use client";

import { format } from "path";
import { useState } from "react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  isPublished: boolean;
}

export function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Blog Yazıları</h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Yeni Blog Yazısı
          </button>
        </div>

        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{blog.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{blog.excerpt}</p>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>{blog.author}</span>
                    <span>{format(blog.publishedAt, 'PP', { locale: tr })}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${blog.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {blog.isPublished ? 'Yayında' : 'Taslak'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-indigo-600 hover:text-indigo-800">Düzenle</button>
                  <button className="text-red-600 hover:text-red-800">Sil</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 