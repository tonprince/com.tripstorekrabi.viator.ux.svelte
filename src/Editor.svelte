<script>
  import { onMount, onDestroy } from "svelte";
  import {
    f7,
    Page,
    Link,
    List,
    ListInput,
    ListItem,
    Block,
    Button,
    Toolbar,
    Sheet,
    Searchbar,
    Preloader
  } from "framework7-svelte";
  import { default as NavToolbar } from "./Toolbar.svelte";
  import { createTour, STANDARD_TOUR } from "./stores.js";
  import {
    getJSONWithExpiry,
    setJSONWithExpiry,
    MONTH_IN_MILLIS
  } from "./ExpiryStorage.js";
  import {
    suggestAttractions,
    getAttractionDetails
  } from "./AttractionService.js";

  let tour = createTour();
  $: itineraries = $tour.itineraries;
  let loading = false;
  let attractions = null;
  let searchbarHint = null;
  let selectedItinerary = null;
  let searchbarComponent;
  let showSorter = false;

  f7.on("sortableSort", function(item, data) {
    let newItineraries = arrayMove(itineraries, data.from, data.to);
    $tour.itineraries = newItineraries;
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
    let timeout;
    searchbarComponent.instance().on("search", function(searchbar) {
      let query = searchbar.query.trim();
      if (query.length < 3) {
        searchbarHint = "Search string must contain at least three characters.";
        attractions = [];
        return;
      }
      searchbarHint = null;

      if (timeout) {
        clearInterval(timeout);
      }
      loading = true;

      timeout = setTimeout(function() {
        suggestAttractions(query.trim()).then(function(result) {
          loading = false;
          attractions = result;
        });
      }, 400);
    });
  });

  let itinerarySheet;
  function openItinerarySheet() {
    if (!itinerarySheet) {
      itinerarySheet = f7.sheet.create({ el: ".itinerarySheet" });
    }
    itinerarySheet.open();
  }

  let attractionSheet;
  function openAttractionSheet() {
    if (!attractionSheet) {
      attractionSheet = f7.sheet.create({ el: ".attractionSheet" });
    }
    attractionSheet.open();
  }

  function onPageBeforeOut() {
    if (itinerarySheet) {
      itinerarySheet.close();
    }
    if (attractionSheet) {
      attractionSheet.close();
    }
  }

  function onPageBeforeRemove() {
    if (itinerarySheet) {
      itinerarySheet.destroy();
    }
    if (attractionSheet) {
      attractionSheet.destroy();
    }
  }

  function saveItinerary(itinerary) {
    if (itineraries.indexOf(itinerary) === -1) {
      itineraries.push(itinerary);
      $tour.itineraries = itineraries;
    }
    tour.set($tour);
  }
</script>

<style>
  :global(.md .item-input .item-media) {
    align-self: center;
  }
</style>

