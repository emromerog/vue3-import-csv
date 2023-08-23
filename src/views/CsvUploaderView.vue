<template>
    <div>
      <input type="file" @change="handleFileChange($event.target.files[0])" />
      <button class="bg-blue-500" @click="uploadCsv">Subir CSV</button>
  
      
    </div>
    <!-- Renderizar la tabla aquí
    <CsvTable />-->



  </template>
  
  <script setup>
  import { onBeforeMount } from 'vue';
  import { useCsvStore } from '../stores/CsvUploaderStore.ts';
  import CsvTable from '../views/CsvTableView.vue';
  
  const store = useCsvStore();

  /*const initializeCsvData = async () => {
    await store.initializeData();
    const showTable = store.showTable;
  console.log('showTable csvTable: ', showTable);
  const jsonData = store.jsonData;
  console.log('jsonData csvTable: ', jsonData.items);
  };

onBeforeMount(async () => {
  // Llamar automáticamente a initializeData cuando el componente está a punto de montarse
  await initializeCsvData();
});*/
  
  
  const handleFileChange = store.handleFileChange;
  const uploadCsv = store.uploadCsv;
  //const jsonData = store.getJsonDataItems();
  </script>