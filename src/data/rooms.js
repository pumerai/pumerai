
/**
 * Single Source of Truth for all Hotel Pumerai Room Types.
 * Every room card, preview teaser, and dedicated /rooms page pulls from this file.
 *
 * Folder convention: /public/rooms/[slug]/
 * Predictable photo files: cover.jpg, 1.jpg, 2.jpg, 3.jpg
 * Built-in fallbackImage ensures flawless display before photos are manually dropped in.
 */
export const STAYFLEXI_BOOKING_URL = "https://bookingengine.stayflexi.com/?hotel_id=41986";

export const rooms = [
  {
    slug: "club-room-with-balcony",
    bookingType: "stayflexi",
    name: "Club Room with Balcony",
    folder: "/rooms/club-room-with-balcony/",
    coverImage: "/rooms/club-room-with-balcony/ChatGPT Image Sep 24, 2026, 09_22_33 PM_result.webp",
    fallbackImage: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
    galleryPhotos: [
      "/rooms/club-room-with-balcony/ChatGPT Image Sep 24, 2026, 09_22_33 PM_result.webp",
      "/rooms/club-room-with-balcony/ChatGPT Image Sep 24, 2026, 09_22_43 PM_result.webp",
      "/rooms/club-room-with-balcony/ChatGPT Image Sep 24, 2026, 09_22_48 PM_result.webp",
      "/rooms/club-room-with-balcony/ChatGPT Image Sep 25, 2026, 01_08_21 AM_result.webp",
    ],
    fallbackGallery: [
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_05%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_15%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_21%20AM_result.webp",
    ],
    tagline: "Private Balcony & Pool View",
    shortDescription:
      "Private glass balcony facing the pool with an expanded seating lounge.",
    fullDescription:
      "Step onto your private glass balcony overlooking the swimming pool. Features a king bed and rain shower.",
    size: "400 sq ft",
    occupancy: "Sleeps 2",
    bedType: "1 King Bed",
    startingPrice: 3799,
    highlights: [
      "Private balcony with pool view",
      "50-inch Smart TV",
      "Walk-in rain shower",
    ],
  },
  {
    slug: "club-room",
    bookingType: "stayflexi",
    name: "Club Room",
    folder: "/rooms/club-room/",
    coverImage: "/rooms/club-room/ChatGPT Image Sep 24, 2026, 08_05_39 PM_result.webp",
    fallbackImage: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
    galleryPhotos: [
      "/rooms/club-room/ChatGPT Image Sep 24, 2026, 08_05_39 PM_result.webp",
      "/rooms/club-room/ChatGPT Image Sep 24, 2026, 08_05_46 PM_result.webp",
      "/rooms/club-room/ChatGPT Image Sep 24, 2026, 08_05_52 PM_result.webp",
      "/rooms/club-room/ChatGPT Image Sep 24, 2026, 08_05_58 PM_result.webp",
    ],
    fallbackGallery: [
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_05%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_15%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_21%20AM_result.webp",
    ],
    tagline: "Quiet Contemporary Comfort",
    shortDescription:
      "Spacious room with warm wood finishes, work desk, and rain shower.",
    fullDescription:
      "A restful room finished with warm wood millwork. Includes a king bed, work desk, and rain shower.",
    size: "400 sq ft",
    occupancy: "Sleeps 2",
    bedType: "1 King Bed",
    startingPrice: 3299,
    highlights: [
      "Courtyard garden view",
      "Work desk and chair",
      "43-inch Smart TV",
    ],
  },
  {
    slug: "deluxe-room",
    bookingType: "stayflexi",
    name: "Deluxe Room",
    folder: "/rooms/deluxe-room/",
    coverImage: "/rooms/deluxe-room/ChatGPT Image Sep 24, 2026, 09_22_33 PM_result.webp",
    fallbackImage: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
    galleryPhotos: [
      "/rooms/deluxe-room/ChatGPT Image Sep 24, 2026, 09_22_33 PM_result.webp",
      "/rooms/deluxe-room/ChatGPT Image Sep 24, 2026, 09_22_43 PM_result.webp",
      "/rooms/deluxe-room/ChatGPT Image Sep 24, 2026, 09_22_48 PM_result.webp",
      "/rooms/deluxe-room/ChatGPT Image Sep 25, 2026, 01_08_21 AM_result.webp",
    ],
    fallbackGallery: [
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_05%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_15%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_21%20AM_result.webp",
    ],
    tagline: "Comfortable Coastal Stay",
    shortDescription:
      "Comfortable room with panoramic windows, king bed, and rain shower.",
    fullDescription:
      "A restful room for coastal travelers on NH-66. Includes a comfortable king bed and en-suite rain shower.",
    size: "300 sq ft",
    occupancy: "Sleeps 2",
    bedType: "1 King Bed",
    startingPrice: 2799,
    highlights: [
      "Panoramic windows",
      "King size bed",
      "Split air conditioning",
    ],
  },
  {
    slug: "family-suite-room",
    bookingType: "whatsapp",
    name: "Family Suite Room",
    folder: "/rooms/family-suite-room/",
    coverImage: "/rooms/family-suite-room/ChatGPT Image Sep 25, 2026, 01_47_34 AM_result.webp",
    fallbackImage: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
    galleryPhotos: [
      "/rooms/family-suite-room/ChatGPT Image Sep 25, 2026, 01_47_34 AM_result.webp",
      "/rooms/family-suite-room/ChatGPT Image Sep 25, 2026, 01_47_40 AM_result.webp",
      "/rooms/family-suite-room/ChatGPT Image Sep 25, 2026, 01_47_43 AM_result.webp",
      "/rooms/family-suite-room/ChatGPT Image Sep 25, 2026, 01_47_46 AM_result.webp",
    ],
    fallbackGallery: [
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_05%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_15%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_21%20AM_result.webp",
    ],
    tagline: "Two-Room Suite for Families",
    shortDescription:
      "Two-room suite with master bedroom, living lounge, and sofa bed for 4.",
    fullDescription:
      "Independent master bedroom and separate living lounge with sofa bed. Accommodates up to 4 guests.",
    size: "550 sq ft",
    occupancy: "Sleeps 4",
    bedType: "1 King Bed + 1 Queen Sofa Bed",
    startingPrice: 5499,
    highlights: [
      "Independent bedroom and living lounge",
      "Two 43-inch Smart TVs",
      "Sleeps up to 4 guests",
    ],
  },
  {
    slug: "premium-room",
    bookingType: "stayflexi",
    name: "Premium Room",
    folder: "/rooms/premium-room/",
    coverImage: "/rooms/premium-room/ChatGPT Image Sep 25, 2026, 02_03_35 AM_result.webp",
    fallbackImage: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
    galleryPhotos: [
      "/rooms/premium-room/ChatGPT Image Sep 25, 2026, 02_03_35 AM_result.webp",
      "/rooms/premium-room/ChatGPT Image Sep 25, 2026, 02_03_42 AM_result.webp",
      "/rooms/premium-room/ChatGPT Image Sep 25, 2026, 02_03_46 AM_result.webp",
      "/rooms/premium-room/ChatGPT Image Sep 25, 2026, 02_04_00 AM_result.webp",
    ],
    fallbackGallery: [
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_05%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_15%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_21%20AM_result.webp",
    ],
    tagline: "Courtyard Garden View",
    shortDescription:
      "Modern room featuring warm wood finishes, garden views, and rain shower.",
    fullDescription:
      "Overlooks the landscaped courtyard garden with wooden finishes. Includes a king bed and rain shower.",
    size: "240 sq ft",
    occupancy: "Sleeps 2",
    bedType: "1 King Bed",
    startingPrice: 2999,
    highlights: [
      "Courtyard garden view",
      "43-inch Smart TV",
      "Walk-in rain shower",
    ],
  },
  {
    slug: "premium-twin-room",
    bookingType: "stayflexi",
    name: "Premium Twin Room",
    folder: "/rooms/premium-twin-room/",
    coverImage: "/rooms/premium-twin-room/ChatGPT Image Sep 25, 2026, 02_47_30 AM_result.webp",
    fallbackImage: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
    galleryPhotos: [
      "/rooms/premium-twin-room/ChatGPT Image Sep 25, 2026, 02_47_30 AM_result.webp",
      "/rooms/premium-twin-room/ChatGPT Image Sep 25, 2026, 02_47_35 AM_result.webp",
      "/rooms/premium-twin-room/ChatGPT Image Sep 25, 2026, 02_47_37 AM_result.webp",
      "/rooms/premium-twin-room/ChatGPT Image Sep 25, 2026, 02_47_40 AM_result.webp",
    ],
    fallbackGallery: [
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_05%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_15%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_21%20AM_result.webp",
    ],
    tagline: "Two Twin Beds",
    shortDescription:
      "Two separate twin beds with work desk and modern rain shower.",
    fullDescription:
      "Two separate twin beds with supportive mattresses and reading lights. Ideal for friends and colleagues.",
    size: "240 sq ft",
    occupancy: "Sleeps 2",
    bedType: "2 Twin Beds",
    startingPrice: 2999,
    highlights: [
      "Two twin beds",
      "Work desk and charging points",
      "Walk-in rain shower",
    ],
  },
  {
    slug: "suite-room",
    bookingType: "stayflexi",
    name: "Suite Room",
    folder: "/rooms/suite-room/",
    coverImage: "/rooms/suite-room/ChatGPT Image Sep 25, 2026, 02_56_20 AM_result.webp",
    fallbackImage: "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
    galleryPhotos: [
      "/rooms/suite-room/ChatGPT Image Sep 25, 2026, 02_56_20 AM_result.webp",
      "/rooms/suite-room/ChatGPT Image Sep 25, 2026, 02_56_23 AM_result.webp",
      "/rooms/suite-room/ChatGPT Image Sep 25, 2026, 02_56_26 AM_result.webp",
      "/rooms/suite-room/ChatGPT Image Sep 25, 2026, 02_56_28 AM_result.webp",
    ],
    fallbackGallery: [
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_13%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_05%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_15%20AM_result.webp",
      "/gallery/ChatGPT%20Image%20Sep%2026,%202026,%2012_22_21%20AM_result.webp",
    ],
    tagline: "Luxury Suite with Bathtub",
    shortDescription:
      "Executive suite with separate seating lounge and deep soaking bathtub.",
    fullDescription:
      "Hand-finished teak wood elements with a king bed. Features a deep soaking bathtub and lounge.",
    size: "500 sq ft",
    occupancy: "Sleeps 2–3",
    bedType: "1 California King Bed",
    startingPrice: 4899,
    highlights: [
      "Deep soaking bathtub and rain shower",
      "Separate seating lounge",
      "Artisan espresso machine",
    ],
  },
];

/**
 * Helper to get a room by slug.
 */
export function getRoomBySlug(slug) {
  return rooms.find((r) => r.slug === slug) || null;
}

/**
 * Safe image source handler that falls back if custom cover.jpg is not yet added.
 */
export function getRoomPhotoSrc(room, photoIndex = 0) {
  // If the user drops images into /public/rooms/[slug]/, those will resolve.
  // We can return the path, with the fallback available on error.
  const custom = room.galleryPhotos && room.galleryPhotos[photoIndex];
  const fallback = (room.fallbackGallery && room.fallbackGallery[photoIndex]) || room.fallbackImage;
  return { custom, fallback };
}
