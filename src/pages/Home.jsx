import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CTA from '../components/home/CTA';
import GalleryPreview from '../components/home/GalleryPreview';
import Testimonials from '../components/home/Testimonials';

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <WhyChooseUs />
      <CTA />
      <GalleryPreview />
      <Testimonials />
    </>
  );
}

export default Home;
