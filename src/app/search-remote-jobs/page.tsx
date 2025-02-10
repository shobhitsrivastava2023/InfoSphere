"use client";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";
import type React from "react";
import { useEffect, useId, useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Search,
  Briefcase,
  MapPin,
  DollarSign,
  LoaderCircle,
  Mic,
} from "lucide-react";
import axios from 'axios'; // Import Axios
import JobCard  from "../Components/JobCard";  // Import the JobCard component
import { TextShimmer } from "~/components/ui/text-shimmer";

const ITEMS_PER_PAGE = 8;  // Define the number of jobs per page

const SearchRemoteJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [error, setError] = useState(null);  // State for errors
  const [showTextShimmer, setShowTextShimmer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (inputValue) {
      const timer = setTimeout(() => {
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inputValue]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue) // Update the searchQuery state
    setIsLoading(true);
    setShowTextShimmer(true);  // Show text shimmer on search
    setError(null);
    setCurrentPage(1); // Reset to first page on new search
    try {
      const response = await axios.get(`http://localhost:8000/search?query=${inputValue}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`); // Replace with your backend URL
      setSearchResults(response.data.jobs);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.message || 'An error occurred while fetching data.');
      setSearchResults([]); // Clear previous results on error
      setTotalPages(1);
    } finally {
      setIsLoading(false);
      setShowTextShimmer(false); // Hide text shimmer after search completes
    }
  };

  useEffect(() => {
    // This useEffect is called when the page number changes, updating the search results
    if (searchQuery) {  // Only fetch if there's a search query
      const fetchSearchResults = async () => {
        setIsLoading(true);
        setError(null);
        setShowTextShimmer(true);
        try {
          const response = await axios.get(`http://localhost:8000/search?query=${searchQuery}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`);  // Added pagination
          setSearchResults(response.data.jobs);
          setTotalPages(response.data.totalPages);
        } catch (err) {
          setError(err.message || 'An error occurred while fetching data.');
          setSearchResults([]);
          setTotalPages(1);
        } finally {
          setIsLoading(false);
          setShowTextShimmer(false);
        }
      };

      fetchSearchResults();
    }
  }, [currentPage, searchQuery]);  // Dependency array includes currentPage and searchQuery

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  return (
    <div className="min-h-screen bg-black py-6 text-gray-100 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8"
        >
          <h1 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-5xl md:mb-6 md:text-left md:text-6xl lg:text-8xl">
            <span className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">
              Showing the Best
            </span>
            <br />
            <span
              className={cn(
                "bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 bg-clip-text text-transparent",
              )}
            >
              Remote Jobs
            </span>
          </h1>

          <form onSubmit={handleSearch} className="mx-auto w-full max-w-3xl">
            <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
              <div className="relative flex-grow">
                <Input
                  id={id}
                  className="peer h-12 w-full rounded-lg border-gray-700 bg-black/10 pe-9 ps-9 text-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-blue-500"
                  placeholder="Try 'Software Developer'"
                  type="search"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  {isLoading ? (
                    <LoaderCircle
                      className="animate-spin"
                      size={16}
                      strokeWidth={2}
                      role="status"
                      aria-label="Loading..."
                    />
                  ) : (
                    <Search size={16} strokeWidth={2} aria-hidden="true" />
                  )}
                </div>
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-12 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-colors hover:text-foreground focus:z-10"
                  aria-label="Press to speak"
                  type="button"
                >
                  <Mic size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
              <div>

              </div>
              <Button
                type="submit"
                className="h-12 w-full whitespace-nowrap rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700 sm:w-auto sm:px-6 sm:text-base md:px-8 md:text-lg"
              >
                Search Jobs
              </Button>
            </div>
          </form>
          {error && <p className="text-red-500">Error: {error}</p>}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">  {/* Results Container */}
            {showTextShimmer ? (
              <TextShimmer className='font-mono text-sm' duration={1}>
                Scraping from credible sources ...
              </TextShimmer>
            ) : searchResults.length > 0 ? (
              searchResults.map((job, index) => (
                <JobCard key={index} job={job} />
              ))
            ) : (
              searchQuery && !isLoading && <p>No results found for "{searchQuery}".</p>
            )}
          </div>

          {/* Pagination Component */}
          {searchResults.length > 0 && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                className="text-gray-400 hover:text-white"
              >
                Previous
              </Button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                className="text-gray-400 hover:text-white"
              >
                Next
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchRemoteJobs;