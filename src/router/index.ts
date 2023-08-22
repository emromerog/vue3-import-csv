import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../components/HelloWorld.vue';
import Csv from '../components/CsvUploader.vue';
//import CsvUploader from '../views/CsvUploaderView.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/csv',
        name: 'Csv',
        component: Csv
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;