const mysql = require('mysql2');

const connection = mysql.createConnection({
                              //  my local machine DB credentials
  // host: 'localhost',
  // user: 'root',
  // password: 'Beast@123@',
  // database: 'leaderboard',
  // port: 3306
                          // remote DB credentials  
  host: 'monorail.proxy.rlwy.net',
  user: 'root',
  password: '5-E31Dceea3aHB4be3cF2CBHC4664EgE',
  database: 'railway',
  port: 31099
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  // Generate and insert 10,000 rows of data
  for (let i = 0; i < 10000; i++) {
    const uid = generateUID();
    const name = generateRandomName();
    const score = generateRandomScore();
    const country = generateRandomCountryCode();
 
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
    
    const timestamp = randomDate.toISOString().slice(0, 19).replace(' T ', ' ');

    const insertQuery = `INSERT INTO people (UID, Name, Score, Country, TimeStamp) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Name = VALUES(Name), Score = VALUES(Score), Country = VALUES(Country), TimeStamp = VALUES(TimeStamp)`;
    const dataToInsert = [uid, name, score, country, timestamp];

    connection.query(insertQuery, dataToInsert, (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return;
      }
  
    });
  }


  connection.end();
});

const generateUID = () => {

  return  Math.floor(Math.random() * 10000);
};

const generateRandomName = () => {

  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Harry', 'Ivy', 'Jethaji', 'Bhide', 'Natwar', 'Natkhat', 'Sohail', 'Maalik', 'BlackLight', 'Babloo', 'Henry', 'Gaurav', 'Daneil', 'Babitaji', 'Daya', 'Rehem', 'Ahem'];
  return names[Math.floor(Math.random() * names.length)];
};

const generateRandomScore = () => {
  return Math.floor(Math.random() * 100);
};

const generateRandomCountryCode = () => {

  const countryCodes = ['US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'JP', 'AU', 'BR','PK','IN','CN', 'NP', 'CD','AR','SA', 'EN', 'NZ', 'RU', 'PL','ZU','BD'];
  return countryCodes[Math.floor(Math.random() * countryCodes.length)];
};
