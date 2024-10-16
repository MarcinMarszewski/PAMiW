const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/jq', (req, res) => {
    res.sendFile(__dirname + '/jq.html');
});

app.get('/text', (req, res) => {
    res.sendFile(__dirname + '/text.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});


app.post('/submit-text', (req, res) => {
    const { text } = req.body;
    res.send(`You submitted: ${text}`);
});

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    res.send(`
        <h1>Submitted Information</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <a href="/">Go back</a>
    `);
});

app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
        return res.send('All fields are required.');
    }
    if (password.length < 6) {
        return res.send('Password must be at least 6 characters long.');
    }
    if (password !== confirmPassword) {
        return res.send('Passwords do not match.');
    }

    res.send(`
        <h1>Registration Successful</h1>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <a href="/register">Go back</a>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});