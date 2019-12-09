const database = require("../database");

const create = async (req, res) => {
  const { community_id, title, text } = req.body;
  try {
    const newPost = await database("posts").insert(
      {
        user_id: req.user.id,
        community_id,
        title,
        text
      },
      "*"
    );
    res.status(201).send(newPost);
  } catch (e) {
    console.error(e);
  }
};

const upvote = async (req, res) => {
  const { post_id } = req.params;
  try {
    const votesArray = await database("post_votes")
      .select()
      .where({ user_id: req.user.id, post_id });
    const postVote = votesArray[0];
    if (!postVote) {
      console.log("CREATE");
      const newUpvote = await database("post_votes").insert(
        { user_id: req.user.id, post_id, vote: true },
        "*"
      );
      return res.status(201).send({ action: "create", vote: newUpvote });
    }
    if (postVote.vote) {
      const deletedVote = await database("post_votes")
        .del()
        .where({ user_id: req.user.id, post_id })
        .returning("*");
      res.send({ action: "delete", vote: deletedVote });
    } else {
      const updatedVote = await database("post_votes")
        .update({ vote: true, updated_at: database.fn.now() }, "*")
        .where({ user_id: req.user.id, post_id });
      res.send({ action: "update", vote: updatedVote });
    }
  } catch (e) {
    console.error(e);
  }
};

const downvote = async (req, res) => {
  const { post_id } = req.params;
  try {
    const votesArray = await database("post_votes")
      .select()
      .where({ user_id: req.user.id, post_id });
    const postVote = votesArray[0];
    if (!postVote) {
      const newDownvote = await database("post_votes").insert(
        { user_id: req.user.id, post_id, vote: false },
        "*"
      );
      return res.status(201).send({ action: "create", vote: newDownvote });
    }
    if (!postVote.vote) {
      const deletedVote = await database("post_votes")
        .del()
        .where({ user_id: req.user.id, post_id })
        .returning("*");
      res.send({ action: "delete", vote: deletedVote });
    } else {
      const updatedVote = await database("post_votes")
        .update({ vote: false, updated_at: database.fn.now() }, "*")
        .where({ user_id: req.user.id, post_id });
      res.send({ action: "update", vote: updatedVote });
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create,
  upvote,
  downvote
};
