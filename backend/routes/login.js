// Hardcoded User Data (In a real-world scenario, this would be retrieved from a database)
const user = {
  id: 1,
  username: 'johnDoe',
  password: 'password',
};

// Login Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password match
  if (!(username === user.username && password === user.password)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password',
    });
  }

  // Generate JWT token
  const token = generateToken(user);

  res.json({
    success: true,
    message: 'Authentication successful!',
    token: token,
  });
});
