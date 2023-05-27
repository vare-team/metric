export default function (req, res, next) {
	const category = req.path.split('/');
	req.category = category[category.length - 1];
	next();
}
