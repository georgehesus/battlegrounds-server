// server.js

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// === Пример простого ИИ ===
function simpleAI(gameState) {
    let decision = { action: "wait" };

    // Проверяем, есть ли магазин и золото
    if (gameState.gold >= 3 && gameState.shop && gameState.shop.length > 0) {
        const randomIndex = Math.floor(Math.random() * gameState.shop.length);
        decision = {
            action: "buy",
            index: randomIndex,
            name: gameState.shop[randomIndex].name
        };
    } else if (gameState.gold >= 1) {
        decision = { action: "rollShop" };
    }

    return decision;
}

// === Роуты ===

// Корневой путь — просто приветствие
app.get('/', (req, res) => {
    res.send("Server is running!");
});

// Получение решения от ИИ
app.post('/ai', (req, res) => {
    const gameState = req.body;

    console.log("Получено состояние игры:", gameState);

    const decision = simpleAI(gameState);
    res.json(decision);
});

// Статистика активных игр
app.get('/stats', (req, res) => {
    const activeGames = Math.floor(Math.random() * 20); // пример статистики
    res.json({
        activeGames: activeGames
    });
});

// === Запуск сервера ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на порту ${PORT}`);
});
