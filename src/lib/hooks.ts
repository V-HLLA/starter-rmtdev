import { useState, useEffect } from "react";
import { TJobItem, TJobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";

// Hook to track the active job ID from the URL hash
export function useURLActiveJobID() {
  const [activeID, setActiveID] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hashID = +window.location.hash.slice(1);
      setActiveID(hashID);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return activeID;
}

// Hook to fetch job details for the active job ID
export function useJobDetails(activeID: number | null) {
  const [activeJobItem, setActiveJobItem] = useState<TJobItemExpanded | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!activeID) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}/${activeID}`);
      const data = await response.json();
      setActiveJobItem(data.jobItem);
      setIsLoading(false);
    };
    fetchData();
  }, [activeID]);

  return { activeJobItem, isLoading };
}

// Hook to fetch job listings based on a search query
export function useJobSearchResults(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);
  const displayedCount = jobItemsSliced.length;
  const resultsCount = jobItems.length;

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };
    fetchData();
  }, [searchText]);

  return {
    jobItemsSliced,
    isLoading,
    resultsCount,
    displayedCount,
  };
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceID = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(debounceID);
  }, [value, delay]);
  return debouncedValue;
}
