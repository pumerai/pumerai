import { faqList } from "../data/faqs.js";
import { rooms } from "../data/rooms.js";
import { destinations } from "../data/destinations.js";
import { galleryItems } from "../data/gallery.js";

/**
 * Single Editable Configuration File for Hotel Pumerai SEO & Technical Specifications
 */
export const siteConfig = {
  name: "Hotel Pumerai",
  legalName: "Hotel Pumerai",
  alternateNames: ["Hotel Pumerai Honnavar", "Pumerai Hotel Honnavar"],
  siteUrl: "https://www.hotelpumerai.com",
  phone: "+919845423223",
  formattedPhone: "+91 98454 23223",
  landline: "08387-221221",
  email: "reservation@hotelpumerai.com",
  bookingUrl: "https://bookingengine.stayflexi.com/?hotel_id=41986",
  logo: "https://www.hotelpumerai.com/pumerai-logo-full.webp",
  ogImage: "https://www.hotelpumerai.com/pumerai-og-home.jpg",
  priceRange: "$$",
  address: {
    streetAddress: "Hotel Pumerai, NH-66, near Ramateertha Cross",
    addressLocality: "Honnavar",
    addressRegion: "Karnataka",
    postalCode: "581334",
    addressCountry: "IN",
  },
  geo: {
    latitude: 14.2904652,
    longitude: 74.446001,
  },
  hasMap: "https://maps.app.goo.gl/rCfTnw9t8Dp58mga7",
  starRating: "3",
  numberOfRooms: 40,
  // Official social profile URLs
  sameAs: ["https://www.instagram.com/hotelpumerai"],
  // Google Analytics 4 Measurement ID (empty until provided by client)
  ga4Id: "",
  // TODO: Add check-in and check-out times to Hotel schema once final confirmation is received from client
  checkinTime: null,
  checkoutTime: null,
};

