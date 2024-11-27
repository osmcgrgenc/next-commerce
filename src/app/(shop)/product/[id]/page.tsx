'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, Truck, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Örnek ürün verisi
const product = {
  id: '1',
  name: 'Premium Deri Ceket',
  price: 2499.99,
  description: 'El yapımı premium deri ceket. İtalyan deri kullanılarak üretilmiştir.',
  images: [
    '/product-1.jpg',
    '/product-2.jpg',
    '/product-3.jpg',
    '/product-4.jpg'
  ],
  sizes: ['S', 'M', 'L', 'XL'],
  colors: ['Siyah', 'Kahverengi', 'Lacivert'],
  rating: 4.8,
  reviewCount: 128,
  details: {
    material: '%100 Hakiki Deri',
    care: 'Kuru temizleme önerilir',
    features: [
      'Su geçirmez kaplama',
      'Çıkarılabilir astar',
      'İç cepler',
      'Ayarlanabilir manşetler'
    ]
  }
};

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Ürün Görselleri */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-md bg-gray-100 
                  ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
              >
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Ürün Bilgileri */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-light mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.reviewCount} değerlendirme)
                </span>
              </div>
            </div>
            <p className="text-2xl font-medium mt-4">
              {product.price.toLocaleString('tr-TR', {
                style: 'currency',
                currency: 'TRY'
              })}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Beden</label>
              <Select onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Beden Seçin" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Renk</label>
              <Select onValueChange={setSelectedColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Renk Seçin" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
          </div>

          <Button size="lg" className="w-full" disabled={!selectedSize || !selectedColor}>Sepete Ekle</Button>

          <div className="grid grid-cols-3 gap-4 py-6 border-y">
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">Ücretsiz Kargo</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">Güvenli Ödeme</p>
            </div>
            <div className="text-center">
              <ArrowRight className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm">Kolay İade</p>
            </div>
          </div>

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Açıklama</TabsTrigger>
              <TabsTrigger value="details">Detaylar</TabsTrigger>
              <TabsTrigger value="care">Bakım</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                {product.details.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="care" className="mt-4">
              <p className="text-muted-foreground">{product.details.care}</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
