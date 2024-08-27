import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface ScreenshotGalleryProps {
  username: string;
  timestamp?: string;
}

const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ username }) => {
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.200:8080/agents/${username}/screenshots`
        );
        if (response.data && response.data.screenshots) {
          setScreenshots(response.data.screenshots);
        } else {
          console.error("No screenshots found or invalid structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching screenshots:", error);
      }
    };

    fetchScreenshots();
  }, [username]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
  }, [screenshots]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + screenshots.length) % screenshots.length);
  }, [screenshots]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextImage, prevImage]);

  // Pagination logic
  const imagesPerPage = 15; // Number of thumbnails per page
  const totalPages = Math.ceil(screenshots.length / imagesPerPage);

  // Reverse the screenshots for consistent ordering
  const reversedScreenshots = [...screenshots].reverse();

  const currentImages = reversedScreenshots.slice(
    currentPage * imagesPerPage,
    (currentPage + 1) * imagesPerPage
  );

  return (
    <>
      <div className="grid gap-4">
        {/* Main Image with Navigation */}
        {screenshots.length > 0 && (
          <div className="relative">
            <Image
              src={`http://192.168.1.200:8080/agents/${username}/Screenshot/${reversedScreenshots[currentIndex]}`}
              alt="Main Screenshot"
              layout="responsive"
              width={1200} // Adjust as needed
              height={675} // Adjust as needed
              className="h-auto max-w-full rounded-lg"
              unoptimized
              onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
            />
            <button
              type="button"
              onClick={prevImage}
              className="absolute inset-y-0 left-0 w-16  text-white flex rounded-s-lg items-center justify-center z-10 "
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
          </div>
        )}

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-5 gap-4">
          {currentImages.map((filename, index) => (
            <div
              key={index}
              className="relative cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setCurrentIndex(currentPage * imagesPerPage + index)}
            >
              <div className="relative w-full h-32">
                <Image
                  src={`http://192.168.1.200:8080/agents/${username}/Screenshot/${filename}`}
                  alt={`Screenshot ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent text-white flex items-end p-2 rounded-lg">
                  <span className="text-xs">{filename.split('_1')[0].replace("screenshot_", "").replace("_", " ").replace("_2.webp", "")}</span>
                </div>
              </div>
            </div>
          ))}
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
        <span>Page {currentPage + 1} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
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
