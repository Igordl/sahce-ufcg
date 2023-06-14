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
  convidados: Usuario[];
}

interface Usuario {
  email: string;
  nome: string;
  doc: string;
}

@customElement('app-espaco')
export class AppEspaco extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';

  @property({ type: Array })
  space: Space = {
    id: 1,
    name: 'Meeting Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200',
    convidados: [{
      email: 'guga@gmail.com',
      nome: 'Gustavo',
      doc: '123456',

    },
    {
      email: 'arthur@gmail.com',
      nome: 'Arthur',
      doc: '123457',

    },
    {
      email: 'hemily@gmail.com',
      nome: 'Hemilly',
      doc: '123458',

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
      .delConvidado{
        width: 50px;
        right:0;
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
                <p>${this.space.description}</p>
                ${this.space.convidados.map(
      convidado => html`
                    <div class="space-card">
                        <div class="convidado">
                        <div class="idConvidado">
                        <h2>${convidado.nome}</h2>
                        <p>Doc: ${convidado.doc}</p>
                        </div>
                        <sl-button class="delConvidado" @click=${() => this._excluirConvidado(convidado.doc)} variant="danger">Excluir</sl-button>
                      </div>
                    </div>
                  `
    )}

                <sl-button class="addConvidado" @click=${() => this._handleReserve(this.space.id)} variant="primary">Adicionar convidado</sl-button>
              </div>
            </div>


      </div>

      </body>

      </main>
      <app-menu></app-menu>
    ` ;
  }
  private _excluirConvidado(doc: string) {
    this.space.convidados = this.space.convidados.filter(function (el: any) {
      return el.doc != doc;
    });
    this.render
    console.log("Convidado: " + doc + " foi excluido!");
    console.log(this.space.convidados);

  }

  private _incluirConvidado(email: string, nome: string, doc: string) {
    let user = {
      "email": email,
      "nome": nome,
      "doc": doc
    }
    this.space.convidados.push(user);
    this.render
    console.log("Convidado: " + user + " foi inluido!");
    console.log(this.space.convidados);
    this.createRenderRoot();

  }

  private _handleReserve(spaceId: number) {
    // Handle reservation for the space with the given ID
    console.log("Reservar o espaço: " + spaceId)
  }
}
