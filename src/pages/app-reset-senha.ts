import { LitElement, css, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

import axios from 'axios';

import { styles } from '../styles/shared-styles';

@customElement('app-reset-senha')
export class AppResetSenha extends LitElement {

    // For more information on using properties and state in lit
    // check out this link https://lit.dev/docs/components/properties/
    @property() message = 'Reset de senha!';
    @property({ type: String })
    username: string = '';

    @property({ type: String })
    password: string = '';

    @property({ type: String })
    passwordConf: string = '';

    @property({ type: String })
    token: string = '';

    @query('.alertErro') private alertElementErro?: HTMLElement;
    @query('.alertSuccess') private alertElementSuccess?: HTMLElement;

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
        console.log('This is your reset de senha page');
    }

    private _handleUsernameInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.username = target.value;
    }

    private _handlePasswordInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.password = target.value;
    }

    private _handleTokenInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.password = target.value;
    }

    private _handlePasswordConfInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.passwordConf = target.value;
    }

    private _handleSubmit(event: Event) {
        event.preventDefault();
        // Send login request with this.username and this.password
    }

    private _isFormValid() {
        return this.username && this.password;
    }

    private _isEmailValid() {
        return this.username;
    }

    share() {
        if ((navigator as any).share) {
            (navigator as any).share({
                title: 'Reset - SAHCE UFCG',
                text: 'Reset - SAHCE UFCG!'
            });
        }
    }

    _requestResetPassword() {
        console.log("Enviando email!")
        axios.post(`http://localhost:8080/v1/anonymous/requestResetPassword`,
            {
                "email": this.username
            })
            .then(async () => {
                console.log("Response deu certo")
                this.alertElementSuccess?.setAttribute("open", "open");
            }).catch(async () => {
                console.log("Erro!")
                this.alertElementErro?.setAttribute("open", "open");
            });
    }

    sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    render() {
        return html`
            <sl-alert variant = 'success' duration="10000" class="alertSuccess" closable>Email com token enviado</sl-alert>
            <sl-alert variant = 'danger' duration="5000" class="alertErro" closable>Erro ao enviar o email!</sl-alert>
            <main>
            <body>
                <div class="container">
                    <div class="login-form">
                    <sl-button id="login" href="${(import.meta as any).env.BASE_URL}login/" variant="text">
                    < Login
                </sl-button>
                        <h1>Reset de senha</h1>
                                <form>
                                <sl-input type="email" id="email" name="email" placeholder="E-mail"
                                @input=${this._handleUsernameInput}
                                ></sl-input>
                                <sl-button type="submit" ?disabled=${!this._isEmailValid()} @click=${this._requestResetPassword()} variant="primary">
                                Enviar token
                                </sl-button>
                                </form>
                                <form @submit=${this._handleSubmit}>
                                <sl-input
                                type="text"
                                id="token"
                                name="token"
                                placeholder="Token"
                                @input=${this._handleTokenInput}
                                required
                                ></sl-input>
                                <sl-input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Senha"
                                @input=${this._handlePasswordInput}
                                required
                                ></sl-input>
                                <sl-input
                                type="password"
                                id="passwordConf"
                                name="passwordConf"
                                placeholder="Repita senha"
                                @input=${this._handlePasswordConfInput}
                                required
                                ></sl-input>
                                <sl-button type="submit" ?disabled=${!this._isFormValid()} variant="primary">
                                Resetar senha
                                </sl-button>


                        </form>
                    </div>
                </div>
            </body>
        </main>    `;
    }
}
