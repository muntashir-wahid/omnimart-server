const slugify = require("slugify");

exports.createSlug = (fromField = "name") => {
  return (req, _, next) => {
    const slug = slugify(req.body[fromField], {
      replacement: "-",
      lower: true,
    });

    req.body.slug = slug;
    next();
  };
};
