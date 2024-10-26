// LeaderboardContext.js
import React, { createContext, useContext, useState } from 'react';

const LeaderboardContext = createContext();

export const LeaderboardProvider = ({ children }) => {
    
  const [leaders, setLeaders] = useState([
    { name: 'Amit', points: 90, prize: 90, rank: 1 },
    { name: 'Sachin', points: 89, prize: 89, rank: 2 },
    { name: 'Rahul', points: 88, prize: 88, rank: 3 },
    { name: 'Ravi', points: 85, prize: 85, rank: 4 },
    { name: 'Priya', points: 82, prize: 82, rank: 5 },
    { name: 'Kamal', points: 80, prize: 80, rank: 6 },
    { name: 'Sita', points: 75, prize: 75, rank: 10 },
    { name: 'Anil', points: 80, prize: 80, rank: 7 },
    { name: 'Biru', points: 77, prize: 77, rank: 8 },
    { name: 'Meena', points: 76, prize: 76, rank: 9 },
  ]);


  return (
    <LeaderboardContext.Provider value={{ leaders, setLeaders }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboard = () => {
  return useContext(LeaderboardContext);
};
