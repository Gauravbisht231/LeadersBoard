import React,  { useState } from 'react'
import CurrentWeekLeaderboard from './Components/CurrentWeekLeaderboard';
import LastWeekLeaderboard from './Components/LastWeekLeaderboard';
import UserRank from './Components/UserRank';
  const App = () => {
    const [selectedApi, setSelectedApi] = useState('');
    const [userId, setUserId] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
  
    const handleChange = (event) => {
      setSelectedApi(event.target.value);
    };
    // rank store
    const handleUserIdChange = (event) => {
      setUserId(event.target.value);
    };
    // country store
    const handleCountryChange = (event) => {
      setSelectedCountry(event.target.value);
    }
  

  return (
    <>
    <div className='flex justify-center text-white my-5'>BlackLight Assessment by Gaurav Singh Bisht 👨‍💻 </div>
    <div className=' flex flex-col my-10	content-center border-lime-400 rounded-sm text-white  '>

                                                    {/*  just another way  */}
      {/* <div className='current flex justify-evenly	mt-6'>
        <h1>Get Current Week's Leaderboard</h1>
        <button className='border rounded-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...'> Click here</button>
      </div>
      <div className='last flex justify-evenly ml-9 mt-6	 '>
        <h1>Get Last Week's Leaderboard</h1>
        <input className='text-white rounded-md ml-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...' type="text" placeholder=' Sort by Country eg. IN' />
      </div>
      
      <div className='rank flex justify-evenly mt-6	 '>
        <h1>Get Rank of a User </h1>
        <input className='ml-4 rounded-md  bg-gradient-to-r from-pink-500 to-blue-500 ...' type="text" placeholder='Enter User ID' />
      </div> */}
      <label htmlFor="apiSelector" >Select an API :</label>
      <select className ='text-black'id="apiSelector" value={selectedApi} onChange={handleChange}>
        <option value="">Select an API</option>
        <option value="current-week">Current Week Leaderboard</option>
        <option value="last-week">Last Week Leaderboard</option>
        <option value="user-rank">User Rank</option>
      </select>
{/* 'GB', 'DE', 'FR', 'IT', 'ES', 'JP', 'AU', 'BR','PK','IN','CN', 'NP', 'CD','AR','SA', 'EN', 'NZ', 'RU', 'PL','ZU','BD' */}
      {selectedApi === 'current-week' && <CurrentWeekLeaderboard />}
      {selectedApi === 'last-week' &&(
        <div className='flex flex-col'>
          <label htmlFor="countrySelector" className="block mb-2 ml-[20px]">Select a Country : </label>
          <select id="countrySelector" value={selectedCountry} onChange={handleCountryChange} className="border p-2 mb-4 text-black max-w-[150px] ml-[20px]">
            {/* Add your country options here */}
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">Ghana</option>
            <option value="DE">Denmark</option>
            <option value="FR">France</option>
            <option value="IT">Italy</option>
            <option value="ES">Estonia</option>
            <option value="JP">Japan</option>
            <option value="AU">Australia</option>
            <option value="BR">Brazil</option>
            <option value="PK">Pakistan</option>
            <option value="IN">India</option>
            <option value="CN">China</option>
            <option value="NP">Nepal</option>
            <option value="CD">Chad</option>
            <option value="SA">South Africa</option>
            <option value="AR">Austria</option>
            <option value="EN">England</option>
            <option value="NZ">New Zealand </option>
            <option value="RU">Russia</option>
            <option value="PL">Poland</option>
            <option value="ZU">Zuric</option>
            <option value="BD">Bangladesh</option>
            {/* Add more options as needed */}
          </select>
          <LastWeekLeaderboard country={selectedCountry} />
        </div>
      )}
      {selectedApi === 'user-rank' && (
        <>
          <label htmlFor="userId">Enter User ID:</label>
          <input className='text-black' type="text" id="userId" value={userId} onChange={handleUserIdChange} />
          <UserRank userId={userId} />
        </>
      )}

      
    </div>
    </>
  );
};

export default App