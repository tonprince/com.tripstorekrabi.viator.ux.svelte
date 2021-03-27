'use strict';
import { mapsLoaded, mapsLoading } from "./stores.js";

const URL =
  "https://maps.googleapis.com/maps/api/js?key=" +
  process.env.GOOGLE_API_KEY +
  "&libraries=places,geometry&callback=initMap";

let mapsLoadedValue;
let mapsLoadingValue;

mapsLoaded.subscribe(value => {
  mapsLoadedValue = value;
});

mapsLoading.subscribe(value => {
  mapsLoadingValue = value;
});

export function initMapService(callback) {
  if (mapsLoadedValue) {
    callback();
  } else if (!mapsLoadingValue) {
    window.initMap = () => {
      mapsLoaded.set(true);
      delete window.initMap;
      callback();
    };

    mapsLoading.set(true);
    const script = document.createElement("script");
    script.src = URL;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
}