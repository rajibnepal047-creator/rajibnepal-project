/* =====================================================
   TRAVEL TOURS WEBSITE
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   SPA ROUTER
===================================================== */


const pages = document.querySelectorAll(".page");

const routes = document.querySelectorAll(".route");


function showPage(pageName){

    pages.forEach(page=>{

        page.classList.remove("active-page");

    });


    const selectedPage = document.getElementById(pageName);


    if(selectedPage){

        selectedPage.classList.add("active-page");

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }

}



routes.forEach(route=>{


    route.addEventListener("click",()=>{


        const page = route.dataset.page;


        showPage(page);


    });


});



/* =====================================================
   TOUR DATA
===================================================== */


const tours = [

{

    title:"Paris Adventure",

    location:"France",

    price:"$1200",

    image:"https://picsum.photos/600/400?1",

    description:
    "Explore the Eiffel Tower, museums and beautiful streets of Paris."

},


{

    title:"Bali Paradise",

    location:"Indonesia",

    price:"$900",

    image:"https://picsum.photos/600/400?2",

    description:
    "Relax on beaches and enjoy tropical island experiences."

},


{

    title:"Everest Base Camp",

    location:"Nepal",

    price:"$1500",

    image:"https://picsum.photos/600/400?3",

    description:
    "Experience breathtaking Himalayan mountain views."

},


{

    title:"Swiss Alps",

    location:"Switzerland",

    price:"$1800",

    image:"https://picsum.photos/600/400?4",

    description:
    "Enjoy snow mountains and beautiful landscapes."

},


{

    title:"Tokyo Explorer",

    location:"Japan",

    price:"$1400",

    image:"https://picsum.photos/600/400?5",

    description:
    "Discover technology, culture and traditional Japan."

},


{

    title:"Maldives Escape",

    location:"Maldives",

    price:"$2000",

    image:"https://picsum.photos/600/400?6",

    description:
    "Enjoy luxury resorts and crystal clear oceans."

}


];



/* =====================================================
   RENDER TOUR CARDS USING map()
===================================================== */


const tourGrid = document.getElementById("tourGrid");


function displayTours(){


    if(!tourGrid) return;



    tourGrid.innerHTML = tours.map(tour=>{


        return `

        <div class="tour-card">


            <img src="${tour.image}">


            <div class="tour-content">


                <h3>${tour.title}</h3>


                <p>

                <b>Location:</b>
                ${tour.location}

                </p>


                <p>

                ${tour.description}

                </p>


                <div class="tour-price">

                ${tour.price}

                </div>


                <button class="btn btn-primary">

                Book Now

                </button>


            </div>


        </div>


        `;


    }).join("");



}



displayTours();





/* =====================================================
   DEFAULT PAGE
===================================================== */


showPage("home");



/* =====================================================
   CURRENT YEAR FOOTER
===================================================== */


const year = new Date().getFullYear();

const footerYear = document.querySelector("footer p");

if (footerYear) {
    footerYear.innerHTML = `© ${year} DestinyTours`;
}

const newsContainer = document.getElementById("travelNews");
const newsSearch = document.getElementById("newsSearch");

let newsArticles = [];

