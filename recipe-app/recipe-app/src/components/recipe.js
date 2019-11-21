import React from 'react'; 

const Recipe = ({title,calories,image,ingredients}) => {
    return(
        <div>
            <h1>{title}</h1>
            <p>Calories: {calories}</p>
            <img className="image" src={image} alt=''/>
            <ol>
            {ingredients.map(ingredient =>(
                <li>{ingredient.text}</li>
            ))}
            </ol>
        </div>
    );
}

export default Recipe;