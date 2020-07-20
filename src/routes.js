'use strict';

import UX from './UX.svelte';
import UI from './UI.svelte';
import Editor from './Editor.svelte';
import NotFound from './404.svelte';

export default [
  {
    path: '/',
    component: UX
  }, {
    path: '/New-UI',
    component: UI,
  }, {
    path: '/Editor',
    component: Editor
  },
  {
    path: '(.*)',
    component: NotFound
  }
];