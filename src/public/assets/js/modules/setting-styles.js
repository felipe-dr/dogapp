// Imports
import Request from './request.js';

export default class SettingStyles {
  constructor(config, listBreeds, dogName, dogImage, btnSaveConfig) {
    this.config = document.querySelector(config);
    this.listBreeds = document.querySelector(listBreeds)
    this.dogName = document.querySelector(dogName);
    this.dogImage = document.querySelector(dogImage);
    this.btnSaveConfig = document.querySelector(btnSaveConfig);

    // Adiciona eventos de bind para ajustar o this
    this.handleChange = this.handleChange.bind(this);
    this.getBreedImg = this.getBreedImg.bind(this);
    this.saveConfig = this.saveConfig.bind(this);

    // Objeto de estilos
    this.handleStyle = {
      titleElement: this.dogName,
      methodGetBreedImg: this.getBreedImg,

      breed() {
        this.methodGetBreedImg();
      },

      dogName(value) {
        this.titleElement.innerText = value;
      },

      color(value) {
        this.titleElement.style.color = value;
      },

      fontFamily(value) {
        this.titleElement.style.fontFamily = value;
      },
    };
  }

  // Randomiza um índice com a imagem
  randomBreedImg(listBreed) {
    return Math.floor(Math.random() * listBreed);
  }

  // Obtêm a imagem da raça selecionada e adiciona no elemento DOM
  async getBreedImg() {
    const selectedBreed = this.listBreeds.options[this.listBreeds.selectedIndex].value;
    const url = `https://dog.ceo/api/breed/${selectedBreed}/images`;

    // Variáveis da requisição
    const request = new Request(url);
    await request.fetchUrl();
    const objImg = request.jsonData.message;

    // Adiciona tag img com a url da requisição
    this.dogImage.innerHTML = `<img src="${objImg[this.randomBreedImg(objImg.length)]}" alt="${this.listBreeds.options[this.listBreeds.selectedIndex].value}" />`;
  }

  // Cria uma lista de todas as raças obtida na requisição e adiciona no elemento DOM
  async crateDataList() {
    // Variáveis da requisição
    const request = new Request('https://dog.ceo/api/breeds/list/all');
    await request.fetchUrl();
    const objBreeds = request.jsonData.message;

    // Variáveis da lista
    let optionValues;

    Object.keys(objBreeds).forEach(key => {
      optionValues += `<option value="${key}">${key}</option>`;
    })

    // Adiciona a lista ao elemento html
    this.listBreeds.innerHTML = optionValues;
  }

  // Altera a propriedade do objeto handleStyle com o valor do target recebido
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.handleStyle[name](value);
  }

  // Adiciona o evento change para monitorar mudanças no form
  addChangeEvent() {
    this.config.addEventListener('change', this.handleChange);
  }
  
  // Adiciona o evento click
  addClickEvent() {
    this.btnSaveConfig.addEventListener('click', this.saveConfig);
  }

  // Cria um elemento e adiciona no DOM
  createMessageStatus(element, text, className, showTime) {
    const valid = document.querySelector(`.${className}`);

    if (!valid) {
      const domElement = document.createElement(element);
      domElement.innerText = text;
      domElement.classList.add(className);

      // Adiciona elemento DOM
      this.config.appendChild(domElement);

      // Remove elemento DOM após tempo desejado
      setTimeout(() => {
        this.config.removeChild(domElement);
      }, showTime);
    }
  }

  // Obtêm dados do form e salva as configurações em local storage
  saveConfig(event) {
    event.preventDefault();

    this.handleConfig = {};
    const formElements = this.config;
    for (const element of formElements) {
      if (element.name.length > 0) {
        this.handleConfig[element.name] = element.value;
      }
    }

    // Armazenando em local storage
    localStorage.config = JSON.stringify(this.handleConfig);
    const status = localStorage.config ? 'Configurações armazenadas com Sucesso' : 'Erro ao tentar salvar';

    // Fornece dados para a criação da mensagem
    this.createMessageStatus('span', `${status}`, 'c-status', 2000);
  }

  // Carrega as configurações do local storage
  setConfig() {
    if (localStorage.config) {
      const storedConfig = JSON.parse(localStorage.config);
      const keys = Object.keys(storedConfig);

      keys.forEach((key) => {
        this.handleStyle[key](storedConfig[key]);
        this.config.elements[key].value = storedConfig[key];
      });
    }
  }

  // Inicialização
  async init() {
    if (this.config && this.listBreeds && this.dogName && this.dogImage && this.saveConfig) {
      this.addChangeEvent();
      this.addClickEvent();
      await this.crateDataList();
      this.getBreedImg();
      this.setConfig();
    }
    return this;
  }
}
