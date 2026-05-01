import CountryCardSkeleton from './CountryLoading';
import { HiSearch, HiChevronDown } from 'react-icons/hi';

const HomeLoading = () => {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Skeleton Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-4 md:px-16 pb-10">
        {[...Array(8)].map((_, i) => (
          <CountryCardSkeleton key={i} />
        ))}
      </section>
    </div>
  );
};

export default HomeLoading;
