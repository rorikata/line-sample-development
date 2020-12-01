
async function test(req, res, next) {
  console.log(req.body);
  res.json();
}

module.exports = {
  test,
};
