const parseurl = require('parseurl')

// set views by creating our own middleware function
// this will act on any request as no url or req-type included
const countViews = () => {
  return (req, res, next) => {
    // currently req.session.views is undefined but this will add 1 to undefined which = 1
    if (!req.session.views) {
      req.session.views = {}
    }
    const path = parseurl(req).pathname
    // above gives url after domain root so here either /foo or /bar
    console.log(path)
    req.session.views[path] = (req.session.views[path] || 0) + 1
    console.log(req.session.views)
    next()
    // takes a next param and calls it to chain all these functions. The other middleware already has this internally
  }
}

module.exports = { countViews }
