// Define the API endpoint
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
const validateUser = (req, res, next) => {
    const { profilename, username, avatar } = req.body;
    if (!profilename) res.status(500).json({ msg: "Profile name is required" })
    if (!username) res.status(500).json({ msg: "Username name is required" })
    if (!avatar) res.status(500).json({ msg: "Avatar name is required" })
    else next();
};

module.exports = validateUser;