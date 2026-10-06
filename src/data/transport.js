/**
 * Transport Configuration for Hotel Pumerai
 * Nearest airports, railway station and bus stand data.
 */
export const transportConfig = {
  airports: {
    id: "airports",
    label: "AIRPORTS",
    name: "Goa International Airport (Dabolim) and Mangaluru International Airport",
    distanceLine: "About 165 to 180 km by road",
    description: null,
  },
  railway: {
    id: "railway",
    label: "RAILWAY STATION",
    name: "Honnavar Railway Station (HNA)",
    distanceLine: "3 to 3.5 km · 5 to 7 min drive",
    description:
      "Railway Station Rd, Karki, Karnataka 581341. Local taxis and auto-rickshaws are available.",
    image: "/images/transport/honnavar-railway-station.webp",
    imageWidth: 225, // Source is 225x150, < 300px threshold -> disqualified for display
    imageHeight: 150,
    alt: "Honnavar Railway Station",
    caption: "Honnavar Railway Station",
  },
  busStand: {
    id: "bus-stand",
    label: "BUS STAND",
    name: "Honnavar KSRTC Bus Stand",
    distance: null, // TODO
    time: null, // TODO
    distanceLine: null,
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&origin=Hotel+Pumerai+Honnavar&destination=Honnavar+KSRTC+Bus+Stand",
    description: null,
  },
};
