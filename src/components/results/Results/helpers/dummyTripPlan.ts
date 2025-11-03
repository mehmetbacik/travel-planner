import { Dictionary } from '@/types/dictionary';

interface DestinationData {
  destination: string;
  startDate: string;
  endDate: string;
}

interface TripFormData {
  destinations: DestinationData[];
  interests: string[];
  budget: number;
  currency: string;
}

export function getDummyTripPlan(dict: Dictionary, data: TripFormData) {
  // Helper function to get activity based on interest with translations
  const getActivitiesByInterest = (interest: string, destination: string, day: number, dict: Dictionary): string => {
    const activityTemplates: Record<string, string[]> = {
      culture: [
        `${dict.planner.visit || 'Visit'} ${destination} ${dict.planner.historicalMuseum || 'Historical Museum'}`,
        `${dict.planner.explore || 'Explore'} ${destination} ${dict.planner.oldTown || 'Old Town'}`,
        `${dict.planner.guidedTour || 'Take a guided tour of'} ${destination} ${dict.planner.castle || 'Castle'}`,
        `${dict.planner.attend || 'Attend'} ${destination} ${dict.planner.culturalFestival || 'Cultural Festival'}`,
        `${dict.planner.visit || 'Visit'} ${destination} ${dict.planner.artGallery || 'Art Gallery'}`,
        `${dict.planner.explore || 'Explore'} ${destination} ${dict.planner.archaeologicalSite || 'Archaeological Site'}`,
        `${dict.planner.discover || 'Discover'} ${destination} ${dict.planner.culturalCenter || 'Cultural Center'}`
      ],
      nature: [
        `${dict.planner.hikeIn || 'Hike in'} ${destination} ${dict.planner.nationalPark || 'National Park'}`,
        `${dict.planner.visit || 'Visit'} ${destination} ${dict.planner.botanicalGardens || 'Botanical Gardens'}`,
        `${dict.planner.explore || 'Explore'} ${destination} ${dict.planner.natureReserve || 'Nature Reserve'}`,
        `${dict.planner.birdWatching || 'Go bird watching in'} ${destination}`,
        `${dict.planner.visit || 'Visit'} ${destination} ${dict.planner.waterfall || 'Waterfall'}`,
        `${dict.planner.explore || 'Explore'} ${destination} ${dict.planner.caves || 'Caves'}`,
        `${dict.planner.natureWalk || 'Nature walk in'} ${destination} ${dict.planner.forest || 'Forest'}`
      ],
      food: [
        `${dict.planner.join || 'Join'} ${destination} ${dict.planner.foodTour || 'Food Tour'}`,
        `${dict.planner.tasteLocalCuisine || 'Taste local cuisine at'} ${destination} ${dict.planner.market || 'Market'}`,
        `${dict.planner.cookingClass || 'Cooking class:'} ${destination} ${dict.planner.traditionalDishes || 'Traditional Dishes'}`,
        `${dict.planner.fineDining || 'Fine dining at'} ${destination} ${dict.planner.restaurant || 'Restaurant'}`,
        `${dict.planner.streetFood || 'Street food exploration in'} ${destination}`,
        `${dict.planner.wineTasting || 'Wine tasting in'} ${destination}`,
        `${dict.planner.visit || 'Visit'} ${destination} ${dict.planner.chocolateFactory || 'Chocolate Factory'}`
      ],
      shopping: [
        `${dict.planner.shopAt || 'Shop at'} ${destination} ${dict.planner.bazaar || 'Bazaar'}`,
        `${dict.planner.visit || 'Visit'} ${destination} ${dict.planner.artisanQuarter || 'Artisan Quarter'}`,
        `${dict.planner.explore || 'Explore'} ${destination} ${dict.planner.shoppingDistrict || 'Shopping District'}`,
        `${dict.planner.findSouvenirs || 'Find souvenirs at'} ${destination} ${dict.planner.market || 'Market'}`,
        `${dict.planner.visit || 'Visit'} ${destination} ${dict.planner.antiqueShops || 'Antique Shops'}`,
        `${dict.planner.shopLocalCrafts || 'Shop local crafts in'} ${destination}`,
        `${dict.planner.visit || 'Visit'} ${destination} ${dict.planner.fashionStreet || 'Fashion Street'}`
      ],
      nightlife: [
        `${dict.planner.enjoy || 'Enjoy'} ${destination} ${dict.planner.nightlife || 'Nightlife'}`,
        `${dict.planner.visit || 'Visit'} ${destination} ${dict.planner.rooftopBar || 'Rooftop Bar'}`,
        `${dict.planner.liveMusic || 'Live music at'} ${destination} ${dict.planner.venue || 'Venue'}`,
        `${dict.planner.theaterShow || 'Theater show in'} ${destination}`,
        `${dict.planner.pubCrawl || 'Pub crawl in'} ${destination}`,
        `${dict.planner.danceAt || 'Dance at'} ${destination} ${dict.planner.nightclub || 'Nightclub'}`,
        `${dict.planner.jazzClub || 'Jazz club in'} ${destination}`
      ],
      relaxation: [
        `${dict.planner.spaDay || 'Spa day in'} ${destination}`,
        `${dict.planner.beachRelaxation || 'Beach relaxation in'} ${destination}`,
        `${dict.planner.yogaSession || 'Yoga session in'} ${destination}`,
        `${dict.planner.meditationRetreat || 'Meditation retreat near'} ${destination}`,
        `${dict.planner.visit || 'Visit'} ${destination} ${dict.planner.hotSprings || 'Hot Springs'}`,
        `${dict.planner.sunsetViewing || 'Sunset viewing in'} ${destination}`,
        `${dict.planner.massageTherapy || 'Massage therapy in'} ${destination}`
      ],
      adventure: [
        `${dict.planner.waterSports || 'Water sports in'} ${destination}`,
        `${dict.planner.rockClimbing || 'Rock climbing in'} ${destination}`,
        `${dict.planner.paragliding || 'Paragliding over'} ${destination}`,
        `${dict.planner.scubaDiving || 'Scuba diving near'} ${destination}`,
        `${dict.planner.bungeeJumping || 'Bungee jumping in'} ${destination}`,
        `${dict.planner.mountainBiking || 'Mountain biking in'} ${destination}`,
        `${dict.planner.rafting || 'Rafting near'} ${destination}`
      ],
      art: [
        `${dict.planner.visit || 'Visit'} ${destination} ${dict.planner.artGallery || 'Art Gallery'}`,
        `${dict.planner.streetArtTour || 'Street art tour in'} ${destination}`,
        `${dict.planner.theaterPerformance || 'Theater performance in'} ${destination}`,
        `${dict.planner.musicConcert || 'Music concert in'} ${destination}`,
        `${dict.planner.craftWorkshop || 'Craft workshop in'} ${destination}`,
        `${dict.planner.photographyTour || 'Photography tour of'} ${destination}`,
        `${dict.planner.visit || 'Visit'} ${destination} ${dict.planner.artGallery || 'Art Gallery'}`
      ]
    };

    const activities = activityTemplates[interest] || [`${dict.planner.explore || 'Explore'} ${destination}`];
    return activities[day % activities.length];
  };

  // Helper function to get location
  const getLocation = (destination: string, type: 'center' | 'downtown' | 'park' | 'market' | 'museum'): string => {
    const locationTypes: Record<string, string> = {
      center: dict.planner.cityCenter || 'City Center',
      downtown: dict.planner.downtown || 'Downtown',
      park: dict.planner.centralPark || 'Central Park',
      market: dict.planner.market || 'Market',
      museum: dict.planner.museum || 'Museum'
    };

    return `${destination} ${locationTypes[type] || type}`;
  };

  // Calculate duration for each destination
  const calculateDuration = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  // Generate weather based on destination and season
  const generateWeather = (destination: string, month: number, dict: Dictionary): { summary: string; temperature: { min: number; max: number }; precipitation: string } => {
    const isSummer = month >= 6 && month <= 8;
    const isWinter = month >= 12 || month <= 2;
    
    let baseTemp = 20;
    let summary = dict.planner.pleasantWeather || 'Pleasant weather';
    
    if (isSummer) {
      baseTemp = 25;
      summary = dict.planner.warmAndSunny || 'Warm and sunny';
    } else if (isWinter) {
      baseTemp = 10;
      summary = dict.planner.coolWithClouds || 'Cool with occasional clouds';
    }

    return {
      summary,
      temperature: {
        min: baseTemp - 5,
        max: baseTemp + 5
      },
      precipitation: isSummer ? '10%' : '30%'
    };
  };

  // Generate restaurants based on destination
  const generateRestaurants = (destination: string, interests: string[], dict: Dictionary) => {
    const restaurantTypes: Record<string, string> = {
      'Local Cuisine': dict.common.interestOptions.food || 'Local Cuisine',
      'Seafood': dict.planner.seafood || 'Seafood',
      'Cafe & Pastries': dict.planner.cafePastries || 'Cafe & Pastries',
      'Fine Dining': dict.planner.fineDining || 'Fine Dining',
      'Street Food': dict.planner.streetFood || 'Street Food'
    };

    const restaurants: Array<{ name: string; type: string; rating: number }> = [
      {
        name: `${getLocation(destination, 'center').replace(' Center', '').replace(' Downtown', '')} ${dict.planner.bistro || 'Bistro'}`,
        type: restaurantTypes['Local Cuisine'],
        rating: 4.6
      },
      {
        name: `${destination} ${dict.planner.seafoodRestaurant || 'Seafood Restaurant'}`,
        type: restaurantTypes['Seafood'],
        rating: 4.4
      },
      {
        name: `${destination} ${dict.planner.traditionalCafe || 'Traditional Cafe'}`,
        type: restaurantTypes['Cafe & Pastries'],
        rating: 4.5
      },
      {
        name: `${destination} ${dict.planner.fineDiningRestaurant || 'Fine Dining'}`,
        type: restaurantTypes['Fine Dining'],
        rating: 4.8
      },
      {
        name: `${destination} ${dict.planner.streetFoodMarket || 'Street Food Market'}`,
        type: restaurantTypes['Street Food'],
        rating: 4.3
      }
    ];

    return restaurants.slice(0, 4);
  };

  // Generate attractions based on interests
  const generateAttractions = (destination: string, interests: string[], dict: Dictionary) => {
    const attractions: Array<{ name: string; type: string; rating: number }> = [];

    if (interests.includes('culture')) {
      attractions.push({
        name: getLocation(destination, 'museum'),
        type: dict.common.interestOptions.culture || 'Culture & History',
        rating: 4.7
      });
    }

    if (interests.includes('nature')) {
      attractions.push({
        name: getLocation(destination, 'park'),
        type: dict.common.interestOptions.nature || 'Nature & Outdoors',
        rating: 4.5
      });
    }

    if (interests.includes('art')) {
      attractions.push({
        name: `${destination} ${dict.planner.artGallery || 'Art Gallery'}`,
        type: dict.common.interestOptions.art || 'Art & Performance',
        rating: 4.6
      });
    }

    if (attractions.length === 0) {
      attractions.push({
        name: getLocation(destination, 'museum'),
        type: dict.planner.historicalSite || 'Historical Site',
        rating: 4.7
      });
      attractions.push({
        name: getLocation(destination, 'park'),
        type: dict.planner.scenicSpot || 'Scenic Spot',
        rating: 4.5
      });
    }

    attractions.push({
      name: `${destination} ${dict.planner.observationDeck || 'Observation Deck'}`,
      type: dict.planner.viewpoint || 'Viewpoint',
      rating: 4.6
    });

    return attractions;
  };

  // Main function to generate itinerary
  const plans = data.destinations.map((dest: DestinationData, idx: number) => {
    const duration = calculateDuration(dest.startDate, dest.endDate);
    const startMonth = new Date(dest.startDate).getMonth() + 1;
    const weather = generateWeather(dest.destination, startMonth, dict);
    
    // Generate daily plans
    const dailyPlans = Array.from({ length: duration }, (_, dayIdx) => {
      const day = dayIdx + 1;
      const primaryInterest = data.interests[dayIdx % data.interests.length] || data.interests[0] || 'culture';
      
      return {
        day,
        activities: [
          {
            time: "09:00",
            activity: getActivitiesByInterest(primaryInterest, dest.destination, dayIdx, dict),
            location: getLocation(dest.destination, 'center')
          },
          {
            time: "12:00",
            activity: `${dict.planner.lunchAndExplore || 'Lunch and explore'} ${dest.destination} ${dict.planner.localArea || 'local area'}`,
            location: getLocation(dest.destination, 'downtown')
          },
          {
            time: "15:00",
            activity: getActivitiesByInterest(data.interests[(dayIdx + 1) % data.interests.length] || 'nature', dest.destination, dayIdx + 1, dict),
            location: getLocation(dest.destination, 'park')
          },
          {
            time: "18:00",
            activity: `${dict.planner.eveningActivities || 'Evening activities in'} ${dest.destination}`,
            location: getLocation(dest.destination, 'downtown')
          },
          {
            time: "20:00",
            activity: data.interests.includes('nightlife') 
              ? `${dict.planner.enjoy || 'Enjoy'} ${dest.destination} ${dict.planner.nightlife || 'nightlife'}`
              : dict.planner.dinnerAtRestaurant || `Dinner at local restaurant`,
            location: getLocation(dest.destination, 'center')
          }
        ]
      };
    });

    const budgetPerDestination = Math.round(data.budget / data.destinations.length);
    const currencySymbol = data.currency === "TRY" ? "₺" : data.currency === "EUR" ? "€" : data.currency === "GBP" ? "£" : "$";

    return {
      destination: dest.destination,
      duration,
      dailyPlans,
      weatherForecast: weather,
      recommendations: {
        restaurants: generateRestaurants(dest.destination, data.interests, dict),
        attractions: generateAttractions(dest.destination, data.interests, dict)
      },
      aiRecommendations: {
        activities: data.interests.slice(0, 5).map(interest => 
          getActivitiesByInterest(interest, dest.destination, 0, dict)
        ),
        localTips: [
          `${dict.planner.learnBasicPhrases || 'Learn basic phrases in the local language for'} ${dest.destination}`,
          `${dict.planner.respectLocalCustoms || 'Respect local customs and traditions in'} ${dest.destination}`,
          `${dict.planner.carryCash || 'Carry cash as some places in'} ${dest.destination} ${dict.planner.dontAcceptCards || 'don\'t accept cards'}`,
          `${dict.planner.usePublicTransport || 'Use public transportation in'} ${dest.destination} ${dict.planner.forBetterExperience || 'for better experience'}`,
          `${dict.planner.visitEarly || 'Visit'} ${dest.destination} ${dict.planner.earlyMorning || 'early in the morning'} ${dict.planner.toAvoidCrowds || 'to avoid crowds'}`
        ],
        budgetTips: [
          `${dict.planner.withBudget || 'With a budget of'} ${currencySymbol} ${budgetPerDestination}, ${dict.planner.considerMidRange || 'consider mid-range accommodations in'} ${dest.destination}`,
          `${dict.planner.bookRestaurants || 'Book restaurants in'} ${dest.destination} ${dict.planner.inAdvance || 'in advance'} ${dict.planner.forBetterPrices || 'for better prices'}`,
          `${dict.planner.usePublicTransport || 'Use public transportation in'} ${dest.destination} ${dict.planner.toSaveMoney || 'to save money'}`,
          `${dict.planner.eatAtLocal || 'Eat at local restaurants in'} ${dest.destination} ${dict.planner.insteadOfTourist || 'instead of tourist places'}`,
          `${dict.planner.lookForFree || 'Look for free walking tours in'} ${dest.destination}`
        ],
        weatherInfo: `${dict.planner.weatherIn || 'The weather in'} ${dest.destination} ${dict.planner.duringVisit || 'during your visit is'} ${weather.summary.toLowerCase()} ${dict.planner.withTemperatures || 'with temperatures ranging from'} ${weather.temperature.min}°C ${dict.planner.to || 'to'} ${weather.temperature.max}°C. ${dict.planner.expectPrecipitation || 'Expect'} ${weather.precipitation} ${dict.planner.precipitationChance || 'precipitation chance'}.`
      }
    };
  });

  return {
    itineraries: plans,
    formData: {
      destinations: data.destinations,
      interests: data.interests,
      budget: data.budget,
      currency: data.currency
    },
    isDummyData: true
  };
}
