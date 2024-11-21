const bcrypt = require("bcrypt")
const User= require("../models/user")
const jwt = require("jsonwebtoken")


const signUp = async (req, res) => {
    try {
      // Kullanıcı adı kontrolü
      const existingUsername = await User.findOne({ username: req.body.username });
      // Email kontrolü
      const existingEmail = await User.findOne({ email: req.body.email });
  
      if (existingEmail) {
        return res.json({ valid: false, message: `${existingEmail.email} is already registered!` });
      } else if (existingUsername) {
        return res.json({ valid: false, message: `${existingUsername.username} is already registered!` });
      } else {
        const newUser = req.body;
        const userTemplate = new User({
          username: newUser.username,
          email: newUser.email,
          password: bcrypt.hashSync(newUser.password, 5)
        });
        await userTemplate.save();
        return res.json({ valid: true, message: "Registration Successfully Done." });
      }
    } catch (error) {
      console.error('Registration error:', error);
      return res.json({ valid: false, message: 'An error occurred during registration.' });
    }
  }

const login = async (req,res) => {
  try {
    // Kullanıcı adı kontrolü
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ valid: false, message: `Username ${req.body.username} does not exist!` });
    }

    // Şifre doğrulama
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).json({ valid: false, message: 'Wrong Password!' });
    }

    // Başarılı giriş
    const token = jwt.sign(
      { id: user._id, username: user.username },
      'abcd',
      { expiresIn: '1m' }
    );
    return res.status(200).json({ valid: true, user, message: `Selam ${user.username}. Say Hello to World!`, token: token});
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ valid: false, message: 'An error occurred during login.' });
  }
}   





module.exports = {
    signUp,
    login,
}