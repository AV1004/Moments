function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let BG = (a, b) => {
  // For Image

  let ImgNo = generateRandomNumber(a, b);
  // console.log(ImgNo);

  let cssTemplateString = `body::before{
    content: "";
    background: url('/Pic_${ImgNo}.jpg') no-repeat center center;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    z-index: -1;
    opacity: .89;
}
`;


  const styleTag = document.createElement("style");
  styleTag.innerHTML = cssTemplateString;
  document.head.insertAdjacentElement('beforeend', styleTag);
}


// For Time 
setInterval(() => {
  let Time = document.getElementById("Time");
  let date = new Date();
  // let date = new Date(2019, 06, 10, 20, 33, 30);
  let hour = date.getHours();
  let min = date.getMinutes();


  let zero = (a) => {
    switch (a) {
      case 0:
        return "00"
        break;
      case 1:
        return "01"
        break;
      case 2:
        return "02"
        break;
      case 3:
        return "03"
        break;
      case 4:
        return "04"
        break;
      case 5:
        return "05"
        break;
      case 6:
        return "06"
        break;
      case 7:
        return "07"
        break;
      case 8:
        return "08"
        break;
      case 9:
        return "09"
        break;
      default:
        return a;
    }
  }

  Time.innerHTML = `${zero(hour)}:${zero(min)}`;
}, 1000)



//Greeting
let today = new Date();
// let today = new Date(2019, 06, 10, 20, 33, 30);
let hour = today.getHours();
// console.log(hour);
let Greeting = document.getElementById("Greeting");
let GreetingParent = document.getElementById("GreetingParent");

if (hour >= 4 && hour <= 11) {
  Greeting.innerHTML = `Good Morning,
          <span id="Name" contenteditable="true" class="outline-none text-center"></span>
              `;
  GreetingParent.style = ``;

  BG(1, 2);
}
else if (hour >= 12 && hour <= 17) {
  Greeting.innerHTML = `Good Afternoon,
          <span id="Name" contenteditable="true" class="outline-none text-center"></span>
              `;
  GreetingParent.style = ``;
  BG(3, 3);
}
else if (hour >= 18 && hour <= 20) {
  Greeting.innerHTML = `Good Evening,
          <span id="Name" contenteditable="true" class="outline-none text-center"></span>
              `;
  GreetingParent.style = ``;
  BG(4, 5);
}
else {
  Greeting.innerHTML = `Good Night,
          <span id="Name" contenteditable="true" class="outline-none text-center"></span>
              `;
  GreetingParent.style = `margin-left:2rem;`;
  BG(6, 7);
}


//Storing Name and Main Focus in Localstorage
let Name = document.getElementById("Name");
let MainFocus = document.getElementById("MainFocus");


const getName = () => {
  if (localStorage.getItem('Name') === null) {
    Name.textContent = 'Name';
  }
  else {
    Name.textContent = localStorage.getItem('Name');
  }
}
const getFocus = () => {
  if (localStorage.getItem('MainFocus') === null) {
    MainFocus.textContent = '_________________________________';
  }
  else {
    MainFocus.textContent = localStorage.getItem('MainFocus');
  }
}

Name.addEventListener('keypress', (e) => {
  if (e.type === 'keypress') {
    //Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('Name', e.target.innerText);
      Name.blur();
    }
  }
  else {
    localStorage.setItem('Name', e.target.innerText);
  }
})
Name.addEventListener('blur', (e) => {
  if (e.type === 'keypress') {
    //Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('Name', e.target.innerText);
      Name.blur();
    }
  }
  else {
    localStorage.setItem('Name', e.target.innerText);
  }
})


MainFocus.addEventListener('keypress', (e) => {
  if (e.type === 'keypress') {
    //Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('MainFocus', e.target.innerText);
      MainFocus.blur();
    }
  }
  else {
    localStorage.setItem('MainFocus', e.target.innerText);
  }
})
MainFocus.addEventListener('blur', (e) => {
  if (e.type === 'keypress') {
    //Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('MainFocus', e.target.innerText);
      MainFocus.blur();
    }
  }
  else {
    localStorage.setItem('MainFocus', e.target.innerText);
  }
})


//Weather
let City = document.getElementById("city");
let IconNNN = document.getElementById("icon");
let temp = document.getElementById("Second-Temperature");

