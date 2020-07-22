'use strict';
export const HOUR_IN_MILLIS = 3600000;
export const DAY_IN_MILLIS = 86400000;
export const MONTH_IN_MILLIS = 30 * DAY_IN_MILLIS;

export function getJSONWithExpiry(key) {
  if (typeof (Storage) !== "undefined") {
    let item = localStorage.getItem(key);
    if (!item) {
      return null;
    } else {
      let jsonItem = JSON.parse(item);
      let now = new Date();

      if (now.getTime() > jsonItem.expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return jsonItem.value;
    }
  } else {
    return null;
  }
}

export function setJSONWithExpiry(key, value, ttl) {
  if (typeof (Storage) !== "undefined") {
    let now = new Date();

    let item = {
      value: value,
      expiry: now.getTime() + ttl
    }
    localStorage.setItem(key, JSON.stringify(item));
  }
}