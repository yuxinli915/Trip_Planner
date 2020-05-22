"use strict";var mapBoxApiKey="pk.eyJ1Ijoic3VwZXJ4aW4iLCJhIjoiY2thNWlqZHd4MDBpODNnb3owMDA2Y3dnYiJ9.-zciQf0emsOdjhIjB2uoNA",wpgTransitApiKey="G0ZNynR9C1I5fFkrMET",originForm=document.querySelector(".origin-form"),destinationForm=document.querySelector(".destination-form"),originResultsList=document.querySelector(".origins"),destinationResultsList=document.querySelector(".destinations"),btn=document.querySelector(".plan-trip");function searchLocations(t,e){fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(t,".json?access_token=").concat(mapBoxApiKey,"&limit=10&bbox=-97.325875,49.766204,-96.953987,49.99275")).then(function(t){if(t.ok)return t.json();throw new Error("Fail to get data from API.")}).then(function(t){return updateResults(t.features,e)})}function updateResults(t,e){var n="";t.forEach(function(t){void 0!==t.properties.address&&""!==t.properties.address||(t.properties.address="Winnipeg"),n+='   \n      <li data-long="'.concat(t.center[0],'" data-lat="').concat(t.center[1],'" class="">\n        <div class="name">').concat(t.text,"</div>\n        <div>").concat(t.properties.address,"</div>\n      </li> \n    ")}),e.innerHTML=n}function clickResult(t){null!==t.target.closest("li")&&(document.querySelectorAll(".".concat(t.target.closest("ul").className," > li")).forEach(function(t){return t.classList.remove("selected")}),t.target.closest("li").classList.add("selected"))}function updateTripPlan(n){var t=document.querySelector(".my-trip"),i="";n.forEach(function(t,e){switch(t.type){case"walk":switch(i+='\n        <li>\n          <i class="fas fa-walking" aria-hidden="true"></i>Walk for '.concat(t.times.durations.total," minutes to\n      "),e){case 0:i+="\n               stop #".concat(t.to.stop.key," - ").concat(t.to.stop.name,"\n              </li>\n            ");break;case n.length-1:i+="\n              your destination.\n              </li>\n            "}break;case"ride":i+='\n          <li>\n            <i class="fas fa-bus" aria-hidden="true"></i>Ride the '.concat(void 0===t.route.name?t.route.key:t.route.name," for ").concat(t.times.durations.total," minutes.\n          </li>\n        ");break;case"transfer":i+='\n          <li>\n            <i class="fas fa-ticket-alt" aria-hidden="true"></i>Transfer from stop #'.concat(t.from.stop.key," - ").concat(t.from.stop.name," to stop #").concat(t.to.stop.key," - ").concat(t.to.stop.name,"\n          </li>\n        ")}}),t.innerHTML=i}originForm.addEventListener("submit",function(t){var e=originForm.querySelector("input");""!==e.value.trim()&&searchLocations(e.value,originResultsList),e.value="",t.preventDefault()}),destinationForm.addEventListener("submit",function(t){var e=destinationForm.querySelector("input");""!==e.value.trim()&&searchLocations(e.value,destinationResultsList),e.value="",t.preventDefault()}),originResultsList.addEventListener("click",function(t){return clickResult(t)}),destinationResultsList.addEventListener("click",function(t){return clickResult(t)}),btn.addEventListener("click",function(){var t=document.getElementsByClassName("selected");if(2===t.length){var e=[t[0].dataset.lat,t[0].dataset.long],n=[t[1].dataset.lat,t[1].dataset.long];fetch("https://api.winnipegtransit.com/v3/trip-planner.json?origin=geo/".concat(e[0],",").concat(e[1],"&destination=geo/").concat(n[0],",").concat(n[1],"&api-key=").concat(wpgTransitApiKey)).then(function(t){if(t.ok)return t.json();throw new Error("Fail to get data from API.")}).then(function(t){return updateTripPlan(t.plans[0].segments)})}});