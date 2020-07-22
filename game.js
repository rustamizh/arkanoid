// create game as IIFE singleton
const game = (function createGame(canvasId) {

    // define private fields

    let context = null;

    const sprites = {
        background: null,
        ball: null,
        platform: null
    };

    function initCanvas() {
        context = document.getElementById(canvasId).getContext('2d');
    }

    function preloadSprites() {
        let loaded = 0;
        let required = Object.keys(sprites).length;

        for (const key in sprites) {
           sprites[key] = document.createElement('img');
           sprites[key].src = `img/${key}.png`;
           sprites[key].addEventListener('load', () => {
            loaded++;
            if (loaded >= required) {
                runGame();
            }
           });
        }
    }

    function runGame() {
        window.requestAnimationFrame(() => {
            renderObjects();
        });
    }

    function renderObjects() {
        context.drawImage(sprites.background, 0, 0);
        context.drawImage(sprites.ball, 0, 0);
        context.drawImage(sprites.platform, 280, 300);
    }

    return {
        start() {
            initCanvas();
            preloadSprites();
        }
    } 
})('mycanvas');

document.addEventListener('DOMContentLoaded', () => {
    game.start();
});