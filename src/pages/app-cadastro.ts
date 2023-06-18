
import { LitElement, css, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import axios from 'axios';

import { styles } from '../styles/shared-styles';
/*interface User {
    name: string;
    password: string;
    address: string;
    email: string;
    phone: string;
    userType: string;
}*/

@customElement('app-cadastro')
export class AppCadastro extends LitElement {

    @property() message = 'Cadastro!';
    @property({ type: String })
    name: string = '';

    @property({ type: String })
    email: string = '';

    @property({ type: String })
    phone: string = '';

    @property({ type: String })
    doc: string = '';

    @property({ type: String })
    address: string = '';

    @property({ type: Object })
    docFile: string = '';

    @property({ type: String })
    password: string = '';

    @property({ type: String })
    passwordConf: string = 'conf';

    @query('sl-alert') private alertElement: undefined | HTMLElement;
    @query('#userType') private userType: any;


    axios = axios.create({
        baseURL: 'http://localhost:8080/v1',
        timeout: 1000,
        headers: { 'X-Custom-Header': 'foobar' }
    });

    static get styles() {
        return [
            styles,
            css`
            .container {
                display: block;
                justify-content: center;
              }
              .registration-form {
                padding: 40px;
                background-color: #fff;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                margin-top: 0;
                Text-align: center
              }
              sl-input[type='text'],
              sl-input[type='email'],
              sl-input[type='date'],
              sl-input[type='file'],
              sl-input[type='password'],
              sl-radio-group {
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
        console.log('This is your cadastro page');
    }

    share() {
        if ((navigator as any).share) {
            (navigator as any).share({
                title: 'Cadastro - SAHCE UFCG',
                text: 'Cadastro - SAHCE UFCG!'
            });
        }
    }

    render() {
        return html`
        <sl-alert variant="danger" duration="5000" closable >Usuário não pôde ser cadastrado!</sl-alert>
            <main>

            <body>
      <div class="container">
        <div class="registration-form">
        <sl-button id="login" href="${(import.meta as any).env.BASE_URL}login/" variant="text">
                < Login
            </sl-button>
            <h1>Cadastro</h1>
            <form @submit=${this._handleSubmit}>
                <sl-input
                type="text"
                id="username"
                name="username"
                placeholder="Nome completo"
                @input=${this._handleNameInput}
                required
                ></sl-input>
                <sl-input
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                @input=${this._handleEmailInput}
                required
                ></sl-input>
                <sl-input
                type="text"
                id="telefone"
                name="telefone"
                placeholder="Celular"
                @input=${this._handlePhoneInput}
                required
                ></sl-input>
                <sl-input
                type="text"
                id="address"
                name="address"
                placeholder="Endereço"
                @input=${this._handleAddressInput}
                required
                ></sl-input>
                <sl-input
                type="text"
                id="doc"
                name="identificacao"
                placeholder="Nº Matricula/ CPF"
                @input=${this._handleDocInput}
                required
                ></sl-input>

                <sl-radio-group id="userType" name="a">
                    <sl-radio-button value="INTERNAL_USER">Aluno(a)</sl-radio-button>
                    <sl-radio-button value="EXTERNAL_USER">Comunidade</sl-radio-button>
                </sl-radio-group>
                <sl-input
                type="file"
                id="docFile"
                name="arquivo"
                @input=${this._handleDocFileInput}
                closable
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

                <sl-button type="submit" ?disabled=${!this._isFormValid()} @click=${this._cadastro} variant="primary">
                Cadastrar
                </sl-button>
          </form>
        </div>
      </div>
      </body>
      </main>
    `;
    }

    private _handleNameInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.name = target.value;
    }

    private _handleEmailInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.email = target.value;
    }

    private _handlePhoneInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.phone = target.value;
    }
    private _handleAddressInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.address = target.value;
    }


    private _handleDocInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.doc = target.value;
    }



    private _handleDocFileInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.docFile = target.value;

    }

    private _handlePasswordInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.password = target.value;
    }

    private _handlePasswordConfInput(event: Event) {
        const target = event.target as HTMLInputElement;
        this.passwordConf = target.value;
    }

    private _handleSubmit(event: Event) {
        event.preventDefault();
        // Send registration request with this.username, this.email, and this.password
    }


    private _cadastro() {

        let cadastro = {
            name: this.name,
            password: this.password,
            email: this.email,
            phone: this.phone,
            address: this.address,
            userType: this.userType.value as String
        };
        console.log(cadastro);
        this.axios.post(`/anonymous/users`, cadastro).then(() => {
            console.log("Cadastro solicitado");
            //window.location.href = "/login";
        }).catch(() => {
            this.alertElement?.setAttribute("open", "open");
        });
        this.axios.post(`/anonymous/users/documentPicture`, this.docFile).then(() => {
            console.log("Cadastro solicitado");
        }).catch(() => {
            this.alertElement?.setAttribute("open", "open");
        });

    }

    sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

    private _isFormValid() {
        return this.name && this.email && this.doc && this.docFile && this.password == this.passwordConf;
    }
}
