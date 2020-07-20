<script>
  import { onMount } from "svelte";
  import {
    f7,
    Page,
    Link,
    List,
    ListItem,
    Button,
    Toolbar,
    Sheet,
    PageContent,
    Searchbar
  } from "framework7-svelte";
  import { default as NavToolbar } from "./Toolbar.svelte";
  import { createTour } from "./stores.js";
  let tour = createTour();
  let itineraries = $tour.itineraries;

  f7.on("sortableSort", function(item, data) {
    itineraries = arrayMove(itineraries, data.from, data.to);
    $tour.itineraries = itineraries;
    tour.set($tour);
  });

  function arrayMove(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  onMount(async () => {
    var searchbar = f7.searchbar.create({
      el: "#searchbar-autocomplete",
      customSearch: true,
      disableButton: false
    });

    searchbar.on("search", function() {
      let data = {
        searchString: searchbar.query.trim(),
        countryCode: null,
        language: "en",
        categories: ["point_of_interest", "neighborhood", "city"],
        serviceProviders: ["TRIPADVISOR", "GOOGLE"],
        filterBlacklistedLocations: false,
        useStrictCategorySearch: false,
        nearLocation: null
      };

      const request = new Request(
        "https://server-dot-viator-done-right.et.r.appspot.com/",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(data)
        }
      );

      fetch(request)
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
        })
        .catch(error => {
          console.error("Error:", error);
        });

      attractions = [];
    });
  });

  let attractions = null;
</script>

<Page>
  <div class="page-content">
    <div style="margin: auto; height: 100%; max-width: 1000px; padding: 20px">
      <h1>Itinerary Editor</h1>

      <List
        sortable={true}
        class="sortable-enabled"
        data-sortable-move-elements="false">
        {#each itineraries as itinerary}
          <ListItem title={itinerary.schedule + ': ' + itinerary.title}>
            <div slot="after">
              <Button sheetOpen=".attractionSheet">Link Attraction</Button>
            </div>
            <i class="icon icon-circle" slot="media" />
          </ListItem>
        {/each}
      </List>
    </div>
  </div>

  <Sheet class="attractionSheet" style="height: 100%" push>
    <Toolbar>
      <Searchbar
        placeholder="Search for attraction and places in Tripadvisor"
        id="searchbar-autocomplete"
        searchContainer=".search-list"
        disableButton={false} />
      <div class="right">
        <Link sheetClose>Close</Link>
      </div>
    </Toolbar>
    <List class="searchbar-not-found">
      <ListItem title="Nothing found" />
    </List>
    <List class="search-list searchbar-found">
      {#if attractions}
        {#if attractions.length == 0}
          <ListItem title="No attraction found" />
        {:else}
          {#each attractions as attraction}
            <ListItem title={attraction.name} />
          {/each}
        {/if}
      {/if}

    </List>
  </Sheet>

  <NavToolbar active="/Editor" />
  <Toolbar style="font-size: 0.7rem" tabbar labels position="bottom">
    <Link
      text="Show UI"
      style="color: red"
      icon="icon icon-lightbulb"
      href="/New-UI" />
  </Toolbar>
</Page>
