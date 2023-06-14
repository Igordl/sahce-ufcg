// docs for router https://github.com/thepassle/app-tools/blob/master/router/README.md

import { html } from 'lit';

if (!(globalThis as any).URLPattern) {
  await import("urlpattern-polyfill");
}

import { Router } from '@thepassle/app-tools/router.js';

// @ts-ignore
import { title } from '@thepassle/app-tools/router/plugins/title.js';

import './pages/app-home.js';
import './pages/app-login.js';
import './pages/app-cadastro.js';
import './pages/app-reset-senha.js';
import './pages/app-espaco.js';
import './pages/app-reservas.js';

export const router = new Router({
  routes: [
    {
      path: '/',
      title: 'Login',
      render: () => html`<app-login></app-login>`
    },
    {
      path: '/cadastro',
      title: 'Cadastro',
      render: () => html`<app-cadastro></app-cadastro>`
    },
    {
      path: '/reset',
      title: 'Reset de senha',
      render: () => html`<app-reset-senha></app-reset-senha>`
    },
    {
      path: '/home',
      title: 'Home',
      render: () => html`<app-home></app-home>`
    },
    {
      path: '/espaco',
      title: 'Reserva de espaços',
      render: () => html`<app-espaco></app-espaco>`
    },
    {
      path: '/reservas',
      title: 'Reservas de espaços',
      render: () => html`<app-reservas></app-reservas>`
    },
  ]
});
