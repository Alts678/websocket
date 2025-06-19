 const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(__dirname + '/public'));

wss.on('connection', (ws) => {
    console.log('🟢 Novo cliente conectado');

    ws.on('message', (message) => {
        console.log(`💬 Mensagem recebida: ${message.toString()}`);

        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('🔴 Cliente desconectou');
    });

    ws.on('error', (err) => {
        console.log(`❌ Erro: ${err.message}`);
    });

    ws.send('👋 Conectado ao servidor WebSocket!');
});

server.listen(8080, () => {
    console.log('Servidor rodando em http://localhost:8080');
});
