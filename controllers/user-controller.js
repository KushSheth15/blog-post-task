const {registerUser,loginUser} = require('../services/user-service');

exports.register = async (req, res) => {
    try {	
        const { username, email, password } = req.body;

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        else if(!email){
            return res.status(400).json({ error: 'Email is required' });
        }
        else if(!password){
            return res.status(400).json({ error: 'Password is required' });
        }

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const validatePassword = (password) => {
            return password.length >= 8;
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ error: 'Invalid password. It should be at least 8 characters long.' });
        }

        await registerUser(username, email, password);

        return res.status(200).json({ message: 'Registration Successful' });
    } catch (err) {

        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        else if(!password){
            return res.status(400).json({ error: 'Password is required' });
        }

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        
        const validatePassword = (password) => {
            return password.length >= 8; 
        }

        if (!validatePassword(password)) {
            return res.status(400).json({ error: 'Invalid password. It should be at least 8 characters long.' });
        }

        const user = await loginUser(email, password);

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