async function loadTravelNews() {

    try {

        const response = await fetch(
            "https://newsapi.org/v2/everything?q=travel&sortBy=publishedAt&apiKey=f5957bb741944d73aa9c245436487368"
        );

        if (!response.ok) {
            throw new Error("News API request failed.");
        }

        const data = await response.json();

        console.log(data);

        // Check if NewsAPI returned an error
        if (data.status !== "ok") {
            throw new Error(data.message || "Unable to load news.");
        }

        newsArticles = data.articles || [];

        displayNews(newsArticles);

    } catch (error) {

        newsContainer.innerHTML = `
            <div class="news-error">
                <h3>Unable to load news</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function displayNews(news) {

    if (!news || news.length === 0) {

        newsContainer.innerHTML = `
            <div class="news-error">
                <h3>No travel news available</h3>
                <p>Please try again later.</p>
            </div>
        `;

        return;
    }

    newsContainer.innerHTML = news.map((item, index) => {

        return `
            <div class="news-card">

                <img
                    src="${item.urlToImage || `https://picsum.photos/500/300?random=${index}`}"
                    alt="Travel News"
                >

                <div class="news-content">

                    <span class="news-category">
                        Travel News
                    </span>

                    <h4>
                        ${item.title || "Travel Update"}
                    </h4>

                    <p>
                        ${item.description || item.content || "Discover amazing places around the world."}
                    </p>

                    <small>
                        ${item.author || "Unknown Author"}
                    </small>

                    <br><br>

                    <a href="${item.url}" target="_blank">
                        Read More →
                    </a>

                </div>

            </div>
        `;

    }).join("");
}

if (newsSearch) {
    newsSearch.addEventListener("input", function () {

        const keyword = this.value.toLowerCase();

        const filteredNews = newsArticles.filter(article =>
            (article.title || "").toLowerCase().includes(keyword) ||
            (article.description || "").toLowerCase().includes(keyword)
        );

        displayNews(filteredNews);
    });
}

loadTravelNews();
/* =====================================================
   QUOTABLE API - TRAVEL QUOTES
===================================================== */


const quoteBox =
document.getElementById("quote");



async function getQuote(){


    if(!quoteBox) return;



    try{


        const response =
        await fetch(
        "https://api.quotable.io/random"
        );



        if(!response.ok){

            throw new Error(
            "Quote service unavailable"
            );

        }



        const data =
        await response.json();



        quoteBox.innerHTML = `

        "${data.content}"

        <br><br>

        <b>
        - ${data.author}
        </b>

        `;


    }


    catch(error){


        quoteBox.innerHTML = `

        "Travel makes you discover yourself."

        `;


    }


}



getQuote();
/* =====================================================
   OPEN WEATHER API
===================================================== */


const weatherButton =
document.getElementById("weatherBtn");


const cityInput =
document.getElementById("cityInput");


const weatherResult =
document.getElementById("weatherResult");




const WEATHER_KEY =
"d62e7e2465e9090a2cb3d9c3862b66d8";





async function getWeather(){



    const city =
    cityInput.value.trim();



    if(city===""){


        weatherResult.innerHTML = `


        <div class="error-message">

        Please enter a city name

        </div>


        `;


        return;

    }




    weatherResult.innerHTML =
    `<div class="loader"></div>`;



    try{


        const response =
        await fetch(

        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_KEY}&units=metric`

        );



        if(!response.ok){

            throw new Error(
            "City not found"
            );

        }



        const data =
        await response.json();




        weatherResult.innerHTML = `



        <div class="weather-card">


        <h3>

        ${data.name}

        </h3>



        <img 
        src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
        >



        <div class="weather-temp">

        ${Math.round(data.main.temp)}°C

        </div>




        <p>

        ${data.weather[0].description}

        </p>




        <div class="weather-info">


        <div>

        <i class="bi bi-droplet"></i>

        <span>

        ${data.main.humidity}%

        </span>

        </div>



        <div>

        <i class="bi bi-wind"></i>

        <span>

        ${data.wind.speed} m/s

        </span>

        </div>



        </div>



        </div>


        `;



    }



    catch(error){



        weatherResult.innerHTML = `


        <div class="fallback-box">


        <i class="bi bi-cloud-slash"></i>


        <h3>

        Weather Error

        </h3>


        <p>

        ${error.message}

        </p>


        </div>



        `;


    }


}





if(weatherButton){


weatherButton.addEventListener(
"click",
getWeather
);


}

/* =====================================================
   OPENTRIPMAP API
===================================================== */


const placeButton =
document.getElementById("placeBtn");


const placeInput =
document.getElementById("placeInput");


const placesResult =
document.getElementById("placesResult");



const OPEN_TRIP_KEY =
"5ae2e3f221c38a28845f05b6120e0f0045e711a753f15523a44c7879";





async function getPlaces(){


const city =
placeInput.value.trim();



if(city===""){


placesResult.innerHTML = `

<div class="error-message">

Enter a city name

</div>

`;

return;


}



placesResult.innerHTML =
`<div class="loader"></div>`;




try{


/*
First get coordinates
*/


const geoResponse =
await fetch(

`https://api.opentripmap.com/0.1/en/places/geoname?name=${city}&apikey=${OPEN_TRIP_KEY}`

);



if(!geoResponse.ok){

throw new Error(
"Location not found"
);

}



const location =
await geoResponse.json();




const response =
await fetch(

`https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${location.lon}&lat=${location.lat}&apikey=${OPEN_TRIP_KEY}`

);




const data =
await response.json();



const places =
data.features.slice(0,6);




placesResult.innerHTML =
places.map(place=>{


return `



<div class="place-card">


<img src="https://picsum.photos/400/250?random=${Math.random()}">



<div class="place-content">


<h4>

${place.properties.name || "Unknown Place"}

</h4>



<p>

${place.properties.kinds || "Tourist Attraction"}

</p>



</div>


</div>


`;



}).join("");





}


catch(error){



placesResult.innerHTML = `


<div class="fallback-box">


<i class="bi bi-geo-alt-fill"></i>


<h3>

Attractions unavailable

</h3>


<p>

${error.message}

</p>


</div>


`;



}



}




