import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { styles } from '../../styles/shared-styles';

interface Space {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

@customElement('app-reservas-admin')
export class AppReservas extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';
  @property({ type: String })
  search: string = '';
  @property({ type: Array })
  spaces: Space[] = [{
    id: 1,
    name: 'Meeting Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200',
  },
  {
    id: 2,
    name: 'Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200',
  },
  {
    id: 3,
    name: 'Meeting Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200',
  },
  {
    id: 4,
    name: 'Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200',
  },
  {
    id: 5,
    name: 'Meeting Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200',
  },
  {
    id: 6,
    name: 'Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200',
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
      sl-button {
        display: block;
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
      .pesquisa {
        display: flex;
        justify-content: center;
      }
      .button {
        margin-top: -10px;
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
  }



  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      });
    }
  }

  render() {
    return html`
      <main>

      <body>


      <div class="titulo">
      <h1>Todas as reservas</h1>
      </div>
      <form class="pesquisa">
        <div class="input">
        <sl-input placeholder="Pesquisa" @input=${this._handleSearchInput}></sl-input>
        <sl-button class="button" @click=${() => this._searchPlace()} variant="primary">Buscar</sl-button>
        </div>

      </form>
      <div class="container">

        ${this.spaces.map(
      space => html`

            <div class="space-card">
              <img class="space-image" src=${space.imageUrl} alt=${space.name} />
              <div class="space-details">
                <h2>${space.name}</h2>
                <p>${space.description}</p>
                <sl-button @click="${() => this._handleInfoSchedule(space.id)}" variant="primary">Informações de reserva</sl-button>
                <sl-button @click="${() => this._cancelaReserva(space.id)}" variant="danger">Cancelar reserva</sl-button>
              </div>
            </div>
          `
    )}
      </div>
      </body>

      </main>
      <app-menu-admin></app-menu-admin>
    `;
  }
  private _cancelaReserva(id: number) {
    this.spaces = this.spaces.filter(function (el: any) {
      return el.id != id;
    });
    console.log("Reserva: " + id + " foi excluida!");
    console.log(this.spaces);
    this.requestUpdate();


  }

  private _handleInfoSchedule(spaceId: number) {
    window.location.href = "espaco"
    console.log("Reservar o espaço: " + spaceId)
  }

  private _handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search = target.value;
  }

  private _searchPlace() {
    console.log("Busca:" + this.search)
    this.spaces = this.spaces.filter((place) => place.name == this.search)
    this.requestUpdate();
  }

}
