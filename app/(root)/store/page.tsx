import { CategoriesSelection } from "@/components/storefront/CategoriesSelection";
// import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { Hero } from "@/components/storefront/Hero";
import { Footer } from "@/components/storefront/Footer";

export default function IndexPage() {
  return (
    <div>
      <Hero />
      <CategoriesSelection />
      {/* <FeaturedProducts /> */}
      <Footer />
    </div>
  );
}