export const routesMeta = {
  "/": {
    title: "Hotel Pumerai | Best Hotel in Honnavar, Karnataka",
    description:
      "Hotel in Honnavar on NH-66 with 40 rooms, rooftop pool, Matsya and Madhura restaurants, and banquet halls. Stay at Hotel Pumerai.",
    canonical: "https://www.hotelpumerai.com/",
    breadcrumbs: [{ name: "Home", url: "https://www.hotelpumerai.com/" }],
    noindex: false,
  },
  "/rooms": {
    title: "Hotel Rooms in Honnavar | Suites & Stays at Hotel Pumerai",
    description:
      "Book Honnavar hotel rooms at Hotel Pumerai. Choose from balcony club rooms, deluxe and family suites for a comfortable stay on NH-66.",
    canonical: "https://www.hotelpumerai.com/rooms",
    breadcrumbs: [
      { name: "Home", url: "https://www.hotelpumerai.com/" },
      { name: "Rooms & Suites", url: "https://www.hotelpumerai.com/rooms" },
    ],
    noindex: false,
  },
  "/banquet": {
    title: "Banquet Halls in Honnavar for Events | Hotel Pumerai",
    description:
      "Host your Honnavar banquet at Hotel Pumerai. Features Sidhvin Hall for 200 guests and Milan Hall for 50 guests for weddings and events.",
    canonical: "https://www.hotelpumerai.com/banquet",
    breadcrumbs: [
      { name: "Home", url: "https://www.hotelpumerai.com/" },
      { name: "Banquet Halls", url: "https://www.hotelpumerai.com/banquet" },
    ],
    noindex: false,
  },
  "/dining": {
    title: "Restaurants in Honnavar: Matsya & Madhura | Hotel Pumerai",
    description:
      "Experience Honnavar dining at Hotel Pumerai. Enjoy coastal seafood at Matsya and pure vegetarian South Indian meals at Madhura on NH-66.",
    canonical: "https://www.hotelpumerai.com/dining",
    breadcrumbs: [
      { name: "Home", url: "https://www.hotelpumerai.com/" },
      { name: "Dining & Restaurants", url: "https://www.hotelpumerai.com/dining" },
    ],
    noindex: false,
  },
  "/gallery": {
    title: "Photo Gallery | Hotel Pumerai Honnavar Rooms & Pool",
    description:
      "View Hotel Pumerai Honnavar photo gallery. Explore property visuals of guest rooms, dining spaces, rooftop pool, and banquet facilities.",
    canonical: "https://www.hotelpumerai.com/gallery",
    breadcrumbs: [
      { name: "Home", url: "https://www.hotelpumerai.com/" },
      { name: "Photo Gallery", url: "https://www.hotelpumerai.com/gallery" },
    ],
    noindex: false,
  },
  "/location": {
    title: "Hotel Pumerai Location | Hotel near NH 66 Honnavar",
    description:
      "Hotel in Honnavar on NH-66 near Ramateertha Cross, 5 km from Kasarkod Beach and 2.8 km from Sharavathi backwaters. Find driving routes.",
    canonical: "https://www.hotelpumerai.com/location",
    breadcrumbs: [
      { name: "Home", url: "https://www.hotelpumerai.com/" },
      { name: "Location & Directions", url: "https://www.hotelpumerai.com/location" },
    ],
    noindex: false,
  },
  "/contact": {
    title: "Contact & Direct Booking | Hotel Pumerai Honnavar",
    description:
      "Contact Hotel Pumerai in Honnavar for room reservations, banquet bookings, and front desk assistance. Call +91 98454 23223 or WhatsApp.",
    canonical: "https://www.hotelpumerai.com/contact",
    breadcrumbs: [
      { name: "Home", url: "https://www.hotelpumerai.com/" },
      { name: "Contact & Reservations", url: "https://www.hotelpumerai.com/contact" },
    ],
    noindex: false,
  },
  "/faq": {
    title: "FAQ: Rooms, Pool, Dining & Directions | Hotel Pumerai",
    description:
      "Find answers to common hotel questions about Hotel Pumerai in Honnavar, covering rooms, rooftop pool, parking, EV charging, and dining.",
    canonical: "https://www.hotelpumerai.com/faq",
    breadcrumbs: [
      { name: "Home", url: "https://www.hotelpumerai.com/" },
      { name: "FAQ", url: "https://www.hotelpumerai.com/faq" },
    ],
    noindex: false,
  },
  "/privacy": {
    title: "Privacy Policy | Hotel Pumerai Honnavar",
    description:
      "Privacy policy and guest data handling practices at Hotel Pumerai, Honnavar, Karnataka.",
    canonical: "https://www.hotelpumerai.com/privacy",
    breadcrumbs: [
      { name: "Home", url: "https://www.hotelpumerai.com/" },
      { name: "Privacy Policy", url: "https://www.hotelpumerai.com/privacy" },
    ],
    noindex: true,
  },
  "/cancellation": {
    title: "Cancellation Policy | Hotel Pumerai Honnavar",
    description:
      "Booking cancellation and modification terms for room reservations at Hotel Pumerai, Honnavar.",
    canonical: "https://www.hotelpumerai.com/cancellation",
    breadcrumbs: [
      { name: "Home", url: "https://www.hotelpumerai.com/" },
      { name: "Cancellation Policy", url: "https://www.hotelpumerai.com/cancellation" },
    ],
    noindex: true,
  },
  "/404": {
    title: "Page Not Found | Hotel Pumerai Honnavar",
    description: "The page you are looking for does not exist on Hotel Pumerai.",
    canonical: "https://www.hotelpumerai.com/404",
    breadcrumbs: [
      { name: "Home", url: "https://www.hotelpumerai.com/" },
      { name: "Page Not Found", url: "https://www.hotelpumerai.com/404" },
    ],
    noindex: true,
  },
};

export function getPageMeta(pathname = "/") {
  const normalized = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return routesMeta[normalized] || routesMeta["/"];
}

