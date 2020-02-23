import express from 'express';
import App from '../components/App';
import React from 'react';
import ReactDOMServer from 'react-dom/server'

const server = express()
server.use(express.static('dist'))

server.get('/', (req, res) => {
    const initialMarkup = ReactDOMServer.renderToString(<App></App>)
    res.send(`
    <html>
        <head>
            <title>Sample React App</title>
        </head>
        <body>
            <div id="mountNode">${initialMarkup}</div>
            <script src="/main.js"></script>
        </body>
    </html>
    `)
})

server.listen(4242, () => console.log('Server is running...'))