import { useState, useEffect } from "react";
import { TJobItemApiResponse, TJobListApiResponse } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

const fetchJobItem = async (activeID: number): Promise<TJobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${activeID}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};
// Hook to fetch job details for the active job ID
export function useJobDetails(activeID: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", activeID],
    () => (activeID ? fetchJobItem(activeID) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(activeID),
      onError: (error) => {
        // TODO: IMPLEMENT ERROR HANDLING
        console.log(error);
      },
    }
  );
  return { jobItem: data?.jobItem, isLoading: isInitialLoading } as const;
}

// Hook to fetch job listings based on a search query
// export function useJobSearchResults(searchText: string) {
//   const [jobItems, setJobItems] = useState<TJobItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!searchText) return;

//     const fetchData = async () => {
//       setIsLoading(true);
//       const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
//       const data = await response.json();
//       setIsLoading(false);
//       setJobItems(data.jobItems);
//     };
//     fetchData();
//   }, [searchText]);

//   return {
//     jobItems,
//     isLoading,
//   };
// }

const fetchJobList = async (
  searchText: string
): Promise<TJobListApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  const data = await response.json();
  return data;
};
// Hook to fetch job listings based on a search query
export function useJobSearchResults(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobList(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchText),
      onError: (error) => {
        // TODO: IMPLEMENT ERROR HANDLING
        console.log(error);
      },
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
