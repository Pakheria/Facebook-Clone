// src/components/ScreenshotGallery.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Screenshot {
  filename: string;
  timestamp: number; // Assuming timestamp is in seconds
}

interface ScreenshotGalleryProps {
  username: string;
}

const ScreenshotGallery: React.FC<ScreenshotGalleryProps> = ({ username }) => {
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScreenshots = async () => {
      try {
        const response = await axios.get(`http://192.168.1.200:8080/agents/${username}/screenshots`);
        setScreenshots(response.data.screenshots);
      } catch (error) {
        setError('Error fetching screenshots.');
        console.error('Error fetching screenshots:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScreenshots();
  }, [username]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {loading ? (
        <p>Loading screenshots...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : screenshots.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <Image
                src={`http://192.168.1.200:8080/agents/${username}/Screenshot/${screenshot.filename}`}
                alt={`Screenshot ${index + 1}`}
                width={640} // Adjust the width to maintain landscape orientation
                height={360} // Adjust the height to maintain landscape orientation
                className="object-cover rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/placeholder.png"; // Placeholder image for broken links
                }}
              />
              <div className="mt-4">
                <p className="text-sm font-bold">Filename: {screenshot.filename}</p>
                <p className="text-xs text-gray-600">Timestamp: {new Date(screenshot.timestamp * 1000).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No screenshots available</p>
      )}
    </div>
  );
};

export default ScreenshotGallery;
