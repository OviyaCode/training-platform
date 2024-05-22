"use strict";

var jwt = require("jsonwebtoken");

var asyncHandler = require("express-async-handler");

var Student = require("../models/StudentModel");

var protect = asyncHandler(function _callee(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith("Bearer "))) {
            _context.next = 15;
            break;
          }

          _context.prev = 1;
          token = req.headers.authorization.split(" ")[1];
          decoded = jwt.verify(token, process.env.JWT_SECRET);
          _context.next = 6;
          return regeneratorRuntime.awrap(Student.findById(decoded.id).select("-password"));

        case 6:
          req.user = _context.sent;
          next();
          _context.next = 15;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.status(401);
          throw new Error("Not authorized");

        case 15:
          if (token) {
            _context.next = 18;
            break;
          }

          res.status(401);
          throw new Error("Not authorized, no token passed");

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
module.exports = {
  protect: protect
};