window.addEventListener('load', () => {
  let longitutde;
  let latitutde;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      // console.log(position);
      longitutde = position.coords.longitude;
      latitutde = position.coords.latitude;



      // const url = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${latitutde}&lon=${longitutde}`; Love Day ka API :)
      const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitutde},${longitutde}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '2dd8ed5016msh79fe8940bcd652dp1a3edbjsnb5d3871ef5c6',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      fetch(url, options).then((response) => {
        return response.json();
      }).then((data) => {
        // console.log(data);

        // City
        let cityy = `<h1>${data.location.name}</h1>`;
        City.innerHTML = cityy;



        // Icon

        let condition = `${data.current.condition.text}`;
        if (`${data.current.condition.text}` == "Sunny") {
          condition = "Clear";
          icon = `${condition}`;
          // console.log(icon);

          let DayNight;
          if (`${data.current.is_day}` == 1) {
            DayNight = " Day";
            icon = `${condition}${DayNight}`;
            // console.log(icon);
          }
          else {
            DayNight = " Night";
            icon = `${condition}${DayNight}`;
            // console.log(icon);
          }


        }
        else if (`${data.current.condition.text}` == "Partly cloudy") {
          icon = `${condition}`;
          // console.log(icon);

          let DayNight;
          if (`${data.current.is_day}` == 1) {
            DayNight = " Day";
            icon = `${condition}${DayNight}`;
            // console.log(icon);
          }
          else {
            DayNight = " Night";
            icon = `${condition}${DayNight}`;
            // console.log(icon);
          }


        }
        else if (`${data.current.condition.text}` == "Clear") {
          icon = `${condition}`;
          // console.log(icon);

          let DayNight;
          if (`${data.current.is_day}` == 1) {
            DayNight = " Day";
            icon = `${condition}${DayNight}`;
            // console.log(icon);
          }
          else {
            DayNight = " Night";
            icon = `${condition}${DayNight}`;
            // console.log(icon);
          }


        }
        else if (`${data.current.condition.text}` == "Overcast") {
          condition = "Cloudy"
          icon = `${condition}`;
          // console.log(icon);
        }
        else if (`${data.current.condition.text}` == "Blizzard") {
          condition = "Wind"
          icon = `${condition}`;
          // console.log(icon);
        }
        else if (`${data.current.condition.text}` == "Light rain" || `${data.current.condition.text}` == "Heavy rain" || `${data.current.condition.text}` == "Moderate rain" || `${data.current.condition.text}` == "Patchy rain possible" || `${data.current.condition.text}` == "Torrential rain shower" || `${data.current.condition.text}` == "Light rain shower" || `${data.current.condition.text}` == "Patchy light rain") {
          condition = "Rain"
          icon = `${condition}`;
          // console.log(icon);
        }
        else if (`${data.current.condition.text}` == "Fog" || `${data.current.condition.text}` == "Mist") {
          condition = "Fog"
          icon = `${condition}`;
          // console.log(icon);
        }
        else {
          icon = `${condition}`;
          // console.log(icon);
        }

        setIcons(icon, IconNNN);
        let Temp = `${data.current.temp_c}°C`;
        temp.innerHTML = Temp;



        temp.addEventListener('click', () => {
          if (Temp == `${data.current.temp_c}°C`) {
            Temp = `${data.current.temp_f} F`;
          }
          else {
            Temp = `${data.current.temp_c}°C`;
          }
          temp.innerHTML = Temp;
        })


        let text = `${data.current.condition.text} `;
        Text.innerHTML = text;





      });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/ /g, "_").toUpperCase();
    skycons.add("icon1", currentIcon);
    // console.log(currentIcon);
    skycons.play();
    return skycons.set("icon1", Skycons[currentIcon]);
  }



});

// Quote

let quote = document.getElementById("quote");
let quotes = ["The purpose of our lives is to be happy.", "Life is what happens when you're busy making other plans.", "Get busy living or get busy dying.", "You only live once, but if you do it right, once is enough.", "If you want to live a happy life, tie it to a goal, not to people or things.", "Never let the fear of striking out keep you from playing the game.", "In order to write about life first you must live it.", "The big lesson in life, baby, is never be scared of anyone or anything.", "The unexamined life is not worth living.", "Turn your wounds into wisdom."]


let index = Math.floor(Math.random() * quotes.length - 1);

quote.innerHTML = quotes[index];


getName();
getFocus();