// Your code here
//initialisation of the code
let baseURL = "http://localhost:3000/films/";
let ulFilms = document.getElementById("films");
let idBuyticket = document.getElementById("buy-ticket")
let movieImg = document.getElementById("poster");
let idTitle = document.getElementById("title")
let idRuntime = document.getElementById("runtime")
let idFilmInfo = document.getElementById("film-info")
let idShowtime = document.getElementById("showtime")
let idTicketnum = document.getElementById("ticket-num")

//this function request the films from the server
function renderMovie(){
    fetch(baseURL)
    .then(res => res.json())
    .then(data => { 
        ulFilms.innerHTML = "";
        for(values of data){
             logMovie(values);
        }
        }
    )
    .catch(e => console.log(e.message)); //catch statement helps us to handle any error
}
renderMovie();


function logMovie(movies){
    
    let remainingTickets = movies.capacity - movies.tickets_sold;
  //the difference of movie capacity and tickets sold is the value of remaining tickets
    movieTitle = movies.title
    movieId = movies.id
   let liFilm = document.createElement("li");//we create this so as to store titles of the films

 //when remaining tickets is not greater than zero,the tickets become sold out
    if(!remainingTickets > 0)
    {  liFilm.className = "sold-out"
    }

    ulFilms.appendChild(liFilm);

    let movieSpan = document.createElement("span"); //span helps us to group inline elements
    movieSpan.innerText = movieTitle;
    liFilm.appendChild(movieSpan);

//CREATION OF THE DELETE BUTTON
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete"
    liFilm.appendChild(deleteButton); 
 
    deleteButton.addEventListener('click', () => {
        deleteMovie(movies)
    })
    movieSpan.addEventListener('click', () => {
        updateDom(movies);
    })
    if(movies.id === "1"){
        updateDom(movies);
    }
}

//the function updates the DOM to include data from theconsole
function updateDom(movies){
    let remainingTickets = movies.capacity - movies.tickets_sold;
    let movieId = movies.id;
    let ticketAvailabiity;

    if(remainingTickets > 0){
        ticketAvailabiity = "Buy Ticket"
    }else{
        ticketAvailabiity = "Sold out"
    }
 
    movieImg.src = movies.poster; 
    movieImg.alt = movies.title; 
    idTitle.innerText = movies.title;
    idRuntime.innerText = movies.runtime + " minutes";
    idFilmInfo.innerText = movies.description;
    idShowtime.innerText = movies.showtime;
    idTicketnum.innerText = remainingTickets;

    //PURCHASE OF A TICKET
    idBuyticket.onclick = () => {
        if(remainingTickets > 0)
        { 
             buyTicket(movies)
        }else{
            console.log("The tickets are sold out!!")
        }
    };
    idBuyticket.dataset.movieId = movies.id; //this refers to the value of the data movie id on the button eith the ID of idBuyticket
    let button = document.querySelector([data-movies-id,`${movieId}`]);
    button.innerText =ticketAvailabiity;
}


function buyTicket(movies){
    movies.tickets_sold++ //increases the tickets_sold property of the movies object by 1.
    let ticketsSold = movies.tickets_sold;
    let requestHeaders = {
        "Content-Type": "application/json"
    }
    let requestBody = {
        "tickets_sold": ticketsSold
    }
    fetch(baseURL+movies.id,{
        method: "PATCH",
        headers: requestHeaders,    
        body: JSON.stringify(requestBody)
    })
    // sends the request headers and the JSON body containing the updated tickets_sold information
    .then (res => res.json())
    .then (data => {
        updateDom(data);
     //this section processes data and updates the DOM using the updateDOM function
        let numberOfTickets = (data.capacity - data.tickets_sold)

        if(!numberOfTickets > 0)
        { renderMovie()
        }

        let  RequestBodyTickets =  {
            "film_id": data.id,
            "number_of_tickets": numberOfTickets
         }

        fetch("http://localhost:3000/tickets",{
            method: "POST",
            headers: requestHeaders,    
            body: JSON.stringify(RequestBodyTickets)
        })
        .then (res => res.json())
        .then(data => data)
        .catch (e => console.log(e.message));

    })
    .catch (e => console.log(e.message));
}

//DELETING A FILM FROM THE SERVER
function deleteMovie(movie){
    let requestHeaders = {
        "Content-Type": "application/json"
    }
    let requestBody = {
        "id": movie.id
    }
    fetch(baseURL+movie.id, {
        method: "DELETE",
        headers: requestHeaders,    
        body: JSON.stringify(requestBody)
    })
    .then (res => res.json())
    .then (data => renderMovie())
    .catch (e => console.log(e.message));
}
