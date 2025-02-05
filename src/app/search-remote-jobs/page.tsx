"use client";
import { cn } from "~/lib/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
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

const SearchRemoteJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inputValue) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [inputValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };
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
                  className="peer h-12 w-full rounded-lg border-gray-700 bg-black/60 pe-9 ps-9 text-gray-400 backdrop-blur-sm transition-all duration-300 focus:border-blue-500"
                  placeholder="Search jobs..."
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
        </motion.div>
      </div>
    </div>
  );
};

export default SearchRemoteJobs;