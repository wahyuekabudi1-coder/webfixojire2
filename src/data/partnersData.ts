export interface PartnerApp {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
  squareLogoUrl?: string;
  category?: string;
  description?: string;
}

// Crisp, vector SVG data URLs for authentic official brand logos
export const OFFICIAL_PARTNERS: PartnerApp[] = [
  {
    id: 'traveloka',
    name: 'Traveloka',
    url: 'https://www.traveloka.com',
    category: 'OTA & Flight Booking',
    description: 'Southeast Asia’s leading lifestyle and travel super-app for flights, stays, and attractions.',
    squareLogoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><rect width="48" height="48" rx="10" fill="%230194F3"/><g transform="translate(6, 6)"><circle cx="18" cy="18" r="17" fill="%230194F3"/><path d="M8 22 C 12 22, 20 17, 26 10 C 22 13, 18 14, 15 14 C 19 12, 23 10, 25 8 C 19 10, 15 11, 11 11 C 15 10, 21 6, 23 5 C 17 6, 11 9, 8 13 C 5 16, 6 20, 8 22 Z" fill="%23FFFFFF"/><path d="M12 20 C 15 20, 21 16, 24 12 C 21 14, 17 14, 14 14 Z" fill="%2370D4FF"/></g></svg>`,
    logoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60"><g transform="translate(10, 8)"><circle cx="22" cy="22" r="22" fill="%230194F3"/><path d="M11 27 C 15 27, 25 21, 32 12 C 27 16, 22 17, 18 17 C 23 15, 28 12, 30 10 C 23 12, 18 13, 14 14 C 19 12, 26 8, 28 6 C 21 8, 14 11, 10 16 C 7 20, 8 25, 11 27 Z" fill="%23FFFFFF"/><path d="M15 24 C 19 24, 26 20, 30 15 C 26 17, 21 18, 17 18 Z" fill="%2370D4FF"/></g><text x="64" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="%230194F3" letter-spacing="-0.5">traveloka</text></svg>`
  },
  {
    id: 'trip-com',
    name: 'Trip.com',
    url: 'https://www.trip.com',
    category: 'Global Travel Service',
    description: 'International one-stop travel service platform with extensive airline and hotel inventory.',
    squareLogoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><rect width="48" height="48" rx="10" fill="%23287DFA"/><g transform="translate(6, 6)"><path d="M10 24 L26 24 M18 14 L18 32" stroke="%23FFFFFF" stroke-width="4.5" stroke-linecap="round" /><circle cx="26" cy="14" r="3.5" fill="%23FF5353"/></g></svg>`,
    logoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60"><g transform="translate(8, 10)"><rect x="0" y="2" width="36" height="36" rx="10" fill="%23287DFA"/><path d="M10 20 L26 20 M18 12 L18 28" stroke="%23FFFFFF" stroke-width="4" stroke-linecap="round" /><circle cx="24" cy="14" r="3" fill="%23FF5353"/></g><text x="52" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="27" font-weight="800" fill="%230F294D" letter-spacing="-0.5">Trip<tspan fill="%23287DFA">.com</tspan></text></svg>`
  },
  {
    id: 'booking-com',
    name: 'Booking.com',
    url: 'https://www.booking.com',
    category: 'Hotel Reservations',
    description: 'World’s premier accommodation reservation network connecting travelers with millions of properties.',
    squareLogoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><rect width="48" height="48" rx="10" fill="%23003580"/><text x="14" y="34" font-family="BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="900" fill="%23FFFFFF">B</text><circle cx="34" cy="32" r="3.5" fill="%2300BAF2"/></svg>`,
    logoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 60" width="250" height="60"><g transform="translate(6, 6)"><rect width="238" height="48" rx="8" fill="%23003580"/><text x="18" y="34" font-family="BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="800" fill="%23FFFFFF" letter-spacing="-0.5">Booking<tspan fill="%2300BAF2">.com</tspan></text><circle cx="218" cy="18" r="3.5" fill="%2300BAF2"/></g></svg>`
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    url: 'https://www.airbnb.com',
    category: 'Homestay & Experiences',
    description: 'Global marketplace for unique stays, villas, boutique lodges, and authentic local experiences.',
    squareLogoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><rect width="48" height="48" rx="10" fill="%23FFFFFF" stroke="%23E5E7EB" stroke-width="1"/><g transform="translate(2, 1)"><path d="M22 6 C16 6, 10 11, 8 18 C 5 27, 11 36, 22 46 C 33 36, 39 27, 36 18 C 34 11, 28 6, 22 6 Z M 22 14 C 25 14, 28 17, 28 21 C 28 26, 24 30, 22 33 C 20 30, 16 26, 16 21 C 16 17, 19 14, 22 14 Z" fill="%23FF385C" fill-rule="evenodd"/></g></svg>`,
    logoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60"><g transform="translate(10, 8)"><path d="M22 4 C16 4, 10 9, 8 16 C 5 25, 11 34, 22 44 C 33 34, 39 25, 36 16 C 34 9, 28 4, 22 4 Z M 22 12 C 25 12, 28 15, 28 19 C 28 24, 24 28, 22 31 C 20 28, 16 24, 16 19 C 16 15, 19 12, 22 12 Z" fill="%23FF385C" fill-rule="evenodd"/></g><text x="58" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="%23FF385C" letter-spacing="-0.5">airbnb</text></svg>`
  },
  {
    id: 'agoda',
    name: 'Agoda',
    url: 'https://www.agoda.com',
    category: 'Hotel Booking',
    description: 'Asia-Pacific powerhouse for discounted hotel rates, resorts, and vacation home rentals.',
    squareLogoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><rect width="48" height="48" rx="10" fill="%23FFFFFF" stroke="%23E5E7EB" stroke-width="1"/><g transform="translate(1, 14)"><circle cx="8" cy="10" r="4" fill="%23EE2A24"/><circle cx="17" cy="7" r="3.5" fill="%23FEBA17"/><circle cx="25" cy="9" r="3.5" fill="%2358B947"/><circle cx="33" cy="12" r="3" fill="%2300A3E0"/><circle cx="40" cy="10" r="3.5" fill="%238E44AD"/></g></svg>`,
    logoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60"><g transform="translate(12, 4)"><circle cx="10" cy="10" r="4.5" fill="%23EE2A24"/><circle cx="22" cy="7" r="4" fill="%23FEBA17"/><circle cx="33" cy="9" r="4" fill="%2358B947"/><circle cx="43" cy="12" r="3.5" fill="%2300A3E0"/><circle cx="53" cy="10" r="4" fill="%238E44AD"/></g><text x="14" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="900" fill="%23222222" letter-spacing="-0.5">agoda</text></svg>`
  },
  {
    id: 'tiket-com',
    name: 'Tiket.com',
    url: 'https://www.tiket.com',
    category: 'Indonesia Travel & Events',
    description: 'Pioneer Indonesian online travel agent for flights, train tickets, car rentals, and attractions.',
    squareLogoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48"><rect width="48" height="48" rx="10" fill="%230064D2"/><circle cx="24" cy="24" r="14" fill="%23FEDD00"/><circle cx="24" cy="24" r="6" fill="%230064D2"/></svg>`,
    logoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 60" width="230" height="60"><g transform="translate(10, 9)"><circle cx="21" cy="21" r="20" fill="%23FEDD00"/><circle cx="21" cy="21" r="9" fill="%230064D2"/></g><text x="58" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="%230064D2" letter-spacing="-0.5">tiket<tspan fill="%23FEDD00">.com</tspan></text></svg>`
  },
  {
    id: 'klook',
    name: 'Klook',
    url: 'https://www.klook.com',
    category: 'Attraction Tickets & Tours',
    description: 'Global travel activity and services booking platform for destination discoveries.',
    logoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60"><g transform="translate(10, 10)"><circle cx="20" cy="20" r="18" fill="%23FF5B00"/><circle cx="16" cy="16" r="6" fill="%23FFCE00"/></g><text x="54" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="%23FF5B00" letter-spacing="-0.5">klook</text></svg>`
  },
  {
    id: 'expedia',
    name: 'Expedia',
    url: 'https://www.expedia.com',
    category: 'Global Travel Group',
    description: 'Worldwide full-service online travel brand for vacation packages and flights.',
    logoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60"><g transform="translate(8, 12)"><circle cx="18" cy="18" r="16" fill="%2300355F"/><path d="M12 22 L24 14 L20 22 Z" fill="%23FFCC00"/></g><text x="48" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="800" fill="%2300355F" letter-spacing="-0.5">Expedia</text></svg>`
  },
  {
    id: 'viator',
    name: 'Viator',
    url: 'https://www.viator.com',
    category: 'Tours & Activities',
    description: 'Tripadvisor company specializing in guided excursions, passes, and bucket-list adventures.',
    logoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60"><text x="10" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="900" fill="%2300875A" letter-spacing="-0.5">viator</text><circle cx="102" cy="18" r="3.5" fill="%2300875A"/></svg>`
  },
  {
    id: 'ctrip',
    name: 'Ctrip (携程旅行)',
    url: 'https://www.ctrip.com',
    category: 'Greater China Leader',
    description: 'Largest travel agency across Greater China providing worldwide booking support.',
    logoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 60" width="220" height="60"><g transform="translate(8, 10)"><rect x="0" y="2" width="36" height="36" rx="18" fill="%232577E3"/><path d="M10 20 L26 20 M18 12 L18 28" stroke="%23FFFFFF" stroke-width="4" stroke-linecap="round"/></g><text x="50" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="800" fill="%232577E3" letter-spacing="-0.5">Ctrip <tspan fill="%23FF4D4F" font-size="20">携程</tspan></text></svg>`
  },
  {
    id: 'getyourguide',
    name: 'GetYourGuide',
    url: 'https://www.getyourguide.com',
    category: 'Experiential Tourism',
    description: 'Premier online booking platform for incredible travel experiences and museum tickets.',
    logoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 60" width="240" height="60"><g transform="translate(8, 10)"><circle cx="18" cy="18" r="16" fill="%23FF5722"/><text x="12" y="25" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23FFFFFF">G</text></g><text x="48" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="800" fill="%231A1A1A" letter-spacing="-0.5">GetYourGuide</text></svg>`
  },
  {
    id: 'pegipegi',
    name: 'Pegipegi',
    url: 'https://www.pegipegi.com',
    category: 'Domestic Hotel & Travel',
    description: 'Indonesian domestic platform for budget-friendly hotels and train tickets.',
    logoUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60"><text x="10" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="%23FF5E00" letter-spacing="-0.5">pegi<tspan fill="%2300A859">pegi</tspan></text></svg>`
  }
];
