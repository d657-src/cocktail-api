import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "margarita");
        const drinks = result.data.drinks;
        res.render("index.ejs", { apiData: drinks });
    } catch (error) {
        console.error(error.message);
    }
})

app.post("/searchN", async (req, res) => {
    try {
        const result = await axios.get(API_URL + req.body.cocktailName);
        const drinks = result.data.drinks;
        res.render("index.ejs", { apiData: drinks });
    } catch (error) {
        console.error(error.message);
    }
})

app.post("/random", async (req, res) => {
    try {
        const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const drinks = result.data.drinks;
        res.render("random.ejs", { apiData: drinks });
    } catch (error) {
        console.error(error.message);
    }
})

app.post("/cocktail", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "margarita");
        const drinks = result.data.drinks;
        res.render("cocktail.ejs", { apiData: drinks });
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(3000, () =>
    console.log("Listening on port 3000"),
);
