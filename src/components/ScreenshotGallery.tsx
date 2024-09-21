import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface ScreenshotGalleryProps {
  username: string;
}

const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ username }) => {
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/agents/${username}/screenshots`
        );
        if (response.data && response.data.screenshots) {
          setScreenshots(response.data.screenshots);
        } else {
          console.error(
            "No screenshots found or invalid structure:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching screenshots:", error);
      }
    };

    fetchScreenshots();
  }, [username]);

  // Pre-process filenames to extract timestamps
  const filenamesWithTimestamps = screenshots.map((filename) => {
    const parts = filename.split("_");
    const timestamp = parts.slice(0, 2).join(" ");
    return {
      filename,
      timestamp,
    };
  });

  const reversedScreenshots = filenamesWithTimestamps.slice().reverse();
  const currentImage = reversedScreenshots[currentIndex];

  const nextImage = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % reversedScreenshots.length
    );
  }, [reversedScreenshots]);

  const prevImage = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + reversedScreenshots.length) %
        reversedScreenshots.length
    );
  }, [reversedScreenshots]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextImage, prevImage]);
  

  // Pagination logic
  const imagesPerPage = 20; // Number of thumbnails per page
  const totalPages = Math.ceil(screenshots.length / imagesPerPage);

  const currentImages = reversedScreenshots.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  return (
    <>
      <div className="grid gap-3 dark:bg-gray-50 rounded-md">
        {/* Main Image with Navigation */}
        {screenshots.length > 0 && (
          <div className="relative">
            <Image
              src={`http://localhost:8080/agents/${username}/Screenshot/${currentImage.filename}`}
              alt="Main Screenshot"
              layout="responsive"
              width={1920}
              height={1080}
              className="h-auto max-w-full rounded-lg"
              unoptimized
            />

            <button
              type="button"
              onClick={prevImage}
              className="absolute inset-y-0 left-0 w-16 text-white flex rounded-s-lg items-center justify-center z-10"
              aria-label="Previous Image"
            >
              <ChevronLeftIcon className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute inset-y-0 right-0 w-16 text-white flex items-center justify-center z-10 rounded-e-lg"
              aria-label="Next Image"
            >
              <ChevronRightIcon className="h-8 w-8" />
            </button>
            <p className="text-lg flex items-center justify-center bg-green-700 text-white py-2 mt-2 rounded-md">
              Timestamp: {currentImage.timestamp || "N/A"}
            </p>
          </div>
        )}

        <hr className="w-48 h-1 mx-auto my-3 bg-gray-100 border-0 rounded dark:bg-gray-700" />

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-5 gap-3 m-4 ">
          {currentImages.map((file, index) => (
            <div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setCurrentIndex(reversedScreenshots.indexOf(file))}
            >
              <div className="relative w-full h-32">
                <Image
                  src={`http://localhost:8080/agents/${username}/Screenshot/${file.filename}`}
                  alt={`Screenshot ${index + 1}`}
                  layout="fill"
                  className="rounded-lg"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent text-white flex items-end p-2 rounded-lg">
                  <p className="text-xs">
                    Timestamp: {file.timestamp || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )) }
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ScreenshotGallery;
