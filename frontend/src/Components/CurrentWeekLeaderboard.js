import React, { useState, useEffect } from 'react';
const serverUrl= process.env.REACT_APP_API;
const CurrentWeekLeaderboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${serverUrl}/leaderboard/current-week`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching current week leaderboard:', error));
    }, []);

    return (
        <>
            <h1 className='mt-[100px] flex justify-center text-cyan-500 text-2xl '>Current Week's Top Leaderboard 🏆 </h1>
            <div className='flex justify-evenly '>
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
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
                                <td className="border p-2">{entry.NAME}</td>
                                <td className="border p-2">{entry.Score}</td>
                                <td className="border p-2">{entry.Country}</td>
                                <td className="border p-2">{entry.FormattedTimeStamp}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CurrentWeekLeaderboard;
