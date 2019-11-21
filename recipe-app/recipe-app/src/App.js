import React, {useEffect, useState} from "react";
import Recipe from './components/recipe.js';
import './App.css';

const App = () => {
const APP_ID = 'afa35411'
const APP_KEY = '07301403dfa4599f9fa6313ed195554f'
const [search, setSearch] = useState('');
const [recipes, setRecipes] = useState([]);
const[query, setQuery] = useState('healthy');
let connect = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`

const [reply, setReply] = useState('Looking for recipies...')

useEffect( () =>{
  getRecipes()
}, [query]);


const getRecipes = async () => {
  const response = await fetch(connect)
  const data = await response.json();
  setRecipes(data.hits);
  console.log(data.hits)
  if (data.hits.length == 0) {
    setReply("none found")
  }
}

const updateSearch = e => {
  setSearch(e.target.value)
  console.log(search)
}

const getSearch = e => {
  e.preventDefault();
  console.log('searching...')
  setQuery(search);
}



  return (
    <div className='app'>
    <h1>Recipe App </h1>
    <form className='search-form' onSubmit={getSearch}>
    <input
        className="search-bar" 
        value={search} 
        type='Text'
        onChange={updateSearch} />
    <button 
        className = 'search-button'
        type='submit'
       >
        Search
      </button>
      
    </form>
    <div className="recipe"> 
    {recipes.map(recipe =>(
      <Recipe 
              key= {recipe.recipe.label}
              title={recipe.recipe.label}
              calories = {recipe.recipe.calories}
              image = {recipe.recipe.image} 
              ingredients = {recipe.recipe.ingredients}
              />
    ))}
    <h5> {reply} </h5>
    </div>
    </div>
  );
}

export default App;