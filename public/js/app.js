console.log('Client side javascript file is loaded');

//UI variables
const weatherForm = document.querySelector('form');
const search = document.getElementById('loc');

// Final Result Variables
const ul = document.querySelector('ul');
const loc = document.getElementById('location');
const weather = document.getElementById('weather');
const temperature = document.getElementById('temperature');
const feelslike = document.getElementById('feelslike');
const humidity = document.getElementById('humidity');

// Div to show error or any other message
const messageOne = document.querySelector('#message1');

// If input is empty then remove the result of previous location
search.addEventListener('keyup',(e)=>{
  const text = e.target.value;
  if(text.length === 0){
    ul.classList.add("result");
  }
});

//Fetch data from server on submission
weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();

  const place = search.value;
  if(place.length === 0){
    showMessage('Please enter a location first!',"red");
  }
  else{
  showMessage('Loading...',"green")
  fetch(`http://localhost:3000/weather?address=${place}`).then((response)=>{
  response.json().then((data)=>{
    if(data.error){
      showMessage(data.error,"red");
    }
    else{
      clearMessage();
      ul.classList.remove("result");
      console.log(ul.classList);
      loc.textContent = "Location: "+data.location;
      weather.textContent = "Weather: "+data.weather;
      temperature.textContent = "Temperature: "+data.temperature;
      feelslike.textContent = "Feels Like: "+data.feelslike;
      humidity.textContent = "Humidity: "+data.humidity;
    }
  });
 });
}
});

//Function to display any message to user
const showMessage = (message,color)=>{
  messageOne.style.color = color;
  messageOne.textContent = message;
  if(color === "red"){
  search.textContent = "";
  setTimeout(clearMessage,4000);
  }
}

//To clear previously shown result
const clearMessage = ()=>{
  messageOne.textContent = "";
}
