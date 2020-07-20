<script>
  import { Page, Toolbar, Link } from "framework7-svelte";

  export let active;

  function getActiveClass(path) {
    return path === active ? "active" : "";
  }
</script>

<Toolbar style="background-color: hsl(181, 64%, 26%)" position="top">
  <Link text="An Improved Viator UX" href="/" class={getActiveClass('/')} />
  <Link text="New UI" href="/New-UI" class={getActiveClass('/New-UI')} />
  <Link
    text="Itinerary Editor"
    href="/Editor"
    class={getActiveClass('/Editor')} />
</Toolbar>
