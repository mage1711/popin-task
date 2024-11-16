import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/user/username', (req, res) => {
    console.log('Received request to set username', req.body);
  const { username, firebaseId } = req.body;
  // In a real app, you'd save this to a database
  console.log(`New user registered - Username: ${username}, Firebase ID: ${firebaseId}`);
  res.json({ success: true });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
