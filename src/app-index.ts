import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import './pages/app-login';
import './pages/app-cadastro';
import './pages/app-reset-senha';
import './pages/app-espaco';
import './pages/app-espaco-info';
import './pages/app-reservas';
import './pages/admin/app-users';
import './components/header';
import './components/menu';
import './components/menu-admin';
import './pages/admin/app-espaco-admin';
import './pages/admin/app-reservas-admin';
import './styles/global.css';
import { router } from './router';

@customElement('app-index')
export class AppIndex extends LitElement {
  static get styles() {
    return css`

    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    router.addEventListener('route-changed', () => {
      if ("startViewTransition" in document) {
        return (document as any).startViewTransition(() => {
          this.requestUpdate();
        });
      }
      else {
        this.requestUpdate();
      }
    });
  }

  render() {
    // router config can be round in src/router.ts
    return router.render();
  }
}
