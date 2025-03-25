import { useState, useEffect } from "react";
import { TJobItem, TJobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";

export function useActiveID() {
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

export function useActiveJobID(activeID: number | null) {
  const [activeJobItem, setActiveJobItem] = useState<TJobItemExpanded | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!activeID) return;

    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch(`${BASE_API_URL}/${activeID}`);
      const data = await response.json();
      setIsLoading(false);
      setActiveJobItem(data.jobItem);
    };
    fetchData();
  }, [activeID]);

  return { activeJobItem, isLoading };
}

export function useJobsItems(searchText: string) {
  const [jobItems, setJobItems] = useState<TJobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobItemsSliced = jobItems.slice(0, 7);
  const displayedCount = jobItems.slice(0, 7).length;
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
