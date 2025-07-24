const express = require('express')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail');
const UserModel = require('../Models/authModel')
const generateToken = require('../utils/generateToken')
const protect = require('../middleware/authMiddleware');
const router = express.Router()

// Test route - to check token
router.get('/me', protect, (req, res) => {
  res.status(200).json({
    message: 'Welcome to your profile!',
    user: req.user 
  });
});



router.get('/verify-email/:token', async (req, res) => {
  const { token } = req.params;
  const user = await UserModel.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

 // res.status(200).json({ message: 'Email verified successfully!' });
//  res.status(200).json({
//   message: 'Email verified successfully!',
//   _id: user._id,
//   name: user.name,
//   email: user.email,
//   token: generateToken(user._id),
//   continueHere: 'http://localhost:3000/login'
// });

  res.send(`
  <html>
    <head>
      <title>Email Verified</title>
      <style>
        body {
          background-color: #f0f4f8;
          font-family: Arial, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        h1 {
          color: #10b981;
        }
        p {
          color: #555;
          margin: 1rem 0;
        }
        a {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background-color: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
        }
        a:hover {
          background-color: #2563eb;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>✅ Email Verified!</h1>
        <p>Your email has been successfully verified. You can now login to the app.</p>
        <a href="http://localhost:3000/login">Go to App</a>
      </div>
    </body>
  </html>
`);

});


router.post('/signup',async(req,res)=>{
    const {name,email,password} = req.body
    try{
        const userExists = await UserModel.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // Create token for email confirmation
        const emailToken = crypto.randomBytes(32).toString('hex');
        const emailTokenExpire = Date.now() + 1000 * 60 * 60; // 1 hour

        let user = new UserModel({
          name,
          email,
          password,
          emailVerificationToken: emailToken,
          emailVerificationExpires: emailTokenExpire
        });


        user = await user.save()
        
        const confirmUrl = `http://localhost:5000/api/auth/verify-email/${emailToken}`;

         await sendEmail({
          to: email,
          subject: 'Email Verification',
          text: `Click to verify your email: ${confirmUrl}`
        });

        res.status(200).json({ message: 'Verification email sent' });

        // res.send({
        //     _id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     token: generateToken(user._id)
        // })

    }catch(e){
        console.log('error : ',e)
        res.status(500).json({ message: 'Internal Server Error' });
    }

})

router.post('/login',async(req,res)=>{
  const {email,password} = req.body
     try {
    // select password explicitly
    const user = await UserModel.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const emailVerified = user.emailVerified
    if(!emailVerified) return res.status(400).json({message:'Account is not verified'})

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

module.exports = router