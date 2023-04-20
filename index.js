const express = require('express');
const app = express();
const { Op } = require("sequelize");
const { Joke } = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  try {
    // TODO - filter the jokes by tags and content
      if(Object.keys(req.query).length===0){
        const jokes = await Joke.findAll({});
        res.send(jokes);    
     }

    const where = {};
    if (req.query.tags){
      where.tags = {[Op.like]: `%${req.query.tags}%` }
    }

    if (req.query.content){
      where.joke = {[Op.like]: `%${req.query.content}%` }
    }

    const jokes = await Joke.findAll({
      where
    });

    res.send(jokes)
    
  } catch (error) {
    console.error(error);
    next(error)
  }
});

app.delete('/jokes/:id', async (req, res) => {
  const joke = await Joke.deleteById(req.params.id);
  res.send(joke);
})

// we export the app, not listening in here, so that we can run tests
module.exports = app;
