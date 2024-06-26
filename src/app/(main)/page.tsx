import AboutUs from "@/views/home/about-us";
import Banner from "@/views/home/banner";
import Benefits from "@/views/home/benefits";
import Carousels from "@/views/home/carousels";
import Categories from "@/views/home/categories";
import ECommerce from "@/views/home/e-commerce";
import FeaturedProducts from "@/views/home/featured-products";
import Footer from "@/views/home/footer";
import Testimonials from "@/views/home/testimonials";

export default function Home() {
  return (
    <>
      <ECommerce />
      <Carousels />
      <Benefits />
      <Categories />
      <FeaturedProducts />
      <Banner />
      <AboutUs />
      <Testimonials />
      <Footer />
    </>
  );
}