<Page {onPageBeforeOut} {onPageBeforeRemove}>
  <div class="page-content">
    <div style="margin: auto; height: 100%; max-width: 1000px; padding: 20px">
      <div
        style="margin-top: 40px; display: flex; align-items: center;
        justify-content: space-between;">
        <h1>Itinerary Editor</h1>
        <Button
          on:click={function() {
            showSorter = !showSorter;
          }}
          fill
          round
          href="/Editor"
          data-sortable=".sortable"
          class="sortable-toggle"
          style="font-weight: bold; margin-right: 10px; background-color:
          rgb(24, 107, 109)">
          {showSorter ? 'Disable Sorting' : 'Enable Sorting'}
          <span
            style="font-weight: bold; margin-left: 2px"
            class="icon icon-change" />
        </Button>
      </div>

      {#if itineraries.length == 0}
        <div>No itinerary items added yet.</div>
      {:else}
        <List
          sortable={true}
          class="sortable"
          data-sortable-move-elements="false">
          {#each itineraries as itinerary}
            <ListItem>
              <span
                class="icon icon-circle"
                slot="media"
                style="color: rgb(24, 107, 109);" />
              <div
                style="max-height: inherit; display: flex; justify-content:
                space-between; width: 100%; align-items: center; flex-wrap:
                wrap;"
                class="item-text">
                <Link
                  style="font-weight: bold; margin-top: 5px; margin-right: 5px"
                  on:click={function() {
                    selectedItinerary = itinerary;
                    openItinerarySheet();
                  }}>
                  {itinerary.schedule + ': ' + itinerary.title}
                </Link>

                <div style="display: flex; margin-top: 5px;">
                  {#if itinerary.attraction}
                    <Button
                      round
                      fill
                      outline
                      small
                      dotted
                      style="border-color: rgb(24, 107, 109); background-color:
                      rgb(24, 107, 109); color: white; font-weight: bold;
                      margin-right: 10px"
                      on:click={function() {
                        selectedItinerary = itinerary;
                        openAttractionSheet();
                        searchbarComponent
                          .instance()
                          .search(selectedItinerary.attraction.title);
                      }}>
                      {itinerary.attraction.title}
                    </Button>
                  {:else}
                    <Button
                      round
                      outline
                      small
                      style="color: rgb(24, 107, 109); border-color: rgb(24,
                      107, 109); font-weight: bold; margin-right: 10px"
                      on:click={function() {
                        selectedItinerary = itinerary;
                        openAttractionSheet();
                      }}>
                      Link Attraction
                    </Button>
                  {/if}

                  <div style="display: flex">
                    <Button
                      fill
                      small
                      style="background-color: rgb(24, 107, 109);"
                      on:click={function() {
                        selectedItinerary = itinerary;
                        openItinerarySheet();
                      }}>
                      <span
                        title="Change attraction"
                        class="icon icon-pencil" />
                    </Button>

                    <Button
                      style="margin-left: 8px"
                      fill
                      small
                      color="red"
                      on:click={function() {
                        f7.dialog.confirm(
                          'Are you sure you want to remove this item?',
                          'Remove Itinerary Item',
                          () => {
                            let newItineraries = itineraries.filter(
                              item => item !== itinerary
                            );
                            $tour.itineraries = newItineraries;
                            tour.set($tour);
                          }
                        );
                      }}>
                      <span title="Remove attraction" class="icon icon-cross" />
                    </Button>
                  </div>
                </div>
              </div>
            </ListItem>
          {/each}
        </List>
      {/if}
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

  <Sheet class="itinerarySheet" style="height: 100%; z-index: 12000">
    <Toolbar>
      <div class="left" />
      <div class="right">
        <Link
          on:click={function() {
            itinerarySheet.close();
          }}>
          Close
        </Link>
      </div>
    </Toolbar>

    <Block>
      <h1>Edit Itinerary Item</h1>

      {#if selectedItinerary}
        <List mediaList style="margin-top: 0px">
          <ListInput
            label="Schedule"
            type="text"
            placeholder="Enter the schedule"
            clearButton
            required
            validate
            errorMessage="Enter a schedule"
            value={selectedItinerary.schedule}
            onChange={function(e) {
              let value = e.target.value;
              if (value.length > 0) {
                selectedItinerary.schedule = value;
                saveItinerary(selectedItinerary);
              }
            }}>
            <div slot="media">
              <span class="icon icon-clock" />
            </div>
          </ListInput>

          <ListInput
            label="Title"
            type="text"
            placeholder="Enter a short description of the itinerary item"
            clearButton
            required
            validate
            errorMessage="Enter a description"
            value={selectedItinerary.title}
            onChange={function(e) {
              let value = e.target.value;
              if (value.length > 0) {
                selectedItinerary.title = value;
                saveItinerary(selectedItinerary);
              }
            }}>
            <div slot="media">
              <span class="icon icon-file-text" />
            </div>
          </ListInput>

          <ListItem header="Attraction">
            <div slot="media">
              <span class="icon icon-location" />
            </div>
            <div slot="title">
              {#if selectedItinerary.attraction}
                <Link
                  external
                  target="_new"
                  href={selectedItinerary.attraction.url}>
                  {selectedItinerary.attraction.title}
                </Link>
              {:else}No attraction linked{/if}
            </div>
            <div style="display: flex" slot="after">
              {#if selectedItinerary.attraction}
                <Button
                  outline
                  small
                  round
                  color="red"
                  style="font-weight: bold; margin-right: 10px"
                  on:click={function() {
                    delete selectedItinerary.attraction;
                    selectedItinerary = selectedItinerary;
                    tour.set($tour);
                  }}>
                  Remove attraction
                </Button>
              {/if}
              <Button
                style="background-color: rgb(24, 107, 109); font-weight: bold;"
                fill
                small
                round
                on:click={function() {
                  openAttractionSheet();
                  if (selectedItinerary.attraction) {
                    searchbarComponent
                      .instance()
                      .search(selectedItinerary.attraction.title);
                  }
                }}>
                {@html (selectedItinerary.attraction ? 'Change' : 'Link') + "<span style='font-size: 1rem; font-weight: bold; margin-left: 4px; vertical-align: sub' class='icon icon-link'></span>"}
              </Button>
            </div>
          </ListItem>
        </List>
      {/if}
    </Block>
  </Sheet>

  <Sheet class="attractionSheet" style="height: 100%; z-index: 12001">
    <Toolbar>
      <div class="left" />
      <div class="right">
        <Link
          on:click={function() {
            attractionSheet.close();
          }}>
          Close
        </Link>
      </div>
    </Toolbar>
    <Block>
      <h1>
        {selectedItinerary && selectedItinerary.attraction ? 'Change' : 'Link'}
        Attraction
      </h1>
      <Toolbar>
        <Searchbar
          placeholder="Search for attraction and places in Tripadvisor"
          id="searchbar"
          searchContainer=".search-list"
          disableButton={false}
          clearButton={false}
          customSearch={true}
          value={selectedItinerary && selectedItinerary.attraction ? selectedItinerary.attraction.title : ''}
          bind:this={searchbarComponent} />
      </Toolbar>

      {#if loading}
        <div
          style="align-items: center; display: flex; justify-content: center;
          flex-direction: column; height: 100%;">
          <Preloader />
        </div>
      {:else}
        <List class="search-list" style="margin-top: 0px">
          {#if attractions}
            {#if searchbarHint}
              <ListItem title={searchbarHint} />
            {:else if attractions.length == 0}
              <ListItem title="No attractions found" />
            {:else}
              {#each attractions as item}
                <ListItem>
                  <div slot="title">
                    {item.description}
                    <Link
                      title="Open attraction"
                      icon="icon icon-external-link"
                      external
                      style="margin-left: 6px"
                      on:click={function() {
                        getAttractionDetails(item.providerReference).then(
                          function(details) {
                            window.open(details.url);
                          }
                        );
                      }} />
                  </div>
                  <span class="icon icon-location" slot="media" />
                  <div slot="after">
                    <Button
                      fill
                      small
                      round
                      style="background-color: rgb(24, 107, 109); font-weight:
                      bold"
                      on:click={function() {
                        getAttractionDetails(item.providerReference).then(
                          function(details) {
                            let attraction = selectedItinerary.attraction;
                            if (!attraction) {
                              attraction = {};
                              selectedItinerary.attraction = attraction;
                            }
                            attraction.title = item.description.split(',')[0];
                            attraction.url = details.url;
                            if (details.location) {
                              attraction.location = details.location;
                            }
                            selectedItinerary = selectedItinerary;
                            tour.set($tour);
                            attractionSheet.close();
                          }
                        );
                      }}>
                      Choose
                      <span
                        style="font-size: 1.0rem; margin-left: 1px; font-weight:
                        bold; vertical-align: sub"
                        class="icon icon-choose" />
                    </Button>
                  </div>
                </ListItem>
              {/each}
            {/if}
          {/if}
        </List>
      {/if}
    </Block>
  </Sheet>

  <NavToolbar active="/Editor" />
  <Toolbar style="font-size: 0.7rem" tabbar labels position="bottom">
    <Link
      text="Add Item"
      style="color: rgb(24, 107, 109);"
      icon="icon icon-plus"
      on:click={function() {
        selectedItinerary = { title: '', schedule: '' };
        openItinerarySheet();
      }} />
    <Link
      text="Show UI"
      style="color: rgb(24, 107, 109);"
      icon="icon icon-lightbulb"
      href="/New-UI/itinerary" />
    <Link
      text="Reset Itinerary"
      style="color: red;"
      icon="icon icon-reload"
      on:click={function() {
        f7.dialog.confirm(
          'Are you sure you want to reset the itinerary to the default value?',
          'Reset Itinerary',
          () => {
            itineraries = JSON.parse(JSON.stringify(STANDARD_TOUR)).itineraries;
            $tour.itineraries = itineraries;
            tour.set($tour);
          }
        );
      }} />
  </Toolbar>
</Page>
