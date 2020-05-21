const apiKey = `pk.eyJ1Ijoic3VwZXJ4aW4iLCJhIjoiY2thNWlqZHd4MDBpODNnb3owMDA2Y3dnYiJ9.-zciQf0emsOdjhIjB2uoNA`;
const originForm = document.querySelector(`.origin-form`);
const destinationForm = document.querySelector(`.destination-form`);
const originResultsList = document.querySelector(`.origins`);
const destinationResultsList = document.querySelector(`.destinations`);
const btn = document.querySelector(`.plan-trip`);

originForm.addEventListener(`submit`, event => {
  const originInput = originForm.querySelector(`input`);

  if (originInput.value.trim() !== ``) {
    searchLocations(originInput.value, originResultsList);
  }

  originInput.value = ``;
  event.preventDefault();
})

destinationForm.addEventListener(`submit`, event => {
  const destinationInput = destinationForm.querySelector(`input`);

  if (destinationInput.value.trim() !== ``) {
    searchLocations(destinationInput.value, destinationResultsList);
  }

  destinationInput.value = ``;
  event.preventDefault();
})

originResultsList.addEventListener(`click`, event => {
  clickResult(event);
})

destinationResultsList.addEventListener(`click`, event => {
  clickResult(event);
})

btn.addEventListener(`click`, () => {

})

function searchLocations(keyword, listEle) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${keyword}.json?access_token=${apiKey}&limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Fail to get data from API.`);
      }
    })
    .then(data => updateResults(data.features, listEle));
}

function updateResults(locationsList, listEle) {
  let html = ``;

  locationsList.forEach(location => {
    if (location.properties.address === undefined) {
      location.properties.address = ``;
    }

    html += `   
      <li data-long="${location.center[0]}" data-lat="${location.center[1]}" class="">
        <div class="name">${location.text}</div>
        <div>${location.properties.address}</div>
      </li> 
    `;
  })

  listEle.innerHTML = html;
}

function clickResult(event) {
  if (event.target.closest(`li`) !== null) {
    const results = document.querySelectorAll(`${event.target.closest(`ul`)} > li`);

    results.forEach(result => result.classList.remove(`selected`));
    event.target.closest(`li`).classList.add(`selected`);
  }
}