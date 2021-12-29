import cachedUser from "../../../cache/cachedUser";

const read = (req, res) => {
  res.json(cachedUser);
};

const writte = (req, res) => {
  cachedUser._id = req.body._id;
  cachedUser.firstName = req.body.firstName;
  cachedUser.lastName = req.body.lastName;
  cachedUser.nickname = req.body.nickname;
  cachedUser.email = req.body.email;

  res.json({ message: "Success!" });
};

export default { read, writte };
