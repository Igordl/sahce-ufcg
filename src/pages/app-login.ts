
import { LitElement, css, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';

import { styles } from '../styles/shared-styles';
import axios from 'axios';

/*interface Person {
    email: string
    id: number
    name: string
    phone: string
    username: string
    website: string
}*/


@customElement('app-login')
export class AppLogin extends LitElement {

    // For more information on using properties and state in lit
    // check out this link https://lit.dev/docs/components/properties/
    @query('sl-alert') private alertElement: HTMLElement | undefined;
    @property() message = 'Login!';
    @property({ type: String })
    email: string = '';

    @property({ type: String })
    password: string = '';

    axios = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 1000,
        headers: { 'X-Custom-Header': 'foobar' }
    });

    static get styles() {
        return [
            styles,
            css`
            .container {
                display: flex;
                justify-content: center;
              }
              .login-form {
                padding: 40px;
                background-color: #fff;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              .logo-container {
                display: flex;
                justify-content: center;
                margin-bottom: 40px;
              }
              .logo-image {
                width: 30%;
                height: auto;
              }
              h1 {
                margin-top: 0;
                Text-align: center
              }
              label {
                display: block;
                margin-bottom: 10px;
              }
              sl-input[type='text'],
              sl-input[type='password'] {
                width: 100%;
                padding: 10px;
                margin-bottom: 20px;
              }
              sl-button {
                display: block;
                width: 100%;
                padding: 10px;
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
        console.log('This is your login page');
    }

    private _handleEmailInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.email = target.value;
    }

    private _handlePasswordInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.password = target.value;
    }

    private _handleSubmit(event: Event) {
        event.preventDefault();
        // Send login request with this.username and this.password
    }

    private _isFormValid() {
        return this.email && this.password;
    }

    share() {
        if ((navigator as any).share) {
            (navigator as any).share({
                title: 'Login - SAHCE UFCG',
                text: 'Login - SAHCE UFCG!'
            });
        }
    }






    render() {
        return html`
        <sl-alert variant="danger" duration="5000" closable >Usuário e/ou senha incorretos!</sl-alert>

            <main>

            <body>
                <div class="container">
                    <div class="login-form">
                        <div class="logo-container">
                            <img
                            class="logo-image"
                            src="../assets/login/ufcg-logo.png"
                            alt="Logo"
                            />
                        </div>
                        <h1>SAHCE - UFCG</h1>
                        <form @submit=${this._handleSubmit}>
                                <sl-input type="text" id="username" name="username" placeholder="Usuário"
                                @input=${this._handleEmailInput}
                                >
                                </sl-input>
                                <sl-input type="password" name="password" placeholder="Senha" password-toggle
                                @input=${this._handlePasswordInput}
                                >
                                </sl-input>
                                <sl-button id="login"  type="submit"  box-arrow-in-right @click=${this._Login} ?disabled=${!this._isFormValid()}>Login</sl-button>
                                <sl-button href="${(import.meta as any).env.BASE_URL}cadastro" type="submit" variant="primary" >Cadastrar-se</sl-button>
                                <sl-button href="${(import.meta as any).env.BASE_URL}reset" variant="text" size="small">Esqueci a senha!</sl-button>

                        </form>
                    </div>
                </div>
            </body>
        </main>    `;
    }

    _Login() {
        let user = {
            "email": this.email,
            "password": this.password
        };

        this.axios.post(`/user/login`, user)
            .then((res) => {
                if (res.data.type == "ADMIN") {
                    window.location.href = "/home-admin";
                } else {
                    window.location.href = "/home";
                }
            }).catch(() => {
                this.alertElement?.setAttribute("open", "open");

            });





    }
    sleep = (ms: number) => new Promise(r => setTimeout(r, ms));





}


