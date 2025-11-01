export interface Dictionary {
  common: {
    appName: string;
    getStarted: string;
    planYourTrip: string;
    destination: string;
    interests: string;
    travelDates: string;
    startDate: string;
    endDate: string;
    currency: string;
    currencySelect: string;
    budget: string;
    generateItinerary: string;
    regenerate: string;
    downloadPDF: string;
    pdfDownloadError: string;
    pdfGenerating: string;
    pdfGenerated: string;
    saving: string;
    save: string;
    savingTrip: string;
    tripSaved: string;
    tripSaveError: string;
    recommendations: string;
    activities: string;
    localTips: string;
    budgetTips: string;
    weatherInfo: string;
    aboutUs: string;
    contact: string;
    allRightsReserved: string;
    validation: {
      required: string;
      invalidDate: string;
      invalidBudget: string;
      endDateBeforeStart: string;
      destination?: string;
      startDate?: string;
      endDate?: string;
      interests?: string;
      budget?: string;
      expectedArrayReceivedBoolean?: string;
      [key: string]: string | undefined;
    };
    interestOptions: {
      culture: string;
      nature: string;
      food: string;
      shopping: string;
      nightlife: string;
      relaxation: string;
      adventure: string;
      art: string;
    };
    comingSoon: string;
    multiDestination: string;
    addDestination: string;
    removeDestination: string;
  };
  nav: {
    home: string;
    planner: string;
    about: string;
    blog: string;
    contact: string;
  };
  footer: {
    newsletterTitle: string;
    newsletterDesc: string;
    emailPlaceholder: string;
    description: string;
    subscribe: string;
    followUs: string;
    corporate: string;
    about: string;
    media: string;
    culture: string;
    career: string;
    security: string;
    rules: string;
    customer: string;
    cookies: string;
    privacy: string;
    help: string;
    write: string;
    faq: string;
    assistance: string;
    contact: string;
  };
  features: {
    title: string;
    description: string;
    weather: string;
    weatherdesc: string;
    attractions: string;
    attractionsdesc: string;
    transportation: string;
    transportationdesc: string;
    food: string;
    fooddesc: string;
  };
  destinations: {
    title: string;
    description: string;
    cities: Record<string, string>;
    countries: Record<string, string>;
  };
  testimonials: {
    title: string;
    description: string;
  };
  interactiveWorldMap: {
    title: string;
    description: string;
    continents: {
      nameNorthAmerica: string;
      nameSouthAmerica: string;
      nameEurope: string;
      nameAfrica: string;
      nameAsia: string;
      nameOceania: string;
      descriptionNorthAmerica: string;
      descriptionSouthAmerica: string;
      descriptionEurope: string;
      descriptionAfrica: string;
      descriptionAsia: string;
      descriptionOceania: string;
      countriesTitle: string
    }
  };
  planner: {
    title: string;
    subtitle: string;
    description: string;
    destinationPlaceholder: string;
    selectInterests: string;
    customizedItinerary: string;
    day: string;
    loading: string;
    errors: string;
    // Translation keys for dummy trip plan (optional, with fallbacks)
    visit?: string;
    explore?: string;
    guidedTour?: string;
    attend?: string;
    discover?: string;
    hikeIn?: string;
    birdWatching?: string;
    natureWalk?: string;
    join?: string;
    tasteLocalCuisine?: string;
    cookingClass?: string;
    fineDining?: string;
    streetFood?: string;
    wineTasting?: string;
    shopAt?: string;
    findSouvenirs?: string;
    shopLocalCrafts?: string;
    enjoy?: string;
    liveMusic?: string;
    theaterShow?: string;
    pubCrawl?: string;
    danceAt?: string;
    spaDay?: string;
    beachRelaxation?: string;
    yogaSession?: string;
    meditationRetreat?: string;
    sunsetViewing?: string;
    massageTherapy?: string;
    waterSports?: string;
    rockClimbing?: string;
    paragliding?: string;
    scubaDiving?: string;
    bungeeJumping?: string;
    mountainBiking?: string;
    rafting?: string;
    streetArtTour?: string;
    theaterPerformance?: string;
    musicConcert?: string;
    craftWorkshop?: string;
    photographyTour?: string;
    lunchAndExplore?: string;
    eveningActivities?: string;
    dinnerAtRestaurant?: string;
    cityCenter?: string;
    downtown?: string;
    centralPark?: string;
    market?: string;
    museum?: string;
    historicalMuseum?: string;
    oldTown?: string;
    castle?: string;
    culturalFestival?: string;
    artGallery?: string;
    archaeologicalSite?: string;
    culturalCenter?: string;
    nationalPark?: string;
    botanicalGardens?: string;
    natureReserve?: string;
    waterfall?: string;
    caves?: string;
    forest?: string;
    foodTour?: string;
    traditionalDishes?: string;
    restaurant?: string;
    chocolateFactory?: string;
    bazaar?: string;
    artisanQuarter?: string;
    shoppingDistrict?: string;
    antiqueShops?: string;
    fashionStreet?: string;
    rooftopBar?: string;
    venue?: string;
    nightclub?: string;
    jazzClub?: string;
    hotSprings?: string;
    localArea?: string;
    nightlife?: string;
    bistro?: string;
    seafoodRestaurant?: string;
    traditionalCafe?: string;
    fineDiningRestaurant?: string;
    streetFoodMarket?: string;
    historicalSite?: string;
    scenicSpot?: string;
    observationDeck?: string;
    viewpoint?: string;
    pleasantWeather?: string;
    warmAndSunny?: string;
    coolWithClouds?: string;
    learnBasicPhrases?: string;
    respectLocalCustoms?: string;
    carryCash?: string;
    dontAcceptCards?: string;
    usePublicTransport?: string;
    forBetterExperience?: string;
    visitEarly?: string;
    earlyMorning?: string;
    toAvoidCrowds?: string;
    withBudget?: string;
    considerMidRange?: string;
    bookRestaurants?: string;
    inAdvance?: string;
    forBetterPrices?: string;
    toSaveMoney?: string;
    eatAtLocal?: string;
    insteadOfTourist?: string;
    lookForFree?: string;
    weatherIn?: string;
    duringVisit?: string;
    withTemperatures?: string;
    to?: string;
    expectPrecipitation?: string;
    precipitationChance?: string;
    seafood?: string;
    cafePastries?: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    content: {
      title: string;
      subtitle: string;
      description: string;
      storiesTitle: string;
      storiesSubTitle: string;
      statsTitle: string;
      statsSubTitle: string;
    };
    counters: {
      plannedTrips: string;
      visitedCities: string;
      happyTravelers: string;
      countriesExplored: string;
      localExperiences: string;
      culturalEvents: string;
      photosCaptured: string;
      reviewsCollected: string;
    };
  };
  blog: {
    title: string;
    subtitle: string;
    description: string;
    content: {
      title: string;
      subtitle: string;
      readmore: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    content: {
      title: string;
      subtitle: string;
    };
    info: {
      email: string;
      phone: string;
      address: string;
    };
    form: {
      name: string;
      nametooltip: string;
      email: string;
      emailtooltip: string;
      message: string;
      messagetooltip: string;
      send: string;
      successmessage: string;
    }
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      cta: {
        primary: string;
      };
    };
    features: {
      title: string;
      description: string;
      cards: {
        destination: {
          title: string;
          description: string;
        };
        planning: {
          title: string;
          description: string;
        };
        budget: {
          title: string;
          description: string;
        };
        recommendations: {
          title: string;
          description: string;
        };
      };
    };
  };
}
