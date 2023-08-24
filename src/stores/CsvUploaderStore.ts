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
    
    /*** Maneja el evento change del input file*/
    handleFileChange(event) {
        console.log("handleFileChange...");
        const file = event;
        const reader = new FileReader();
        this.selectedFile = file;
  
        //Evento de carga para el reader
        reader.onload = () => {
          this.csvContent = reader.result;
        };
  
        //Se procesa el archivo como texto
        reader.readAsText(file);
      },

      /** Valida que el archivo se cargue */
      uploadCsv() {
        console.log("uploadCsv...");
        if (this.selectedFile) {
          this.uploadFile(this.selectedFile);
        }else {
          // El archivo no se ha subido
          alert('Por favor, seleccione el archivo csv.');
        }

        /*if (this.selectedFile) {
          //console.log("Archivo seleccionado");
          const extension = this.selectedFile.name.split('.').pop().toLowerCase();
          if (extension === 'csv') {
            console.log("Archivo seleccionado");
            this.uploadFile(this.selectedFile);
          } else {
            // El archivo no es un CSV
            alert('Por favor, seleccione un archivo CSV.');
          }
        }*/
      },

      /** Sube el archivo CSV a la API */
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

        let counter = 0;
        for (const item of jsonObjects) {
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
            await new Promise(resolve => setTimeout(resolve, 500));
          } else {
            // Hubo un error al subir el item
            console.log('Error el cargar el Item ' + counter + '.');
          }
        } catch (error) {
          // Manejar errores de red u otros errores
        }
      }
      //this.jsonData = await this.getData();
      //this.showTable = true;
      },

      /** Formatea el número de teléfono */
      formatPhoneNumber(phone) {
        const regex = /(\d{3})(\d{3})(\d{4})/; // Expresión regular para eliminar caracteres no numéricos
        //Verificar si el número tiene 9 caracteres
        if (phone.length === 8) {
          phone = phone + '00'; // Agregar un cero al final
          return phone.replace(regex, '$1-$2-$3'); // Aplicar formato
        }
        //Verificar si el número tiene 9 caracteres
        if (phone.length === 9) {
          phone = phone + '0'; // Agregar un cero al final
          return phone.replace(regex, '$1-$2-$3'); // Aplicar formato
        }
        //Verificar si el número tiene 10 caracteres
        if (phone.length === 10) {
          return phone.replace(regex, '$1-$2-$3'); // Aplicar formato
        }
        return phone; //Devolver sin cambios si no cumple con las condiciones
      },

      /** Obtiene la data de la API para mostrarla en la tabla */
      async getData() {
        try {
        const response = await fetch(GETurl);
        if (response.ok) {
          console.log('Data obtenida correctamente.');
          this.jsonData = await response.json(); // Actualiza directamente la propiedad reactiva
          this.showTable = true; // Actualiza directamente la propiedad reactiva
          return this.jsonData;
          } else {
            console.error('Error en la solicitud:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Se produjo un error al obtener la data: ', error.message);
        }
      }
  }
});