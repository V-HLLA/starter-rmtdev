import { useState, useEffect } from "react";
import { TJobItemApiResponse, TJobListApiResponse } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";

// Hook to fetch job details for the active job ID
const fetchJobItem = async (activeID: number): Promise<TJobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${activeID}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};
export function useJobDetails(activeID: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", activeID],
    () => (activeID ? fetchJobItem(activeID) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(activeID),
      onError: handleError,
    }
  );
  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
}

// Hook to fetch job listings based on a search query
const fetchJobList = async (
  searchText: string
): Promise<TJobListApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};
export function useJobSearchResults(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobList(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: handleError,
    }
  );
  return { jobItems: data?.jobItems, isLoading: isInitialLoading } as const;
}

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
