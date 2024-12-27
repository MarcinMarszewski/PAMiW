const Response = require('./serverModels/responseModel.js');

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const chat_rooms_data_path = path.join(__dirname, 'data/chat_rooms.json');
let chat_rooms = {};

if(fs.existsSync(chat_rooms_data_path)) {
    const chat_rooms_data = fs.readFileSync(chat_rooms_data_path);
    chat_rooms = JSON.parse(chat_rooms_data);
}

function saveChatRooms() {
    fs.writeFileSync(chat_rooms_data_path, JSON.stringify(chat_rooms));
}

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const msg_parsed = JSON.parse(message);
        const { type, room, username, text } = msg_parsed;

        if (type === 'join') {
            ws.room = room;
            ws.username = username;
            if (!chat_rooms[room])
                chat_rooms[room] = [];
            const response = new Response('history',room, username, '', chat_rooms[room]);
            ws.send(JSON.stringify(response));
        }
        else if (type === 'message' || type === 'image') {
            const response = new Response(type, ws.room, username, text);
            chat_rooms[ws.room].push(response);
            saveChatRooms(); 
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN && client.room === ws.room) {
                    client.send(JSON.stringify(response));
                }
            });
        }
    });
});

app.use(express.static('public'));

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});