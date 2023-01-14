// express
import express from 'express';

// Database
import { connectDB } from './database/connection';
import addPark from './database/addPark';
import getParks from './database/getParks';

const app = express();
app.use(express.json());
const PORT = '3000';

connectDB();

app.get('/api/test', async (req, res) => {
  res.status(200).json({ message: 'hello world' });
});

app.get('/api/parks', async (req, res) => {
  let parks = [];
  try {
    parks = await getParks();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Could not get parks' });
  }

  res.status(200).json(parks);
});

app.post('/api/parks', async (req, res) => {
  const { fullName, parkCode, states, designation } = req.body;

  if (
    typeof fullName !== 'string' ||
    typeof parkCode !== 'string' ||
    typeof states !== 'string' ||
    typeof designation !== 'string'
  ) {
    res.status(400).json({ message: 'Incorrect Request' });
    return;
  }

  try {
    const newPark = await addPark(fullName, parkCode, states, designation);
    res.status(200).json(newPark);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Unable to add park.' });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
