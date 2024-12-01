"use client";

import { Blog } from "@/domain/entities/Blog";
import { BlogService } from "@/application/services/admin/BlogService";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useMemo } from "react";
import { BaseList } from "../../common/BaseList";
import { useRouter } from "next/navigation";

interface BlogListProps {
  blogService: BlogService;
}

export function BlogList({ blogService }: BlogListProps) {
  const navigate = useRouter();
  const columns = useMemo(() => [
    {
      header: "Başlık",
      accessor: (blog: Blog) => blog.title,
    },
    {
      header: "Yazar",
      accessor: (blog: Blog) => blog.author.name,
    },
    {
      header: "Durum",
      accessor: (blog: Blog) => (
        <span className={`px-2 py-1 text-xs font-medium rounded-full
          ${blog.isPublished ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`
        }>
          {blog.isPublished ? "Yayında" : "Taslak"}
        </span>
      ),
    },
    {
      header: "Yayın Tarihi",
      accessor: (blog: Blog) => 
        blog.publishedAt ? format(new Date(blog.publishedAt), 'dd MMM yyyy', { locale: tr }) : "-",
    },
    {
      header: "Son Güncelleme",
      accessor: (blog: Blog) => 
        format(new Date(blog.updatedAt), 'dd MMM yyyy', { locale: tr }),
    },
    {
      header: "İşlemler",
      align: "right" as const,
      accessor: (blog: Blog) => (
        <div className="space-x-2">
          <button onClick={() => { navigate.push(`/admin/blogs/${blog.id}/edit`) }} className="text-indigo-600 hover:text-indigo-900">
            Düzenle
          </button>
          <button className="text-red-600 hover:text-red-900">
            Sil
          </button>
        </div>
      ),
    },
  ], []);

  return (
    <BaseList<Blog>
      service={blogService}
      columns={columns}
      title="Blog Yazıları"
      createButtonText="Yeni Blog Yazısı"
      onCreateClick={() => { navigate.push("/admin/blogs/create") }}
    />
  );
} 