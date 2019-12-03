"use strict";

const Joi = require("@hapi/joi");
const uuidV4 = require("uuid/v4");
const mysqlPool = require("../../../database/mysql-pool");

const httpServerDomain = process.env.HTTP_SERVER_DOMAIN;

async function validateSchema(payload) {
  const schema = Joi.object({
    title: Joi.string()
      .trim()
      .min(1)
      .max(255)
      .required(),
    content: Joi.string()
      .trim()
      .min(1)
      .max(65536)
      .required(),
    userId: Joi.string()
      .guid({
        version: ["uuidv4"]
      })
      .required(),
    tags: Joi.array()
      .items(Joi.string().guid({ version: ["uuidv4"] }))
      .required()
  });

  Joi.assert(payload, schema);
}

async function createNote(req, res, next) {
  const { userId } = req.claims;
  const noteData = {
    ...req.body,
    userId
  };

  try {
    await validateSchema(noteData);

    const noteId = uuidV4();
    const now = new Date()
      .toISOString()
      .substring(0, 19)
      .replace("T", " ");
    const sqlCreateNote = "INSERT INTO notes SET ?";

    const connection = await mysqlPool.getConnection();
    const [result] = await connection.query(sqlCreateNote, {
      id: noteId,
      title: noteData.title,
      content: noteData.content,
      user_id: noteData.userId,
      created_at: now
    });

    noteData.tags.forEach(async tagId => {
      const sqlAddTag = "INSERT INTO notes_tags SET ?";
      try {
        await connection.query(sqlAddTag, {
          note_id: noteId,
          tag_id: tagId,
          created_at: now
        });
      } catch (e) {
        console.error(e);
      }
    });

    connection.release();

    res.setHeader("Location", `${httpServerDomain}/api/notes/${noteId}`);
    return res.status(201).send();
  } catch (e) {
    console.error(e);
    return res.status(400).send(e);
  }
}

module.exports = createNote;
