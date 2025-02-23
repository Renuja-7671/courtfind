exports.dashboard = (req, res) => {
    res.json({ message: "Welcome to the Player Dashboard", user: req.user });
};

exports.bookCourt = (req, res) => {
    res.json({ message: "Player booking a court" });
};
