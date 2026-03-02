import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import FeaturedJobsSection from './components/FeaturedJobsSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedJobsSection />
    </div>
  );
}