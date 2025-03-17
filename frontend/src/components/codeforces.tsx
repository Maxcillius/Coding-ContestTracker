'use client';
import { useState } from 'react';

export default function LeetcodeTemplate({ platform, title, startTime, timeRemain, duration }: { platform: string, title: string, startTime: string, timeRemain: string, duration: string }) {
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState(null);
  const [foundSolution, setFoundSolution] = useState<null | boolean>(null);
  const [open, setOpen] = useState(false);

  const fetchSolution = async () => {
    setOpen(!open)
    if (!foundSolution) {
      setLoading(true);
      setSolution(null);
      try {
        const response = await fetch("http://localhost:3000/api/v1/getSolution", {
          method: "POST",
          body: JSON.stringify({ contestName: title, platform: platform }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.Link) {
          setSolution(data.Link);
          setFoundSolution(true);
        } else {
          setFoundSolution(false);
        }
      } catch (error) {
        setFoundSolution(false);
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col py-5 space-y-4">
      <div className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:bg-blue-100 transition duration-200" style={{ borderLeft: '4px solid #607DEF' }}>
        <div className="flex-1 mb-3 md:mb-0">
          <div className="flex items-center mb-1">
            <span 
              className="text-xs font-medium px-2 py-1 rounded mr-2" 
              style={{ backgroundColor: 'rgba(96, 125, 239, 0.2)', color: '#607DEF' }}
            >
              {platform}
            </span>
            <h3 className="font-semibold text-md text-black">{title}</h3>
          </div>
          <div className='flex flex-row justify-start'>
            <p className="text-gray-600 text-sm">{startTime}</p>
            <div onClick={fetchSolution} className='text-sm px-2 text-blue-500 hover:text-blue-800'>
              Solution
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {timeRemain}
          </div>
          <div className="text-gray-500 text-xs mt-1">
            Duration: {duration}
          </div>
        </div>
        <button className="ml-2 text-gray-400 hover:text-yellow-500 transition duration-200" aria-label="Bookmark contest">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="text-center mt-4">
          {loading && <p className="text-gray-500">Fetching solution...</p>}
          {foundSolution && solution ? (
            <a 
              href={solution} 
              target="_blank" 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
            >
              Watch Solution
            </a>
          ) : (
            foundSolution === false && !loading && <p className="text-gray-500">No solution available</p>
          )}
        </div>
      )}
    </div>
  );
}
