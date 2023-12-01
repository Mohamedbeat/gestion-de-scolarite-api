// module.exports = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch((err) => {
//       next(err);
//     });
//   };
// };
module.exports = (fn) => {
  return (req, res, next) => {
    try {
      fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
// export default (fn) => {
//   return (req, res, next) => {
//     try {
//       fn(req, res, next);
//     } catch (err) {
//       next(err);
//     }
//   };
// };
