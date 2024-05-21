export default function logRequest(req, res, next) {
  console.log("Request URL:", req.path);
  next();
}
