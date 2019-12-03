'use strict';

const mysqlPool = require('../../../database/mysql-pool');

async function getNotes(req, res, next) {
  const { userId, role, } = req.claims;
  try {
    const sqlQuery = `SELECT n.id, n.title, n.content, 
      n.created_at, n.updated_at, t.id AS tagId, t.tag
      FROM notes n
      LEFT JOIN notes_tags nt
        ON n.id = nt.note_id
      LEFT JOIN tags t
        ON nt.tag_id = t.id
      WHERE n.user_id = ?
        AND n.deleted_at IS NULL
      ORDER BY created_at`;

    const connection = await mysqlPool.getConnection();
    const [notesData] = await connection.execute(sqlQuery, [userId]);
    connection.release();

    const notesHydrated = notesData.reduce((acc, rawNote) => {
      const tag = rawNote.tagId ? {
        id: rawNote.tagId,
        name: rawNote.tag,
      } : undefined;
   
      const noteProcessed = acc[rawNote.id];
   
      if (!noteProcessed) {
        return {
           ...acc,
           [rawNote.id]: {
           ...rawNote,
           tags: tag ? [tag] : [],
           tagId: undefined,
           tag: undefined,
         },  
        }
      }
   
      return {
        ...acc,
        [rawNote.id]: {
         ...rawNote,
         tags: [...noteProcessed.tags, tag],
         tagId: undefined,
         tag: undefined,
        },
      };
     }, {});

    return res.status(200).send({
      data: Object.values(notesHydrated), 
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      message: e.message,
    });
  }
}

module.exports = getNotes;
