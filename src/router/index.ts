import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../components/HelloWorld.vue';
import CsvUploader from '../components/CsvUploader.vue';
//import CsvUploader from '../views/CsvUploaderView.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/csv',
        name: 'CsvUploader',
        component: CsvUploader
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;