import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../AppContext';
import { TOURS, VEHICLES, REVIEWS, CITIES } from '../data';
import { Shield, Sparkles, Star, Users, Briefcase, Car, Route, Plane, Navigation, Calendar, Check, MessageSquare, ArrowRight, ArrowLeft, Clock, Compass, Handshake, Globe, ChevronLeft, ChevronRight, Heart, Mail, Send, CheckCircle2 } from 'lucide-react';
import CheckoutModal from '../components/CheckoutModal';
import { motion, AnimatePresence } from 'motion/react';

const WHY_CHOOSE_US = [
  {
    id: 1,
    icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Professional Drivers",
    description: "Our tourist-certified, English-speaking drivers understand local traffic, regional history, and professional hospitality."
  },
  {
    id: 2,
    icon: <Shield className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Fixed Transparent Pricing",
    description: "Zero surprise charges or fuel markups. Tolls, parking permits, tourist park entry, and service taxes are bundled strictly in advance."
  },
  {
    id: 3,
    icon: <Car className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Comfortable Vehicles",
    description: "Our young fleet (Avanza, Innova, Hiace Premio) is meticulously cleaned daily and features pristine, ice-cold air conditioning."
  },
  {
    id: 4,
    icon: <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "24/7 Support",
    description: "Incredible real-time support over WhatsApp and Email. Manage, reschedule, or cancel bookings effortlessly."
  },
  {
    id: 5,
    icon: <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Seamless Booking",
    description: "Book in under a minute with custom routes and flexible options. Get instant confirmation via WhatsApp."
  },
  {
    id: 6,
    icon: <Compass className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Verified Local Guides",
    description: "Our guides are certified experts with deep local knowledge of East Java's culture, geography, and safety."
  },
  {
    id: 7,
    icon: <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Premium Safety & Hygiene",
    description: "Every vehicle is completely sanitized before and after every trip. Fully licensed fleet with safety packages."
  },
  {
    id: 8,
    icon: <Route className="h-5 w-5 sm:h-6 sm:w-6" />,
    title: "Tailor-Made Itineraries",
    description: "Absolute routing freedom. Customize your stops, photo opportunities, and timing on the fly."
  }
];

const HERO_SLIDES = [
  {
    image: '/bromo.png',
    candidates: ['/bromo.png', '/bromo.jpg', '/bromo.jpeg', '/bromo.webp'],
    fallback: 'https://images.unsplash.com/photo-1588668214407-6eb97207c83a?auto=format&fit=crop&w=1920&q=80',
    title: 'Keindahan Golden Sunrise Gunung Bromo',
    subtitle: 'Saksikan matahari terbit legendaris dengan latar samudera pasir dan kawah aktif yang megah.',
  },
  {
    image: '/tumpak-sewu.png',
    candidates: ['/tumpak-sewu.png', '/tumpak-sewu.jpg', '/tumpak-sewu.jpeg', '/tumpak-sewu.webp'],
    fallback: 'https://images.unsplash.com/photo-1621360841013-c7683c659ec6?auto=format&fit=crop&w=1920&q=80',
    title: 'Keindahan Air Terjun Tumpak Sewu',
    subtitle: 'Petualangan trekking menyusuri tebing megah air terjun seribu berselimut kabut alami.',
  },
  {
    image: '/kawah-ijen.png',
    candidates: ['/kawah-ijen.png', '/kawah-ijen.jpeg', '/kawah-ijen.jpg', '/kawah-ijen.webp'],
    fallback: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=1920&q=80',
    title: 'Pesona Kawah Ijen Blue Fire',
    subtitle: 'Saksikan nyala api biru belerang yang legendaris serta danau asam hijau toska.',
  },
  {
    image: '/bali.png',
    candidates: ['/bali.png', '/bali.jpg', '/bali.jpeg', '/bali.webp'],
    fallback: 'https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=1920&q=80',
    title: 'Surga Tropis Pulau Bali',
    subtitle: 'Eksplorasi pura kuno yang anggun, pantai pasir putih hangat, dan budaya surgawi.',
  },
  {
    image: '/nusa-penida.png',
    candidates: ['/nusa-penida.png', '/nusa-penida.jpg', '/nusa-penida.jpeg', '/nusa-penida.webp'],
    fallback: 'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?auto=format&fit=crop&w=1920&q=80',
    title: 'Eksotis Nusa Penida Kelingking',
    subtitle: 'Nikmati tebing pantai berbentuk T-Rex legendaris dengan air biru laut yang memukau.',
  },
];

