var API_KEY="api_key=a0ce567f065300dd0ab70fc821b656ef";
var BASE_URL="https://api.themoviedb.org/3";
var API_URL=BASE_URL+"/discover/movie?sort_by=popularity.desc&"+API_KEY;
//put & beacuse عشان اقدر اكتب حاجه بعدها
var IMG_URL = 'https://image.tmdb.org/t/p/w500';
const Search_URL = BASE_URL + '/search/movie?'+API_KEY;

const form=document.getElementById("form");
const search=document.getElementById("search");
const main=document.getElementById("main");


function getMovies(url){
fetch(url)
.then(res=> res.json())
.then(data=>{
    console.log(data.results)
    showMovies(data.results)
})};


function showMovies(movies){
main.innerHTML="";
movies.forEach(movie=>{
const {poster_path,title,overview,vote_average}=movie;
const moveEl=document.createElement("div");
moveEl.classList.add("movie");
moveEl.innerHTML=
`
<img src="${IMG_URL+poster_path}" alt="${title}"/>
<div class="movie-info">
<h4>${title}</h4>
<span class="${getRateColor(vote_average)}">${vote_average}</span>
</div>
<div class="overview">
<h3>Overview :</h3>
${overview}
</div>
`;
main.appendChild(moveEl);
});
}
getMovies(API_URL);

function getRateColor(vote){
if(vote>=8){
    return 'green'
}else if(vote>=5){
    return 'yellow'
}else{
    return 'red'
}
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchvalue = search.value;
    if(searchvalue){
        getMovies(Search_URL+ '&query=' + searchvalue);
    }else{
        getMovies(API_URL)
    }
})