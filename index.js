const express = require('express');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');  // npm install uuid
const app = express();
const cors = require('cors');

const PORT = 3000;


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

function readData() {
  const data = fs.readFileSync('./data/pears.json', 'utf8');
  return JSON.parse(data);
}

//get all pears
app.get('/pears', (req, res) => {
  const data = readData();
  res.json(data);
});

// get two randon pears but not with the same name
app.get('/pears/random', (req, res) => {
    const data = readData();
    const randomIndex1 = Math.floor(Math.random() * data.length);
    let randomIndex2 = Math.floor(Math.random() * data.length);
    while (data[randomIndex2].name === data[randomIndex1].name) {
      randomIndex2 = Math.floor(Math.random() * data.length);
    }
    res.json([data[randomIndex1], data[randomIndex2]]);
  });
  


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});