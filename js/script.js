// Output student name and ID
const studentIdHolder = document.querySelector("#student");
studentIdHolder.textContent = "Jennifer Towns 1233586";

// API URL (fetches a random recipe)
const apiURL = "https://www.themealdb.com/api/json/v1/1/random.php";

async function retrieveData() {
    // request the data and parse into json
    const apiResponse = await fetch(apiURL);
    const incomingData = await apiResponse.json();
    return incomingData;
}

async function proccessData() {
    const newData = await retrieveData();

    // Put the meal object into its own variable
    const meal = newData.meals[0]
    console.log(meal);

    // Encapsulate the recipe in an article
    const article = document.createElement("article");

    // Add image
    const img = document.createElement("img");
    img.src = meal.strMealThumb;
    article.appendChild(img);

    // H3 to contain the recipe name
    const recipeName = document.createElement("h3");
    recipeName.textContent = meal.strMeal;
    article.appendChild(recipeName);

    // H4 for the category and region
    const categoryRegion = document.createElement("h4");
    categoryRegion.textContent = `${meal.strArea}, ${meal.strCategory}`;
    article.appendChild(categoryRegion);

    
    // Make a list to store the ingredients
    const ingredients = document.createElement("ul");
    let i = 1;
    while (meal['strIngredient' + i] != "" && i <= 20) {
        const newIngredient = document.createElement("li");
        const ingredientString = meal[`strIngredient${i}`] + ", " + meal[`strMeasure${i}`];
        newIngredient.textContent = ingredientString;
        ingredients.appendChild(newIngredient);
        i++;
    }
    article.appendChild(ingredients);

    // Add the instructions in a p element
    const instructions = document.createElement("p");
    instructions.textContent = meal.strInstructions;
    article.appendChild(instructions);

    // Add video, if available
    if (meal.strYoutube != "") {
        const video = document.createElement("iframe");
        video.width = 640;
        video.height = 480;
        // do a string replace to get the embed version of the URL
        video.src = meal.strYoutube.replace("watch?v=", "embed/");
        article.appendChild(video);
    }
    
    // Finally place the article into the main
    const main = document.querySelector("main");
    main.appendChild(article);
}

proccessData();