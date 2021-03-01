'use strict'
const express = require("express");
const { get } = require("superagent");
const su = require("superagent")
const app = express();
require("dotenv").config()
app.use(express.static('./public'));

app.set('view engine', 'ejs')


const Port = process.env.PORT || 2000
app.use(express.urlencoded({ extended: true }));
app.listen(Port, () => {
    console.log(`listening on ${Port}`)

})
app.get('/', homePage)
app.post('/searches', getData)
app.get('/searches/new', newSearch)
// app.get('/searches/show', showData)
let bookValues = [];
// function showData(req, res) {

//     res.render("pages/searches/show", { Data: bookValues })
// }


function getData(req, res) {
    // let x = req.body.title
    // console.log(x);
    // res.render('pages/index')
    // // res.send("d")
    let search = req.body.q;
    //selecting from form
    let sel = req.body.TorA
    // console.log(y); this.url=data.image || https://i.imgur.com/J5LVHEL.jpg
    // let trigger;
    // if(tri)
    let url = `https://www.googleapis.com/books/v1/volumes?q=+${sel}:${search}`;
    su.get(url)
        .then((result) => {
            let boolImage;
            // res.send(result.body.items[4].volumeInfo);

            let itemsARR = result.body.items.map(function (elem, idx) {
                //    r.push(elem.volumeInfo.title)

                if (typeof elem.volumeInfo.imageLinks == "undefined") {
                    // console.log("false");
                    boolImage = false;
                } else {
                    boolImage = true
                    // console.log("true");
                }

                return new Book(elem, boolImage)




            })

            // console.log(itemsARR.imageURL);
            res.render("pages/searches/show", { Data: itemsARR })


        })


}
function newSearch(req, res) {


    res.render("pages/searches/new")
}


function homePage(req, res) {
    res.render("pages/index")

}

function Book(data, image) {
    if (image == false) {
        // console.log("dd");
        this.imageURL = "https://i.imgur.com/J5LVHEL.jpg"

    } else if (image) {
        // console.log("LL");
        this.imageURL = data.volumeInfo.imageLinks.smallThumbnail
    }
    this.bookTitle = data.volumeInfo.title || "There Is No Title"
    this.authorName = data.volumeInfo.authors || "There Is No Author"

    this.description = data.volumeInfo.description || "There Is No Description"

}