import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';

import axios from 'axios';

import { styles } from '../styles/shared-styles';
interface User {
  email: string;
  name: string;
  docFile: string;
  actived: boolean;
}

@customElement('app-perfil')
export class AppUsers extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';
  @property({ type: String })
  search: string = '';
  @property({ type: Array })
  user: User =
    {
      email: 'igor@gmail.com',
      name: 'Igor Lucena',
      docFile: 'https://img.freepik.com/vetores-premium/icone-de-documento-na-pasta_149152-438.jpg?w=2000',
      actived: false
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
        this.user = response.data
      });
  }




  render() {
    return html`
      <main>

      <body>
      <div class="titulo">
      <h1>Perfil</h1>
      </div>
      <div class="container">
            <div class="space-card">
              <div class="space-details">
                <img class="space-image" src=${this.user.docFile} alt="DocFile" />
                <h2>${this.user.name}</h2>
                <p>${this.user.email}</p>
                <p>${this._handleVerifyActiveInactive(this.user.actived)}</p>
                <sl-input
                type="file"
                id="docFile"
                name="arquivo"
                @input=${this._handleDocFileInput}
                closable
                ></sl-input>
                <sl-button-group label="Example Button Group">
                <sl-button href="${this.user.docFile}" download="${this.user.docFile}" >Atualizar</sl-button>
                </sl-button-group>
                </div>
            </div>


      </div>

      </body>

      </main>
      <app-menu-admin></app-menu-admin>
    ` ;
  }


  private _handleVerifyActiveInactive(active: boolean) {
    if (active) {
      return 'Bloqueado';
    }
    return 'Ativo';
  }





  private _handleDocFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.user.docFile = target.value;
    this.requestUpdate();

  }

}
