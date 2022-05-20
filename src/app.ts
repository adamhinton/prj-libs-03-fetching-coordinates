import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;

const GOOGLE_API_KEY = "AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs";

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const enteredAddress = addressInput.value;

  // this is a very popular third party library: axios for sending http reqs
  // has built in TS support, like in index.d.ts which explains to ts what is going on here, basically.
  // If you get good support and no errors then you probably don't need to install types. But if you get errors n' stuff, you probably need to install extra types.
  axios
    .get<{ results: { geometry: { location: { lat: number; lng: number } } } }>(
      // we use template literal to import API key,
      // and to use the address the user entered.
      // encodeURI() is very helpful for these purposes
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${GOOGLE_API_KEY}`
    )
    .then((response) => {
      const coordinates = response.data.results[0].geometry.location;
      if (response.data.status !== "OK") {
        throw new Error("Could not fetch location!");
      }
    })
    .catch((err) => {
      alert(err.message);
      console.log(err);
    });
}

form.addEventListener("submit", searchAddressHandler);
