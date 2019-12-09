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

const update = async (req, res) => {
  const { post_id } = req.params;
  const { title, text } = req.body;
  try {
    const postArray = await database("posts")
      .select()
      .where({ id: post_id });
    const post = postArray[0];
    if (!post) {
      return res.status(404).send({ msg: "Post not found" });
    }
    if (post.user_id !== req.user.id) {
      return res.status(400).send({ msg: "Not allowed" });
    }
    const updatedPost = await database("posts").update({ title, text }, "*");
    res.send(updatedPost);
  } catch (e) {
    console.error(e);
  }
};

const getByCommunity = async (req, res) => {
  const { community_id } = req.params;
  try {
    const posts = await database("posts")
      .select()
      .where({ community_id });
    res.send(posts);
  } catch (e) {
    console.error(e);
  }
};

const getByUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const posts = await database("posts")
      .select()
      .where({ user_id });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create,
  upvote,
  downvote,
  update,
  getByCommunity,
  getByUser
};
