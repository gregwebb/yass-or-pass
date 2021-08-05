const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  index
};

async function signup(req, res) {
  console.log(req.body)
  
  const user = new User(req.body);
    try {
      await user.save();
      const token = createJWT(user); // user is the payload so this is the object in our jwt
      res.json({ token });
    } catch (err) {
      // Probably a duplicate email
      res.status(400).json(err);
    }
  }

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user, ' this user in login')
    if (!user) return res.status(401).json({err: 'bad credentials'});
    // had to update the password from req.body.pw, to req.body password
    user.comparePassword(req.body.password, (err, isMatch) => {
        
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function index(req, res) {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {}
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
