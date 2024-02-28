// src/components/Leaderboard/LastWeekLeaderboard.js
import React, { useState, useEffect } from 'react';
const serverUrl= process.env.REACT_APP_API;
const LastWeekLeaderboard = ({country}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if(!country) {
            console.log('Pleaes Enter Country code');
            return;
        }
        fetch(`${serverUrl}/leaderboard/last-week/${country}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching last week leaderboard:', error));
    }, [country]);

    return (
        <>
            <h1 className='mt-[100px] flex justify-center text-cyan-500 text-2xl '>Last Week's Top Leaderboard 🏆 </h1>
            <div className="flex justify-evenly">
                <table>
                    <thead>
                        <tr>
                            <th className="border p-2">Rank</th>
                            <th className="border p-2">User ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Score</th>
                            <th className="border p-2">Country</th>
                            <th className="border p-2">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry, index) => (
                            <tr key={entry.UID}>
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{entry.UID}</td>
                                <td className="border p-2">{entry.Name}</td>
                                <td className="border p-2">{entry.Score}</td>
                                <td className="border p-2">{entry.Country}</td>
                                <td className="border p-2">{entry.TimeStamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default LastWeekLeaderboard;
