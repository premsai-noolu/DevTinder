const express = require("express");

const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const user = require("../models/user");

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "about",
  "skills",
];

userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "about", "skills"]);
    if (!connectionRequests) {
      throw new Error("no interested connections");
    }
    res.json({
      message: `${loggedInUser.firstName} interested connections`,
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    if (!connectionRequests) {
      throw new Error("there are no accepted connection requests");
    }

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 2;
    limit = limit > 50 ? 50 : limit;
    skip = (page - 1) * limit;
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
        },
        {
          toUserId: loggedInUser._id,
        },
      ],
    })
      .select("fromUserId toUserId")
      .populate("fromUserId", ["firstName", "lastName"])
      .populate("toUserId", ["firstName", "lastName"]);
    const hideconnectionRequests = new Set();
    connectionRequests.forEach((req) => {
      hideconnectionRequests.add(req.fromUserId._id.toString());
      hideconnectionRequests.add(req.toUserId._id.toString());
    });

    const users = await user
      .find({
        $and: [
          {
            _id: { $nin: Array.from(hideconnectionRequests) },
          },
          {
            _id: {
              $ne: loggedInUser._id,
            },
          },
        ],
      })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    // console.log(hideconnectionRequests);
    res.json({ users });
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
});
module.exports = userRouter;
