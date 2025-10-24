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
