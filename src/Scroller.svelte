<script context="module">
  const handlers = [];
  let manager;
  if (typeof window !== "undefined") {
    const run_all = () => handlers.forEach(fn => fn());
    window.addEventListener("scroll", run_all);
    window.addEventListener("resize", run_all);
  }
  if (typeof IntersectionObserver !== "undefined") {
    const map = new Map();
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          const update = map.get(entry.target);
          const index = handlers.indexOf(update);
          if (entry.isIntersecting) {
            if (index === -1) handlers.push(update);
          } else {
            update();
            if (index !== -1) handlers.splice(index, 1);
          }
        });
      },
      {
        rootMargin: "400px 0px" // TODO why 400?
      }
    );
    manager = {
      add: ({ outer, update }) => {
        const { top, bottom } = outer.getBoundingClientRect();
        if (top < window.innerHeight && bottom > 0) handlers.push(update);
        map.set(outer, update);
        observer.observe(outer);
      },
      remove: ({ outer, update }) => {
        const index = handlers.indexOf(update);
        if (index !== -1) handlers.splice(index, 1);
        map.delete(outer);
        observer.unobserve(outer);
      }
    };
  } else {
    manager = {
      add: ({ update }) => {
        handlers.push(update);
      },
      remove: ({ update }) => {
        const index = handlers.indexOf(update);
        if (index !== -1) handlers.splice(index, 1);
      }
    };
  }
</script>

<script>
  import { onMount } from "svelte";
  // config
  export let top = 0;
  export let bottom = 1;
  export let threshold = 0.5;
  export let query = "section";
  export let parallax = false;
  // bindings
  export let index = 0;
  export let count = 0;
  export let visible = false;
  let outer;
  let foreground;
  let header;
  let left;
  let sections;
  let wh = 0;
  let width = 1;
  let height;
  let inverted;
  $: top_px = Math.round(top * wh);
  $: bottom_px = Math.round(bottom * wh);
  $: threshold_px = Math.round(threshold * wh);
  $: top, bottom, threshold, parallax, update();

  $: style = `
		position: ${
      foreground && foreground.getBoundingClientRect().top > 20
        ? "fixed"
        : "relative"
    };
		top: 0;
		width: ${width}px;
		z-index: ${inverted ? 3 : 1};
	`;
  onMount(() => {
    sections = foreground.querySelectorAll(query);
    count = sections.length;
    update();
    const scroller = { outer, update };
    manager.add(scroller);
    return () => manager.remove(scroller);
  });
  function update() {
    if (!foreground) return;
    // re-measure outer container
    const bcr = outer.getBoundingClientRect();
    left = bcr.left;
    width = bcr.right - left;
    // determine fix state
    const fg = foreground.getBoundingClientRect();
    const bg = header.getBoundingClientRect();
    console.log(fg.top);
    visible = fg.top < wh && fg.bottom > 0;

    for (index = 0; index < sections.length; index += 1) {
      const section = sections[index];
      const { top } = section.getBoundingClientRect();
      const next = sections[index + 1];
      const bottom = next ? next.getBoundingClientRect().top : fg.bottom;
      if (bottom >= threshold_px) break;
    }
  }
</script>

<style>
  svelte-scroller-outer {
    display: block;
    position: relative;
  }
  svelte-scroller-header {
    display: block;
    position: relative;
    width: 100%;
  }
  svelte-scroller-foreground {
    display: block;
    position: relative;
  }
  svelte-scroller-foreground::after {
    content: " ";
    display: block;
    clear: both;
  }
  svelte-scroller-header-container {
    display: block;
    position: absolute;
    width: 100%;
    max-width: 100%;
  }
</style>

<svelte:window bind:innerHeight={wh} />

<svelte-scroller-outer bind:this={outer}>
  <svelte-scroller-header-container class="header-container" {style}>
    <svelte-scroller-header bind:this={header}>
      <slot name="header" />
    </svelte-scroller-header>
  </svelte-scroller-header-container>

  <svelte-scroller-foreground bind:this={foreground}>
    <slot name="foreground" />
  </svelte-scroller-foreground>
</svelte-scroller-outer>
