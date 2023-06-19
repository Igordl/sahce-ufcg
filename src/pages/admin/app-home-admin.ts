import { LitElement, css, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';

import axios from 'axios';

import { styles } from '../../styles/shared-styles';
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



@customElement('app-home-admin')
export class AppHome extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';
  @query('#inclusao')
  private modalAddElement?: HTMLElement;
  @query('#exclusao')
  private modalElement?: HTMLElement;

  @query('#alertAddPlace')
  private alertElement?: HTMLElement;
  @query('#daySelect')
  private daySelect: any;
  @query('#schedulesSelect')
  private schedulesSelect: any;
  @query('#typeUser')
  private restrict: any;

  @query('#ratingScheduling')
  private ratingScheduling: any;

  @property({ type: String })
  search: string = '';
  @property({ type: Array })
  schedules: Schedule[] = []


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

  @property({ type: String })
  name: string = '';

  @property({ type: String })
  imageUrl: string = '';



  @property({ type: String })
  description: string = '';


  @property({ type: Number })
  placeId!: number;

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
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          padding: 20px;
          margin-left: 10%;
          width: 80%;
      }
      .addForm {
        justify-content: center;
        gap: 20px;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      .form-add{

        padding: 5px;
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


  render() {
    return html`
    <main>
    <body>
        <sl-alert id="alertAddPlace" variant="danger" duration="10000" closable >Não foi possivel criar o espaço. Tente novamente mais tarde.</sl-alert>
       <sl-alert variant="danger" id="exclusao" variant="danger" >
          <h2>Certeza que deseja excluir o espaço?
          </h2>
          <sl-button class="addConvidado" @click=${() => this._handleDeletePlace(this.placeId)}  variant="danger">Excluir</sl-button>
          <sl-button class="addConvidado" @click=${() => this.modalAddElement?.setAttribute("duration", "0")}  variant="primary">Cancelar</sl-button>
       </sl-alert>
       <sl-alert id="inclusao" variant="success">
          <h1>Adicionar espaço</h1>
          <form class="addForm">
             <sl-input type="text" class="form-add" id="username" name="name" placeholder="Nome"
                @input=${this._handleNameInput}
                >
             </sl-input>
             <sl-input type="text" class="form-add" name="url" placeholder="URL da imagem"
                @input=${this._handleUrlInput}
                ></sl-input>
             <sl-input type="text" class="form-add" name="description" placeholder="Descrição"
                @input=${this._handleDescriptionInput}
                ></sl-input>
             <sl-radio-group size='small' class="form-add" name="a" id="typeUser" value="false" onSlChange=${this._handleComunidadeInput} >
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
                                                                    <p>${time}</p>
                                               `)}
                                               <sl-button @click=${() => this._handleCancelSchedule(schedule.day)} variant="danger">Cancelar</sl-button>
                                            </div>
                                         </div>
             `)}
             <sl-select id="daySelect" class="form-add" placeholder="Selecione o dia" clearable>
                <sl-option value="Segunda-feira">Segunda-feira</sl-option>
                <sl-option value="Terça-feira">Terça-feira</sl-option>
                <sl-option value="Quarta-feira">Quarta-feira</sl-option>
                <sl-option value="Quinta-feira">Quinta-feira</sl-option>
                <sl-option value="Sexta-feira">Sexta-feira</sl-option>
                <sl-option value="Sábado">Sábado</sl-option>
                <sl-option value="Domingo">Domingo</sl-option>
             </sl-select>
             <sl-select id="schedulesSelect" class="form-add" placeholder="Selecione o horário" multiple clearable>
                <sl-option value="06:00-08:00">06:00-08:00</sl-option>
                <sl-option value="08:00-10:00">08:00-10:00</sl-option>
                <sl-option value="10:00-12:00">10:00-12:00</sl-option>
                <sl-option value="14:00-16:00">14:00-16:00</sl-option>
                <sl-option value="16:00-18:00">16:00-18:00</sl-option>
                <sl-option value="18:00-20:00">18:00-20:00</sl-option>
                <sl-option value="20:00-22:00">20:00-22:00</sl-option>
             </sl-select>
             <sl-button class="form-add" @click=${() => this._handleAddTimesModal()}  variant="success">Adicionar horários</sl-button>
             <sl-radio-group  class="form-add" size='small' name="a" id="ratingScheduling" value="false" >
                <sl-radio-button value="1">1 Semana</sl-radio-button>
                <sl-radio-button value="2">1 Mês</sl-radio-button>
                <sl-radio-button value="3">3 Meses</sl-radio-button>
                <sl-radio-button value="4">6 Meses</sl-radio-button>
             </sl-radio-group>
             <sl-button class="form-add" @click=${() => this._handleAddPlaceModal()}  variant="success">Adicionar espaço</sl-button>
          <sl-button class="form-add" @click=${() => this._handleCancelAddPlace()} variant="danger">Cancelar</sl-button>
       </form>
       </sl-alert>
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
    this.places = this.places.filter((place) => place.name.toLowerCase().includes(this.search.toLowerCase()))
  }

  private _handleCancelPlace(spaceId: number) {
    this.placeId = spaceId;
    this.modalElement?.setAttribute("open", "open");
    this.modalElement?.setAttribute("duration", "10000")

  }
  private _handleDeletePlace(spaceId: number) {
    this.places = this.places.filter((place) => place.id != spaceId);
    this.modalElement?.setAttribute("duration", "0")
    this.requestUpdate();


  }


  private _handleCancelSchedule(scheduleDay: string) {
    this.schedules = this.schedules.filter((schedule) => schedule.day != scheduleDay);
    this.requestUpdate();
  }


  private _handleAddPlace() {
    this.modalAddElement?.setAttribute("duration", "1000000");
    this.modalAddElement?.setAttribute("open", "open");

  }
  private _handleCancelAddPlace() {
    this.modalAddElement?.setAttribute("duration", "0");

  }


  private _handleAddTimesModal() {
    var times = this.schedulesSelect.value as string[]
    var day = this.daySelect.value as string
    let scheduleAux = {
      day: day,
      times: times
    }
    if (day != "" && times.length > 0) {
      if (this.schedules.find((schedule) =>
        schedule.day === day)) {
        this.schedules = this.schedules.map((schedule) =>
          schedule.day === day ? { ...schedule, times: times } : schedule
        );
      } else {
        this.schedules.push(scheduleAux);
      }
    }
    let daySelect = this.daySelect as HTMLElement;
    daySelect.setAttribute("value", "");
    let scheduleSelect = this.schedulesSelect as HTMLElement;
    scheduleSelect.setAttribute("value", "");
    this.requestUpdate()

  }
  private _handleAddPlaceModal() {

    let place = {
      id: 0,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      restrict: this.restrict.value as boolean,
      schedules: this.schedules,
      rateScheduling: this.ratingScheduling.value as string
    };
    console.log(place);
    this.places.push(place);


    axios.post(`http://localhost:8080/place`, place)
      .then((res) => {
        console.log("Deu certo")
        console.log(res.data)
        this.requestUpdate();
      }).catch(() => {
        console.log("Deu errado")
        this.modalAddElement?.setAttribute("duration", "0");
        this.alertElement?.setAttribute("open", "open");

      });

    this.name = "";
    this.imageUrl = "";
    this.description = "";
    this.schedules = [];
    this.requestUpdate();

  }



}
