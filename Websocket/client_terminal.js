const WebSocket = require('ws');
const readline = require('readline');

// 🔥 Altere aqui seu link local ou do Ngrok
const ws = new WebSocket('https://cf3c-45-70-21-123.ngrok-free.app');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

ws.on('open', () => {
    console.log('🟢 Conectado ao servidor WebSocket via terminal!');

    rl.setPrompt('Você (terminal): ');
    rl.prompt();

    rl.on('line', (line) => {
        ws.send(`Terminal: ${line}`);
        rl.prompt();
    });
});

ws.on('message', (message) => {
    console.log(`\n💬 ${message}`);
    rl.prompt();
});

ws.on('close', () => {
    console.log('🔴 Conexão encerrada');
    process.exit(0);
});

ws.on('error', (error) => {
    console.log(`❌ Erro: ${error.message}`);
});
