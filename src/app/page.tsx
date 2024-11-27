import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Shield, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-neutral-950 to-neutral-800">
        <div className="absolute inset-0">
          <Image
            src="/hero-image.jpg"
            alt="Luxury Fashion"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-6xl font-light mb-6">
              Zarafet ve Stil
              <span className="block font-normal mt-2">Bir Arada</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Seçkin markaların en özel koleksiyonlarını keşfedin
            </p>
            <Link 
              href="/collections"
              className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm font-medium hover:bg-black hover:text-white transition-colors"
            >
              KOLEKSİYONU KEŞFEDİN
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['KADIN', 'ERKEK', 'AKSESUAR'].map((category) => (
              <Link 
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="group relative h-[500px] overflow-hidden bg-neutral-100"
              >
                <Image
                  src={`/${category.toLowerCase()}.jpg`}
                  alt={category}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center text-white text-2xl font-light tracking-widest">
                  {category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <Truck className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Ücretsiz Kargo</h3>
              <p className="text-neutral-600">Tüm Türkiye&apos;ye ücretsiz kargo</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Güvenli Alışveriş</h3>
              <p className="text-neutral-600">256-bit SSL güvenlik sertifikası</p>
            </div>
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Hızlı Teslimat</h3>
              <p className="text-neutral-600">2-3 iş günü içinde teslimat</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}