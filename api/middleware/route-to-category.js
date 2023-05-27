export default function (req, res, next) {
	req.category = req.path.slice(1);
	next();
}
