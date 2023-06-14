
import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/button/button.js';

@customElement('app-menu')
export class AppMenu extends LitElement {
    @property({ type: String }) title = 'MENUUUU';
    @property() reservas: boolean = true;
    @property() home: boolean = false;
    @property() login: boolean = true;



    static get styles() {
        return css`
        menu {
            display: flex;
            background-color: #d0d0d0;
            position: fixed;
            height: 60px;
            right:0;
            left:0;
            weight: auto;
            bottom:0;
            padding-inline-start: 0;
            margin-bottom: 0;


          }
          sl-button {
            display: block;
            width: 33%;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            left:0;
            right:0;
          }


    `;
    }

    constructor() {
        super();
    }




    private _changeMenu() {
        let path = window.location.pathname;
        console.log("Menu: " + path);
        console.log("Reserva: " + this.reservas);
        console.log("Home: " + this.home);
        console.log("Login: " + this.login);


        if (path === "/reservas") {
            this.reservas = false;
            this.home = true;
            this.login = true;

        }
        else if (path === "/home") {
            this.reservas = true;
            this.home = false;
            this.login = true;
        }
        else if (path === "/login") {
            this.reservas = true;
            this.home = true;
            this.login = false;

        } else {
            this.reservas = true;
            this.home = true;
            this.login = true;
        }


    }

    async firstUpdated() {
        // this method is a lifecycle even in lit
        // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/
        console.log('This is your login page');
    }

    render() {
        return html`
      <menu>

        <sl-button href="${(import.meta as any).env.BASE_URL}reservas" @click=${this._changeMenu()} ?disabled=${!this.reservas}>
              Reservas
        </sl-button>
        <sl-button  href="${(import.meta as any).env.BASE_URL}home" @click=${this._changeMenu()} ?disabled=${!this.home}>
            Home
        </sl-button>
        <sl-button  href="${(import.meta as any).env.BASE_URL}login" @click=${this._changeMenu()} ?disabled=${!this.login}>
            Login
        </sl-button>



      </menu>

    `;
    }
}
