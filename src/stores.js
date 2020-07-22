'use strict';

import { writable } from 'svelte/store';

export let STANDARD_TOUR = {
  title:
    "John Gray’s Hong by Starlight from Phuket with Sea Kayaking & Loi Krathong Floating",
  subtitle:
    "Sea cave exploring literally inside Phang Nga Bay’s marine geology",
  summary:
    "Enjoy an afternoon of sea cave exploring in Phang Nga Bay, including the limestone caves and hidden cliff-lined lagoons at Koh Panak discovered by John Gray in 1989. Expect a great nature and wildlife adventure with an experienced guide and enjoy the best Thai seafood buffet during your holiday aboard the convenient escort boat of John Gray's Sea Canoe. Finish your trip after dark by floating your own self-made flower “Kratong” in a spiritual and spectacular natural light show.",
  description:
    "<p>This full-day kayak trip from Phuket starts at midday to avoid the crowds, with a convenient pickup service by luxury air-conditioned minivan from the entire Phuket Island. Don’t eat lunch, as you will be served a healthy and nutritious meal onboard the comfortable and modern twin-engine escort boat after leaving from Ao Po Pier. During the boat ride you will watch a raptor show and get a detailed briefing about the nature and geological site of Phang Nga Bay. Learn the basic do’s and don’ts of how to securely enter the caves and hongs.</p><p>Start the first kayaking session with your well-educated and experienced guide through limestone caves and lagoons in the dramatic setting at Koh Panak. The hand-made kayaks are specially designed for your trip, and you can feel absolutely safe because there was never a capsize, a puncture or any accident. Your professional guide paddles you and your partner through 'Tidal Nape' sea caves inside Phang Nga Bay’s marine limestone karstic islands into 'hongs' (Thai for room). The hidden cliff-lined lagoons are populated with macaques, water monitors, kingfishers, mud-skippers, egrets, sea eagles and brahminy kites. Explore the Ice Cream Cave famous for its formations with different shapes, colors and size - absolutely phenomenal. Return to the escort boat and move on to the second island with two more caves and hongs to explore.</p><p>You will finish after dark by floating your own self-made flower “Krathong” in a spiritual and spectacular natural light show. Guests say that the evening Loi Kratong ceremony complete with fireflies and dinoflagellates (bio-luminescent plankton) is a 'spiritual experience'.</p><p>Eat a delicious seafood/vegan buffet on the trip back, you return to the pier two hours after sunset. Only the highest-quality ingredients are used to prepare the lunch and dinner, fresh from the local market. Seafood is net caught and chickens are free range. Brown, red, and black rice is served with homemade Massaman curry.</p>",
  highlights: [
    "Kayak into hidden caves and lagoons of Koh Panak",
    "Cruise from Phuket into the Phang Nga Bay",
    "Be guided by highly trained and experienced tour guides of John Gray's Sea Canoe",
    "Eat healthy Thai food including lunch and dinner",
    "Float your own self-made flower “Kratong”"
  ],
  important: [
    "To start the tour you must show the ticket voucher on your mobile phone to the staff of John Gray's Sea Canoe",
    "Bring towel, bathing clothes, dry and warm clothes for the way back, sunglasses, sun cream and a camera or smart phone (at your own risk, dry-bags are provided)",
    "This tour is not recommended for pregnant women or people with back or neck problems"
  ],
  itineraries: [
    {
      title: "Hotel pickup service in Phuket",
      schedule: "10:30 - 12:00",
      attraction: {
        title: "Phuket",
        url:
          "https://www.tripadvisor.com/Tourism-g293920-Phuket-Vacations.html"
      }
    },
    {
      title: "Meet the crew at Ao Po Pier & get instructions",
      schedule: "12:00 - 13:00",
      attraction: {
        title: "Ao Po Pier",
        url:
          "https://www.tripadvisor.com/Attraction_Review-g2315811-d8559001-Reviews-Ao_Po_Pier-Pa_Khlok_Thalang_District_Phuket.html",
        location: {
          lat: 7.918059,
          lng: 98.346466
        }
      }
    },
    {
      title: "Departure by escort boat to Phang Nga Bay",
      schedule: "13:00 - 13:10",
      attraction: {
        title: "Phang Nga Bay",
        url:
          "https://www.tripadvisor.com/Attraction_Review-g1152716-d317707-Reviews-Phang_Nga_Bay-Ao_Phang_Nga_National_Park_Phang_Nga_Province.html",
        location: {
          lat: 8.221881,
          lng: 98.50035
        }
      }
    },
    {
      title: "Enjoy lunch on board the tour boat",
      schedule: "13:10 - 14:10"
    },
    {
      title: "Kayak into the cave at Koh Phanak",
      schedule: "14:10 - 16:15",
      attraction: {
        title: "Koh Panak",
        url:
          "https://www.tripadvisor.com/Attraction_Review-g1152716-d7702675-Reviews-Koh_Panak_Cave-Ao_Phang_Nga_National_Park_Phang_Nga_Province.html",
        location: {
          lat: 8.190414,
          lng: 98.490306
        }
      }
    },
    {
      title: "Continue to Hong Island",
      schedule: "16:15 - 16:30"
    },
    {
      title: "Sightseeing & kayaking at Koh Hong",
      schedule: "16:30 - 17:00",
      attraction: {
        title: "Koh Hong",
        url:
          "https://www.tripadvisor.com/Attraction_Review-g1152716-d10594729-Reviews-Hongs_of_Phang_Nga-Ao_Phang_Nga_National_Park_Phang_Nga_Province.html",
        location: {
          lat: 8.222773,
          lng: 98.500712
        }
      }
    },
    {
      title: "Explore Bat Cave",
      schedule: "17:00 - 17:15",
      attraction: {
        title: "Bat Cave",
        url:
          "https://www.tripadvisor.com/Attraction_Review-g1152716-d7702675-Reviews-Koh_Panak_Cave-Ao_Phang_Nga_National_Park_Phang_Nga_Province.html",
        location: {
          lat: 8.191899,
          lng: 98.488180
        }
      }
    },
    {
      title: "Explore Ice-cream Cave",
      schedule: "17:15 - 17:30",
      attraction: {
        title: "Ice Cream Cave",
        url:
          "https://www.tripadvisor.com/Attraction_Review-g1152716-d13454969-Reviews-Ice_Cream_Cave-Ao_Phang_Nga_National_Park_Phang_Nga_Province.html",
        location: {
          lat: 8.197626,
          lng: 98.492186
        }
      }
    },
    {
      title: "Free time for relaxing at the beach or kayaking",
      schedule: "17:30 - 18:15"
    },
    {
      title: "Make your own Krathong & have dinner on the boat",
      schedule: "18:15 - 18:45"
    },
    {
      title: "Float the self-made Krathong in the cave of Phanak Island",
      schedule: "18:45 - 19:15",
      attraction: {
        title: "Koh Panak",
        url:
          "https://www.tripadvisor.com/Attraction_Review-g1152716-d7702675-Reviews-Koh_Panak_Cave-Ao_Phang_Nga_National_Park_Phang_Nga_Province.html",
        location: {
          lat: 8.190414,
          lng: 98.490306
        }
      }
    },
    {
      title: "See phosphorescent plankton",
      schedule: "19:15 - 19:30",
      attraction: {
        title: "Koh Panak",
        url:
          "https://www.tripadvisor.com/Attraction_Review-g1152716-d7702675-Reviews-Koh_Panak_Cave-Ao_Phang_Nga_National_Park_Phang_Nga_Province.html",
        location: {
          lat: 8.190414,
          lng: 98.490306
        }
      }
    },
    {
      title: "Head back to Phuket",
      schedule: "19:30 - 20:30"
    },
    {
      title: "Transfer to your hotel",
      schedule: "20:30 - 21:00"
    }
  ],

  attractions: [
    {
      title: "John Gray's Sea Canoe",
      url:
        "https://www.tripadvisor.com/Attraction_Review-g1215781-d639970-Reviews-John_Gray_s_Sea_Canoe-Phuket_Town_Phuket.html"
    }
  ],

  includes: [
    "Hotel round-trip transfer on the entire Phuket island including airport pick-up and drop-off service",
    "Full board meal plan with lunch, dinner, bottled water and herbal tea",
    "Comfortable and modern twin-engine escort boat",
    "Caveman's SOTAR sea kayaks",
    "Kayak equipment including a dry bag",
    "Basic accident insurance",
    "Professional and experienced English and Chinese speaking guide",
    "National Park entrance fee"
  ]
};

export function createTour() {
  var tourDefinition = localStorage.getItem("tour");
  if (!tourDefinition) {
    tourDefinition = JSON.parse(JSON.stringify(STANDARD_TOUR));
  } else {
    tourDefinition = JSON.parse(tourDefinition);
  }
  let tour = writable(tourDefinition);
  tour.subscribe(function (tour) {
    localStorage.setItem("tour", JSON.stringify(tour));
  });
  return tour;
}

export const mapsLoaded = writable(false);
export const mapsLoading = writable(false);
export const map = writable(null);