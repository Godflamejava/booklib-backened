const dotenv = require('dotenv');
const process = require('node:process');
var fs = require('fs');
dotenv.config();
var cors = require('cors')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
const book_table=require('./connection')


process.on('uncaughtException', (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`,
  );
});


//post data to the 
app.post("/", async (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  console .log("ritik "+title+" "+author+" "+price);
  const saveBlog = book_table.build({
    title,
    author,
    price,
  });
  await saveBlog.save();
  res.json({message:"data posted"});
});


//get all data from db
app.get("/", async (req, res) => {
  const alldata = await book_table.findAll();
  res.json(alldata);
});

//get data by id  from db
app.get("/:id", async (req, res) => {
    const alldata = await  book_table.findAll({
        where: {
          id: req.params.id,
        },
      });

    res.json(alldata);
  });

  //update data to db
app.put("/:id", async(req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const price = req.body.price;
  await book_table.update(
    {
       title,
    author,
    price,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(function(result){
    res.json({message:"data edited"});
  }).catch(function(error){
    res.json({message:error});
  });;
});

//delete data from db
app.delete("/:id", async(req, res) => {
    await book_table.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json({message:"data deleted"});
});

 app.listen(process.env.PORT, () => {
  console.log(`server starts at http://localhost:${process.env.PORT}`);
});
