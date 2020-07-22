'use strict';
import {
  f7
} from "framework7-svelte";
import {
  getJSONWithExpiry,
  setJSONWithExpiry,
  MONTH_IN_MILLIS
} from "./ExpiryStorage.js";


export async function suggestAttractions(query) {
  let result = getJSONWithExpiry(query);
  if (result) {
    return result;
  } else {
    let data = {
      searchString: query,
      countryCode: null,
      language: "en",
      categories: ["point_of_interest", "neighborhood", "city"],
      serviceProviders: ["TRIPADVISOR", "GOOGLE"],
      filterBlacklistedLocations: false,
      useStrictCategorySearch: false,
      nearLocation: null
    };

    return fetch(
      "https://server-dot-viator-done-right.et.r.appspot.com/viator/suggest",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        let result = data.suggestions;
        setJSONWithExpiry(query, result, MONTH_IN_MILLIS);
        return result;
      })
      .catch(error => {
        console.log(error);
        f7.dialog.alert(
          "An error occurred while loading attractions!",
          "Loading Attractions"
        );
        return [];
      });
  }
}

export async function getAttractionDetails(providerReference) {
  let result = getJSONWithExpiry(providerReference);

  if (result) {
    return result;
  }
  else {
    var dialog = f7.dialog.preloader('Loading...');
    let data = { providerReference: providerReference };
    return fetch(
      'https://server-dot-viator-done-right.et.r.appspot.com/viator/details',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        setJSONWithExpiry(providerReference, data, MONTH_IN_MILLIS);
        dialog.close();
        return data;
      })
      .catch(error => {
        console.log(error);
        dialog.close();
        f7.dialog.alert(
          "An error occurred while loading attracion details!",
          "Loading Attraction Details"
        );
      });
  }
}