//Your code here


    let baseURL = "http://localhost:3000/films";
    let ulFilms = document.getElementById("films");
    let idBuyticket = document.getElementById("buy-ticket")
    
    function output(value){
        console.log(value);
    }
    
    function renderMovie(){
        fetch(baseURL)
        .then(res => res.json())
        .then(data => { 
            ulFilms.innerHTML = "";
            for(values of data){
                 addMovie(values);
            }
            }
        )
        .catch(e => output(e.message));
    }
    renderMovie();
    
    function addMovie(movies){
        movieTitle = movies.title
        movieId = movies.id
        let liFilm = document.createElement("li");
        liFilm.innerText = movieTitle;
        ulFilms.appendChild(liFilm);
    
        let movieImg = document.getElementById("poster");
        let idTitle = document.getElementById("title")
        let idRuntime = document.getElementById("runtime")
        let idFilmInfo = document.getElementById("film-info")
        let idShowtime = document.getElementById("showtime")
        let idTicketnum = document.getElementById("ticket-num")
    
        let remaining = movies.capacity - movies.tickets_sold;
    
        liFilm.addEventListener('click', e => {
    
            movieImg.src = movies.poster; 
            movieImg.alt = movies.title; 
            idTitle.innerText = movies.title;
            idRuntime.innerText = movies.runtime + " minutes";
            idFilmInfo.innerText = movies.description;
            idShowtime.innerText = movies.showtime;
            idTicketnum.innerText = remaining;
        })
    
        // idBuyticket.addEventListener('click', e => {
        //     show("Button Clicked")
        // });
    
    }
    addMovie(movies)
    // function buyTicket(){
    //     show("Button Clicked")
    // }


