import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { styles } from '../styles/shared-styles';
interface Space {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  schedule: string;
  day: string;
  emailOwner: string;
  nameOwner: string;
  guestes: User[];
}

interface User {
  email: string;
  nome: string;
}

@customElement('app-espaco-info')
export class AppEspaco extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';

  @property({ type: String })
  name: string = '';

  @property({ type: String })
  email: string = '';

  @property({ type: Array, state: true })
  space: Space = {
    id: 1,
    name: 'Quadra de areia',
    description: 'Quadra de areia',
    imageUrl: 'https://clubepaineiras.org.br/wp-content/uploads/2016/07/Esporte-volei-de-praia.jpg',
    schedule: '18:00-20:00',
    day: 'Segunda-Feira',
    emailOwner: 'Mariana@gmail.com',
    nameOwner: 'Mariana Lucena',
    guestes: [
      {
        email: 'mari@gmail.com',
        nome: 'Mariana Lucena'

      }]
  };

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
        background-color: #fff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        overflow: hidden;
        paddin-bottom:10px;
      }
      .space-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      .space-details {
        padding: 20px;
      }
      .convidado {
        padding: 20px;
        display: flex;
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
      .addConvidado{
        margin-top: 20px;
      }

      .form {
        padding: 40px;
        background-color: #fff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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



  render() {
    return html`
      <main>

      <body>
      <div class="titulo">
      <h1>Espaços para reservas</h1>
      </div>
      <div class="container">
            <div class="space-card">
              <img class="space-image" src=${this.space.imageUrl} alt=${this.space.name} />
              <div class="space-details">
                <h2>${this.space.name}</h2>
                <p>${this.space.day} - ${this.space.schedule}<p>
                <p>${this.space.nameOwner}<p>
                <p>${this.space.emailOwner}<p>
                ${this.space.guestes.map(
      guest => html`
                    <div class="space-card">
                        <div class="convidado">
                        <div class="idConvidado">
                        <h2>${guest.nome}</h2>
                        <p>${guest.email}</p>
                        </div>
                      </div>
                    </div>
                  `
    )}
    <sl-button  @click=${() => this._deleteScheduling()} variant="danger">Cancelar reserva</sl-button>
              </div>

            </div>


      </div>

      </body>

      </main>
      <app-menu></app-menu>
    ` ;
  }

  private _deleteScheduling() {
    window.location.href = "home"
    this.requestUpdate();

  }



}
