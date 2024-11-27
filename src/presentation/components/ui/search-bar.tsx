'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './button';

export function SearchBar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <div className="relative">
        <input
          type="search"
          placeholder="Ürün, kategori veya marka ara..."
          className="w-full h-10 pl-4 pr-12 text-sm bg-background border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-10 w-10 px-3 text-muted-foreground hover:text-foreground"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Ara</span>
        </Button>
      </div>
    </form>
  );
}