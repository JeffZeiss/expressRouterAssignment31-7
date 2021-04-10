const path = require("path");
const uses = require(path.resolve("src/data/uses-data"));


// function hasText(req, res, next) {
//   const { data: { text } = {} } = req.body;

//   if (text) {
//     return next();
//   }
//   next({ status: 400, message: "A 'text' property is required." });
// }

function list(req, res) {
  res.json({ data: uses });
}

function useExists(req, res, next) {
  console.log("we're in read")
  const useId = Number(req.params.useId);
  const foundUse = uses.find((use) => use.id === useId);
  if (foundUse) {
    res.locals.use = foundUse
    console.log("useExistspassed")
    return next();
  }
  next({
    status: 404,
    message: `use id not found: ${req.params.useId}`,
  });
}
function urlUseCheck(req, res, next) {
  const { urlId, useId } = req.params;
  // if(!urlId){return next()}
  // const urlIdNum = Number(urlId)
  if (urlId && Number(urlId) 
  !== res.locals.use.urlId){
      next({ 
        message: "suckanegg", 
        status: 404 }) 
      }
  return next();
}

function read(req, res) {
  // const noteId = Number(req.params.noteId);
  // const foundNote = notes.find((note) => (note.id = noteId));
  console.log("read is reached")
  res
    .json({ data: res.locals.use });
}

function destroy(req, res) {
  const { useId } = req.params;
  const index = uses.findIndex((use) => use.id === Number(useId));
  if (index > -1) {
    uses.splice(index, 1);
  }
  res.sendStatus(204);
}



module.exports = {
  // create: [hasText, create],
  list,
  read: [useExists, urlUseCheck, read],
  // update: [noteExists, hasText, update],
  delete: [useExists, destroy],
  // noteExists
};