if(placeButton){


placeButton.addEventListener(
"click",
getPlaces
);


}
/* =====================================================
   CURRENCY CONVERTER API
===================================================== */


/* =====================================================
   CURRENCY CONVERTER
===================================================== */


const convertButton =
document.getElementById("convertBtn");


const amountInput =
document.getElementById("amount");


const fromCurrency =
document.getElementById("from");


const toCurrency =
document.getElementById("to");


const conversionResult =
document.getElementById("conversionResult");





async function convertCurrency(){


    const amount =
    Number(amountInput.value);


    const from =
    fromCurrency.value.trim().toUpperCase();


    const to =
    toCurrency.value.trim().toUpperCase();





    // Client-side validation

    if(!amount || !from || !to){


        conversionResult.innerHTML =

        `
        <span style="color:red">

        Please fill all fields

        </span>
        `;


        return;

    }





    try{


        conversionResult.innerHTML =
        "Converting...";





        const response =
        await fetch(

        `https://open.er-api.com/v6/latest/${from}`

        );





        if(!response.ok){


            throw new Error(
            "Currency API request failed"
            );


        }





        const data =
        await response.json();





        const rate =
        data.rates[to];





        if(!rate){


            throw new Error(
            "Invalid currency code"
            );


        }





        const convertedAmount =
        amount * rate;





        conversionResult.innerHTML =


        `

        <strong>

        ${amount} ${from}

        =

        ${convertedAmount.toFixed(2)}
        
        ${to}

        </strong>

        `;



    }



    catch(error){



        conversionResult.innerHTML =


        `

        <span style="color:red">

        Error:
        ${error.message}

        </span>

        `;



        console.log(error);



    }



}






// Button Event Listener

if(convertButton){


    convertButton.addEventListener(

        "click",

        convertCurrency

    );


}
/* =====================================================
   CONTACT FORM VALIDATION
===================================================== */


const contactForm =
document.getElementById("contactForm");


const nameInput =
document.getElementById("name");


const emailInput =
document.getElementById("email");


const messageInput =
document.getElementById("message");


const formMessage =
document.getElementById("formMessage");





function validateEmail(email){


return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
.test(email);


}





if(contactForm){



contactForm.addEventListener(
"submit",
(e)=>{


e.preventDefault();



const name =
nameInput.value.trim();



const email =
emailInput.value.trim();



const message =
messageInput.value.trim();




if(name===""){


nameInput.classList.add(
"input-error"
);


formMessage.innerHTML = `

<div class="error-message">

Please enter your name

</div>

`;


return;

}



if(!validateEmail(email)){


emailInput.classList.add(
"input-error"
);



formMessage.innerHTML = `


<div class="error-message">

Enter a valid email address

</div>


`;


return;


}



if(message.length < 10){


messageInput.classList.add(
"input-error"
);



formMessage.innerHTML = `


<div class="error-message">

Message must contain at least 10 characters

</div>


`;



return;


}




/* SUCCESS */


nameInput.classList.add(
"input-success"
);


emailInput.classList.add(
"input-success"
);


messageInput.classList.add(
"input-success"
);



formMessage.innerHTML = `


<div class="success-message">


Thank you ${name}! 
Your message has been sent successfully.


</div>


`;



contactForm.reset();



});


}
/* =====================================================
   REMOVE VALIDATION ERRORS ON INPUT
===================================================== */


const formInputs =
document.querySelectorAll(
"#contactForm input, #contactForm textarea"
);



formInputs.forEach(input=>{


input.addEventListener(
"input",
()=>{


input.classList.remove(
"input-error"
);


input.classList.remove(
"input-success"
);



});


});
/* =====================================================
   CLOSE MOBILE NAVBAR AFTER CLICK
===================================================== */


const navLinks =
document.querySelectorAll(".nav-link");


const navbarCollapse =
document.querySelector(".navbar-collapse");



navLinks.forEach(link=>{


link.addEventListener(
"click",
()=>{


if(navbarCollapse.classList.contains("show")){


navbarCollapse.classList.remove(
"show"
);


}


});


});
/* =====================================================
   GLOBAL LOADING HELPER
===================================================== */


function showLoading(element){


if(element){


element.innerHTML = `


<div class="loader"></div>


`;


}


}
