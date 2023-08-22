<template>
    <div>
      <input type="file" @change="handleFileChange" />
      <button @click="uploadCsv">Subir CSV</button>
    </div>
  </template>

<script>
import Papa from 'papaparse';

export default {
  data() {
    return {
      csvContent: '',
      jsonData: null
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
      const json = [];
      const jsonObjects = [];

      for (const row of result.data) {
        json.push({
          name: row[0],
          phone: row[1],
          email: row[2]
        });
        console.log("json: " + json);
        const phone = this.formatPhoneNumber(row[1]);
        const jsonObject = {
          name: row[0],
          phone: phone,
          email: row[2]
        };
        jsonObjects.push(jsonObject);
      }
      
      this.jsonData = json;

      //console.log(json);
      console.log(jsonObjects);

      for (const item of jsonObjects) {
        console.log(item);
      /*try {
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
      }*/
    }
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
    }
  }
};
</script>