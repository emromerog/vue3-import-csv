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
      console.log("Hola");
      if (this.selectedFile) {
        // Aquí puedes llamar a una función para enviar el archivo al endpoint
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
        const jsonObject = {
          name: row[0],
          phone: row[1],
          email: row[2]
        };
        jsonObjects.push(jsonObject);
      }
      
      this.jsonData = json;

      //console.log(json);
      console.log(jsonObjects);

      for (const item of jsonObjects) {
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
    }
  }
};
</script>