<template>

    <!-- Input file -->
    <div>
      <input type="file" @change="handleFileChange" />
      <button class="bg-blue-500" @click="uploadCsv">Subir CSV</button>
    </div>  
    
    <!-- Table -->
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table v-if="showTable" class="min-w-full">
              <thead class="bg-gray-200 border-b">
                <tr>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">#</th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Nombre</th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Teléfono</th>
                  <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Correo electrónico</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" v-for="(item, index) in jsonData.items" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1 }}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ item.phone }}</td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ item.email }}</td>
                </tr>
              </tbody>
            </table>
            <p v-else>No hay datos para mostrar.</p>
          </div>
        </div>
      </div>
    </div>
  
  </template>

<script>
import Papa from 'papaparse';

export default {
  data() {
    return {
      csvContent: '',
      jsonData: [],
      showTable: false,
    };
  },
  async mounted() {
      this.jsonData = await this.getData();
      if (this.jsonData.count > 0){
        this.showTable = true;
      }
    },
  methods: {
    handleFileChange(event) {
      console.log('handleFileChange.');
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
        this.uploadFile(this.selectedFile);
      }
    },
    async uploadFile(file) {
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
      
      for (const item of jsonObjects) {
        //console.log(item);
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
    this.jsonData = await this.getData();
    this.showTable = true;
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
      try {
      const response = await fetch('https://8j5baasof2.execute-api.us-west-2.amazonaws.com/production/tests/trucode/items');
      if (response.ok) {
        console.log('Data obtenida correctamente');
        //this.showTable = true;
        return await response.json();
        console.log(this.jsonData);
        } else {
          console.error('Error en la solicitud:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Se produjo un error: ', error.message);
      }
    }
  }
};
</script>