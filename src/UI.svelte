<script>
  import { onMount, onDestroy } from "svelte";
  import { Page, Link, Toolbar, Button, Preloader } from "framework7-svelte";
  import introJs from "intro.js";
  import { createTour, map } from "./stores.js";
  import { default as NavToolbar } from "./Toolbar.svelte";
  import Map from "./Map.svelte";

  export let f7route;
  let scrollTo = f7route.params.scrollTo;
  let tour = createTour();
  let heroImage;

  let attractions = [
    ...$tour.itineraries
      .filter(function(itinerary) {
        return itinerary.attraction;
      })
      .map(function(itinerary) {
        return itinerary.attraction;
      }),
    ...$tour.attractions
  ];
  let center = attractions[0].location;
  let smartLinkIntroAdded = false;
  let mapUnsubscribe;

  onMount(async () => {
    heroImage.onload = () => {
      if (scrollTo) {
        let node = document.getElementById(scrollTo);
        if (node) {
          node.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    };

    mapUnsubscribe = map.subscribe(function(map) {
      if (map) {
        let bounds = new google.maps.LatLngBounds();
        let infoWindow = new google.maps.InfoWindow();
        attractions.forEach(function(attraction) {
          if (attraction.location) {
            bounds.extend(
              new google.maps.LatLng({
                lat: attraction.location.lat,
                lng: attraction.location.lng
              })
            );
            let marker = new google.maps.Marker({
              position: attraction.location,
              map: map,
              title: attraction.title
            });

            marker.addListener("click", function(event) {
              infoWindow.setContent(
                "<a target='_new' class='external' href='" +
                  attraction.url +
                  "'>" +
                  attraction.title +
                  "</a>"
              );
              infoWindow.open(map, marker);
            });
          }
        });

        map.fitBounds(bounds);
      }
    });
  });

  onDestroy(async () => {
    mapUnsubscribe();
  });

  function injectSmartLinks(text, attractions) {
    attractions.forEach(function(attraction) {
      let regexp = new RegExp(
        "(w*" + attraction.title + "w*)(?=S*['’])?([a-zA-Z'’]+)?",
        "gmi"
      );
      function replacer(match, p1, p2, p3, offset, string) {
        let dataIntro = !smartLinkIntroAdded
          ? "data-intro='Insert smart links for occurrences of Tripadvisor attractions & places into the tour summary and description.'"
          : "";
        smartLinkIntroAdded = true;
        return (
          "<a class='external' " +
          dataIntro +
          " href='" +
          attraction.url +
          "' target='_blank'>" +
          match +
          "</a>"
        );
      }
      text = text.replace(regexp, replacer);
    });

    return text;
  }
</script>

<style>
  .hero {
    margin-top: 20px;
    margin-bottom: 10px;
    max-width: 100%;
  }

  ul {
    padding-left: 15px;
    list-style: none;
  }

  ul li {
    color: #606060;
  }

  ul.highlights li {
    font-weight: 600;
    color: #606060;
    line-height: 1.8em;
  }

  .timeline {
    position: relative;
    width: 100%;
    padding-right: 0px;
  }

  .timeline::before {
    content: "";
    position: absolute;
    height: 100%;
    left: 150px;
    border-left: 2px dotted hsl(181, 64%, 26%);
  }

  .timeline ul {
    padding: 0px;
  }

  .timeline ul li {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .timeline ul li:first-child .point,
  .timeline ul li:last-child .point {
    border: 4px solid hsl(181, 64%, 26%);
    background-color: white;
  }

  .point {
    border: 4px solid transparent;
    min-width: 16px;
    height: 16px;
    margin-left: 123px;
    background-color: hsl(181, 64%, 26%);
    border-radius: 100%;
    z-index: 2;
    position: relative;
  }

  .timeline ul li .content {
    width: 100%;
    padding: 0px 20px 20px 20px;
    padding-right: 0px;
  }

  .timeline ul li .date {
    font-weight: normal;
    position: absolute;
  }

  .timeline ul li .date span {
    background-color: hsla(181, 64%, 26%, 0.103);
    width: 100px;
    padding: 5px 10px;
    margin-right: 20px;
    border-radius: 10px;
    font-weight: bold;
  }

  .timeline ul li .content .title {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
    color: white;
    background-color: hsla(181.4, 63.9%, 26.1%, 0.86);
    margin-bottom: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .timeline ul li .content h3.noAttraction {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .timeline ul li .content div.attraction {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
    background-color: hsla(181, 64%, 26%, 0.103);
    margin-top: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .description {
    text-align: justify;
  }
</style>

<Page>
  <div class="page-content">
    <div style="margin: auto; height: 100%; max-width: 1000px; padding: 20px">
      <h1>{$tour.title}</h1>
      <h2
        data-intro="Allow to define a subtitle which reflects a creative name of
        the product in contrast to the technical name in the title.">
        {$tour.subtitle}
      </h2>
      <section>
        {@html injectSmartLinks($tour.summary, attractions)}
      </section>

      <img
        class="hero"
        alt={tour.title}
        src="https://lh3.googleusercontent.com/f7yM63HIwTGLHBtYOMiNyw_moiRbKnzBC7GtL8O5V1BZUCy4RH54tfiwt8tEP145jxHjuyP5JpKIYNa9NpLBfZBXs1RxWFJVD6kDcNE1h8YeRm9Yz5Qybhel0zbjNwF_Pi-oFNt6xCTumeRTq__NbNSvLGjKqlK354UsOjBPWuD60N656JRqeQUsiZP_CKUdTp5aMjDKUpYIisJAm8a6XraKeH7EdawsGfdciW58u9-DM5ENTBfm2kIqGB3vkOUetwbu1I7YF6bUnoMgnX9r2rC0qZOdhGSIyPCdOKayh725Z1vkyz2CvM6I_IOG1bBWaPZjbITlsdIMCAF8xZu2soVX_s7biu9tAWJPIeMB8EzW0U_DHOH_VbLz2NRV0yYToc9ViFWA3oZXAsVBjboWXumqMXPW9rOoDo25fwGNBNxQFUbHoothk1xnbpij9OiWDN5pM4NYK4POfeaPNc0nwmzd8vAo_fl3lsootLeVILj2XAjGQxgj_njXhOmQMTtchtLUvxvnRwMT0Q8Y4r5eSsOcIfYeMwklDfzTmQv3YOC_EQK1kRIlsJHv79uLzifwJS3zJqO_3og6PTto-G4HeHgyoN8u16vugoEruVEqIUFwnx-dF56gg0y7U7YeLl47Ajb3AUzLKcKdyj60mWHn5lkOA7ZLa1-9P6x64JwcFkJpqGG_1oGnwBv9Fnub1eAUl-tJbU-SKELloTNlv2NZIfmlYU5_fGWV72nOyVN8Uo05sYq7XQ=s1600"
        bind:this={heroImage} />

      <section>
        <h2
          data-intro="Allow a maximum of 5 highlights to be added by the
          supplier himself because she/he knows best which product features
          should stand out.">
          Highlights
        </h2>
        <ul class="highlights">
          {#each $tour.highlights as highlight}
            <li>
              <span style="margin-right: 5px" class="icon icon-checkmark" />
              {@html injectSmartLinks(highlight, attractions)}
            </li>
          {/each}
        </ul>
      </section>

      <section>
        <div
          style="margin-top: 40px; display: flex; align-items: center;
          justify-content: space-between;">
          <h2
            id="itinerary"
            style="margin-top: 0px; margin-bottom: 0px"
            data-intro="Allow to define a scheduled itinerary with starting &
            end times, or an itinerary with durations.">
            Scheduled Itinerary
          </h2>
          <Button
            fill
            round
            href="/Editor"
            style="background-color: rgb(24, 107, 109); font-weight: bold">
            Change Itinerary
            <span
              style="font-weight: bold; margin-left: 2px"
              class="icon icon-change" />
          </Button>
        </div>

        <div
          class="timeline"
          data-intro="Display itinerary items with schedule/duration,
          description and an optional link to the related attraction on
          Tripadvisor.">
          <ul>
            {#each $tour.itineraries as itinerary, i}
              <li>
                <div class="date">
                  <span>{itinerary.schedule}</span>
                </div>
                <div class="point">
                  <span
                    style="position: absolute;top: 50%;left: 50%;transform:
                    translate(-50%, -50%); color: {i == $tour.itineraries.length - 1 ? 'hsl(181, 64%, 26%)' : 'white'}"
                    class="icon icon-circle" />
                </div>

                <div class="content">
                  <h3
                    class="title {itinerary.attraction ? '' : 'noAttraction'}">
                    {itinerary.title}
                  </h3>
                  {#if itinerary.attraction}
                    <div class="attraction">
                      <div>
                        {i == 0 ? 'Start at:' : i == $tour.itineraries.length - 1 ? 'End at:' : 'Stopover at:'}
                        <a
                          class="underline external"
                          href={itinerary.attraction.url}
                          target="_blank">
                          {itinerary.attraction.title}
                        </a>
                      </div>
                      <a
                        title="Show in Tripadvisor"
                        class="external"
                        href={itinerary.attraction.url}
                        target="_blank">
                        <div
                          style="font-size: 1.2em"
                          class="icon icon-location" />
                      </a>
                    </div>
                  {/if}
                </div>
              </li>
            {/each}
          </ul>
        </div>
      </section>

      <section>
        <h2>Attractions Map</h2>
        <div style="width: 100%; height: 600px">
          <Map />
        </div>
      </section>

      <section>
        <h2>What's Included</h2>
        <ul class="inclusions">
          {#each $tour.includes as include}
            <li style="padding: 3px; font-weight: bold">
              <span style="margin-right: 5px" class="icon icon-plus" />
              {@html injectSmartLinks(include, attractions)}
            </li>
          {/each}
        </ul>
      </section>

      <section>
        <h2
          data-intro="Allow to add a long product description of up to 2000
          characters independent of the chosen product type (tour, activity,
          etc.).">
          What To Expect
        </h2>
        <div class="description">
          {@html injectSmartLinks($tour.description, attractions)}
        </div>
      </section>

      <section>
        <h2>Additional Info</h2>
        <ul class="important">
          {#each $tour.important as important}
            <li>
              <span style="margin-right: 5px" class="icon icon-circle" />
              {@html injectSmartLinks(important, attractions)}
            </li>
          {/each}
        </ul>
      </section>

      <div
        style="color: hsl(181, 64%, 26%); text-align: center; margin-top: 80px;
        margin-bottom: 80px">
        <div class="">
          © Trip Store Krabi Co., Ltd. 2020. All Rights Reserved.
          <br />
          <a
            class="link underline external"
            href="mailto:info@tripstorekrabi.com">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  </div>

  <NavToolbar active="/New-UI" />

  <Toolbar style="font-size: 0.7rem" tabbar labels position="bottom">
    <Link
      text="Show Hints"
      style="color: red;"
      icon="icon icon-lightbulb"
      on:click={function() {
        introJs().start();
      }} />
  </Toolbar>
</Page>
