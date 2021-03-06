const database = require("../database");

const create = async (req, res) => {
  const { parentComment, post_id, text } = req.body;
  try {
    const newComment = await database("comments").insert(
      {
        parent_comment: parentComment,
        post_id,
        user_id: req.user.id,
        text
      },
      "*"
    );
    res.status(201).send(newComment[0]);
  } catch (e) {
    console.error(e);
  }
};

const upvote = async (req, res) => {
  const { comment_id } = req.params;
  const { post_id } = req.body;
  try {
    const commentArray = await database("comment_votes")
      .select()
      .where({ comment_id });
    const commentVote = commentArray[0];
    if (!commentVote) {
      const newVote = await database("comment_votes").insert(
        { user_id: req.user.id, comment_id, post_id, vote: true },
        "*"
      );
      return res.send({ action: "create", vote: newVote });
    }
    if (commentVote.vote) {
      const deletedVote = await database("comment_votes")
        .del()
        .where({ user_id: req.user.id, comment_id })
        .returning("*");
      return res.send({ action: "delete", vote: deletedVote });
    } else {
      const updatedVote = await database("comment_votes").update(
        { vote: true, updated_at: database.fn.now() },
        "*"
      );
      return res.send({ action: "update", vote: updatedVote });
    }
  } catch (e) {
    console.error(e);
  }
};

const downvote = async (req, res) => {
  const { comment_id } = req.params;
  const { post_id } = req.body;
  try {
    const voteArray = await database("comment_votes")
      .select()
      .where({ comment_id });
    const commentVote = voteArray[0];
    if (!commentVote) {
      const newVote = await database("comment_votes").insert(
        { user_id: req.user.id, comment_id, post_id, vote: false },
        "*"
      );
      return res.send({ action: "create", vote: newVote });
    }
    if (!commentVote.vote) {
      const deletedVote = await database("comment_votes")
        .del()
        .where({ user_id: req.user.id, comment_id })
        .returning("*");
      return res.send({ action: "delete", vote: deletedVote });
    } else {
      const updatedVote = await database("comment_votes").update(
        { vote: false, updated_at: database.fn.now() },
        "*"
      );
      return res.send({ action: "update", vote: updatedVote });
    }
  } catch (e) {
    console.error(e);
  }
};

const update = async (req, res) => {
  const { comment_id } = req.params;
  const { text } = req.body;
  try {
    const commentArray = await database("comments")
      .select()
      .where({ id: comment_id });
    const comment = commentArray[0];
    if (!comment) {
      return res.status(404).send({ msg: "Comment not found" });
    }
    const updatedComment = await database("comments")
      .update({ text }, "*")
      .where({ id: comment_id });
    res.send(updatedComment);
  } catch (e) {
    console.error(e);
  }
};

const getByPost = async (req, res) => {
  const { post_id } = req.params;
  try {
    const comments = await database("comments")
      .select(
        "comments.id",
        "users.name as user",
        "comments.text",
        "comments.created_at",
        "comments.updated_at"
      )
      .where({ post_id })
      .leftJoin("users", "comments.user_id", "users.id");
    res.send(comments);
  } catch (e) {
    console.error(e);
  }
};

const getByUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const comments = await database("comments")
      .select(
        "comments.id",
        "users.name as user",
        "comments.text",
        "comments.created_at",
        "comments.updated_at"
      )
      .where({ user_id })
      .leftJoin("users", "comments.user_id", "users.id");
    res.send(comments);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create,
  upvote,
  downvote,
  update,
  getByPost,
  getByUser
};
