const express = require('express')
const newsrouter = express.Router();
const axios = require ('axios');
const bodyParser = require('body-parser');

const API_URL = "https://newsapi.org/v2"
const APIkey = "YOUR_API_KEY";



newsrouter.get("", async (req, res,next) => {
    try {
        const url = `${API_URL}/top-headlines?country=in&pageSize=50&apiKey=${APIkey}`;
        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles , 
        len : news_get.data.articles.length
        })
        console.log(news_get.data.articles.length)
    } catch(error) {
        if (error.response) {
            res.render('news', { articles : null })
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            res.render('news', { articles : null })
            console.log(error.request);
        } else {
            res.render('news', { articles : null })
            console.log('Error', error.message);
        }
          console.log(error.config);
    };
});

newsrouter.post("", async (req, res,next) => {
    let search = req.body.search
    try {
        const url = `https://newsapi.org/v2/everything?q=${search}&from=2023-11-16&sortBy=popularity&apiKey=${APIkey}`;
        const news_get =await axios.get(url)
        console.log(url)
        res.render('newsSearch', { articles : news_get.data.articles })
    } catch(error) {
        if (error.response) {
            res.render('newsSearch', { articles : null })
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            res.render('newsSearch', { articles : null })
            console.log(error.request);
        } else {
            res.render('newsSearch', { articles : null })
            console.log('Error', error.message);
        }
          console.log(error.config);
    };
});


module.exports = newsrouter
