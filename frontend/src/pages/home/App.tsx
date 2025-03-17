import { useState, useEffect } from 'react'
import { Leetcode, Codeforces } from '../../interfaces/contests';
import LeetcodeTemplate from '../../components/leetcode';
import CodeforcesTemplate from '../../components/codeforces';

const server = "http://localhost:3000"

interface Filters {
  leetcode: boolean;
  codeforces: boolean;
  codechef: boolean;
}

export default function App() {
  const [filters, setFilters] = useState<Filters>({
    codeforces: true,
    codechef: true,
    leetcode: true,
  });
  
  const [leetContests, setLeetContests] = useState<Leetcode[]>([])
  const [pastLeetContests, setPastLeetContests] = useState<Leetcode[]>([])

  const [codeforcesContests, setCodeforcesContests] = useState<Codeforces[]>([])
  const [pastCodeforcesContests, setPastCodeforcesContests] = useState<Codeforces[]>([])

  const [codechefContests, setCodeChefContests] = useState<[]>([])
  const [pastCodechefContests, setPastCodechefContests] = useState<[]>([])
  
  useEffect(() => {
    const leetcode = async () => {
      try {
        await fetch(`${server}/api/v1/leetcode`, 
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        ).then((response) => {
          return response.json()
        }).then((data) => {
          data.contests.map((contest: Leetcode) => {
            if(contest.startTime >= Math.floor(Date.now() / 1000)) {
              setLeetContests((prev) => [
                ...prev, contest
              ])
            } else {
              setPastLeetContests((prev) => [
                ...prev, contest
              ])
            }
          })
        })
      } catch(err) {
        console.log(err)
      }
    }

    const codeforces = async () => {
      try {
        await fetch(`${server}/api/v1/codeforces`, 
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        ).then((response) => {
          return response.json()
        }).then((data) => {
          data.contests.map((contest: Codeforces) => {
            if(contest.startTimeSeconds && contest.startTimeSeconds >= Math.floor(Date.now() / 1000)) {
              setCodeforcesContests((prev) => [
                ...prev, contest
              ])
            } else {
              setPastCodeforcesContests((prev) => [
                ...prev, contest
              ])
            }
          })
        })
      } catch(err) {
        console.log(err)
      }
    }

    leetcode()
    codeforces()

  }, []);
  

const toggleFilter = (platform: keyof Filters) => {
  setFilters({
    ...filters,
    [platform]: !filters[platform],
  });
}

const getFormatTime = (time: number) => {
  const data = new Date(time * 1000)
  const hour = data.getHours()
  const min = data.getMinutes()
  return hour + "hr " + min + " min"
}
  
return (
  <div className="min-h-screen w-screen bg-gray-100 p-4">
    <div className="mx-16">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 p-4">Coding Contest Tracker</h1>
        <div className="flex flex-wrap gap-3 mb-2">
          <span className="font-medium text-gray-700 self-center">Platforms:</span>
          <button className={`px-4 py-2 font-bold rounded-full text-sm ${filters.leetcode ? 'bg-[#df7538] text-white border border-yellow-400' : 'bg-gray-200'}`}onClick={() => toggleFilter('leetcode')}>
            LeetCode
          </button>
          <button className={`px-4 py-2 font-bold rounded-full text-sm ${filters.codeforces ? 'bg-[#306ac0] border text-white border-blue-400' : 'bg-gray-200'}`}onClick={() => toggleFilter('codeforces')}>
            Codeforces
          </button>
          <button className={`px-4 py-2 font-bold rounded-full text-sm ${filters.codechef ? 'bg-[#83542e] text-white border border-amber-400' : 'bg-gray-200'}`}onClick={() => toggleFilter('codechef')}>
            CodeChef
          </button>
        </div>
        <button className="p-4 rounded-xl bg-blue-100 mt-4 text-sm text-blue-600 hover:text-blue-800 flex items-end">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          {1} Bookmarked Contests
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Contests</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Leetcode Section */}
          <div className="flex flex-col h-96">
            <div className="overflow-y-auto flex-grow">
              {leetContests.length === 0 ? (
                <p className="text-gray-500">No upcoming Leetcode contests.</p>
              ) : (
                leetContests.map((contest: Leetcode) => {
                  return (
                    <LeetcodeTemplate
                      platform={"leetcode"}
                      key={contest.title} 
                      title={contest.title} 
                      startTime={getFormatTime(contest.startTime)} 
                      timeRemain={getFormatTime(contest.startTime)} 
                      duration={contest.duration.toString()}
                    />
                  )
                })
              )}
            </div>
          </div>
          
          {/* Codeforces Section */}
          <div className="flex flex-col h-96">
            <div className="overflow-y-auto flex-grow">
              {codeforcesContests.length === 0 ? (
                <p className="text-gray-500">No upcoming Codeforces contests.</p>
              ) : (
                codeforcesContests.map((contest: Codeforces) => {
                  return (
                    <CodeforcesTemplate
                      platform={"codeforces"} 
                      key={contest.id} 
                      title={contest.name} 
                      startTime={getFormatTime(contest.durationSeconds)} 
                      timeRemain={getFormatTime(contest.durationSeconds)} 
                      duration={contest.durationSeconds.toString()}
                    />
                  )
                })
              )}
            </div>
          </div>
          
          {/* Codechef Section */}
          <div className="flex flex-col h-96">
            <div className="overflow-y-auto flex-grow">
              {/* {ccContests.length === 0 ? (
                <p className="text-gray-500">No upcoming Codechef contests.</p>
              ) : (
                ccContests.map((contest: Codechef) => {
                  return (
                    <CodechefTemplate 
                      key={contest.title} 
                      title={contest.title} 
                      startTime={getFormatTime(contest.startTime)} 
                      timeRemain={getTimeRemaining(contest.startTime)} 
                      duration={contest.duration.toString()}
                    />
                  )
                })
              )} */}
              
              {/* Sample data for preview */}
              <div className="space-y-4">
                <div className="border rounded-lg p-4" style={{ borderLeft: '4px solid #8B4513' }}>
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium px-2 py-1 rounded mr-2" style={{ backgroundColor: 'rgba(139, 69, 19, 0.2)', color: '#8B4513' }}>
                      CodeChef
                    </span>
                    <h3 className="font-semibold text-lg">March Cook-Off</h3>
                  </div>
                  <p className="text-gray-600">Mar 20, 1:00 PM</p>
                  <div className="flex justify-between mt-2">
                    <div className="text-gray-500 text-xs">
                      Duration: 180 mins
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      5d 3h
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Past Contests */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Past Contests</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Leetcode Section */}
          <div className="flex flex-col h-lvh">
            <div className="overflow-y-auto flex-grow">
              {leetContests.length === 0 ? (
                <p className="text-gray-500">No upcoming Leetcode contests.</p>
              ) : (
                pastLeetContests.map((contest: Leetcode) => {
                  return (
                    <LeetcodeTemplate
                      platform={'leetcode'}
                      key={contest.title} 
                      title={contest.title} 
                      startTime={getFormatTime(contest.startTime)} 
                      timeRemain={getFormatTime(contest.startTime)} 
                      duration={contest.duration.toString()}
                    />
                  )
                })
              )}
            </div>
          </div>
          
          {/* Codeforces Section */}
          <div className="flex flex-col h-lvh">
            <div className="overflow-y-auto flex-grow">
              {codeforcesContests.length === 0 ? (
                <p className="text-gray-500">No upcoming Codeforces contests.</p>
              ) : (
                pastCodeforcesContests.map((contest: Codeforces) => {
                  return (
                    <CodeforcesTemplate 
                      platform={'codeforces'}
                      key={contest.id} 
                      title={contest.name} 
                      startTime={getFormatTime(contest.durationSeconds)} 
                      timeRemain={getFormatTime(contest.durationSeconds)} 
                      duration={contest.durationSeconds.toString()}
                    />
                  )
                })
              )}
            </div>
          </div>
          
          {/* Codechef Section */}
          <div className="flex flex-col h-lvh">
            <div className="overflow-y-auto flex-grow">
              {/* {ccContests.length === 0 ? (
                <p className="text-gray-500">No upcoming Codechef contests.</p>
              ) : (
                ccContests.map((contest: Codechef) => {
                  return (
                    <CodechefTemplate 
                      key={contest.title} 
                      title={contest.title} 
                      startTime={getFormatTime(contest.startTime)} 
                      timeRemain={getTimeRemaining(contest.startTime)} 
                      duration={contest.duration.toString()}
                    />
                  )
                })
              )} */}
              
              {/* Sample data for preview */}
              <div className="space-y-4">
                <div className="border rounded-lg p-4" style={{ borderLeft: '4px solid #8B4513' }}>
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium px-2 py-1 rounded mr-2" style={{ backgroundColor: 'rgba(139, 69, 19, 0.2)', color: '#8B4513' }}>
                      CodeChef
                    </span>
                    <h3 className="font-semibold text-lg">March Cook-Off</h3>
                  </div>
                  <p className="text-gray-600">Mar 20, 1:00 PM</p>
                  <div className="flex justify-between mt-2">
                    <div className="text-gray-500 text-xs">
                      Duration: 180 mins
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      5d 3h
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
          