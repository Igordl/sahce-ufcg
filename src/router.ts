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
import './pages/app-espaco-info.js';
import './pages/app-reservas.js';
import './pages/app-perfil.js';

import './pages/admin/app-home-admin.js';
import './pages/admin/app-espaco-admin.js';
import './pages/admin/app-reservas-admin.js';
import './pages/admin/app-users.js';

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
      path: '/users-admin',
      title: 'Users',
      render: () => html`<app-users></app-users>`
    },
    {
      path: '/user-perfil',
      title: 'Perfil',
      render: () => html`<app-perfil></app-perfil>`
    },
    {
      path: '/espaco',
      title: 'Reserva de espaços',
      render: () => html`<app-espaco></app-espaco>`
    },
    {
      path: '/espaco-info',
      title: 'Reserva de espaços',
      render: () => html`<app-espaco-info></app-espaco-info>`
    },
    {
      path: '/reservas',
      title: 'Reservas de espaços',
      render: () => html`<app-reservas></app-reservas>`
    },
    {
      path: '/home-admin',
      title: 'Home',
      render: () => html`<app-home-admin></app-home-admin>`
    },
    {
      path: '/espaco-admin',
      title: 'Reserva de espaços',
      render: () => html`<app-espaco-admin></app-espaco-admin>`
    },
    {
      path: '/reservas-admin',
      title: 'Reservas de espaços',
      render: () => html`<app-reservas-admin></app-reservas-admin>`
    },
  ]
});
