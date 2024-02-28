const express= require('express');
const mysql = require('mysql2');
const cors= require('cors');
require('dotenv').config();
const app= express();
app.use(cors());
const port= 3000;

const connection= mysql.createConnection({
                                                    // Remote DB credentials
  host: 'monorail.proxy.rlwy.net',
  user: 'root',
  password: '5-E31Dceea3aHB4be3cF2CBHC4664EgE',
  database: 'railway',
  port:31099
});
connection.connect((err) => {
  if(err){
    console.error('Error connecting', err);
    return;
  }
  console.log("Connected to server");
})
// current week  leaderboard
app.get('/leaderboard/current-week', (req, res)=>{
  const query= `SELECT UID, NAME, Score, Country, TimeStamp 
  FROM people
  WHERE TimeStamp >= CURDATE() - INTERVAL DAY(CURDATE()) -1 DAY
  ORDER BY Score DESC
  LIMIT 200;`;
  connection.query(query, (err,results)=>{
    if(err) {
        console.log("Error fetching this Week's Leaderboard, Try again later.....");
        res.status(500).json({error: "Internal Server Error"});
        return;
    }
    res.json(results);
  });
});


// prev week leaders
app.get('/leaderboard/last-week/:country', (req, res) => {
    const country = req.params.country;
  
    const query = `
      SELECT UID, Name, Score, Country, TimeStamp
      FROM people
      WHERE Country = '${country}' AND TimeStamp >= CURDATE() - INTERVAL DAYOFWEEK(CURDATE()) + 5 DAY
      AND TimeStamp < CURDATE() - INTERVAL DAYOFWEEK(CURDATE()) - 1 DAY
      ORDER BY Score DESC
      LIMIT 200;
    `;
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching last week leaderboard:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
        return;
      }
  
      res.json(results);
    });
  });
  

// userID (UID) se UserRank laana
// rank() method sql ka
app.get('/user/rank/:userId', (req, res) => {
    const userId = req.params.userId;
  
    const query = `
      SELECT uid, name, score, country, timestamp,
             (SELECT COUNT(*) FROM people p WHERE p.Score > people.Score) + 1 AS userRank
      FROM people
      WHERE UID = ${userId};
    `;
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching user rank:', err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'User Not Found' });
        return;
      }
  
      const userRank = results[0].userRank;
      res.json({ rank: userRank });
    });
  });
  
  
app.listen(port, ()=>{
  console.log(`Server Listening at ${port}`);
});
  

 