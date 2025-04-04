import Image from "next/image";
import Link from "next/link";
import books from "@/public/books.png";
import clothing from "@/public/clothing.png";
import electronics from "@/public/electronics.png";
import notes from "@/public/notes.png";
import stationaries from "@/public/stationaries.png";
import other from "@/public/other.png";

export function CategoriesSelection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-white">
          Shop by Category
        </h2>

        <Link
          className="text-sm font-semibold text-white"
          href="/products/all"
        >
          Browse all Products &rarr;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        <div className="aspect-w-2 aspect-h-1 sm:aspect-w-1 group relative overflow-hidden rounded-xl sm:row-span-1">
          <Link href="/products/books">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <Image
              src={books}
              alt="Books Image"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-lg font-bold text-white">Books</h3>
              <p className="text-sm text-white">Shop Now</p>
            </div>
          </Link>
        </div>

        <div className="aspect-w-2 aspect-h-1 sm:aspect-w-1 group relative overflow-hidden rounded-xl sm:row-span-1">
          <Link href="/products/clothing">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <Image
              src={clothing}
              alt="Clothing Image"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-lg font-bold text-white">Clothing</h3>
              <p className="text-sm text-white">Shop Now</p>
            </div>
          </Link>
        </div>

        <div className="aspect-w-2 aspect-h-1 sm:aspect-w-1 group relative overflow-hidden rounded-xl sm:row-span-1">
          <Link href="/products/electronics">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <Image
              src={electronics}
              alt="Electronics Image"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-lg font-bold text-white">Electronics</h3>
              <p className="text-sm text-white">Shop Now</p>
            </div>
          </Link>
        </div>

        <div className="aspect-w-2 aspect-h-1 sm:aspect-w-1 group relative overflow-hidden rounded-xl sm:row-span-1">
          <Link href="/products/notes">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <Image
              src={notes}
              alt="Notes Image"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-lg font-bold text-white">Notes</h3>
              <p className="text-sm text-white">Shop Now</p>
            </div>
          </Link>
        </div>

        <div className="aspect-w-2 aspect-h-1 sm:aspect-w-1 group relative overflow-hidden rounded-xl sm:row-span-1">
          <Link href="/products/stationaries">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <Image
              src={stationaries}
              alt="Stationaries Image"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-lg font-bold text-white">Stationaries</h3>
              <p className="text-sm text-white">Shop Now</p>
            </div>
          </Link>
        </div>

        <div className="aspect-w-2 aspect-h-1 sm:aspect-w-1 group relative overflow-hidden rounded-xl sm:row-span-1">
          <Link href="/products/other">
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <Image
              src={other}
              alt="Other Image"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-lg font-bold text-white">Other</h3>
              <p className="text-sm text-white">Shop Now</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}