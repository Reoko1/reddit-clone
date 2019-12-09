const database = require("../database");

const create = async (req, res) => {
  const { name } = req.body;
  try {
    const communityArray = await database("communities")
      .select()
      .where({ name });
    const community = communityArray[0];
    if (community) {
      return res.status(409).send({ name: "Name is already taken" });
    }
    const newCommunity = await database("communities").insert(
      {
        user_id: req.user.id,
        name
      },
      "*"
    );
    return res.status(201).send(newCommunity);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  create
};
