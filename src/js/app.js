const apiKey = `pk.eyJ1Ijoic3VwZXJ4aW4iLCJhIjoiY2thNWlqZHd4MDBpODNnb3owMDA2Y3dnYiJ9.-zciQf0emsOdjhIjB2uoNA`;
const originForm = document.querySelector(`.origin-form`);

originForm.addEventListener(`submit`, event => {
  const originInput = originForm.querySelector(`input`);
  
  if (originInput.value.trim() !== ``) {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${originInput.value}.json?access_token=${apiKey}&limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Fail to get data from API.`);
        }
      })
      .then(data => {
        console.log(data);
      })
  }

  originInput.value = ``;
  event.preventDefault();
})