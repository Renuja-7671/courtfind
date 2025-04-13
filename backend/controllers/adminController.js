exports.dashboard = (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard", user: req.user.userId });
};
