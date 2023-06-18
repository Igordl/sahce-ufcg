import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';

import axios from 'axios';

import { styles } from '../styles/shared-styles';
interface Place {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  restrict: boolean;
  schedules: Schedule[]
}
interface Schedule {
  day: string;
  times: string[];
}
interface Time {
  hour: string;
}

@customElement('app-home')
export class AppHome extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';
  @property({ type: String })
  search: string = '';
  @property({ type: Array })
  places: Place[] = [{
    id: 1,
    name: 'Campo de futebol',
    description: 'Campo de futebol',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9aUs30A6dnmvXuWgLX6mT5SFpzA6u_Mywr2aUnkpZNIJpRhm3ebRbezADap3_6rYJPQE&usqp=CAU',
    restrict: false,
    schedules: []
  },
  {
    id: 2,
    name: 'Quadra de areia',
    description: 'Quadra de areia',
    imageUrl: 'https://clubepaineiras.org.br/wp-content/uploads/2016/07/Esporte-volei-de-praia.jpg',
    restrict: false,
    schedules: []
  },
  {
    id: 3,
    name: 'Quadra de tênis',
    description: 'Quadra de tênis',
    imageUrl: 'https://s2-ge.glbimg.com/PDV4QjcST79VbbXPPRtwaQC0AWM=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/5/j/XdI1cNTZeuEfGCjpnbOQ/whatsapp-image-2021-04-22-at-19.22.46.jpeg',
    restrict: true,
    schedules: []
  },
  {
    id: 4,
    name: 'Quadra de beach tênis',
    description: 'Quadra de beach tênis',
    imageUrl: 'https://static.wixstatic.com/media/b2bea2_3b82eaedea3c4fc2bb96e0120699e85e~mv2.jpeg/v1/fill/w_1000,h_750,al_c,q_85,usm_0.66_1.00_0.01/b2bea2_3b82eaedea3c4fc2bb96e0120699e85e~mv2.jpeg',
    restrict: true,
    schedules: []
  },
  {
    id: 5,
    name: 'Quadra de areia 2',
    description: 'Quadra de areia',
    imageUrl: 'https://clubepaineiras.org.br/wp-content/uploads/2016/07/Esporte-volei-de-praia.jpg',
    restrict: false,
    schedules: []
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
        this.places.push(response.data)
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
      <h1>Espaços para reservas</h1>
      </div>
      <form class="pesquisa">
        <div class="input">
        <sl-input placeholder="Pesquisa" @input=${this._handleSearchInput}></sl-input>
        <sl-button class="button" @click=${() => this._searchPlace()} variant="success">Buscar</sl-button>
        </div>

      </form>
      <div class="container">


        ${this.places.map(
      place => html`

            <div class="space-card">
              <img class="space-image" src=${place.imageUrl} alt=${place.name} />
              <div class="space-details">
                <h2>${place.name}</h2>
                <p>${place.description}</p>
                <sl-button @click=${() => this._handleReserve(place.id)} variant="success">Reserve</sl-button>
              </div>
            </div>
          `
    )}

      </div>

      </body>

      </main>
      <app-menu></app-menu>
    ` ;
  }
  private _searchPlace() {
    this.places = this.places.filter((place) => place.name.toLowerCase().includes(this.search.toLowerCase()))
  }

  private _handleReserve(spaceId: number) {
    // Handle reservation for the space with the given ID
    window.location.href = "/espaco"
    console.log("Reservar o espaço: " + spaceId)
  }
}
