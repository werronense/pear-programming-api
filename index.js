const express = require('express');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');  // npm install uuid
const app = express();
const cors = require('cors');

const PORT = 5050;


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

function readData() {
  const data = fs.readFileSync('./data/pears.json', 'utf8');
  return JSON.parse(data);
}

//get all pears
app.get('/pears/all', (req, res) => {
  const data = readData();
  res.json(data);
});
app.get('/' , (req, res) => { 
    // call "/pears" endpoint
    res.redirect('/pears');
});

// get 4 pears with unique names
app.get('/pears', (req, res) => {
    const data = readData();
    const pears = [];
    const names = [];
    while (pears.length < 4) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const pear = data[randomIndex];
      if (!names.includes(pear.name)) {
        pears.push(pear);
        names.push(pear.name);
      }
    }
    res.json(pears);
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
  
// get  pear by name filter
app.get('/pears/:name', (req, res) => {
    const name = req.params.name + ' Pear';
    const data = readData();
    const pear = data.filter((pear) => pear.name === name);
    if (pear) {
      res.json(pear);
    } else {
      res.status(404).json({ message: 'Pear not found' });
    }
  
  });

// add a new pear
// create a map of names and images
app.post('/pears', (req, res) => {
    const data = readData();
    const newPear = {
      id: uuidv4(),
      name: req.body.name,
      paragraph: req.body.paragraph,
      imageURL: `"http://localhost:5050/images/{req.body.name.toLowerCase()}-pear.jpg"`,
    };
    data.push(newPear);
    fs.writeFileSync('./data/pears.json', JSON.stringify(data));
    res.json(newPear);
  });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});