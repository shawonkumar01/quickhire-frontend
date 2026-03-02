import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import BannerSection from './components/BannerSection';
import FeaturedJobsSection from './components/FeaturedJobsSection';
import LatestJobsSection from './components/LatestJobsSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <BannerSection />
      <FeaturedJobsSection />
      <LatestJobsSection />
      <Footer />
    </div>
  );
}