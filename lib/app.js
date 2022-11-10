import express from 'express';
export default express()
    .set('port', process.env.PORT || 3000)
    .get('/', (_req, res) => res.send('Hello World!'));
//# sourceMappingURL=app.js.map