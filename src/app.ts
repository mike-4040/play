import express from 'express';

import { queryDb } from './dbService.js';

export default express()
    .set('port', process.env.PORT || 3000)
    .get('/', (_req, res) => res.send('Hello World!'))
    .get('/db', async (_req, res) => {
        const rows = await queryDb();
        console.log('app', rows);
        res.send(rows);
    });
