const express = require('express')
const app = express()
const pokemon = require('./pokemons.json')
const InformationsPokemon = require('./infospokemons.json')
const cors = require('cors')
app.use(cors())
var bodyParser = require('body-parser')
app.use(bodyParser.json());
const DEFAULT_LIMIT = 10;

app.get('/api/pokemon', (req, res) => {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : DEFAULT_LIMIT;
  const startIndex = offset;
  const endIndex = startIndex + limit;
  const totalPokemon = pokemon.length;
  const paginatedPokemon = pokemon.slice(startIndex, endIndex);
  const nextOffset = startIndex + limit;
  const previousOffset = Math.max(0, startIndex - limit);
  const nextLink = `/api/pokemon/${nextOffset}/${limit}`;
  const previousLink = `/api/pokemon/${previousOffset}/${limit}`;

  res.status(200).json({
    totalPokemon,
    offset,
    limit,
    next: nextLink,
    previous: previousLink,
    data: paginatedPokemon,
  });
});

app.get('/api/pokemon/:offset/:limit', (req, res) => {
  const offset = req.params.offset ? parseInt(req.params.offset) : 0;
  const limit = req.params.limit ? parseInt(req.params.limit) : DEFAULT_LIMIT;
  const nextOffset = offset + limit;
  const previousOffset = Math.max(0, offset - limit);
  const nextLink = `/api/pokemon/${nextOffset}/${limit}`;
  const previousLink = `/api/pokemon/${previousOffset}/${limit}`;
  const paginatedPokemon = pokemon.slice(offset, offset + limit);

  res.status(200).json({
    offset,
    limit,
    next: nextLink,
    previous: previousLink,
    data: paginatedPokemon,
  });
});

app.get('/api/infoPokemon/:id', (req, res) => {
  const id = req.params.id;
  if (isNaN(id)){
    const lePokemon = InformationsPokemon.find(jeu => jeu.name == id)
    res.status(200).json(lePokemon)
  }
  else{
    let idInt = parseInt(id);
    const infoPokemon = InformationsPokemon.find(poke => poke.id === idInt);
    res.status(200).json(infoPokemon);
  } 
});



app.get('/nombrePoke', (req,res)=>{
  res.status(200).json(pokemon.length)

})

app.listen(8000, () => {
  console.log('Server started on port 8000');
})