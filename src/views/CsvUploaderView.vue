<template>
    <div>
      <input type="file" @change="handleFileChange" />
      <button @click="uploadCsv">Subir CSV</button>
    </div>
</template>