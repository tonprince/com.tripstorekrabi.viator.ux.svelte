<script>
  import { Page, BlockTitle, Link, Button } from "framework7-svelte";
  import Toolbar from "./Toolbar.svelte";
</script>

<style>
  .suggestion {
    margin-top: 20px;
    border-radius: var(--f7-button-height);
    color: white;
    text-align: center;
    background-color: hsl(181, 64%, 26%);
    font-weight: bold;
    padding: 5px;
    text-transform: uppercase;
  }

  .suggestion span.icon,
  span.icon-solution {
    font-size: 1.2rem;
    vertical-align: sub;
    font-weight: bold;
    margin-left: 6px;
  }

  .title {
    margin-top: 40px;
    font-size: 1.3rem;
    font-weight: bold;
  }

  hr.new {
    border: 0;
    border-top: 2px dotted hsl(181, 64%, 26%);
    margin-top: 50px;
    margin-bottom: 40px;
  }
</style>

<Page>
  <div>
    <div style="margin: auto; height: 100%; max-width: 1000px; padding: 20px">
      <h1>A New Viator UX</h1>
      <h2>A Step forward for suppliers and users</h2>

      <h3>Why this UX Design Proposal</h3>
      <p>
        After almost 10 years of working with Viator and Tripadvisor, we wanted
        to give you some important feedbacks from the supplier's point of view.
        Therefore we created this dedicated website to visualize our ideas. I
        think we speak for many operators in the tourism field which face the
        same bottlenecks and issues when creating and maintaining new products
        on the Viator supplier website. Due to the more intense competition from
        other OTAs such as GetYourGuide, Expedia, Klook etc, there is a huge
        need to optimize the product UI appearance on Viator and Tripadvisor
        website to have an outstanding experience.
      </p>
      <p>
        The current Viator strategy to move from an open market place to a more
        closed and controlled platform is the right decision. We totally agree
        that someone of your team reviews the content of a product after it has
        been submitted. We further think you should allow the supplier to be
        more flexible in writing descriptions about the prodct as now everything
        is double-checked to maintain high quality standards.
      </p>

      <hr class="new" />

      <div class="title">Product Type</div>
      The fixed and strict categorization of products into different types (like
      tours, activities, transfers) is not very flexible. For many of our
      products we cannot clearly assign a product type, sometimes it is both a
      tour and activity. A much more flexible approach would be to allow to
      label the product with one or more themes like "kaying, island tour,
      caving, museum, etc." like Airbnb does for its experiences. This would be
      much easier to understand for the supplier and feels more natural than
      being forced to choose 1 product type.
      <div class="suggestion">
        Allow labeling of products
        <span
          style="font-weight: bold; margin-left: 6px"
          class="icon icon-lightbulb" />
      </div>

      <hr class="new" />

      <div class="title">Long Description</div>
      For an activity it is possible to add a long description of the product.
      We think that should be possible for all products independent of their
      type. As the Viator team will from now on review every change we make to
      the product content, we would like to add more detailed information about
      a product which does not fit into the summary 'What makes this tour
      unique?', itinerary or anywhere else. Currently we feel that the content
      of our products cannot be fully presented to the user and thus leaves a
      bad aftertaste.
      <div class="suggestion">
        Allow long description for all products
        <span class="icon icon-lightbulb" />
      </div>

      <hr class="new" />

      <div class="title">Limited Text Length</div>
      For many fields like activity description, option names, product option
      details etc., the maximal text length is very limited. We often have to
      shorten the text and cannot express the full colourfulness of our
      experiences.
      <div class="suggestion">
        Increase the text length limit
        <span class="icon icon-lightbulb" />
      </div>

      <hr class="new" />

      <div class="title">Itinerary & Attractions</div>
      The current UI presentation of the itinerary is very confusing for the
      user (both in Viator and Tripadvsior) as well as for the supplier during
      editing. We would like to add flexible itinerary items with a prefix
      containing a schedule or duration and a title, like the way a standard
      itinerary is built. It should be possible to link every itinerary item
      optionally with an attraction/place in Tripadvisor.
      <Button
        style="margin-top: 20px; font-weight: bold"
        fill
        round
        href="/New-UI/itinerary"
        color="green">
        Show Solution
        <span class="icon icon-solution" />
      </Button>
      <div class="suggestion">
        Allow to add free itinerary with schedule
        <span class="icon icon-lightbulb" />
      </div>
      <div class="suggestion">
        Allow to optional link itinerary item with attraction
        <span class="icon icon-lightbulb" />
      </div>

      <hr class="new" />

      <div class="title">Highlights</div>
      Currently it is not possible to define our own highlights for each
      product. For some products the highlights are showed on the website but
      cannot be edited. We would like to be able to define our own highlights.
      We are convinced that we, the suppliers, know best what are our selling
      points.
      <div class="suggestion">
        Allow to Add Custom Highlights
        <span class="icon icon-lightbulb" />
      </div>

      <hr class="new" />

      <div class="title">Hotel Pickup</div>
      The current solution for defining a hotel pickup service for a tour,
      activity or transfer is not satisfactory. Using a fixed hotel list, or
      defining an area in Google Maps does not cover all usecases and is a very
      static and time-dependent approach. We often get bookings where the
      customer has chosen the option "Stay with friends/relatives" because the
      hotel they stayed was not in the prefilled list, and they just had chosen
      the first item that came up in the list. You should gvive the user more
      freedom by using a freely editable text field approach.
      <br />
      <br />
      I think Viator should actively pushing new technologies such as AI/machine
      learning on their website where it makes sense. One area of application
      could be the hotel pickup list where the previous data of bookings is used
      to label hotels which are eligible for pickup. You could also show the
      pickup times for each hotel to make it even more convenient for the user.
      This requires that the operator has to give feedback for each booking with
      exact pickup time so the system can learn over time. The most exact and
      comprehensive hotel pickup data is always the one you already have in your
      own hands based on existing bookings.
      <div class="suggestion">
        Use freely editable text field for hotels
        <span class="icon icon-lightbulb" />
      </div>
      <div class="suggestion">
        Use machine learning to show eligible hotels & pickup times
        <span class="icon icon-lightbulb" />
      </div>

      <hr class="new" />

      <div class="title">Email Address of User</div>
      Currently it is not possible to reach the customer directly by email, for
      getting more informations such as hotel room, dietary restrictions or in
      an emergency. You give us the name of the customer, sometimes even all
      traveller names, passport number, phone number, but why the email address
      is not provided by Viator?! Of course it is possible to use the Viator
      messaging system, but this is not enough for the following reasons.
      <br />
      <br />
      We use an in-house booking system which is highly optimized to handle a
      large set of bookings each day. We send scheduled messages or messages
      initiated from the booking tool to customers via email, WhatsApp, LINE
      etc. Therefore it is required to know the email address or at least to
      have a designated Viator email address which is bound to a certain
      booking.
      <div class="suggestion">
        Allow to contact customers by email address
        <span class="icon icon-lightbulb" />
      </div>

      <hr class="new" />

      <div class="title">Dynamic Pricing</div>
      The tourism industry is a very volatile business with price fluctuations
      caused by different tourism seasons, customer demand, unexpected incidents
      like the Corona crisis etc. We would like to have an easier way to push
      our price changes faster into the Viator marketplace via API integration,
      the same way we already do with the product availability.
      <div class="suggestion">
        Allow dynamic pricing via supplier API
        <span class="icon icon-lightbulb" />
      </div>

      <hr class="new" />

      <div class="title">Product Add-Ons</div>
      For many products it is possible to buy add-ons for services like pickup
      from remote hotels, transfer to hotel, National Park entrance fee, renting
      kayaking equipment etc. The price of these add-ons are often not under
      direct control of the supplier, but by the government, sub-contractors or
      others. We would like to give the customers the possibility to buy these
      add-ons in advance directly on the Viator website but at the same price as
      if buying local. Therefore we recommend to allow add-ons with a
      zero-commission approach like other OTAs such as GYG already offer do.
      <div class="suggestion">
        Allow add-ons at zero commission
        <span class="icon icon-lightbulb" />
      </div>

      <hr class="new" />

      <div class="title">Activity Duration</div>
      For an activity it is required to set a duration on the product level. We
      recommend to use the duration of the option if available, or to make the
      duration field mandatory on the option level.
      <div class="suggestion">
        User duration from product options
        <span class="icon icon-lightbulb" />
      </div>

      <hr class="new" />

      <div class="title">Company Logo in Ticket</div>
      When uploading a company logo in the ticket section, the logo disappears
      after making changes to other fields in the ticket redemption section. The
      company logo should be uploaded only once and be reused from that point
      on. It would even make more sense to add a logo on the account level,
      which will be used by all products.
      <div class="suggestion">
        Reuse uploaded company logo
        <span class="icon icon-lightbulb" />
      </div>
    </div>

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

  <Toolbar active="/" />
</Page>
