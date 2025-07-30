export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  capital: string[];
  region: string;
  subregion: string;
  languages?: {
    [key: string]: string;
  };
  latlng: number[];
  borders: string[];
  area: number;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms?: {
    png: string;
    svg: string;
  };
  timezones: string[];
  continents: string[];
  startOfWeek: string;
  car: {
    signs: string[];
    side: string;
  };
  postalCode?: {
    format: string;
    regex: string;
  };
}

export interface CountryMapData {
  id: string;
  name: string;
  path: string;
  countryCode: string;
  region: string;
  population: number;
  area: number;
  capital: string[];
  flag: string;
}

// Fetch all countries from REST Countries API
export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    console.log('Fetching countries from API...');
    
    // Try the main endpoint first
    let response = await fetch('https://restcountries.com/v3.1/all', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    // If main endpoint fails, try alternative
    if (!response.ok) {
      console.log('Main endpoint failed, trying alternative...');
      response = await fetch('https://restcountries.com/v3.1/independent?status=true', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
    }
    
    console.log('API Response status:', response.status);
    console.log('API Response headers:', response.headers);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error response:', errorText);
      throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API Response data length:', data.length);
    console.log('Sample API data:', data.slice(0, 2));
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

// Fetch country by name
export const fetchCountryByName = async (name: string): Promise<Country[]> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch country');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching country:', error);
    throw error;
  }
};

// Fetch country by code
export const fetchCountryByCode = async (code: string): Promise<Country> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    if (!response.ok) {
      throw new Error('Failed to fetch country');
    }
    const countries = await response.json();
    return countries[0];
  } catch (error) {
    console.error('Error fetching country:', error);
    throw error;
  }
};

// Get countries by region
export const fetchCountriesByRegion = async (region: string): Promise<Country[]> => {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/region/${encodeURIComponent(region)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries by region');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries by region:', error);
    throw error;
  }
}; 