const express = require("express");
const app = express();

const router = express.Router();

const generateUniqueId = require("generate-unique-id")
// const id = generateUniqueId();


//Creating a global array

let users = [
  // {
  //     Book_name: 'Wings of fire',
  //     Author_name: 'A.P.J Abdul Kalam',
  //     ID: getID(),
  //     Created_at: new Date()
  // },

];

// const result = users.map(ele => ({...ele, id: generateUniqueId(), Created_at: new Date()})
// )

//get data from the server

router.get("/", (req, res) => {
  res.send(users);
});

//posting data from client side to server .. 

router.post("/", (req, res) => {
  //this post data goes to body so we need to push that portion in the users array to display it in the browser

  const new_user = req.body;

  const id = generateUniqueId();
  const date = new Date().toLocaleDateString();
  const user_id = { ...new_user, id: id, created_at: date };
  users.push(user_id);
  //console.log(users);
  res.send(`post method called`);
});

// to get details of specific book

router.get("/:id", (req, res) => {
  const unique_id = req.params.id;

  const book = users.find((ele) => ele.id == unique_id);
  if (!book) res.send("Book not found");
  res.send(book);
});

// to delete a entry

router.delete("/:id", (req, res) => {
  const unique_id = req.params.id;

  users = users.filter((ele) => ele.id !== unique_id);
  
  res.send(`book with ${unique_id} deleted !`);
});

//update a single property : use patch() menthod

router.patch("/:id", (req, res) => {
  let unique_id = req.params.id;

  const { Book_name, Author_name } = req.body;

  const found = users.find((ele) => ele.id === unique_id);

  if(!found) res.send('Book to be updated is not found !')

  if (Book_name) found.Book_name = Book_name;
  if (Author_name) found.Author_name = Author_name;

  found.Updated_at = new Date();

  res.send(`book with id ${unique_id} is updated !`);
});

module.exports = router;
