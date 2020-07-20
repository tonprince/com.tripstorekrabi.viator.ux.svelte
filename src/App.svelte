<script>
  import { f7, App, View } from "framework7-svelte";
  import routes from "./routes.js";

  const f7params = {
    theme: "aurora",
    routes,
    name: "A New Viator UX",
    id: "com.tripstorekrabi.viator.svelte",
    root: "#app"
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
