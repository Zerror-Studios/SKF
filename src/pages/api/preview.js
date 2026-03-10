export default function preview(req, res) {
  res.setPreviewData({});

  const slug = req.query.slug || "/";
  res.writeHead(307, { Location: slug });
  res.end();
}