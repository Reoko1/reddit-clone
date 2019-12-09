const database = require("../database");

const create = async (req, res) => {
  const { parentComment, community_id, text } = req.body;
  try {
    const newComment = await database("comments").insert(
      {
        parent_comment: parentComment,
        user_id: req.user.id,
        community_id,
        text
      },
      "*"
    );
    res.status(201).send(newComment);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create
};
