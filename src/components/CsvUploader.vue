<template>
    <div>
      <input type="file" @change="handleFileChange" />
      <button @click="uploadCsv">Subir CSV</button>
    </div>
  </template>

<script>
export default {
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadCsv() {
      console.log("Hola");
      if (this.selectedFile) {
        // Aquí puedes llamar a una función para enviar el archivo al endpoint
        this.uploadFile(this.selectedFile);
      }
    },
    async uploadFile(file) {
      const formData = new FormData();
      formData.append('csvFile', file);

      console.log("Hola");

      try {
        const response = await fetch('URL_DEL_ENDPOINT', {
          method: 'POST',
          body: formData
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
};
</script>