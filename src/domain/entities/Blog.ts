export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: {
    id: string;
    name: string;
  };
  publishedAt: Date;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
} 