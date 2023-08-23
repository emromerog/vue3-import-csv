import { defineStore } from 'pinia';
import Papa from 'papaparse';
const POSTurl = 'https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items';
const GETurl = 'https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items';

export const useCsvStore = defineStore('csvStore', {
  state: () => ({
    csvContent: '',
    jsonData: [],
    showTable: false,
    selectedFile: null,
  }),
  actions: {
    async initializeData() {
      console.log("initializeData...");
      this.jsonData = await this.getData();
      console.log("initializeData count: " + this.jsonData.count);
      console.log("initializeData items: " + this.jsonData.items);
      if (this.jsonData.count > 0) {
        this.showTable = true;
      }
    },
    handleFileChange(event) {
        console.log("handleFileChange...");
        const file = event;
        const reader = new FileReader();
        this.selectedFile = file;
  
        reader.onload = () => {
          this.csvContent = reader.result;
        };
  
        reader.readAsText(file);
      },
      uploadCsv() {
        console.log("uploadCsv...");
        if (this.selectedFile) {
            console.log("Archivo seleccionado");
            this.uploadFile(this.selectedFile);
        }
      },

      async uploadFile(file) {
        console.log("uploadFile...");
        const result = Papa.parse(this.csvContent, { header: false });
        const jsonObjects = [];
  
        for (const row of result.data) {
          const phone = this.formatPhoneNumber(row[1]);
          const jsonObject = {
            name: row[0],
            phone: phone,
            email: row[2]
          };
          jsonObjects.push(jsonObject);
        }

        console.log(jsonObjects);
        let counter = 0;
        for (const item of jsonObjects) {
          //console.log(item);
        try {
          const response = await fetch(POSTurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(item)
          });

          counter = counter + 1;

          if (response.ok) {
            // El item se subió exitosamente
            console.log('Item ' + counter + ' cargado exitosamente.');
          } else {
            // Hubo un error al subir el item
            console.log('Error el cargar el Item ' + counter + '.');
          }
        } catch (error) {
          // Manejar errores de red u otros errores
        }
      }
      this.jsonData = await this.getData();
      console.log("uploadFile jsonData: " + this.jsonData.count);
      this.showTable = true;
      console.log("uploadFile showTable: " + this.showTable);
      },
      formatPhoneNumber(phone) {
        // Verificar si el número tiene 9 caracteres
        if (phone.length === 9) {
          phone = phone + '0'; // Agregar un cero al final
          return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // Aplicar formato
        }
        // Verificar si el número tiene 10 caracteres
        if (phone.length === 10) {
          return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'); // Aplicar formato
        }
        return phone; // Devolver sin cambios si no cumple con las condiciones
      },
      async getData() {
        try {
        const response = await fetch(GETurl);
        if (response.ok) {
          console.log('Data obtenida correctamente.');
          //this.showTable = true;
          return await response.json();
          } else {
            console.error('Error en la solicitud:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Se produjo un error al obtener la data: ', error.message);
        }
      }
  },
  getters: {
    getJsonDataItems() {
      return this.jsonData;
    }
  }
});