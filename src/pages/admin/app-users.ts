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
  docFile: string;
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
    name: 'Gabriel Almeida',
    docFile: '',
    actived: true

  }, {
    email: 'guga@gmail.com',
    name: 'Gustavo Freitas',
    docFile: 'google.com',
    actived: true
  },
  {
    email: 'mari@gmail.com',
    name: 'Mariana Lucena',
    docFile: 'google.com',
    actived: false
  },
  {
    email: 'igor@gmail.com',
    name: 'Igor Lucena',
    docFile: 'google.com',
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
      sl-button-group{
        width: 100%;
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
                <sl-button-group label="Example Button Group">
                <sl-button href="${user.docFile}" download="${user.email}.jpg" >Documento</sl-button>
                <sl-button @click=${() => this._handleActiveInactive(user.email)}  >${this._handleVerifyActiveInactive(user.actived)}</sl-button>
                </sl-button-group>
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
    this.users = this.users.filter((user) => user.name.toLowerCase().includes(this.search.toLowerCase()))
  }

  private _handleActiveInactive(email: string) {
    this.users.map(function (el: any) {
      if (el.email == email) {
        return el.actived = !el.actived;
      }
      return;
    });
    this.requestUpdate();
  }

  private _handleVerifyActiveInactive(active: boolean) {
    if (active) {
      return 'Bloquear';
    }
    return 'Ativar';
  }







}
