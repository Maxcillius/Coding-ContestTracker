import { useEffect, useState } from "react";
import { GetBookmark } from "../../utils/bookmark";

export default function BookMarked() {
  const [bookmarks, setBookmarkedContests] = useState([]);

  useEffect(() => {
    const data = GetBookmark();
    if (data) {
      setBookmarkedContests(data);
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Bookmarked Contests</h1>
      
      {bookmarks.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No bookmarked contests found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((contest: string, index) => {
            const data: {platform: string, title: string} = JSON.parse(contest)
            return (
              <a key={index} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer">
                <div className="flex items-center mb-2">
                  <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                    {data.platform}
                  </span>
                </div>
                <h2 className="text-lg font-medium text-gray-800">{data.title}</h2>
              </a>
            )
          })}
        </div>
      )}
    </div>
  );
}