<script>
  import { f7, App, View } from "framework7-svelte";
  import routes from "./routes.js";

  const f7params = {
    theme: "auto",
    routes,
    name: "A New Viator UX",
    id: "com.tripstorekrabi.viator.svelte",
    root: "#app",
    on: {
      pageAfterOut: function(page) {
        page.el.style.display = "none";
      },
      pageAfterIn: function(page) {
        page.el.style.display = "inherit";
      }
    }
  };
</script>

<App params={f7params}>
  <View
    url="/"
    pushState={true}
    history={true}
    pushStateSeparator=""
    main={true}
    animate={false} />
</App>