export function generateStructuredData(pathname = "/") {
  const meta = getPageMeta(pathname);
  const normalized = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.addressCountry,
  };

  const geoCoordinates = {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  };

  const baseHotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": "https://www.hotelpumerai.com/#hotel",
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    url: siteConfig.siteUrl,
    logo: siteConfig.logo,
    image: [
      siteConfig.ogImage,
      "https://www.hotelpumerai.com/dining/_DSC0222_result.webp",
      "https://www.hotelpumerai.com/banquet/sidhvin-hall-main.webp",
      "https://www.hotelpumerai.com/gallery/rooftop-pool-facade.webp",
      "https://www.hotelpumerai.com/rooms/club-room-with-balcony/club-room-with-balcony-main.webp",
    ],
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: siteConfig.priceRange,
    address: postalAddress,
    geo: geoCoordinates,
    hasMap: siteConfig.hasMap,
    sameAs: siteConfig.sameAs,
    starRating: {
      "@type": "Rating",
      ratingValue: siteConfig.starRating,
    },
    numberOfRooms: siteConfig.numberOfRooms,
    // TODO: Add checkinTime and checkoutTime here once confirmed by client
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Rooftop Swimming Pool", value: true },
      { "@type": "LocationFeatureSpecification", name: "Children's Splash Area", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free High-Speed Wi-Fi 100+ Mbps", value: true },
      { "@type": "LocationFeatureSpecification", name: "Covered Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Electric Vehicle (EV) Charging Station", value: true },
      { "@type": "LocationFeatureSpecification", name: "24-Hour Front Desk", value: true },
      { "@type": "LocationFeatureSpecification", name: "Elevators", value: true },
      { "@type": "LocationFeatureSpecification", name: "Power Backup", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Centralised air conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "On-Site Restaurants (Matsya & Madhura)", value: true },
      { "@type": "LocationFeatureSpecification", name: "On-Site Banquet Halls (Sidhvin & Milan)", value: true },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.hotelpumerai.com/#organization",
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    url: siteConfig.siteUrl,
    logo: siteConfig.logo,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    sameAs: siteConfig.sameAs,
    address: postalAddress,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "reservations",
      availableLanguage: ["en", "kn", "hi"],
      areaServed: "IN",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.hotelpumerai.com/#website",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: (meta.breadcrumbs || []).map((b, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: b.name,
      item: b.url,
    })),
  };

  // 1. Home page schema
  if (normalized === "/") {
    return [organizationSchema, websiteSchema, baseHotelSchema];
  }

  // 2. Rooms page schema: HotelRoom linked to Hotel via containsPlace
  if (normalized === "/rooms") {
    const hotelWithRooms = {
      ...baseHotelSchema,
      "@id": "https://www.hotelpumerai.com/#hotel",
      url: "https://www.hotelpumerai.com/rooms",
      containsPlace: rooms.map((room) => ({
        "@type": "HotelRoom",
        name: room.name,
        description: room.shortDescription,
        occupancy: {
          "@type": "QuantitativeValue",
          value: room.occupancy.includes("4") ? 4 : room.occupancy.includes("3") ? 3 : 2,
        },
        bed: {
          "@type": "BedDetails",
          typeOfBed: room.bedType,
        },
        floorSize: {
          "@type": "QuantitativeValue",
          value: parseInt(room.size, 10) || 350,
          unitCode: "FTK",
        },
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "Centralised air conditioning", value: true },
        ],
      })),
    };
    return [breadcrumbsSchema, hotelWithRooms];
  }

  // 3. Banquet page schema: Sidhvin and Milan as EventVenue linked to Hotel
  if (normalized === "/banquet") {
    const hotelWithHalls = {
      ...baseHotelSchema,
      "@id": "https://www.hotelpumerai.com/#hotel",
      url: "https://www.hotelpumerai.com/banquet",
      containsPlace: [
        {
          "@type": "EventVenue",
          name: "Sidhvin Banquet Hall",
          description:
            "A grand air-conditioned banquet hall with a raised stage for weddings, receptions and conferences in Honnavar.",
          maximumAttendeeCapacity: 200,
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Ceremonial Stage and Podium", value: true },
            { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
            { "@type": "LocationFeatureSpecification", name: "High-Speed Wi-Fi & Power Backup", value: true },
          ],
        },
        {
          "@type": "EventVenue",
          name: "Milan Hall",
          description:
            "An intimate air-conditioned venue for private dinners, family functions, and business meetings in Honnavar.",
          maximumAttendeeCapacity: 50,
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Round Banquet Tables", value: true },
            { "@type": "LocationFeatureSpecification", name: "Presentation Dais", value: true },
            { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
          ],
        },
      ],
    };
    return [breadcrumbsSchema, hotelWithHalls];
  }

  // 4. Dining page schema: Two Restaurant entities
  if (normalized === "/dining") {
    const matsyaSchema = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "@id": "https://www.hotelpumerai.com/dining#matsya",
      name: "Matsya Multi-Cuisine Restaurant",
      parentOrganization: { "@id": "https://www.hotelpumerai.com/#hotel" },
      servesCuisine: ["Coastal Karavali Seafood", "North Indian", "Continental", "Tandoori"],
      openingHours: "Mo-Su 07:00-22:30",
      telephone: siteConfig.phone,
      address: postalAddress,
    };

    const madhuraSchema = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "@id": "https://www.hotelpumerai.com/dining#madhura",
      name: "Madhura Pure Veg Restaurant",
      parentOrganization: { "@id": "https://www.hotelpumerai.com/#hotel" },
      servesCuisine: ["Pure Vegetarian", "South Indian", "Coastal Satvik"],
      openingHours: "Mo-Su 06:30-22:00",
      telephone: siteConfig.phone,
      address: postalAddress,
    };

    return [breadcrumbsSchema, matsyaSchema, madhuraSchema];
  }

  // 5. Gallery page schema: ImageGallery linked to Hotel
  if (normalized === "/gallery") {
    const gallerySchema = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "@id": "https://www.hotelpumerai.com/gallery#gallery",
      name: "Hotel Pumerai Photo Gallery",
      description:
        "Photographs of Hotel Pumerai in Honnavar: 40 guest rooms, rooftop swimming pool deck, Matsya and Madhura dining, banquet halls and architectural lobby.",
      url: "https://www.hotelpumerai.com/gallery",
      about: { "@id": "https://www.hotelpumerai.com/#hotel" },
      image: galleryItems.map((item) => ({
        "@type": "ImageObject",
        name: item.title,
        contentUrl: `https://www.hotelpumerai.com${item.src}`,
        caption: item.caption,
        description: item.alt,
      })),
    };
    return [breadcrumbsSchema, gallerySchema];
  }

  // 6. Location page schema: Hotel geo plus nearby places from site's values
  if (normalized === "/location") {
    const nearbyPlaces = destinations.map((d) => ({
      "@type": "Place",
      name: d.name,
      description: `${d.name} (${d.distance})`,
      geo: {
        "@type": "GeoCoordinates",
        latitude: d.lat,
        longitude: d.lng,
      },
    }));

    const hotelLocationSchema = {
      ...baseHotelSchema,
      "@id": "https://www.hotelpumerai.com/#hotel",
      url: "https://www.hotelpumerai.com/location",
      specialOpeningHoursSpecification: [],
      amenityFeature: [
        ...baseHotelSchema.amenityFeature,
        ...nearbyPlaces.map((p) => ({
          "@type": "LocationFeatureSpecification",
          name: `Near ${p.name}`,
          value: true,
        })),
      ],
    };

    return [breadcrumbsSchema, hotelLocationSchema];
  }

  // 7. FAQ page schema: FAQPage built from verified questions only
  if (normalized === "/faq") {
    // TODO: Add check-in/check-out (Q8) and cancellation policy (Q11) to FAQPage JSON-LD schema once final wording is confirmed by client
    const verifiedFaqs = faqList.filter((item) => !item.unverifiedForSchema);

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: verifiedFaqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    };

    return [breadcrumbsSchema, faqSchema];
  }

  // 8. Contact, Privacy, Cancellation, 404 pages
  return [breadcrumbsSchema];
}
