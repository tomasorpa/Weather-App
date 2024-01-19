let apiKey = "3dfc04c4776fe2b5e7e16e2747f0b12e";

let buscarButton = document.querySelector("#botonBusqueda");


let urlBase = "https://api.openweathermap.org/data/2.5/weather";
    

    
let ciudadInput = document.querySelector("#ciudadEntrada");
let style = document.documentElement.style;





buscarButton.addEventListener("click", () => {
    let ciudadInfo = ciudadInput.value;
    if (ciudadInfo) {
          fetchDatosClima(ciudadInfo)
    } 
  })
ciudadInput.addEventListener('keypress', function(event) {
   // Number 13 is the "Enter" key on the keyboard
   if (event.keyCode === 13) {
       // Cancel the default action, if needed
       event.preventDefault();
       // Trigger the button element with a click
       buscarButton.click();
   }
});

function fetchDatosClima(ciudadInfo) {

fetch(`${urlBase}?q=${ciudadInfo}&appid=${apiKey}`)
  .then((data) => data.json())
  .then((data) => mostrarDatos(data));

}


function mostrarDatos(data) {
   let divDatos = document.querySelector("#datosClima"); 
    style.setProperty("--backgroundColor", "#fff");
    style.setProperty("--shadow", " 0 3px 4px rgba(0, 0, 0, 0.3)");
   let nombreCiudad = data.name;
  let temperaturaCiudad = data.main.temp;
  let pais = data.sys.country;
  console.log(data)
    let celcius = temperaturaCiudad - 273.15;
    let icono = data.weather[0].icon;
    console.log(data);
    let feelsLike = data.main.feels_like;
    let feelsLikeCelcius = feelsLike - 273.15;
    let humidity = data.main.humidity;
   let descripcion = data.weather[0].description;
   
    let imagenHtml =
     `  <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="">`;

    let contenidoHtml = `
    <div id="dataInfo">
    <h2>${nombreCiudad} , ${pais} </h2>
    ${imagenHtml}
    <h2>${Math.floor(celcius)}° C</h2>
    <p>${descripcion.replace(/\b\w/g, l => l.toUpperCase())}</p>
    <article id="moreInfo">
   <div id=""feelLike>
   <img src="img/thermometer.svg" alt="">
    <h2 class="moreinfoH2">${Math.floor(feelsLikeCelcius)}</h2>
    <p>Feels Like</p>
    </div>
    <div id="humidity">
    <img src="img/droplet.svg" alt="">
  
    <h2 class="moreinfoH2">${humidity}%</h2>
    <p>Humidity</p>
  </div>
    </article>
    </div>`;
    
    divDatos.innerHTML = contenidoHtml;
}
