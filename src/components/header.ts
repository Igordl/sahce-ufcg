import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';
@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: String }) title = 'SAHCE - UFCG';

  @property({ type: Boolean }) enableBack: boolean = false;

  static get styles() {
    return css`

    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <header>

        <div id="back-button-block">
          ${this.enableBack ? html`<sl-button href="${(import.meta as any).env.BASE_URL}">
            Back
          </sl-button>` : null}

          <h1>${this.title}</h1>
        </div>
      </header>

    `;
  }
}
