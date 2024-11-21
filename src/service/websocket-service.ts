import ActionCable from "actioncable";

const token = localStorage.getItem("token");

const websocket = ActionCable.createConsumer(
  `ws://127.0.0.1:3000/cable?token=${token}`,
);

// this connection is used to subscribe to the ActivitiesChannel to receive new chats in real-time
export const ActivitiesChannelSubscription = websocket.subscriptions.create({
  channel: "ActivitiesChannel",
}, {
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
