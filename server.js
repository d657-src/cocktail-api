import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// Redirects to the main page
app.get("/", async (req, res) => {
    try {
        res.render("main.ejs");
    } catch (error) {
        console.error(error.message);
    }
})

// Redirects to the page of a clicked image
app.post("/searchN", async (req, res) => {
    try {
        const result = await axios.get(API_URL + req.body.cocktailName);
        const drinks = result.data.drinks;
        res.render("index.ejs", { apiData: drinks });
    } catch (error) {
        console.error(error.message);
    }
})

// Redirects to the page with the random imgage
app.post("/random", async (req, res) => {
    try {
        const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const drinks = result.data.drinks;
        res.render("random.ejs", { apiData: drinks });
    } catch (error) {
        console.error(error.message);
    }
})

// app.post("/cocktail", async (req, res) => {
//     try {
//         const cocktailName = req.body.cocktailName;

//         console.log("Cocktail selected:", cocktailName);
//         const result = await axios.get(API_URL + "margarita");
//         const drinks = result.data.drinks;
//         res.render("cocktail.ejs", { apiData: drinks });
//     } catch (error) {
//         console.error(error.message);
//     }
// })

// TODO make it so whatever you pass through will only
// display one pitcture
app.post("/cocktail", async (req, res) => {
    try {
        // Get the cocktail name from the form submission
        const idDrink = req.body.idDrink;

        // Make an API request using the cocktail name
        const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + idDrink);
        const drinks = result.data.drinks;

        // Render the response
        res.render("cocktail.ejs", { apiData: drinks });
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(3000, () =>
    console.log("Listening on port 3000"),
);
