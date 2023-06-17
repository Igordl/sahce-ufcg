import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';

import axios from 'axios';

import { styles } from '../../styles/shared-styles';
interface User {
  email: string;
  name: string;
  actived: boolean;
}

@customElement('app-users')
export class AppUsers extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';
  @property({ type: String })
  search: string = '';
  @property({ type: Array })
  users: User[] = [{
    email: 'Biel@gmail.com',
    name: 'Bobsleu',
    actived: true

  }, {
    email: 'guga@gmail.com',
    name: 'Gustavo',
    actived: true
  },
  {
    email: 'arthur@gmail.com',
    name: 'Arthur',
    actived: false
  },
  {
    email: 'hemily@gmail.com',
    name: 'Hemilly',
    actived: false
  }];

  static get styles() {
    return [
      styles,
      css`
      .titulo{
        text-align: center;
      }
      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        padding: 20px;
        margin-bottom: 70px;
      }
      .space-card {
        width: 300px;
        background-color: #fff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
      }
      .space-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      .space-details {
        padding: 20px;
      }
      h2 {
        margin-top: 0;
        margin-bottom: 10px;
      }
      p {
        margin-top: 0;
        margin-bottom: 10px;
      }
      .price {
        font-size: 24px;
        font-weight: bold;
      }
      sl-button {
        display: block;
        width: 100%;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .pesquisa {
        display: flex;
        justify-content: center;
      }
      .button {
        width: 20%;
        float: right;
    }

      .input sl-input {
        width: 80%;
        float: left;
      }
    `];
  }

  constructor() {
    super();
  }

  async firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/
    console.log('This is your home page');
    axios.post(`http://localhost:8080/v1/protected/places`)
      .then(async (response) => {
        this.users.push(response.data)
      });
  }

  private _handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search = target.value;
  }


  render() {
    return html`
      <main>

      <body>
      <div class="titulo">
      <h1>Usuários</h1>
      </div>
      <form class="pesquisa">
        <div class="input">
        <sl-input placeholder="Pesquisa" @input=${this._handleSearchInput}></sl-input>
        <sl-button class="button" @click=${() => this._searchUser()} variant="primary">Buscar</sl-button>
        </div>

      </form>
      <div class="container">


        ${this.users.map(
      user => html`

            <div class="space-card">

              <div class="space-details">
                <h2>${user.name}</h2>
                <p>${user.email}</p>
                <sl-button @click=${() => this._handleActive(user.email)} variant="success" ?disabled=${user.actived}>Ativar</sl-button>
                <sl-button @click=${() => this._handleInactive(user.email)} variant="danger" ?disabled=${!user.actived}>Bloquear</sl-button>
                <sl-button @click=${() => this._handleUpdateAccount(user.email)} variant="warning" >Tornar administrador</sl-button>
              </div>
            </div>
          `
    )}

      </div>

      </body>

      </main>
      <app-menu-admin></app-menu-admin>
    ` ;
  }
  private _searchUser() {
    this.users = this.users.filter((user) => user.name == this.search)
  }

  private _handleActive(email: string) {
    this.users.map(function (el: any) {
      if (el.email == email) {
        return el.actived = true;
      }
      return;
    });
    this.requestUpdate();

  }

  private _handleInactive(email: string) {
    this.users.map(function (el: any) {
      if (el.email == email) {
        return el.actived = false;
      }
      return;
    });
    this.requestUpdate();

  }
  private _handleUpdateAccount(email: string) {
    this.users.map(function (el: any) {
      if (el.email == email) {
        return el.actived = false;
      }
      return;
    });
    this.requestUpdate();

  }
}
