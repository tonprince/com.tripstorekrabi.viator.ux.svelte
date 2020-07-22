<script>
  import { onMount } from "svelte";
  import { f7 } from "framework7-svelte";
  import { map } from "./stores.js";
  import { initMapService } from "./MapService.js";
  import GeoControl from "./GeoControl.js";

  let container;
  let zoom = 16;
  let myLocationMarker;
  let mapUnsubscribe;

  onMount(async () => {
    initMapService(() => showMap());
  });

  function showMap() {
    map.set(
      new google.maps.Map(container, {
        zoom,
        gestureHandling: "cooperative"
      })
    );

    var icon = {
      url: "/myLocation.png",
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(25, 25)
    };

    myLocationMarker = new google.maps.Marker({
      map: $map,
      draggable: false,
      icon: icon,
      zIndex: 0
    });

    let geoControlDiv = document.createElement("div");
    geoControlDiv.index = 1;

    let findYourLocationCallback = function(pos) {
      if (pos) {
        let latLng = new google.maps.LatLng({
          lat: pos.lat,
          lng: pos.lng
        });
        myLocationMarker.setPosition(latLng);
        $map.panTo({
          lat: pos.lat,
          lng: pos.lng
        });
        markerMoved(latLng);
      }
    };

    var geoControl = new GeoControl(geoControlDiv, $map);
    geoControl.addClickListener(findYourLocationCallback);
    $map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(geoControlDiv);
  }
</script>

<style>
  .full-screen {
    width: 100%;
    height: 100%;
  }
</style>

<div class="full-screen" bind:this={container} />
