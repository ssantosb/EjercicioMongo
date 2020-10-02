const conn = require("../lib/MongoUtils");
const { get } = require("../routes");

const getMessages = (callback) =>
  conn.then((client) => {
    client
      .db("message")
      .collection("messages")
      .find({})
      .toArray((err, data) => {
        console.log(data);
        callback(data);
      });
  });

const getMessage = (ts, callback) => {
  conn.then((client) => {
    client
      .db("message")
      .collection("messages")
      .find({ ts })
      .then((result) => {
        callback(result);
      });
  });
};

const addMessage = (message) => {
  conn.then((client) => {
    client
      .db("message")
      .collection("messages")
      .insertOne(message)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  });
};

const updateMessage = (ts, newMessage) => {
  conn.then((client) => {
    client
      .db("message")
      .collection("messages")
      .updateOne({ ts }, { $set: { message: newMessage } })
      .then((result) => {
        console.log(result);
      });
  });
};

const deleteMessage = (oldts) => {
  conn.then((client) => {
    client
      .db("message")
      .collection("messages")
      .deleteOne({ ts: oldts })
      .then((result) => {
        console.log(result);
      });
  });
};
const message = {
  getMessages,
  getMessage,
  addMessage,
  updateMessage,
  deleteMessage,
};
module.exports = message;
