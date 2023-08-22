<template>
    <div>
      <input type="file" @change="handleFileChange" />
      <button @click="uploadCsv">Subir CSV</button>
    </div>

    <div>
    <table v-if="showTable" class="border-collapse border border-green-800">
      <thead>
        <tr>
          <th class="border border-green-600 px-4 py-2">Nombre</th>
          <th class="border border-green-600 px-4 py-2">Teléfono</th>
          <th class="border border-green-600 px-4 py-2">Correo electrónico</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in jsonData" :key="index">
          <td class="border border-green-600 px-4 py-2">{{ item.name }}</td>
          <td class="border border-green-600 px-4 py-2">{{ item.phone }}</td>
          <td class="border border-green-600 px-4 py-2">{{ item.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>


  </template>

<script>
import Papa from 'papaparse';

export default {
  data() {
    return {
      csvContent: '',
      jsonData: null,
      showTable: false,
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      this.selectedFile = event.target.files[0];

      reader.onload = () => {
        this.csvContent = reader.result;
      };

      reader.readAsText(file);
    },
    uploadCsv() {
      if (this.selectedFile) {
        //Llamar a una función para enviar el archivo al endpoint
        this.uploadFile(this.selectedFile);
      }
    },
    async uploadFile(file) {
      const result = Papa.parse(this.csvContent, { header: false });
      //const json = [];
      const jsonObjects = [];

      for (const row of result.data) {
        /*json.push({
          name: row[0],
          phone: row[1],
          email: row[2]
        });*/
        //console.log("json: " + json);
        const phone = this.formatPhoneNumber(row[1]);
        const jsonObject = {
          name: row[0],
          phone: phone,
          email: row[2]
        };
        jsonObjects.push(jsonObject);
      }
      
      //this.jsonData = json;

      //console.log(json);
      //console.log(jsonObjects);

      for (const item of jsonObjects) {
        console.log(item);
      try {
        const response = await fetch('https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });

        if (response.ok) {
          // El archivo se subió exitosamente
        } else {
          // Hubo un error al subir el archivo
        }
      } catch (error) {
        // Manejar errores de red u otros errores
      }
    }
    await this.getData();
    //this.jsonData = jsonObjects;
    },
    formatPhoneNumber(phone) {
      console.log(phone)
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
      const response = await fetch('https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items');
      console.log("DATA: " + response) ;
      this.jsonData = response;
      if (response.ok) {
          //Los datos se obtuviero exitosamente
          this.showTable = true;
        } else {
          console.log("Pailas") ;
        }
      //return this.jsonData;
    }
  }
};
</script>