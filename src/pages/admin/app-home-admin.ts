import { LitElement, css, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';

import axios from 'axios';

import { styles } from '../../styles/shared-styles';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.js';
interface Place {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  restrict: boolean
}
interface Schedule {
  day: string;
  times: Time[];
}
interface Time {
  hour: string;
}



@customElement('app-home-admin')
export class AppHome extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';
  @query('sl-alert') private alertElement?: HTMLElement;
  @property({ type: String })
  search: string = '';
  @property({ type: Array })
  schedules: Schedule[] = [{
    day: "Segunda-Feira",
    times: [
      { hour: "08:00 - 10:00" },
      { hour: "10:00 - 12:00" },
      { hour: "14:00 - 16:00" },
      { hour: "16:00 - 18:00" },
      { hour: "20:00 - 22:00" }]
  },
  {
    day: "Terça-Feira",
    times: [
      { hour: "08:00 - 10:00" },
      { hour: "10:00 - 12:00" },
      { hour: "14:00 - 16:00" },
      { hour: "16:00 - 18:00" },
      { hour: "20:00 - 22:00" }]
  },
  {
    day: "Quarta-Feira",
    times: [
      { hour: "08:00 - 10:00" },
      { hour: "10:00 - 12:00" },
      { hour: "14:00 - 16:00" },
      { hour: "16:00 - 18:00" },
      { hour: "20:00 - 22:00" }]
  },
  {
    day: "Quinta-Feira",
    times: [
      { hour: "08:00 - 10:00" },
      { hour: "10:00 - 12:00" },
      { hour: "14:00 - 16:00" },
      { hour: "16:00 - 18:00" },
      { hour: "20:00 - 22:00" }]
  }, {
    day: "Sexta-Feira",
    times: [
      { hour: "08:00 - 10:00" },
      { hour: "10:00 - 12:00" },
      { hour: "14:00 - 16:00" },
      { hour: "16:00 - 18:00" },
      { hour: "20:00 - 22:00" }]
  }, {
    day: "Sábado",
    times: [
      { hour: "08:00 - 10:00" },
      { hour: "10:00 - 12:00" },
      { hour: "14:00 - 16:00" },
      { hour: "16:00 - 18:00" },
      { hour: "20:00 - 22:00" }]
  }]

  @property({ type: Array })
  places: Place[] = [{
    id: 1,
    name: 'Meeting Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200', restrict: true
  },
  {
    id: 2,
    name: 'Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200', restrict: true
  },
  {
    id: 3,
    name: 'Meeting Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200', restrict: true
  },
  {
    id: 4,
    name: 'Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200', restrict: true
  },
  {
    id: 5,
    name: 'Meeting Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200', restrict: true
  },
  {
    id: 6,
    name: 'Room',
    description: 'A private room for meetings and presentations',
    imageUrl: 'https://picsum.photos/id/1/300/200',
    restrict: true
  }];

  @property({ type: String })
  name: string = '';

  @property({ type: String })
  imageUrl: string = '';

  @property({ type: String })
  restrict: string = 'false';

  @property({ type: String })
  description: string = '';

  @property({ type: String })
  day: string = '';

  @property({ type: String })
  schedule: string = '';

  @property({ type: String })
  arrayString: string[] = [];

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
      .addPlace{
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          padding: 20px;
          margin-left: 10%;
          width: 80%;
      }
      .addForm {
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
    axios.get("http://localhost:8080/places/" + "INTERNAL_USER")
      .then(async (response) => {
        this.places.push(response.data)
      });
  }

  private _handleSearchInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.search = target.value;
  }

  private _handleNameInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.name = target.value;
  }

  private _handleUrlInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.imageUrl = target.value;
  }

  private _handleComunidadeInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.restrict = target.value;
    return this.restrict;

  }
  private _handleDescriptionInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.description = target.value;
    return this.description;

  }
  private _handleDayInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.day = target.value;
    return this.day;

  }
  private _handleScheduleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.schedule = target.value;
    return this.schedule;

  }




  render() {
    return html`
      <main>

      <body>
      <sl-alert variant="success" closable >
      <h1>Adicionar espaço</h1>
      <form class="addForm">
      <sl-input type="text" id="username" name="name" placeholder="Nome"
      @input=${this._handleNameInput}
      >
      </sl-input>
      <sl-input type="text" name="url" placeholder="URL da imagem"
      @input=${this._handleUrlInput}
      ></sl-input>
      <sl-input type="text" name="description" placeholder="Descrição"
      @input=${this._handleDescriptionInput}
      ></sl-input>
      <sl-radio-group  name="a" value="false" onSlChange=${this._handleComunidadeInput} >
                    <sl-radio-button value="true">Restrito</sl-radio-button>
                    <sl-radio-button value="false">Aberto a comunidade</sl-radio-button>
                </sl-radio-group>
      ${this.schedules.map(
      schedule => html`
        <div class="space-card">
              <div class="space-details">
                <h2>${schedule.day}</h2>
                ${schedule.times.map(
        time => html`
                <p>${time.hour}</p>
                `)}
              </div>
            </div>
        `)}

        <sl-select id="daySelect" placeholder="Selecione o dia" onSlChange={this._onSlChangeDay} value="${this.day}" clearable>
        <sl-option value="Segunda-feira">Segunda-feira</sl-option>
        <sl-option value="Terça-feira">Terça-feira</sl-option>
        <sl-option value="Quarta-feira">Quarta-feira</sl-option>
        <sl-option value="Quinta-feira">Quinta-feira</sl-option>
        <sl-option value="Sexta-feira">Sexta-feira</sl-option>
        <sl-option value="Sábado">Sábado</sl-option>
        <sl-option value="Domingo">Domingo</sl-option>
      </sl-select>

        <sl-select id="schedulesSelect" placeholder="Selecione o horário" onSlChange=${console.log("cehgou")} value=${console.log("cehgou")} multiple clearable>
          <sl-option value="06:00-08:00">06:00-08:00</sl-option>
          <sl-option value="08:00-10:00">08:00-10:00</sl-option>
          <sl-option value="10:00-12:00">10:00-12:00</sl-option>
          <sl-option value="14:00-16:00">14:00-16:00</sl-option>
          <sl-option value="16:00-18:00">16:00-18:00</sl-option>
          <sl-option value="18:00-20:00">18:00-20:00</sl-option>
          <sl-option value="20:00-22:00">20:00-22:00</sl-option>
      </sl-select>
                <sl-button class="addConvidado" @click=${() => this._handleAddTimesModal()}  variant="success">Adicionar horários</sl-button>


                  <sl-button class="addConvidado" @click=${() => this._handleAddPlaceModal()}  variant="success">Adicionar espaço</sl-button>
                  </form></sl-alert>

      <div class="titulo">
      <h1>Espaços para reservas</h1>

      </div>
      <form class="pesquisa">
        <div class="input">
        <sl-input placeholder="Pesquisa" @input=${this._handleSearchInput}></sl-input>
        <sl-button class="button" @click=${() => this._searchPlace()} variant="primary">Buscar</sl-button>
        </div>

      </form>


      <sl-button class="addPlace" @click=${() => this._handleAddPlace()} variant="success">Adicionar espaço</sl-button>

      <div class="container">

        ${this.places.map(
          place => html`

            <div class="space-card">
              <img class="space-image" src=${place.imageUrl} alt=${place.name} />
              <div class="space-details">
                <h2>${place.name}</h2>
                <p>${place.description}</p>
                <sl-button @click=${() => this._handleCancelPlace(place.id)} variant="danger">Cancelar</sl-button>
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

  private _searchPlace() {
    this.places = this.places.filter((place) => place.name == this.search)
  }

  private _handleCancelPlace(spaceId: number) {
    this.places = this.places.filter((place) => place.id != spaceId);
    this.requestUpdate();
  }

  private _handleAddPlace() {
    this.alertElement?.setAttribute("open", "open");


  }
  private _handleAddTimesModal() {
    console.log(document.getElementById('#schedulesSelect').selectedOptions as HTMLBodyElement)
    console.log(this.arrayString);
    let time = { hour: this.schedule }
    let schedule = {
      day: this.day,
      times: [
        time
      ]
    }
    console.log(this.schedule);
    console.log(this.day);
    this.schedules.push(schedule);
    this.requestUpdate

  }
  private _handleAddPlaceModal() {

    let place = {
      id: 0,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      restrict: this.restrict
    };
    console.log(place);

    axios.post(`http://localhost:8080/place`, place)
      .then((res) => {
        console.log("Deu certo")
        console.log(res.data)
        this.requestUpdate();
      }).catch(() => {
        console.log("Deu errado")
        this.alertElement?.setAttribute("open", "open");

      });
  }
  private _onSlChangeDay(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.day = target.value;
    console.log("Selecionando o dia");
  }

  private _onSlChangeSchedule(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.schedule = target.value;
    this.arrayString.push(this.schedule);
    console.log("adicionando horarios");
  }
}
