<template>
    <!-- Input file -->
    <div>
      <input type="file" @change="handleFileChange($event.target.files[0])" />
      <button class="bg-blue-500" @click="uploadCsv">Subir CSV</button>
  
    <!-- Tabla -->
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
</div>



  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useCsvStore } from '../stores/CsvUploaderStore.ts';
  
  const store = useCsvStore();

  const handleFileChange = store.handleFileChange;
  const uploadCsv = store.uploadCsv;
  const showTable = ref(false); // Inicialmente, la tabla no se muestra
  const jsonData = ref([]); // Inicialmente, no hay datos

  //console.log('showTable csvTable: ', showTable);

  onMounted(async () => {
  await store.getData();
  jsonData.value = store.jsonData;
  if (jsonData.value.count > 0) {
    showTable.value = true; // Mostrar la tabla si hay datos
  }

});
  </script>