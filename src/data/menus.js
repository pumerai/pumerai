/**
 * Restaurant Menus Single Source of Truth
 *
 * Each menu contains:
 * - restaurant: string
 * - type: "veg" | "nonveg"
 * - hours: string
 * - showPrices: boolean (defaults to false)
 * - categories: Array<{ name: string, items: Array<{ id: string, name: string, description: string, price?: string, isVeg: boolean }> }>
 */
export const menusData = {
  veg: {
    restaurant: "Madhura Veg Restaurant",
    type: "veg",
    hours: "6:30 AM to 10:00 PM",
    showPrices: false,
    categories: [
      {
        name: "Signature Dishes",
        items: [
          {
            id: "madhura-benne-masala-dosa",
            name: "Crispy Benne Masala Dosa",
            description: "Golden butter dosa with spiced potato filling",
            isVeg: true,
          },
          {
            id: "madhura-neer-dosa",
            name: "Mangalorean Neer Dosa",
            description: "Silky coastal rice crepes with veg kurma and coconut chutney",
            isVeg: true,
          },
          {
            id: "madhura-veg-thali",
            name: "Special Karavali Veg Thali",
            description: "Unlimited rice, rasam, sambar, seasonal vegetables and sweet",
            isVeg: true,
          },
          {
            id: "madhura-filter-kaapi",
            name: "Degree Filter Kaapi",
            description: "Freshly brewed South Indian coffee in classic brass davarah",
            isVeg: true,
          },
        ],
      },
    ],
  },
  nonveg: {
    restaurant: "Matsya Multicuisine Restaurant",
    type: "nonveg",
    hours: "7:00 AM to 10:30 PM",
    showPrices: false,
    categories: [
      {
        name: "Signature Dishes",
        items: [
          {
            id: "matsya-karavali-fish-curry",
            name: "Honnavar Karavali Fish Curry",
            description: "Traditional coastal coconut broth with steamed rice",
            isVeg: false,
          },
          {
            id: "matsya-prawns-ghee-roast",
            name: "Prawns Ghee Roast",
            description: "Tossed in Kundapur spices and clarified butter",
            isVeg: false,
          },
          {
            id: "matsya-butter-garlic-crab",
            name: "Butter Garlic Mud Crab",
            description: "Fresh coastal catch in aromatic garlic butter",
            isVeg: false,
          },
          {
            id: "matsya-murgh-malai-kebab",
            name: "Murgh Malai Kebab",
            description: "Clay oven roasted chicken in cream cheese marinade",
            isVeg: false,
          },
        ],
      },
    ],
  },
};
