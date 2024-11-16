import express from 'express';
import cors from 'cors';
import { db } from './config/firebase';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/user/username', async (req, res) => {
  try {
    const { username, firebaseId } = req.body;
    
    // Update user document with username
    await db.collection('users').doc(firebaseId).set({
      username,
      updatedAt: new Date()
    }, { merge: true });

    res.json({ success: true });
  } catch (error) {
    console.error('Error saving username:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save username' 
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
