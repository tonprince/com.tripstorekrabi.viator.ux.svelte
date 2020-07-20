'use strict';

import Framework7 from 'framework7/framework7-lite.esm.bundle.js';
import Framework7Svelte from 'framework7-svelte';
import App from './App.svelte';

Framework7.use(Framework7Svelte);

const app = new App({
	target: document.getElementById('app')
});

export default app;