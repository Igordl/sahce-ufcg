import { LitElement, css, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { styles } from '../styles/shared-styles';
import axios from 'axios';

interface Space {
  id: number;
  name: string;
  description: string;
  schedule: string;
  day: string;
  emailOwner: string;
  nameOwner: string;
  imageUrl: string;
}

@customElement('app-reservas')
export class AppReservas extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property() message = 'Welcome!';
  @query('sl-alert') private alertElement: HTMLElement | undefined;
  @property({ type: String })
  email: string = '';
  @property({ type: Array })
  spaces: Space[] = [{
    id: 1,
    name: 'Quadra de areia',
    description: 'Quadra de areia',
    imageUrl: 'https://clubepaineiras.org.br/wp-content/uploads/2016/07/Esporte-volei-de-praia.jpg',
    schedule: '18:00-20:00',
    day: 'Segunda-Feira',
    emailOwner: 'mariana@gmail.com',
    nameOwner: 'Mariana Lucena',
  },
  {
    id: 2,
    name: 'Quadra de areia',
    description: 'Quadra de areia',
    imageUrl: 'https://clubepaineiras.org.br/wp-content/uploads/2016/07/Esporte-volei-de-praia.jpg',
    schedule: '20:00-22:00',
    day: 'Segunda-Feira',
    emailOwner: 'igor@gmail.com',
    nameOwner: 'Igor Lucena',
  },
  {
    id: 3,
    name: 'Quadra de tênis',
    description: 'Quadra de tênis',
    imageUrl: 'https://s2-ge.glbimg.com/PDV4QjcST79VbbXPPRtwaQC0AWM=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/5/j/XdI1cNTZeuEfGCjpnbOQ/whatsapp-image-2021-04-22-at-19.22.46.jpeg',
    schedule: '18:00-20:00',
    day: 'Segunda-Feira',
    emailOwner: 'thaynnara@gmail.com',
    nameOwner: 'Thaynnara Rayane',
  },
  {
    id: 4,
    name: 'Quadra de beach tênis',
    description: 'Quadra de beach tênis',
    imageUrl: 'https://static.wixstatic.com/media/b2bea2_3b82eaedea3c4fc2bb96e0120699e85e~mv2.jpeg/v1/fill/w_1000,h_750,al_c,q_85,usm_0.66_1.00_0.01/b2bea2_3b82eaedea3c4fc2bb96e0120699e85e~mv2.jpeg',
    schedule: '18:00-20:00',
    day: 'Terça-Feira',
    emailOwner: 'leticia@gmail.com',
    nameOwner: 'Leticia Xavier',
  },
  {
    id: 5,
    name: 'Quadra de areia 2',
    description: 'Quadra de areia',
    imageUrl: 'https://clubepaineiras.org.br/wp-content/uploads/2016/07/Esporte-volei-de-praia.jpg',
    schedule: '20:00-22:00',
    day: 'Segunda-Feira',
    emailOwner: 'gustavo@gmail.com',
    nameOwner: 'Gustavo Freitas',
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
    `];
  }

  constructor() {
    super();
  }

  async firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/
    console.log('This is your home page');
    axios.get(`http://localhost:8080/places/user/` + this.email)
      .then((res) => {
        console.log("Deu certo")
        console.log(res.data)
        this.spaces.push(res.data);

      }).catch(() => {
        console.log("Deu errado")
        this.alertElement?.setAttribute("open", "open");

      });
    if (this.spaces.length == 0) {
      let spaceFake =
        [
          {
            id: 2,
            name: 'Quadra de areia',
            description: 'Quadra de areia',
            imageUrl: 'https://clubepaineiras.org.br/wp-content/uploads/2016/07/Esporte-volei-de-praia.jpg',
            schedule: '20:00-22:00',
            day: 'Segunda-Feira',
            emailOwner: 'igor@gmail.com',
            nameOwner: 'Igor Lucena',
          },
          {
            id: 3,
            name: 'Quadra de tênis',
            description: 'Quadra de tênis',
            imageUrl: 'https://s2-ge.glbimg.com/PDV4QjcST79VbbXPPRtwaQC0AWM=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/5/j/XdI1cNTZeuEfGCjpnbOQ/whatsapp-image-2021-04-22-at-19.22.46.jpeg',
            schedule: '18:00-20:00',
            day: 'Segunda-Feira',
            emailOwner: 'thaynnara@gmail.com',
            nameOwner: 'Thaynnara Rayane',
          },
          {
            id: 4,
            name: 'Quadra de beach tênis',
            description: 'Quadra de beach tênis',
            imageUrl: 'https://static.wixstatic.com/media/b2bea2_3b82eaedea3c4fc2bb96e0120699e85e~mv2.jpeg/v1/fill/w_1000,h_750,al_c,q_85,usm_0.66_1.00_0.01/b2bea2_3b82eaedea3c4fc2bb96e0120699e85e~mv2.jpeg',
            schedule: '18:00-20:00',
            day: 'Terça-Feira',
            emailOwner: 'leticia@gmail.com',
            nameOwner: 'Leticia Xavier',
          },
          {
            id: 5,
            name: 'Quadra de areia 2',
            description: 'Quadra de areia',
            imageUrl: 'https://clubepaineiras.org.br/wp-content/uploads/2016/07/Esporte-volei-de-praia.jpg',
            schedule: '20:00-22:00',
            day: 'Segunda-Feira',
            emailOwner: 'gustavo@gmail.com',
            nameOwner: 'Gustavo Freitas',
          }]
      spaceFake.map((el) => this.spaces.push(el))

    }
    this.requestUpdate();
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
      <sl-alert variant="danger" duration="5000" closable >Erro ao carregar reservas!</sl-alert>


      <div class="titulo">
      <h1>Minhas reservas</h1>
      </div>
      <div class="container">
        ${this.spaces.map(
      space => html`

            <div class="space-card">
              <img class="space-image" src=${space.imageUrl}/>
              <div class="space-details">
                <h2>${space.name}</h2>
                <p>${space.description}</p>
                <sl-button @click="${() => this._handleReserve(space.id)}" variant="primary">Visualizar reserva</sl-button>
                <sl-button @click="${() => this._cancelaReserva(space.id)}" variant="danger">Cancelar</sl-button>
              </div>
            </div>
          `
    )}
      </div>
      </body>

      </main>
      <app-menu></app-menu>
    `;
  }
  private _cancelaReserva(id: number) {
    console.log("Cancelar o espaço: " + id)
  }

  private _handleReserve(spaceId: number) {
    window.location.href = "espaco-info"
    console.log("Reservar o espaço: " + spaceId)
  }
}
