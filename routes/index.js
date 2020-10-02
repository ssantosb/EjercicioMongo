const express = require("express");
const router = express.Router();
const Joi = require("joi");
const message = require("../controllers/message");
/* GET home page. */
router.get("/chat/api/messages", function (req, res, next) {
  message.getMessages((messages) => {
    res.send(messages);
  });
});

router.get("/chat/api/messages/:ts", function (req, res, next) {
  message.getMessage(req.params.ts, (message) => {
    res.send(message);
  });
});

router.post("/chat/api/messages", function (req, res, next) {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string()
      .pattern(new RegExp("([A-Za-z0-9.-]+[ ][A-Za-z0-9. -]+)"))
      .required(),
    ts: Joi.required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    res
      .status(400)
      .send(
        "No se cumplió alguna condición de autor o mensaje " + error.message
      );
  } else {
    let obj = req.body;
    const newMessage = {
      author: obj.author,
      message: obj.message,
      ts: obj.ts,
    };
    message.addMessage(newMessage);
    res.send(newMessage);
  }
});

router.put("/chat/api/messages/:ts", function (req, res, next) {
  const schema = Joi.object({
    message: Joi.string().min(5).required(),
    author: Joi.string()
      .pattern(new RegExp("([A-Za-z0-9.-]+[ ][A-Za-z0-9. -]+)"))
      .required(),
    ts: Joi.required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    console.log(error);
    res
      .status(404)
      .send(
        "No se cumplió alguna condición de autor o mensaje " + error.message
      );
  } else {
    let obj = req.body;
    const newMessage = {
      author: obj.author,
      message: obj.message,
      ts: obj.ts,
    };
    message.updateMessage(parseFloat(req.params.ts), newMessage.message);
    res.send(newMessage);
  }
});

router.delete("/chat/api/messages/:ts", function (req, res, next) {
  message.deleteMessage(parseFloat(req.params.ts));
  res.send("Deleted");
});
module.exports = router;
