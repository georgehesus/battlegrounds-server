// server.js

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

// Пример простого ИИ
function simpleAI(gameState) {
    let decision = { action: "wait" };

    if (gameState.gold >= 3 && gameState.shop.length > 0) {
        decision = {
            action: "buy",
            index: Math.floor(Math.random() * gameState.shop.length)
        };
    } else if (gameState.gold >= 1) {
        decision = { action: "rollShop" };
    }

    return decision;
}

// Хранилище состояния игр
const games = {};

// Получение решения от ИИ
app.post('/ai', (req, res) => {
    const gameState = req.body;
    const decision = simpleAI(gameState);
    res.json(decision);
});

// Статистика сервера
app.get('/stats', (req, res) => {
    res.json({
        activeGames: Object.keys(games).length
    });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});