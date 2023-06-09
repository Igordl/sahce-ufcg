import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';

import { styles } from '../styles/shared-styles';
interface Space {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  emailOwner: string;
  nameOwner: string;
  guestes: User[];
}

interface User {
  email: string;
  nome: string;
}

@customElement('app-espaco')
export class AppEspaco extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';

  @property({ type: String })
  name: string = '';

  @property({ type: String })
  email: string = '';

  @property({ type: String })
  day: string = '';

  @property({ type: String })
  schedule: string = '';

  @property({ type: Array, state: true })
  space: Space = {
    id: 1,
    name: 'Quadra de areia',
    description: 'Quadra de areia',
    imageUrl: 'https://clubepaineiras.org.br/wp-content/uploads/2016/07/Esporte-volei-de-praia.jpg',
    emailOwner: 'igor@gmail.com',
    nameOwner: 'Igor Lucena',
    guestes: []
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
                <p>${this.space.description}</p>
                <sl-select id="daySelect" placeholder="Selecione o dia" onSlChange=${this.onSlChangeDay} clearable>
                  <sl-option value="Segunda-feira">Segunda-feira</sl-option>
                  <sl-option value="Terça-feira">Terça-feira</sl-option>
                  <sl-option value="Quarta-feira">Quarta-feira</sl-option>
                  <sl-option value="Quinta-feira">Quinta-feira</sl-option>
                  <sl-option value="Sexta-feira">Sexta-feira</sl-option>
                  <sl-option value="Sábado">Sábado</sl-option>
                  <sl-option value="Domingo">Domingo</sl-option>
                </sl-select>
                  <sl-select id="schedulesSelect" placeholder="Selecione o horário" onSlChange=${this.onSlChangeSchedule}  clearable>
                  <sl-option value="06:00-08:00">06:00-08:00</sl-option>
                  <sl-option value="08:00-10:00">08:00-10:00</sl-option>
                  <sl-option value="10:00-12:00">10:00-12:00</sl-option>
                  <sl-option value="14:00-16:00">14:00-16:00</sl-option>
                  <sl-option value="16:00-18:00">16:00-18:00</sl-option>
                  <sl-option value="18:00-20:00">18:00-20:00</sl-option>
                  <sl-option value="20:00-22:00">20:00-22:00</sl-option>
                </sl-select>
                ${this.space.guestes.map(
      guest => html`
                    <div class="space-card">
                        <div class="convidado">
                        <div class="idConvidado">
                        <h2>${guest.nome}</h2>
                        <p>${guest.email}</p>
                        </div>
                        <sl-button class="delConvidado" @click=${() => this._excluirConvidado(guest.email)} variant="danger">Excluir</sl-button>
                      </div>
                    </div>
                  `
    )}
    <h3>Adicione convidado</h3>
    <form>
    <sl-input type="text" id="username" name="name" placeholder="Nome"
    @input=${this._handleNameInput}
    >
    </sl-input>
    <sl-input type="email" name="email" placeholder="Email"
    @input=${this._handleEmailInput}
    >
    </sl-input>
                <sl-button class="addConvidado" type="reset" @click=${() => this._incluirConvidado()} ?disabled=${!this._isFormValid()} variant="primary">Adicionar convidado</sl-button>
                <sl-button class="addConvidado" @click=${() => this._handleSchedule()} ?disabled=${this.space.guestes.length < 1} variant="success">Realizar reserva</sl-button>

                </form>
              </div>
            </div>


      </div>

      </body>

      </main>
      <app-menu></app-menu>
    ` ;
  }

  private _excluirConvidado(email: string) {
    this.space.guestes = this.space.guestes.filter(function (el: any) {
      return el.email != email;
    });
    console.log("Convidado: " + email + " foi excluido!");
    console.log(this.space.guestes);
    this.requestUpdate();

  }


  private _incluirConvidado() {
    let user = {
      "email": this.email,
      "nome": this.name
    }
    this.space.guestes.push(user);
    console.log("Convidado: " + user.email + " foi incluido!");
    console.log(this.space.guestes);
    this.email = "";
    this.name = "";
    this.requestUpdate();

  }

  private _handleSchedule() {
    window.location.href = "home"
    this.requestUpdate();
  }

  private onSlChangeDay(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.day = target.value;
    console.log(this.day);
  }

  private onSlChangeSchedule(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.schedule = target.value;
    console.log(this.schedule);
  }
  private _handleNameInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.name = target.value;
  }

  private _handleEmailInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.email = target.value;
  }



  private _isFormValid() {
    return this.name && this.email;
  }
}
