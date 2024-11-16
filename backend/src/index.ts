import express from 'express';
import cors from 'cors';
import { db } from './config/firebase';
import { authenticateToken, AuthRequest } from './middleware/auth';

const app = express();

app.use(cors());
app.use(express.json());

// can also use authenticated 
app.post('/api/user/username', async (req, res) => {
  try {
    const { username, firebaseId } = req.body;
    
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

app.get('/api/user', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.uid;

    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      res.json({ username: null });
    }
    res.json(userDoc.data());
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch user data' 
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
