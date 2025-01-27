const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");

console.log("cron job scheduled");

//this job will run at 8 AM in the morning.
cron.schedule("0 8 * * *", async () => {
  try {
    console.log("scheduled cron job");
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];
    console.log(listOfEmails);
    for (const email of listOfEmails) {
      try {
        const res = await sendEmail.run(
          "New friend requests pending for " + email,
          "There are so many friend requests pending. Please login to the devtinder.live platform to accept or reject the requests."
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
});
