const path = require("path");
const { use } = require("../uses/uses.router");
const urls = require(path.resolve("src/data/urls-data"));
const uses=require(path.resolve("src/data/uses-data"))

function urlExists(req, res, next) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((url) => url.id === urlId);
  if (foundUrl) {
    res.locals.url=foundUrl
    return next();
  }
  next({
    status: 404,
    message: `${urlId}`,
  });
}
function timeTracker(req, res,next){
  const urlId=Number(req.params.urlId)
  // const thisUse=uses.find(use)=>use.id===urlId
  // thisuse.urlIdtime.push
  const idNum=uses.length+1
  const useObj={id:idNum,urlId:urlId,time:Date.now()}
  uses.push(useObj)
  next()
}


function hasUrl(req, res, next) {
  const { data: { href } = {} } = req.body;
  
  if (href) {
    return next();
  }
  next({ status: 400, message: "An 'href' property is required." });
}


function list(req, res) {
  res.status(200).json({ data: urls });
}


function read(req, res) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find((url) => (url.id === urlId));
  console.log(foundUrl)
  res.status(200).json({data: foundUrl});
}

function create(req, res) {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: urls.length + 1,
    href,
  };
  urls.push(newUrl);
  res
  .status(201)
  .json
  ({ data: newUrl })
}

function update(req, res) {
  // const noteId = Number(req.params.noteId);
  // const foundNote = notes.find((note) => note.id === noteId);

  const { data: { href } = {} } = req.body;

  res.locals.url.href = href;

  res.status(200)
  .json({ data: res.locals.url });
}

// function destroy(req, res) {
//   const { urlId } = req.params;
//   const index = urls.findIndex((url) => url.id === Number(urlId));
//   if (index > -1) {
//     urls.splice(index, 1);
//   }
//   res.sendStatus(204);
// }



module.exports = {
  create: [hasUrl, create],
  list,
  read: [urlExists, timeTracker, read],
  update: [urlExists, hasUrl, update],
  urlExists,
  // delete: destroy,
  // noteExists
};
