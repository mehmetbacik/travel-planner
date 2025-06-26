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
    };
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
    attractions: string;
    transportation: string;
    food: string;
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
  home: {
    hero: {
      title: string;
      description: string;
      cta: {
        primary: string;
        secondary: string;
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
