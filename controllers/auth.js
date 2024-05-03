const firebase = require("./../config/firebase");
const admin = require('firebase-admin');
var serviceAccount = require("./../config/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodeauthapi-660f8-default-rtdb.firebaseio.com"
})
const db = admin.firestore().collection('profiles');
/**
 * @swagger
 *   get:
 *     summary: Create new profile
 *     description: Save new profile to the database of firebase and return a profile.
 *     responses:
 *       200:
 *         description: Successful response with a proifile.
 *       500: 
 *         description: Failed response with a erorr message
 *        
 */
exports.createProfile = async (req, res) => {
  const { profilename, username, avatar } = req.body;
  const profile = {
    profilename,
    username,
    avatar,
  };

  try {
    const profileRef = db.doc(username);
    const doc = await profileRef.get();

    if (doc.exists) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    await profileRef.set(profile);
    return res.status(201).json({ message: 'Profile created successfully' });
  } catch (error) {
    console.error('Error creating profile:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  gjoso
};