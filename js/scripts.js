
   const temperatureDescription =document.querySelector('.temperature-description');
   const temperatureDegree =document.querySelector('.temperature-degree');
   const locationTimezone =document.querySelector('.location-timezone');
   const temperatureSection = document.querySelector('.temperature');
   const temperatureSpan= document.querySelector('.temperature span');
   const temperatureP= document.querySelector('.temperature p');
   let long;
   let lat;

window.addEventListener('load',()=>{
   if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
           long = position.coords.longitude;
           lat=position.coords.latitude;

           const proxy= "http://cors-anywhere.herokuapp.com/";
           const api= `https://api.darksky.net/forecast/b6aa46ebc6583ad8dada88dfc21ed0c6/${lat},${long}`;
           fetch(api)
          .then(response =>{
              return response.json();
          })
          .then(data =>{
              //console.log(data);
              const {temperature,summary, icon} = data.currently;
              //set DOM elements from the API
              temperatureDegree.textContent= temperature;
              temperatureDescription.textContent=summary;
              locationTimezone.textContent = data.timezone;
              //formula for celcius
              let celcius = (temperature -32) * (5/9); 
              //set icons
              setIcons(icon,document.querySelector('.icon'));

              //change temperature to Celcius/farenheit
              temperatureSection.addEventListener('click',()=>{
                  if(temperatureSpan.textContent === "F"){
                      temperatureSpan.textContent =" C";
                      temperatureP.textContent =" Click to change in Farenheit";
                      temperatureDegree.textContent = Math.floor(celcius);
                  } else{
                      temperatureSpan.textContent =" F";
                      temperatureDegree.textContent = temperature;
                      temperatureP.textContent =" Click to change in Celcius";
                  }
              })
          })
        });
        
   } else{
       //put the content if navigator is not allowed
   }

   function setIcons(icon, iconID){
       const skycons= new Skycons({color: "white"});
       const currentIcon = icon.replace(/-/g, "_").toUpperCase();
       skycons.play();
       return skycons.set(iconID, Skycons[currentIcon]);
   }

});