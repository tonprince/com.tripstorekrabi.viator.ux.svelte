'use strict';

class GeoControl {
  constructor(parent) {
    this.controlUI = document.createElement("div");
    this.controlUI.style.backgroundColor = "#fff";
    this.controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    this.controlUI.style.cursor = "pointer";
    this.controlUI.style.margin = "10px";
    this.controlUI.style.padding = "0px";
    this.controlUI.style.textAlign = "center";
    this.controlUI.title = "Use your location";
    parent.appendChild(this.controlUI);

    this.controlText = document.createElement("div");
    this.controlText.style.color = "rgb(25,25,25)";
    this.controlText.style.fontSize = "26px";
    this.controlText.style.width = "40px";
    this.controlText.style.height = "40px";
    this.controlText.style.lineHeight = "35px";
    this.controlText.innerHTML = "<i class='icon icon-myLocation'></i>";
    this.controlUI.appendChild(this.controlText);
  }

  addClickListener(callback) {
    this.controlUI.addEventListener("click", () => {
      this.findYourLocation(callback);
    });
  }

  findYourLocation(callback) {
    if (navigator.geolocation) {
      this.controlText.style.color == "rgb(25,25,25)";
      this.controlText.className = "blinking";

      navigator.geolocation.getCurrentPosition((position) => {
        this.controlText.className = "";
        this.controlText.style.color = "#4285F4";
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        if (callback) {
          callback(pos);
        }
      }, (error) => {
        console.log(error);
        this.controlText.className = "";
        this.controlUI.title = "Cannot access your location";
        this.controlText.style.color = "gray";
        if (callback) {
          callback(null);
        }
      });
    } else {
      this.controlUI.title = "Cannot access your location";
      this.controlText.style.color = "gray";
      if (callback) {
        callback(null);
      }
    }
  }
}

export default GeoControl;