import ActionCable from "actioncable";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.DfQeIvsnWjUzK5hm0-xazERLDu7CIV1rz5BgsLAwzBU";
let cable = ActionCable.createConsumer(
  `ws://127.0.0.1:3000/cable?token=${token}`,
);

const subscription = cable.subscriptions.create({ channel: "ChatChannel" }, {
  connected: function () {
    console.log("connected");
  },
  disconnected: function () {
    console.log("disconnected");
  },
  received: function (data) {
    console.log("received", data);
  },
});
