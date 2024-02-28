import React, { useState, useEffect } from 'react';
const serverUrl= process.env.REACT_APP_API;
const UserRank = ({ userId }) => {
    const [data, setData] = useState({ rank: null });
  
    useEffect(() => {
      // rank use karni hai
      fetch(`${serverUrl}/user/rank/${userId}`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching user rank:', error));
    }, [userId]);
  
    return (
      <div className='flex justify-center mt-[50px] ' >
        <h2>User Rank: </h2>
     
      <p className='text-blue-500'>{data.rank !== null ? `Player rank is ${data.rank}` : 'Please Wait While Loading.....'}</p>
      
    
      </div>
    );
  };
  
  export default UserRank;