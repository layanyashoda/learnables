import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProductImage } from "./ProductImage"; // Assuming ProductImage component exists

const FeaturedProducts = () => {
  const [randomProducts, setRandomProducts] = useState<any[]>([]);

  useEffect(() => {
    const products = [
      { id: 1, title: "Product 1", thumbnailUrl: "/images/product1.jpg", price: "$99.99" },
      { id: 2, title: "Product 2", thumbnailUrl: "/images/product2.jpg", price: "$59.99" },
      { id: 3, title: "Product 3", thumbnailUrl: "/images/product3.jpg", price: "$129.99" },
      { id: 4, title: "Product 4", thumbnailUrl: "/images/product4.jpg", price: "$199.99" },
      { id: 5, title: "Product 5", thumbnailUrl: "/images/product5.jpg", price: "$89.99" },
      { id: 6, title: "Product 6", thumbnailUrl: "/images/product6.jpg", price: "$49.99" },
    ];

    // Select random 3 products for demonstration
    setRandomProducts(products.sort(() => Math.random() - 0.5).slice(0, 3));
  }, []);

  return (
    <section className="py-10">
      <h2 className="mb-6 text-center text-2xl font-semibold">Featured Products</h2>
      <div className="flex justify-center gap-6">
        {randomProducts.map((product) => (
          <div key={product.id} className="w-80 overflow-hidden rounded-lg bg-white shadow-lg">
            <Link href={`/product/${product.id}`}>
              <a>
                <ProductImage imageUrl={product.thumbnailUrl} variant="medium" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-dark-400">{product.title}</h3>
                  <p className="text-sm text-dark-200">{product.price}</p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
