export interface Dictionary {
  common: {
    appName: string
    getStarted: string
    planYourTrip: string
    destination: string
    interests: string
    travelDates: string
    startDate: string
    endDate: string
    budget: string
    generateItinerary: string
    regenerate: string
    downloadPDF: string
    pdfDownloadError: string
    pdfGenerating: string
    pdfGenerated: string
    saving: string
    save: string
    savingTrip: string
    tripSaved: string
    tripSaveError: string
    recommendations: string
    activities: string
    localTips: string
    budgetTips: string
    weatherInfo: string
    quickLinks: string
    aboutUs: string
    contact: string
    allRightsReserved: string
    validation: {
      required: string
      invalidDate: string
      invalidBudget: string
      endDateBeforeStart: string
    }
  }
  nav: {
    planner: string
    about: string
  }
  features: {
    title: string
    description: string
    weather: string
    attractions: string
    transportation: string
    food: string
  }
  planner: {
    title: string
    subtitle: string
    destinationPlaceholder: string
    selectInterests: string
    customizedItinerary: string
    day: string
    loading: string
    errors: string
  }
  home: {
    hero: {
      title: string
      description: string
      cta: {
        primary: string
        secondary: string
      }
    }
    features: {
      title: string
      description: string
      cards: {
        destination: {
          title: string
          description: string
        }
        planning: {
          title: string
          description: string
        }
        budget: {
          title: string
          description: string
        }
        recommendations: {
          title: string
          description: string
        }
      }
    }
  }
} 