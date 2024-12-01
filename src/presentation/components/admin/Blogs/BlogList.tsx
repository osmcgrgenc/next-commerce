"use client";

import { Blog } from "@/domain/entities/Blog";
import { BlogService } from "@/application/services/admin/BlogService";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useMemo } from "react";
import { BaseList } from "../../common/BaseList";

interface BlogListProps {
  blogService: BlogService;
}

export function BlogList({ blogService }: BlogListProps) {
  const columns = useMemo(() => [
    {
      header: "Başlık",
      accessor: (blog: Blog) => blog.title,
    },
    // ... diğer kolonlar
  ], []);

  return (
    <BaseList<Blog>
      service={blogService}
      columns={columns}
      title="Blog Yazıları"
      createButtonText="Yeni Blog Yazısı"
      onCreateClick={() => {/* navigate to create page */}}
    />
  );
} 