export default function HomeView() {
  const { setPage, formatPrice, searchParams, setSearchParams, tours, reviews, addReview } = useApp();
  
  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>([]);
  const toggleWishlist = (tourId: string) => {
    setWishlist(prev => 
      prev.includes(tourId) 
        ? prev.filter(id => id !== tourId) 
        : [...prev, tourId]
    );
  };
  
  // Hero Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCandidateIndex, setSlideCandidateIndex] = useState<Record<number, number>>({});

  const getSlideImageSrc = (slideIndex: number) => {
    const slide = HERO_SLIDES[slideIndex];
    if (!slide) return '';
    const candidateIdx = slideCandidateIndex[slideIndex] ?? 0;
    if (slide.candidates && candidateIdx < slide.candidates.length) {
      return slide.candidates[candidateIdx];
    }
    return slide.fallback;
  };

  const handleSlideImageError = (slideIndex: number) => {
    setSlideCandidateIndex((prev) => {
      const currentIdx = prev[slideIndex] ?? 0;
      return { ...prev, [slideIndex]: currentIdx + 1 };
    });
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);
  
  // Partnerships State
  const [partners, setPartners] = useState<any[]>([]);
  React.useEffect(() => {
    const stored = localStorage.getItem('smartjourney_partners');
    if (stored) {
      try {
        setPartners(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse partners in HomeView', e);
      }
    } else {
      const defaultPartners = [
        {
          id: 'traveloka',
          name: 'Traveloka',
          description: 'Southeast Asia’s leading travel platform, enabling users to discover and purchase a wide range of flights, accommodations, local experiences, and financial services.',
          url: 'https://www.traveloka.com',
          category: 'Travel Platform',
          logoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=150&q=80'
        },
        {
          id: 'trip-com',
          name: 'Trip.com',
          description: 'A global travel service provider offering flight tickets, hotel reservations, train tickets, car rentals, and tour guides in over 200 countries.',
          url: 'https://www.trip.com',
          category: 'Travel Platform',
          logoUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=150&q=80'
        },
        {
          id: 'booking-com',
          name: 'Booking.com',
          description: 'One of the world’s leading digital travel companies, connecting travelers with the largest selection of incredible places to stay, from homes to hotels.',
          url: 'https://www.booking.com',
          category: 'Accommodation',
          logoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=150&q=80'
        }
      ];
      setPartners(defaultPartners);
      localStorage.setItem('smartjourney_partners', JSON.stringify(defaultPartners));
    }
  }, []);
  
  // Hero Search Widget State
  const [destination, setDestination] = useState('bromo');
  const [tourDate, setTourDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [tourType, setTourType] = useState('Adventure');
  const [searchResults, setSearchResults] = useState<any>(null);

  // Checkout Modal State
  const [selectedTourForBooking, setSelectedTourForBooking] = useState<any>(null);

  // Newsletter Subscription State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@') || !newsletterEmail.includes('.')) {
      setNewsletterError('Silakan masukkan alamat email yang valid.');
      return;
    }
    setNewsletterError(null);
    setIsSubscribed(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter tours based on search criteria
    const filtered = tours.filter(t => 
      t.id === destination || t.category === tourType
    );
    setSearchResults(filtered.length > 0 ? filtered : tours);
    
    // Smooth scroll down to results
    setTimeout(() => {
      const el = document.getElementById('search-results-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Only display reviews that are approved or have no status field (pre-seeded default reviews)
  const localReviews = reviews.filter(r => r.status !== 'pending');

  const [isHoveringReviews, setIsHoveringReviews] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);

  const handleReviewsScroll = () => {
    const container = reviewsContainerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;
    setScrollProgress(container.scrollLeft / maxScroll);
  };

  const scrollReviews = (direction: 'left' | 'right') => {
    const container = reviewsContainerRef.current;
    if (!container) return;
    
    const scrollAmount = container.clientWidth;
    if (direction === 'left') {
      if (container.scrollLeft <= 10) {
        container.scrollTo({
          left: container.scrollWidth - container.clientWidth,
          behavior: 'smooth'
        });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 15) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollToPercent = (percent: number) => {
    const container = reviewsContainerRef.current;
    if (!container) return;
    container.scrollTo({
      left: percent * (container.scrollWidth - container.clientWidth),
      behavior: 'smooth'
    });
  };

  // Auto-play interval - slides automatically and slowly to the right
  useEffect(() => {
    if (isHoveringReviews) return;
    const interval = setInterval(() => {
      scrollReviews('right');
    }, 5000);
    return () => clearInterval(interval);
  }, [isHoveringReviews, localReviews]);

  const triggerCheckout = (tour: any) => {
    setSelectedTourForBooking({
      tour,
      details: {
        date: tourDate || '2026-07-10',
        guests: Number(guests),
        tourId: tour.id,
        tourType
      }
    });
  };

  // Interactive Services Directory State
  const [activeService, setActiveService] = useState<'tours' | 'share-tour' | 'airport' | 'taxi' | 'car-rental'>('tours');

  // Bento Grid Mouse Drag Scroll State
  const bentoRef = useRef<HTMLDivElement>(null);
  const [bentoDrag, setBentoDrag] = useState({
    isDown: false,
    startX: 0,
    scrollLeft: 0
  });

  const handleBentoMouseDown = (e: React.MouseEvent) => {
    const container = bentoRef.current;
    if (!container) return;
    setBentoDrag({
      isDown: true,
      startX: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft
    });
  };

  const handleBentoMouseLeave = () => {
    setBentoDrag(prev => ({ ...prev, isDown: false }));
  };

  const handleBentoMouseUp = () => {
    setBentoDrag(prev => ({ ...prev, isDown: false }));
  };

  const handleBentoMouseMove = (e: React.MouseEvent) => {
    if (!bentoDrag.isDown) return;
    e.preventDefault();
    const container = bentoRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - bentoDrag.startX) * 1.5; // multiplier for drag sensitivity
    container.scrollLeft = bentoDrag.scrollLeft - walk;
  };

  return (
    <div id="home-view" className="relative text-neutral-800 overflow-hidden bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:h-[80vh] lg:min-h-[640px] flex flex-col lg:flex-row items-center justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-36 lg:pb-20 overflow-hidden bg-neutral-950 lg:bg-transparent">
        {/* Background Slideshow with Crossfade (Desktop only - landscape fits screen ratio naturally) */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={getSlideImageSrc(currentSlide)}
                alt={HERO_SLIDES[currentSlide].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={() => handleSlideImageError(currentSlide)}
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-black/40 to-black/60 z-[1]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center w-full">
          
          {/* Mobile/Tablet Inline Slideshow (Ensures landscape images fit perfectly without cropping) */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[2/1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl lg:hidden border border-neutral-800 bg-neutral-900 mb-6 z-10">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={getSlideImageSrc(currentSlide)}
                  alt={HERO_SLIDES[currentSlide].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => handleSlideImageError(currentSlide)}
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/40 z-[1]" />
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 font-extrabold uppercase tracking-widest font-mono text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full border border-amber-500/30 backdrop-blur-sm drop-shadow-md">
                  ★ {currentSlide === 0 ? 'Penawaran Spesial' : 'Destinasi Impian Indonesia'}
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6.5xl font-black tracking-tight text-white leading-tight drop-shadow-xl">
                  {HERO_SLIDES[currentSlide].title}
                </h1>
                <p className="text-sm sm:text-lg text-neutral-200 lg:text-neutral-100 font-medium max-w-2xl mx-auto drop-shadow-sm leading-relaxed">
                  {HERO_SLIDES[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="pt-6 lg:hidden">
              <button
                onClick={() => setPage('tours')}
                className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Compass className="h-4.5 w-4.5" />
                <span>Explore Tour</span>
              </button>
            </div>
          </div>

          {/* Tour Search Widget */}
          <div className="mt-8 lg:mt-12 w-full max-w-4xl mx-auto bg-white/95 border border-neutral-200/80 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-md text-neutral-800">
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
              
              {/* Destination */}
              <div className="text-left space-y-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest pl-1">Destination</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-xl px-3 py-3 text-base lg:text-sm w-full focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                >
                  <option value="bromo" className="bg-white text-neutral-800">Mount Bromo Volcano</option>
                  <option value="ijen" className="bg-white text-neutral-800">Ijen Crater Blue Fire</option>
                  <option value="tumpak-sewu" className="bg-white text-neutral-800">Tumpak Sewu Waterfall</option>
                  <option value="malang-city" className="bg-white text-neutral-800">Malang &amp; Batu Tour</option>
                </select>
              </div>

              {/* Tour Date */}
              <div className="text-left space-y-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest pl-1">Tour Date</label>
                <input
                  type="date"
                  required
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                  className="bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-xl px-3 py-3 text-base lg:text-sm w-full focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                />
              </div>

              {/* Number of Guests */}
              <div className="text-left space-y-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest pl-1">Guests</label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  required
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-xl px-3 py-3 text-base lg:text-sm w-full focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                />
              </div>

              {/* Tour Type */}
              <div className="text-left space-y-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest pl-1">Tour Type</label>
                <select
                  value={tourType}
                  onChange={(e) => setTourType(e.target.value)}
                  className="bg-neutral-50 border border-neutral-200 text-neutral-800 rounded-xl px-3 py-3 text-base lg:text-sm w-full focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                >
                  <option value="Adventure" className="bg-white text-neutral-800">Adventure</option>
                  <option value="Nature" className="bg-white text-neutral-800">Nature Safari</option>
                  <option value="City" className="bg-white text-neutral-800">City Culture</option>
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3.5 rounded-xl text-sm w-full transition-all shadow-md shadow-amber-500/15 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Find Tours
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>

      {/* DYNAMIC SEARCH RESULTS SECTION */}
      {searchResults && (
        <section id="search-results-section" className="py-16 bg-neutral-50 border-t border-b border-neutral-200/80 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-amber-600 font-bold uppercase tracking-widest font-mono text-xs">Search Results</span>
                <h3 className="text-2xl font-bold text-neutral-900 mt-1">Available Tour Packages</h3>
              </div>
              <button
                onClick={() => setSearchResults(null)}
                className="text-neutral-600 hover:text-neutral-900 text-xs border border-neutral-200 px-3 py-1.5 rounded-xl hover:bg-neutral-100"
              >
                Clear Results
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((tour: any) => (
                <div key={tour.id} className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-neutral-300/85 transition-all flex flex-col justify-between group">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 bg-amber-500 text-neutral-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {tour.category}
                    </span>
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-neutral-900 leading-tight mb-2">{tour.name}</h4>
                      <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">{tour.description}</p>
                      <div className="flex items-center space-x-4 mb-4 text-xs text-neutral-500 border-b border-neutral-100 pb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-amber-500" />
                          <span>{tour.duration}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                          <span>{tour.rating} ({tour.reviewCount} Reviews)</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-[10px] text-neutral-400 block uppercase font-mono">From</span>
                        <span className="text-xl font-black text-amber-600">{formatPrice(tour.startingPrice, tour.startingPriceIDR)}</span>
                        <span className="text-[10px] text-neutral-500"> / pax</span>
                      </div>
                      <button
                        onClick={() => triggerCheckout(tour)}
                        className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1 shadow-md shadow-amber-500/10 transition-colors"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2. WHY CHOOSE SMARTJOURNEY */}
      <section className="py-8 md:py-12 lg:py-14 bg-gradient-to-b from-neutral-50/30 via-white to-neutral-50/30 relative">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 sm:mb-10 gap-4">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 font-extrabold uppercase tracking-widest font-mono text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full border border-amber-500/20">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Excellence Guaranteed</span>
              </span>
              <h2 className="text-2xl sm:text-4.5xl font-black text-neutral-900 tracking-tight leading-none mt-2">
                Why Travelers Choose SmartJourney
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-xl font-medium">
                Experience East Java with a professional transport fleet, highly rated local experts, and full customer security.
              </p>
              <div className="h-1.5 w-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mt-3" />
            </div>
          </div>

          {/* Premium Bento Grid - Perfectly responsive: 2 columns swipeable on mobile/desktop, 4 columns grid on desktop */}
          <div
            ref={bentoRef}
            onMouseDown={handleBentoMouseDown}
            onMouseLeave={handleBentoMouseLeave}
            onMouseUp={handleBentoMouseUp}
            onMouseMove={handleBentoMouseMove}
            className={`flex lg:grid lg:grid-cols-4 overflow-x-auto lg:overflow-visible ${bentoDrag.isDown ? 'cursor-grabbing' : 'snap-x snap-mandatory scroll-smooth cursor-grab'} [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 lg:mx-0 lg:px-0 gap-3 sm:gap-6 lg:gap-8 pb-4 lg:pb-0 select-none`}
          >
            {WHY_CHOOSE_US.map((card) => (
              <div
                key={card.id}
                className="bg-white border border-neutral-200/80 border-t-4 border-t-amber-500 p-3 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl lg:hover:-translate-y-2 hover:border-amber-500/30 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between min-h-[180px] sm:min-h-[220px] w-[calc(50%-6px)] sm:w-[calc(50%-12px)] lg:w-auto shrink-0 snap-start"
              >
                {/* Visual accent watermark */}
                <div className="absolute -right-4 -bottom-4 text-neutral-100 opacity-20 pointer-events-none group-hover:scale-125 group-hover:text-amber-500/10 transition-all duration-500">
                  {React.cloneElement(card.icon as React.ReactElement, { className: 'h-16 w-16 sm:h-24 sm:w-24' })}
                </div>

                <div className="space-y-2 sm:space-y-4 relative z-10">
                  <div className="bg-amber-500/10 text-amber-600 border border-amber-500/20 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl w-fit group-hover:bg-amber-500 group-hover:text-neutral-950 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {React.cloneElement(card.icon as React.ReactElement, { className: 'h-4 w-4 sm:h-6 sm:w-6' })}
                  </div>
                  <h3 className="font-extrabold text-xs sm:text-base lg:text-lg text-neutral-900 leading-tight group-hover:text-amber-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-neutral-600 leading-normal sm:leading-relaxed font-medium">
                    {card.description}
                  </p>
                </div>
                
                {/* Bottom line decorative indicator */}
                <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-amber-500 to-amber-600 absolute bottom-0 left-0 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES */}
      <section className="py-16 sm:py-20 lg:py-24 bg-neutral-900 text-slate-100 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-3 mb-10 sm:mb-14 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 font-semibold uppercase tracking-widest text-xs px-3.5 py-1.5 rounded-full border border-amber-500/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Service Directory</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Premium Transport &amp; Travel Services
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-medium leading-relaxed">
              Tailored travel experiences and professional private transportation across East Java and Indonesia.
            </p>
          </div>

          {/* Sleek Minimalist Service Navigation Tabs */}
          <div className="flex items-center justify-start md:justify-center overflow-x-auto scrollbar-none gap-2 sm:gap-3 mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { id: 'tours', label: 'Private Tours', icon: <Compass className="h-4 w-4" />, hint: 'Bromo & Ijen', isNew: false },
              { id: 'share-tour', label: 'Share Tour', icon: <Users className="h-4 w-4" />, hint: 'Open Trip', isNew: true },
              { id: 'airport', label: 'Airport Transfer', icon: <Plane className="h-4 w-4" />, hint: '24/7 Pickup', isNew: false },
              { id: 'taxi', label: 'City Taxi', icon: <Route className="h-4 w-4" />, hint: 'Flat Rate', isNew: false },
              { id: 'car-rental', label: 'Car Rental', icon: <Car className="h-4 w-4" />, hint: 'With Driver', isNew: false },
            ].map((srv) => {
              const isActive = activeService === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveService(srv.id as any)}
                  className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 shrink-0 cursor-pointer border ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-lg shadow-amber-500/20 font-bold scale-[1.02]'
                      : 'bg-neutral-800/80 text-neutral-300 border-neutral-700/80 hover:bg-neutral-800 hover:text-white hover:border-neutral-600'
                  }`}
                >
                  {srv.icon}
                  <span>{srv.label}</span>
                  {srv.isNew && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider ${
                      isActive ? 'bg-neutral-950 text-amber-400' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      New
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Service Detailed Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-800/60 border border-neutral-700/60 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 backdrop-blur-sm shadow-2xl"
            >
              {/* Image side */}
              <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full overflow-hidden bg-neutral-950 group">
                <img
                  src={
                    activeService === 'tours'
                      ? 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80'
                      : activeService === 'share-tour'
                      ? 'https://images.unsplash.com/photo-1539635273304-0e8723e0f016?auto=format&fit=crop&w=1000&q=80'
                      : activeService === 'airport'
                      ? 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1000&q=80'
                      : activeService === 'taxi'
                      ? 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1000&q=80'
                      : 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80'
                  }
                  alt={activeService}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-85"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-neutral-950/20" />
                
                {/* Visual badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider font-mono bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700/80 shadow-md">
                    {activeService === 'tours' && 'East Java Curated Tours'}
                    {activeService === 'share-tour' && 'Share Tour & Open Trip'}
                    {activeService === 'airport' && '24/7 Airport Transfer'}
                    {activeService === 'taxi' && 'Flat-Rate Executive Taxi'}
                    {activeService === 'car-rental' && 'Private Car & Driver'}
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    {activeService === 'tours' && 'Private Mount Bromo & Ijen Crater Adventures'}
                    {activeService === 'share-tour' && 'Open Trip Share Tour for Smart Solo & Small Group Travelers'}
                    {activeService === 'airport' && 'Seamless Airport Pickups & Transfers'}
                    {activeService === 'taxi' && 'Point-to-Point Executive Intercity Taxi'}
                    {activeService === 'car-rental' && 'Premium Car Rental with Professional Local Driver'}
                  </h3>

                  <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                    {activeService === 'tours' && 'Experience unforgettable expeditions to Mount Bromo sunrise, Ijen Crater blue fire, and Tumpak Sewu Waterfall. Complete packages include climate-controlled transport, 4x4 off-road Jeeps, licensed English-speaking guides, and pre-arranged park permits.'}
                    {activeService === 'share-tour' && 'Cost-effective group departures for solo travelers and couples. Join confirmed departure batches for Mount Bromo and Ijen Crater with per-seat pricing, comfortable fleet, professional guide, and instant voucher validation.'}
                    {activeService === 'airport' && 'Stress-free transfers connecting Juanda International Airport Surabaya (SUB), Yogyakarta (YIA), CGK, and Bali (DPS). Drivers monitor live flight status and provide personalized terminal arrival meet & greet.'}
                    {activeService === 'taxi' && 'Reliable private transfers with fixed transparent pricing. Enjoy door-to-door comfort for business or leisure with zero hidden toll, parking, or surge fees.'}
                    {activeService === 'car-rental' && 'Explore East Java on your own customized itinerary with our immaculate fleet (Avanza, Innova Reborn, Zenix, Hiace) and experienced local drivers.'}
                  </p>

                  {/* High quality bullets checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {(activeService === 'tours'
                      ? [
                          'All entrance tickets & permits included',
                          'Private 4x4 Bromo Jeep included',
                          'Certified English-speaking guide',
                          'Flexible pickup in Surabaya, Malang, or Banyuwangi',
                        ]
                      : activeService === 'share-tour'
                      ? [
                          'Budget-friendly per-seat pricing',
                          'Guaranteed batch departure schedules',
                          'Includes Jeep 4x4, driver & guide',
                          'Instant digital voucher confirmation',
                        ]
                      : activeService === 'airport'
                      ? [
                          'Real-time flight status tracking',
                          'Paging nameboard meet & greet at terminal',
                          'Tolls & airport parking fees included',
                          'Luggage assistance & direct routing',
                        ]
                      : activeService === 'taxi'
                      ? [
                          'Fixed transparent rates without surge',
                          'Door-to-door executive private service',
                          'Professional non-smoking drivers',
                          'Complimentary bottled water & phone charging',
                        ]
                      : [
                          'Fuel & driver allowance fully included',
                          'Customizable daily routing & stops',
                          'Clean fleet option for 5 to 15 passengers',
                          'Sanitized vehicles with cold air conditioning',
                        ]
                    ).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-neutral-200">
                        <Check className="h-4 w-4 text-amber-400 shrink-0" />
                        <span className="text-xs sm:text-sm font-medium leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-700/60 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => {
                      if (activeService === 'tours') {
                        setPage('tours');
                      } else if (activeService === 'share-tour') {
                        setPage('share-tour');
                      } else {
                        setPage(activeService as any);
                      }
                    }}
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-7 py-3.5 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/10 cursor-pointer"
                  >
                    <span>
                      {activeService === 'tours' && 'Explore Private Tours'}
                      {activeService === 'share-tour' && 'Explore Share Tour'}
                      {activeService === 'airport' && 'Book Airport Transfer'}
                      {activeService === 'taxi' && 'Book Executive Taxi'}
                      {activeService === 'car-rental' && 'Book Car Rental'}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-neutral-400 font-medium">
                    ★ Guaranteed Best Service &amp; Fixed Pricing
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* 4. FEATURED TOUR PACKAGES SECTION */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header with Premium Spacing and Elegant Typography */}
          <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 bg-[#0F766E]/5 text-[#0F766E] font-black uppercase tracking-widest font-mono text-[10px] sm:text-xs px-4 py-2 rounded-full border border-[#0F766E]/10">
              <Sparkles className="h-3.5 w-3.5 text-[#F59E0B]" />
              <span>SmartJourney Curated</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight">
              Featured Tour Packages
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed font-medium">
              Discover unforgettable adventures carefully crafted by SmartJourney.
            </p>
            <div className="h-1 w-16 bg-[#0F766E] mx-auto rounded-full mt-4" />
          </div>

          {/* Responsive Grid with Beautiful Spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-7xl mx-auto">
            {tours.map((tour) => {
               const isWishlisted = wishlist.includes(tour.id);
               
               // Map locations dynamically for high fidelity
               let tourLocation = "📍 East Java";
               if (tour.id === 'malang-city') {
                 tourLocation = "📍 Malang, East Java";
               }

               return (
                 <div
                   key={tour.id}
                   id={`tour-card-home-${tour.id}`}
                   onClick={() => {
                     setSearchParams({ ...searchParams, selectedTourId: tour.id });
                     setPage('tours');
                   }}
                   className="bg-white rounded-[32px] overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(15,118,110,0.08)] hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between w-full max-w-[380px] border border-neutral-100/50 h-full cursor-pointer"
                 >
                   {/* Image Block: Beautiful Fluid Aspect Ratio */}
                   <div className="relative aspect-[16/10] m-3 overflow-hidden rounded-[24px] shrink-0">
                     <img
                       src={tour.image}
                       alt={tour.name}
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                       referrerPolicy="no-referrer"
                     />
                     {/* Dark gradient overlay for visual premium depth */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                     
                     {/* Top Left: Best Seller Badge */}
                     <span className="absolute top-4 left-4 bg-[#0F766E] text-white text-[9px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-md">
                       BEST SELLER
                     </span>

                     {/* Top Right: Wishlist Icon */}
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         toggleWishlist(tour.id);
                       }}
                       className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-sm hover:bg-white text-slate-400 hover:text-red-500 hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
                       aria-label="Add to wishlist"
                     >
                       <Heart 
                         className={`h-4 w-4 transition-all ${
                           isWishlisted 
                             ? 'fill-red-500 text-red-500 scale-110' 
                             : 'text-[#111827]'
                         }`} 
                       />
                     </button>
                   </div>

                   {/* Below Image Content Area */}
                   <div className="px-6 pb-6 pt-3 flex-grow flex flex-col justify-between space-y-4">
                     <div className="space-y-2.5">
                       {/* Rating & Review row */}
                       <div className="flex items-center gap-1">
                         <div className="flex gap-0.5">
                           {[...Array(5)].map((_, i) => (
                             <Star key={i} className="h-3 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                           ))}
                         </div>
                         <span className="text-xs font-bold text-[#111827] ml-1">4.9</span>
                         <span className="text-xs text-[#6B7280]">({tour.reviewCount} Reviews)</span>
                       </div>

                       {/* Tour Title */}
                       <h3 className="font-bold text-sm sm:text-base text-[#111827] leading-tight group-hover:text-[#0F766E] transition-colors line-clamp-1">
                         {tour.id === 'bromo' ? 'Mount Bromo Sunrise Tour' : tour.name}
                       </h3>

                       {/* Location */}
                       <div className="text-xs text-[#6B7280] font-semibold flex items-center gap-1">
                         <span>{tourLocation}</span>
                       </div>

                       {/* Small Information Row */}
                       <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-[11px] text-[#6B7280] font-bold border-t border-neutral-100 mt-2">
                         <span className="flex items-center gap-1">
                           <Clock className="h-3.5 w-3.5 text-[#0F766E]" />
                           <span>{tour.duration.split('(')[0].trim()}</span>
                         </span>
                         <span className="flex items-center gap-1">
                           <Users className="h-3.5 w-3.5 text-[#0F766E]" />
                           <span>Private Tour</span>
                         </span>
                         <span className="flex items-center gap-1">
                           <Car className="h-3.5 w-3.5 text-[#0F766E]" />
                           <span>Pickup Included</span>
                         </span>
                       </div>
                     </div>

                     {/* Pricing and Call To Action */}
                     <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2 mt-auto">
                       <div className="flex flex-col">
                         <span className="text-[9px] uppercase tracking-wider text-[#6B7280] font-extrabold">Starting from</span>
                         <div className="flex items-baseline gap-0.5">
                           <span className="text-lg font-black text-[#111827]">USD {tour.startingPrice || 45}</span>
                           <span className="text-[10px] text-[#6B7280] font-bold">/ person</span>
                         </div>
                       </div>

                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           setSearchParams({ ...searchParams, selectedTourId: tour.id });
                           setPage('tours');
                         }}
                         className="bg-[#0F766E] hover:bg-[#0d635c] text-white font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-widest transition-all hover:shadow-md hover:shadow-[#0F766E]/10 active:scale-95 cursor-pointer flex items-center gap-1"
                       >
                         <span>View Details</span>
                       </button>
                     </div>
                   </div>
                 </div>
               );
            })}
          </div>

        </div>
      </section>

      {/* 5. COLLABORATING PLATFORMS SECTION */}
      <section className="py-8 md:py-12 lg:py-14 bg-neutral-50 border-t border-b border-neutral-200/80 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-3 mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 font-extrabold uppercase tracking-widest font-mono text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full border border-amber-500/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Synergy &amp; Digital Ecosystem</span>
            </span>
            <h2 className="text-2xl sm:text-4.5xl font-black text-neutral-900 tracking-tight leading-none mt-2">
              Our Partner Platforms
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto font-medium">
              SmartJourney operates in synergy with leading international travel networks, booking systems, and premier luxury hotel groups.
            </p>
            <div className="h-1.5 w-20 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full mt-3" />
          </div>

          {partners.length === 0 ? (
            <div className="text-center py-12 bg-white border border-neutral-200 rounded-3xl space-y-4">
              <Handshake className="h-12 w-12 text-neutral-400 mx-auto" />
              <h3 className="text-lg font-bold text-neutral-500">No partner platforms registered</h3>
              <p className="text-sm text-neutral-400 max-w-md mx-auto">
                Please login to the Admin Dashboard to add and configure verified partner platforms.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {partners.slice(0, 6).map((partner) => {
                return (
                  <a
                    key={partner.id}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-neutral-200 hover:border-amber-500/40 rounded-2xl h-24 flex items-center justify-center p-4 relative group transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer overflow-hidden"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 rounded-lg"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as any).src = 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=150&q=80';
                        }}
                      />
                    </div>
                    {/* Hover text indicator */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-neutral-900/90 px-2 py-0.5 rounded text-[8px] text-amber-500 font-semibold tracking-wider uppercase whitespace-nowrap pointer-events-none">
                      {partner.name}
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          <div className="mt-12 text-center">
            <button
              onClick={() => setPage('partnerships')}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md shadow-amber-500/10 cursor-pointer"
            >
              <span>View Full Partner Directory</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>


        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS SLIDER */}
      <section className="py-8 md:py-12 lg:py-14 bg-neutral-50 relative overflow-hidden">
        {/* Decorative ambient background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          <div className="space-y-3 mb-6 sm:mb-8">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 font-extrabold uppercase tracking-widest font-mono text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full border border-amber-500/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ulasan Google Terverifikasi</span>
            </span>
            <h2 className="text-2xl sm:text-4.5xl font-black text-neutral-900 tracking-tight leading-none mt-2">
              Testimoni Asli Google Maps
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto font-medium">
              Ulasan terverifikasi langsung dari Google Maps oleh pelancong internasional dan lokal kami yang telah mempercayakan perjalanan mereka bersama SmartJourney.
            </p>
            <div className="h-1.5 w-20 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full mt-3" />
          </div>

          {/* Real Google Rating Summary Header */}
          <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto mb-6 sm:mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <a 
              href="https://www.google.com/maps/place/Smart+Journey/@-8.0045371,112.7482296,15z/data=!4m8!3m7!1s0x2dd625bdc0ad5b79:0x3446d2c5e7fdfe18!8m2!3d-8.0045585!4d112.7585294!9m1!1b1!16s%2Fg%2F11xfx6lnnw?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left hover:opacity-90 transition-opacity group cursor-pointer"
              title="Buka lokasi kami di Google Maps"
            >
              {/* Google G Logo inside circular card */}
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-neutral-150 shrink-0 group-hover:border-blue-500/30 transition-colors">
                <svg className="h-8 w-8" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.81-.63-1.37-1.5-1.37-2.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="font-extrabold text-3xl text-neutral-900 tracking-tight group-hover:text-blue-600 transition-colors">4.9</span>
                  <div className="flex items-center justify-center sm:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400 stroke-amber-400" />
                    ))}
                    <span className="text-xs text-neutral-400 ml-2 font-mono">(4.93 / 5)</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium flex items-center justify-center sm:justify-start gap-1">
                  <span>Ulasan Terpercaya Google Maps</span>
                  <span className="text-neutral-300">|</span>
                  <span className="text-blue-600 font-bold group-hover:underline flex items-center gap-0.5">Lihat Profil Bisnis ↗</span>
                </p>
              </div>
            </a>
            
            <div className="w-full md:w-auto">
              <a
                href="https://www.google.com/maps/place/Smart+Journey/@-8.0045371,112.7482296,15z/data=!4m8!3m7!1s0x2dd625bdc0ad5b79:0x3446d2c5e7fdfe18!8m2!3d-8.0045585!4d112.7585294!9m1!1b1!16s%2Fg%2F11xfx6lnnw?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs uppercase tracking-widest px-6 py-4 rounded-xl shadow-md shadow-amber-500/10 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>Tulis Ulasan di Google Maps ↗</span>
              </a>
            </div>
          </div>

          {/* Slider Frame containing cards, animated with custom responsive layout, draggable/scrollable horizontally */}
          <div 
            className="relative mt-4"
            onMouseEnter={() => setIsHoveringReviews(true)}
            onMouseLeave={() => setIsHoveringReviews(false)}
          >
            {/* Navigation Arrows for Slider - Left and Right */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-12 z-20">
              <button
                onClick={() => scrollReviews('left')}
                className="bg-white hover:bg-neutral-50 hover:border-neutral-300 text-neutral-700 p-3 rounded-full border border-neutral-200 transition-all shadow-md cursor-pointer active:scale-95"
                aria-label="Previous Reviews"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-12 z-20">
              <button
                onClick={() => scrollReviews('right')}
                className="bg-white hover:bg-neutral-50 hover:border-neutral-300 text-neutral-700 p-3 rounded-full border border-neutral-200 transition-all shadow-md cursor-pointer active:scale-95"
                aria-label="Next Reviews"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Slider container with responsive widths and native snapping */}
            <div
              ref={reviewsContainerRef}
              onScroll={handleReviewsScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-6 px-1 w-full relative"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {localReviews.length === 0 ? (
                <div className="w-full text-center py-12 text-neutral-400 font-medium">
                  Belum ada ulasan saat ini.
                </div>
              ) : (
                localReviews.map((review, idx) => {
                  // Beautiful solid colors for Google Maps style avatar circles
                  const bgColors = [
                    'bg-blue-600',
                    'bg-emerald-600',
                    'bg-purple-600',
                    'bg-rose-600',
                    'bg-amber-600',
                    'bg-indigo-600',
                    'bg-teal-600',
                    'bg-cyan-600',
                  ];
                  const colorClass = bgColors[idx % bgColors.length];
                  
                  return (
                    <div 
                      key={review.id} 
                      className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-start bg-white border border-neutral-200/60 hover:border-amber-500/30 hover:bg-white rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 text-left relative min-h-[220px]"
                    >
                      <div>
                        {/* Header Row */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-3 min-w-0">
                            {/* Google Maps Initial Icon */}
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white text-base shrink-0 shadow-inner ${colorClass}`}>
                              {review.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-sm text-neutral-900 truncate flex items-center gap-1">
                                {review.name}
                                <span className="w-3.5 h-3.5 bg-blue-500 text-white rounded-full flex items-center justify-center text-[8px] font-bold shrink-0" title="Google Local Guide Verified">✓</span>
                              </h4>
                              <p className="text-[10px] text-neutral-500 font-semibold tracking-wide uppercase mt-0.5 flex items-center gap-1">
                                <span>{review.country}</span>
                                <span>·</span>
                                <span className="text-amber-600">Local Guide</span>
                              </p>
                            </div>
                          </div>

                          {/* Beautiful service type badge */}
                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 ${
                            review.serviceType === 'tour' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                            review.serviceType === 'airport' ? 'bg-sky-50 text-sky-600 border-sky-100' :
                            review.serviceType === 'taxi' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            'bg-rose-50 text-rose-600 border-rose-100'
                          }`}>
                            {review.serviceType === 'tour' ? 'Wisata' :
                             review.serviceType === 'airport' ? 'Airport' :
                             review.serviceType === 'taxi' ? 'Taksi' :
                             'Sewa Mobil'}
                          </span>
                        </div>

                        {/* Rating stars & Date */}
                        <div className="flex items-center space-x-0.5 my-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                          ))}
                          {[...Array(5 - review.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-neutral-200" />
                          ))}
                          <span className="text-[10px] text-neutral-400 ml-2 font-mono">{review.date}</span>
                        </div>

                        {/* Comment text */}
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed italic line-clamp-5">
                          "{review.text}"
                        </p>
                      </div>
                      
                      {/* Little source badge resembling real Google Maps interface */}
                      <a 
                        href="https://www.google.com/maps/place/Smart+Journey/@-8.0045371,112.7482296,15z/data=!4m8!3m7!1s0x2dd625bdc0ad5b79:0x3446d2c5e7fdfe18!8m2!3d-8.0045585!4d112.7585294!9m1!1b1!16s%2Fg%2F11xfx6lnnw?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 pt-2 border-t border-neutral-100 flex items-center justify-between text-[9px] text-neutral-400 font-mono hover:text-amber-600 transition-colors cursor-pointer"
                        title="Lihat profil bisnis terverifikasi kami di Google Maps"
                      >
                        <span className="flex items-center gap-1">
                          <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.81-.63-1.37-1.5-1.37-2.63z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                            />
                          </svg>
                          <span>oogle Maps</span>
                        </span>
                        <span className="text-emerald-600 font-semibold hover:underline flex items-center gap-0.5">
                          Verified Review ↗
                        </span>
                      </a>
                    </div>
                  );
                })
              )}
            </div>

            {/* Beautiful Navigation dots representing positions */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {[0, 0.25, 0.5, 0.75, 1].map((percent, index) => (
                <button
                  key={index}
                  onClick={() => scrollToPercent(percent)}
                  className="p-1 focus:outline-none cursor-pointer"
                  aria-label={`Go to slide position ${index + 1}`}
                >
                  <div className={`h-2.5 rounded-full transition-all duration-300 ${
                    Math.abs(scrollProgress - percent) < 0.125 ? 'w-8 bg-amber-500' : 'w-2.5 bg-neutral-300'
                  }`} />
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION BERLANGGANAN / NEWSLETTER SUBSCRIPTION */}
      <section className="py-16 sm:py-20 bg-[#315B4F] border-t border-[#467b6b] text-white relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-[#203c34]/90 to-[#182e28]/90 border border-[#467b6b] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            {/* Background pattern accent */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 pointer-events-none hidden lg:block bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Heading & Benefits */}
              <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-widest text-[11px] sm:text-xs px-4 py-1.5 rounded-full font-mono">
                  <Mail className="h-3.5 w-3.5" />
                  <span>Dapatkan Penawaran Eksklusif</span>
                </span>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Berlangganan &amp; Dapatkan Diskon Wisata Spesial!
                </h2>

                <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Daftarkan email Anda sekarang untuk menerima info promo paket wisata Bromo &amp; Ijen, diskon khusus sewa mobil, serta voucher potongan harga eksklusif langsung di inbox Anda.
                </p>

                {/* Benefits List */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-emerald-100">
                  <div className="flex items-center gap-2 bg-[#203c34]/80 border border-[#315B4F] px-3.5 py-2 rounded-xl">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Diskon Eksklusif s/d 20%</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#203c34]/80 border border-[#315B4F] px-3.5 py-2 rounded-xl">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Panduan Wisata Gratis</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#203c34]/80 border border-[#315B4F] px-3.5 py-2 rounded-xl">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Tanpa Spam &amp; Bebas Batal</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Subscription Form */}
              <div className="lg:col-span-5">
                <div className="bg-[#182e28]/90 border border-[#315B4F] rounded-2xl p-6 sm:p-8 shadow-xl">
                  {isSubscribed ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Terima Kasih Telah Berlangganan!</h3>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        Email Anda <strong className="text-amber-400">{newsletterEmail}</strong> telah berhasil terdaftar. Cek inbox Anda secara berkala untuk melihat promo spesial dari SmartJourney!
                      </p>
                      <button
                        onClick={() => {
                          setIsSubscribed(false);
                          setNewsletterEmail('');
                        }}
                        className="mt-2 text-xs font-bold text-neutral-400 hover:text-white underline cursor-pointer"
                      >
                        Daftarkan email lain
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-2 text-left">
                          Alamat Email Anda
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                          <input
                            type="email"
                            required
                            value={newsletterEmail}
                            onChange={(e) => {
                              setNewsletterEmail(e.target.value);
                              setNewsletterError(null);
                            }}
                            placeholder="nama@email.com"
                            className="w-full bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3.5 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-sans"
                          />
                        </div>
                        {newsletterError && (
                          <p className="text-xs text-rose-400 mt-1.5 font-medium text-left">{newsletterError}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-400"
                      >
                        <Send className="h-4 w-4" />
                        <span>Berlangganan Sekarang</span>
                      </button>

                      <p className="text-[10px] text-neutral-400 text-center leading-normal">
                        Kami menghormati privasi Anda. Anda dapat berhenti berlangganan kapan saja dengan satu klik.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURE CHECKOUT PORTAL */}
      {selectedTourForBooking && (
        <CheckoutModal
          isOpen={!!selectedTourForBooking}
          onClose={() => setSelectedTourForBooking(null)}
          serviceType="tour"
          serviceName={selectedTourForBooking.tour.name}
          basePriceUSD={selectedTourForBooking.tour.startingPrice}
          basePriceIDR={selectedTourForBooking.tour.startingPriceIDR}
          initialDetails={selectedTourForBooking.details}
        />
      )}

    </div>
  );
}
