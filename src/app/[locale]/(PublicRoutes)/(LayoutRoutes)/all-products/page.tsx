"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Filter, ChevronDown, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import BuyerProductCard from "@/components/buyer-components/product/BuyerProductCard";
import { setBuyerProducts } from "@/store/buyerSlices/product/productSlice";
import { BuyerProductsData } from "@/data/BuyerProductsData";

export default function ProductsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBuyerProducts(BuyerProductsData));
  }, []);

  const { products } = useAppSelector((state) => state.buyerProducts);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Filtreleme işlemi
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Sıralama işlemi
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    }
    // Varsayılan olarak öne çıkanlar
    return 0;
  });

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <div
          className={`relative z-40 lg:hidden ${
            filterOpen ? "hidden" : "hidden"
          }`}
        >
          <div className="fixed inset-0 z-40 flex">
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filtreler</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setFilterOpen(false)}
                >
                  <span className="sr-only">Filtreleri kapat</span>
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <div className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Kategoriler</h3>
                <ul className="px-2 py-3 font-medium text-gray-900">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`block px-2 py-3 ${
                        selectedCategory === null ? "text-purple-600" : ""
                      }`}
                    >
                      Tüm Ürünler
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSelectedCategory("Erkek")}
                      className={`block px-2 py-3 ${
                        selectedCategory === "Erkek" ? "text-purple-600" : ""
                      }`}
                    >
                      Erkek T-Shirtler
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSelectedCategory("Kadın")}
                      className={`block px-2 py-3 ${
                        selectedCategory === "Kadın" ? "text-purple-600" : ""
                      }`}
                    >
                      Kadın T-Shirtler
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Tüm Ürünler
            </h1>

            <div className="flex items-center">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    onClick={() => setFilterOpen(!filterOpen)}
                  >
                    <Filter className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                    Filtrele
                  </button>
                </div>
              </div>

              <div className="ml-4 relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sırala
                    <ChevronDown
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <button
                      onClick={() => setSortBy("featured")}
                      className={`block px-4 py-2 text-sm ${
                        sortBy === "featured"
                          ? "font-medium text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      Öne Çıkanlar
                    </button>
                    <button
                      onClick={() => setSortBy("price-low")}
                      className={`block px-4 py-2 text-sm ${
                        sortBy === "price-low"
                          ? "font-medium text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      Fiyat: Düşükten Yükseğe
                    </button>
                    <button
                      onClick={() => setSortBy("price-high")}
                      className={`block px-4 py-2 text-sm ${
                        sortBy === "price-high"
                          ? "font-medium text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      Fiyat: Yüksekten Düşüğe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Ürünler
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className="hidden lg:block">
                <h3 className="text-lg font-medium text-gray-900">
                  Kategoriler
                </h3>
                <ul className="mt-4 space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  <li>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`${
                        selectedCategory === null ? "text-purple-600" : ""
                      }`}
                    >
                      Tüm Ürünler
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSelectedCategory("Erkek")}
                      className={`${
                        selectedCategory === "Erkek" ? "text-purple-600" : ""
                      }`}
                    >
                      Erkek T-Shirtler
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSelectedCategory("Kadın")}
                      className={`${
                        selectedCategory === "Kadın" ? "text-purple-600" : ""
                      }`}
                    >
                      Kadın T-Shirtler
                    </button>
                  </li>
                </ul>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {sortedProducts.map((product, index: number) => (
                    <BuyerProductCard
                      key={index}
                      image={product.images[0]}
                      category={product.category}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
