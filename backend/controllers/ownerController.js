exports.dashboard = (req, res) => {
    res.json({ message: "Welcome to the Owner Dashboard", user: req.user });
};

exports.manageCourts = (req, res) => {
    res.json({ message: "Owner managing courts" });
};
