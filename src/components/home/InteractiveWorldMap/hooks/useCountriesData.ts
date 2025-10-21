import { useEffect, useState } from "react";
import {
  fetchAllCountries,
  fetchCountryByName,
  Country,
} from "@/services/api/map";

export const useCountriesData = () => {
  const [countriesData, setCountriesData] = useState<Country[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const all = await fetchAllCountries();
        setCountriesData(all);
      } catch (error) {
        console.error("Error loading countries:", error);
      }
    };
    loadCountries();
  }, []);

  const fetchCountry = async (countryName: string): Promise<Country | null> => {
    try {
      let country =
        countriesData.find((c) => c.name.common === countryName) ||
        countriesData.find(
          (c) =>
            c.name.common.toLowerCase().includes(countryName.toLowerCase()) ||
            c.name.official.toLowerCase().includes(countryName.toLowerCase())
        );

      if (!country) {
        const apiCountries = await fetchCountryByName(countryName);
        if (apiCountries?.length > 0) {
          country = apiCountries[0];
        }
      }

      return country || null;
    } catch (err) {
      console.error("Error fetching country:", err);
      return null;
    }
  };

  return { countriesData, fetchCountry };
};
