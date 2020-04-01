(function (factory) {
  typeof define === 'function' && define.amd ? define('script', factory) :
  factory();
}((function () { 'use strict';

  class Request {
    constructor(url) {
      this.url = url;
    }

    async fetchUrl() {
      try {
        const responseData = await fetch(this.url);
        const responseJson = await responseData.json();
        this.jsonData = responseJson;
      } catch (error) {
        console.log(error);
      }
    }

  }

  // Imports
  class SettingStyles {
    constructor(config, listBreeds, listColors, listFontFamily, resultDogName, resultDogImage, btnSaveConfig) {
      this.config = document.querySelector(config);
      this.listBreeds = document.querySelector(listBreeds);
      this.listColors = document.querySelector(listColors);
      this.listFontFamily = document.querySelector(listFontFamily);
      this.resultDogName = document.querySelector(resultDogName);
      this.resultDogImage = document.querySelector(resultDogImage);
      this.btnSaveConfig = document.querySelector(btnSaveConfig); // Adiciona eventos de bind para ajustar o this

      this.handleChange = this.handleChange.bind(this);
      this.getBreedImg = this.getBreedImg.bind(this);
      this.saveConfig = this.saveConfig.bind(this); // Objeto de estilos

      this.handleStyle = {
        titleElement: this.resultDogName,
        methodGetBreedImg: this.getBreedImg,

        breed() {
          // Intervalo de tempo para carregar a raça corretamente
          setTimeout(() => {
            this.methodGetBreedImg();
          }, 50);
        },

        dogName(value) {
          this.titleElement.innerText = value;
        },

        color(value) {
          this.titleElement.style.color = value;
        },

        fontFamily(value) {
          this.titleElement.style.fontFamily = value;
        }

      };
    } // 


    startHandleStyleRender() {
      this.resultDogName.style.color = this.listColors.options[this.listColors.selectedIndex].value;
      this.resultDogName.style.fontFamily = this.listFontFamily.options[this.listFontFamily.selectedIndex].value;
    } // Randomiza um índice com a imagem


    randomBreedImg(listBreed) {
      return Math.floor(Math.random() * listBreed);
    } // Obtêm a imagem da raça selecionada e adiciona no elemento DOM


    async getBreedImg() {
      const selectedBreed = this.listBreeds.options[this.listBreeds.selectedIndex].value;
      const url = `https://dog.ceo/api/breed/${selectedBreed}/images`; // Variáveis da requisição

      const request = new Request(url);
      await request.fetchUrl();
      const objImg = request.jsonData.message; // Adiciona tag img com a url da requisição

      this.resultDogImage.innerHTML = `<img src="${objImg[this.randomBreedImg(objImg.length)]}" alt="${this.listBreeds.options[this.listBreeds.selectedIndex].value}" />`;
    } // Cria uma lista de todas as raças obtida na requisição e adiciona no elemento DOM


    async crateDataList() {
      // Variáveis da requisição
      const request = new Request('https://dog.ceo/api/breeds/list/all');
      await request.fetchUrl();
      const objBreeds = request.jsonData.message; // Variáveis da lista

      let optionValues;
      Object.keys(objBreeds).forEach(key => {
        optionValues += `<option value="${key}">${key}</option>`;
      }); // Adiciona a lista ao elemento html

      this.listBreeds.innerHTML = optionValues;
    } // Altera a propriedade do objeto handleStyle com o valor do target recebido


    handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      this.handleStyle[name](value);
    } // Adiciona o evento change para monitorar mudanças no form


    addChangeEvent() {
      this.config.addEventListener('change', this.handleChange);
    } // Adiciona o evento click


    addClickEvent() {
      this.btnSaveConfig.addEventListener('click', this.saveConfig);
    } // Cria um elemento e adiciona no DOM


    createMessageStatus(element, text, className, showTime) {
      const valid = document.querySelector(`.${className}`);

      if (!valid) {
        const domElement = document.createElement(element);
        domElement.innerText = text;
        domElement.classList.add(className); // Adiciona elemento DOM

        this.config.appendChild(domElement); // Remove elemento DOM após tempo desejado

        setTimeout(() => {
          this.config.removeChild(domElement);
        }, showTime);
      }
    } // Obtêm dados do form e salva as configurações em local storage


    saveConfig(event) {
      event.preventDefault();
      this.handleConfig = {};
      const formElements = this.config;

      for (const element of formElements) {
        if (element.name.length > 0) {
          this.handleConfig[element.name] = element.value;
        }
      } // Armazenando em local storage


      localStorage.config = JSON.stringify(this.handleConfig);
      const status = localStorage.config ? 'Configurações armazenadas com Sucesso' : 'Erro ao tentar salvar'; // Fornece dados para a criação da mensagem

      this.createMessageStatus('span', `${status}`, 'c-status', 2000);
    } // Carrega as configurações do local storage


    setConfig() {
      if (localStorage.config) {
        const storedConfig = JSON.parse(localStorage.config);
        const keys = Object.keys(storedConfig);
        keys.forEach(key => {
          this.handleStyle[key](storedConfig[key]);
          this.config.elements[key].value = storedConfig[key];
        });
      }
    } // Inicialização


    async init() {
      if (this.config && this.listBreeds && this.listColors && this.listFontFamily && this.resultDogName && this.resultDogImage && this.saveConfig) {
        await this.crateDataList();
        this.setConfig();
        this.getBreedImg();
        this.startHandleStyleRender();
        this.addChangeEvent();
        this.addClickEvent();
      }

      return this;
    }

  }

  // Imports
  const settingStyles = new SettingStyles('[data-setting="config"]', '[data-setting="listBreeds"]', '[data-setting="listColors"]', '[data-setting="listFontFamily"]', '[data-setting="resultDogName"]', '[data-setting="resultDogImage"]', '[data-setting="saveConfig"]');
  settingStyles.init();

})));
