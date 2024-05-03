# nodejs with firebase authentication

### Install
    $ cd PROJECT_TITLE
    $ npm install

### Configure app

    1. Create Firebase project.
    2. Open the project setting and copy the firebase CDN script.
    3. Paste to the `config/firebase.js` file.

### Start app

    $ npm start

### Start app using Nodemon

    $ npm run dev

# Define endpoint "createProfile"
```javascript
    /**
    * @swagger
    *   get:
    *     summary: Create new profile
    *     description: Save new profile to the database of firebase and return a profile.
    *     request: 
    *       The data for profile such as profile name, username and avatar
    *     responses:
    *       200:
    *         description: Successful response with a proifile.
    *       500: 
    *         description: Failed response with a erorr message
    *        
    */
    exports.createProfile = async (req, res) => {
    const { profilename, username, avatar
    } = req.body;
    const profile = {
        profilename,
        username,
        avatar,
    };

    try {
        const profileRef = db.doc(username);
        const doc = await profileRef.get();

        if (doc.exists) {
        return res.status(400).json({
            error: 'Username already exists'
        });
        }

        await profileRef.set(profile);
        return res.status(201).json({
        message: 'Profile created successfully'
        });
    } catch (error) {
        console.error('Error creating profile:', error);
        return res.status(500).json({
        error: 'Internal Server Error'
        });
    }
    };

```
# Define middleware "validation"
```javascript
/**
 * @swagger
 *   get:
 *     summary: Validate the input data
 *     description: Validate the profilename, username, avatar from request.
 *     responses:
 *       500: 
 *         description: Failed response with a erorr message
 *        
 */
const validation = (req, res, next) => {
    const { profilename, username, avatar } = req.body;
    if (!profilename) res.status(500).json({ msg: "Profile name is required" })
    if (!username) res.status(500).json({ msg: "Username name is required" })
    if (!avatar) res.status(500).json({ msg: "Avatar name is required" })
    else next(); //go to controller
};
```
# Define endpoint "upload"
```javascript
const multer = require('multer');
const storage = multer.memoryStorage(); // In-memory storage, you can customize this based on your needs
const maxSize = 1024 * 1024 * 5; // 5 MB (adjust as needed)

var upload = multer({
    dest: 'upload/',
    storage: storage,
    limits: { fileSize: maxSize }
});
var upload = upload.single('recfile');

app.post('/upload', upload, (req, res) => {
    // Handle the uploaded file
    var tmp_path = req.file.path;

    /** The original name of the uploaded file
        stored in the variable "originalname". **/
    var target_path = 'uploads/' + req.file.originalname;

    /** A better way to copy the uploaded file. **/
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        return res.status(400).json({ error: 'Invalid file extension' });
    }

    if (req.file.size > maxSize) {
        return res.status(400).json({ error: 'File size exceeds the allowed limit' });
    }

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function () { res.json({ avatar: req.file.filename }); });
    src.on('error', function (err) { res.json({ err: 'no success' }); });
});
```
