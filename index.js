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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});