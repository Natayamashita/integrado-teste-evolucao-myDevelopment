export const getUser = (req, res) => {
  const id = req.params.id;
  // Get the user data from database
  const user = {
    id: 1,
    name: 'John Doe',
  };
  // Send the response to the client
  res.send({
    user: user,
  });
};