const GRID_SIZE = 24;
const TILE_COUNT = 20;
const APP_VERSION = '1.0.0';
const APP_UPDATED = '2026-02-13';
const MODE_CONFIGS = {
    kindergarten: {
        label: 'Kindergarten',
        maxLevel: 10,
        levelUpScore: 140,
        baseTickMs: 220,
        minTickMs: 170,
        speedDropPerLevel: 2,
        obstacleStepEarly: 6,
        obstacleStepMid: 5,
        obstacleStepLate: 4,
        portalStartLevel: 99,
        enemyStartLevel: 99,
        enemyRampEvery: 99,
        loadingMs: 1200
    },
    beginner: {
        label: 'Beginner',
        maxLevel: 12,
        levelUpScore: 120,
        baseTickMs: 185,
        minTickMs: 130,
        speedDropPerLevel: 3,
        obstacleStepEarly: 4,
        obstacleStepMid: 3,
        obstacleStepLate: 2,
        portalStartLevel: 4,
        enemyStartLevel: 8,
        enemyRampEvery: 3,
        loadingMs: 1100
    },
    intermediate: {
        label: 'Intermediate',
        maxLevel: 18,
        levelUpScore: 100,
        baseTickMs: 170,
        minTickMs: 105,
        speedDropPerLevel: 4,
        obstacleStepEarly: 3,
        obstacleStepMid: 2,
        obstacleStepLate: 1,
        portalStartLevel: 3,
        enemyStartLevel: 6,
        enemyRampEvery: 2,
        loadingMs: 1000
    },
    advanced: {
        label: 'Advanced',
        maxLevel: 24,
        levelUpScore: 85,
        baseTickMs: 155,
        minTickMs: 80,
        speedDropPerLevel: 5,
        obstacleStepEarly: 2,
        obstacleStepMid: 1,
        obstacleStepLate: 1,
        portalStartLevel: 2,
        enemyStartLevel: 4,
        enemyRampEvery: 1,
        loadingMs: 900
    },
    insane: {
        label: 'Insane',
        maxLevel: 32,
        levelUpScore: 70,
        baseTickMs: 138,
        minTickMs: 62,
        speedDropPerLevel: 6,
        obstacleStepEarly: 2,
        obstacleStepMid: 1,
        obstacleStepLate: 1,
        portalStartLevel: 2,
        enemyStartLevel: 3,
        enemyRampEvery: 1,
        loadingMs: 780
    }
};
const DEFAULT_MODE_KEY = 'kindergarten';
const MODE_MAP_SEEDS = {
    kindergarten: 5,
    beginner: 13,
    intermediate: 29,
    advanced: 47,
    insane: 71
};
const COMBO_WINDOW_MS = 3200;
const SPECIAL_DURATION_MS = 9000;
const SHIELD_DURATION_MS = 12000;
const LEVEL_MAPS = [
    {
        name: 'Warmup Grid',
        obstacles: [
            { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 14 }, { x: 4, y: 15 },
            { x: 15, y: 4 }, { x: 15, y: 5 }, { x: 15, y: 14 }, { x: 15, y: 15 }
        ],
        portals: [],
        enemies: []
    },
    {
        name: 'Split Lanes',
        obstacles: [
            { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 6, y: 4 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7 },
            { x: 6, y: 12 }, { x: 6, y: 13 }, { x: 6, y: 14 }, { x: 6, y: 15 }, { x: 6, y: 16 }, { x: 6, y: 17 },
            { x: 13, y: 2 }, { x: 13, y: 3 }, { x: 13, y: 4 }, { x: 13, y: 5 }, { x: 13, y: 6 }, { x: 13, y: 7 },
            { x: 13, y: 12 }, { x: 13, y: 13 }, { x: 13, y: 14 }, { x: 13, y: 15 }, { x: 13, y: 16 }, { x: 13, y: 17 }
        ],
        portals: [],
        enemies: []
    },
    {
        name: 'Portal Ring',
        obstacles: [
            { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 }, { x: 9, y: 5 }, { x: 10, y: 5 }, { x: 11, y: 5 }, { x: 12, y: 5 }, { x: 13, y: 5 }, { x: 14, y: 5 },
            { x: 5, y: 14 }, { x: 6, y: 14 }, { x: 7, y: 14 }, { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }, { x: 11, y: 14 }, { x: 12, y: 14 }, { x: 13, y: 14 }, { x: 14, y: 14 },
            { x: 5, y: 6 }, { x: 5, y: 7 }, { x: 5, y: 8 }, { x: 5, y: 9 }, { x: 5, y: 10 }, { x: 5, y: 11 }, { x: 5, y: 12 }, { x: 5, y: 13 },
            { x: 14, y: 6 }, { x: 14, y: 7 }, { x: 14, y: 8 }, { x: 14, y: 9 }, { x: 14, y: 10 }, { x: 14, y: 11 }, { x: 14, y: 12 }, { x: 14, y: 13 }
        ],
        portals: [{ x: 2, y: 10 }, { x: 17, y: 10 }],
        enemies: []
    },
    {
        name: 'Drone Alley',
        obstacles: [
            { x: 2, y: 8 }, { x: 3, y: 8 }, { x: 4, y: 8 }, { x: 5, y: 8 }, { x: 6, y: 8 }, { x: 7, y: 8 },
            { x: 12, y: 8 }, { x: 13, y: 8 }, { x: 14, y: 8 }, { x: 15, y: 8 }, { x: 16, y: 8 }, { x: 17, y: 8 },
            { x: 2, y: 11 }, { x: 3, y: 11 }, { x: 4, y: 11 }, { x: 5, y: 11 }, { x: 6, y: 11 }, { x: 7, y: 11 },
            { x: 12, y: 11 }, { x: 13, y: 11 }, { x: 14, y: 11 }, { x: 15, y: 11 }, { x: 16, y: 11 }, { x: 17, y: 11 }
        ],
        portals: [{ x: 1, y: 1 }, { x: 18, y: 18 }],
        enemies: [
            { x: 10, y: 3, dx: 1, dy: 0 },
            { x: 10, y: 16, dx: -1, dy: 0 }
        ]
    },
    {
        name: 'Crossfire Core',
        obstacles: [
            { x: 9, y: 2 }, { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 5 }, { x: 9, y: 6 }, { x: 9, y: 7 }, { x: 9, y: 8 },
            { x: 9, y: 11 }, { x: 9, y: 12 }, { x: 9, y: 13 }, { x: 9, y: 14 }, { x: 9, y: 15 }, { x: 9, y: 16 }, { x: 9, y: 17 },
            { x: 10, y: 2 }, { x: 10, y: 3 }, { x: 10, y: 4 }, { x: 10, y: 5 }, { x: 10, y: 6 }, { x: 10, y: 7 }, { x: 10, y: 8 },
            { x: 10, y: 11 }, { x: 10, y: 12 }, { x: 10, y: 13 }, { x: 10, y: 14 }, { x: 10, y: 15 }, { x: 10, y: 16 }, { x: 10, y: 17 },
            { x: 2, y: 9 }, { x: 3, y: 9 }, { x: 4, y: 9 }, { x: 5, y: 9 }, { x: 6, y: 9 }, { x: 7, y: 9 }, { x: 8, y: 9 },
            { x: 11, y: 9 }, { x: 12, y: 9 }, { x: 13, y: 9 }, { x: 14, y: 9 }, { x: 15, y: 9 }, { x: 16, y: 9 }, { x: 17, y: 9 },
            { x: 2, y: 10 }, { x: 3, y: 10 }, { x: 4, y: 10 }, { x: 5, y: 10 }, { x: 6, y: 10 }, { x: 7, y: 10 }, { x: 8, y: 10 },
            { x: 11, y: 10 }, { x: 12, y: 10 }, { x: 13, y: 10 }, { x: 14, y: 10 }, { x: 15, y: 10 }, { x: 16, y: 10 }, { x: 17, y: 10 }
        ],
        portals: [{ x: 1, y: 18 }, { x: 18, y: 1 }],
        enemies: [
            { x: 3, y: 3, dx: 1, dy: 0 },
            { x: 16, y: 16, dx: -1, dy: 0 },
            { x: 3, y: 16, dx: 0, dy: -1 }
        ]
    }
];

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const levelElement = document.getElementById('level');
const speedElement = document.getElementById('speed');
const comboElement = document.getElementById('combo');
const modeLabelElement = document.getElementById('modeLabel');
const mapNameElement = document.getElementById('mapName');
const statusElement = document.getElementById('status');
const ariaStatusElement = document.getElementById('ariaStatus');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const soundBtn = document.getElementById('soundBtn');
const modeSelect = document.getElementById('modeSelect');
const touchUpBtn = document.getElementById('touchUp');
const touchDownBtn = document.getElementById('touchDown');
const touchLeftBtn = document.getElementById('touchLeft');
const touchRightBtn = document.getElementById('touchRight');
const touchControlsElement = document.querySelector('.touch-controls');
const touchHintElement = document.querySelector('.touch-hint');
const helpOverlayElement = document.getElementById('helpOverlay');
const closeHelpBtn = document.getElementById('closeHelpBtn');
const versionLabelElement = document.getElementById('versionLabel');
const updatedLabelElement = document.getElementById('updatedLabel');

canvas.width = GRID_SIZE * TILE_COUNT;
canvas.height = GRID_SIZE * TILE_COUNT;

let snake = [];
let food = { x: 0, y: 0 };
let specialFood = null;
let shieldFood = null;
let obstacles = [];
let portals = [];
let enemies = [];
let direction = { x: 0, y: 0 };
let nextDirection = { x: 0, y: 0 };
let score = 0;
let highScore = Number(safeStorageGet('snakeHighScore', '0'));
let level = 1;
let currentModeKey = safeStorageGet('snakeMode', DEFAULT_MODE_KEY);
if (!MODE_CONFIGS[currentModeKey]) {
    currentModeKey = DEFAULT_MODE_KEY;
}
let currentMode = MODE_CONFIGS[currentModeKey];
let currentMapName = '-';
let tickMs = currentMode.baseTickMs;
let comboMultiplier = 1;
let lastFoodTimestamp = 0;
let foodsEaten = 0;
let hasShownMaxLevelMessage = false;
let maxLevelReachedScore = 0;
let isModeCompleted = false;
let shieldUntil = 0;
let isRunning = false;
let isPaused = false;
let waitingForLevelInput = false;
let levelLoadingUntil = 0;
let pendingReadyPrompt = false;
let animationFrameId = null;
let lastStepTimestamp = 0;
let soundEnabled = safeStorageGet('snakeSoundEnabled', '1') !== '0';
let audioContext = null;
let swipeStartX = null;
let swipeStartY = null;
const SWIPE_THRESHOLD = 24;
let hasAutoHiddenTouchControls = safeStorageGet('snakeTouchControlsHidden', '0') === '1';

highScoreElement.textContent = highScore;

startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
soundBtn.addEventListener('click', toggleSound);
modeSelect.addEventListener('change', handleModeChange);
document.addEventListener('keydown', handleKeyPress);
touchUpBtn.addEventListener('click', () => handleTouchDirection(0, -1));
touchDownBtn.addEventListener('click', () => handleTouchDirection(0, 1));
touchLeftBtn.addEventListener('click', () => handleTouchDirection(-1, 0));
touchRightBtn.addEventListener('click', () => handleTouchDirection(1, 0));
canvas.addEventListener('touchstart', handleCanvasTouchStart, { passive: false });
canvas.addEventListener('touchmove', handleCanvasTouchMove, { passive: false });
canvas.addEventListener('touchend', handleCanvasTouchEnd, { passive: false });
canvas.addEventListener('touchcancel', resetSwipeState, { passive: true });
closeHelpBtn.addEventListener('click', closeHelpOverlay);

modeSelect.value = currentModeKey;
updateSoundButton();
applySavedTouchControlsPreference();

function handleModeChange() {
    const selectedMode = MODE_CONFIGS[modeSelect.value] ? modeSelect.value : DEFAULT_MODE_KEY;

    if (isRunning) {
        modeSelect.value = currentModeKey;
        setStatus('Mode changes apply after restart.');
        return;
    }

    currentModeKey = selectedMode;
    currentMode = MODE_CONFIGS[currentModeKey];
    tickMs = currentMode.baseTickMs;
    level = 1;
    safeStorageSet('snakeMode', currentModeKey);
    updateHud();
    drawStartScreen();
    setStatus(`${currentMode.label} mode selected. Max Level ${currentMode.maxLevel}.`);
}

function startGame() {
    const selectedMode = MODE_CONFIGS[modeSelect.value] ? modeSelect.value : DEFAULT_MODE_KEY;
    currentModeKey = selectedMode;
    currentMode = MODE_CONFIGS[currentModeKey];
    safeStorageSet('snakeMode', currentModeKey);

    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    score = 0;
    level = 1;
    tickMs = currentMode.baseTickMs;
    comboMultiplier = 1;
    foodsEaten = 0;
    hasShownMaxLevelMessage = false;
    maxLevelReachedScore = 0;
    isModeCompleted = false;
    shieldUntil = 0;
    obstacles = [];
    portals = [];
    enemies = [];
    specialFood = null;
    shieldFood = null;
    lastFoodTimestamp = 0;
    isPaused = false;
    isRunning = true;
    waitingForLevelInput = true;
    levelLoadingUntil = 0;
    pendingReadyPrompt = false;
    lastStepTimestamp = 0;

    applyLevelMap(level);
    placeFood();
    updateHud();
    setStatus(`${currentMode.label} mode: press Arrow keys or WASD to begin.`);
    playTone(420, 0.06);

    startBtn.textContent = 'Restart';
    pauseBtn.disabled = false;
    pauseBtn.textContent = 'Pause';

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    draw();
    animationFrameId = requestAnimationFrame(gameLoop);
}

function togglePause() {
    if (!isRunning) {
        return;
    }

    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';

    if (isPaused) {
        drawPauseOverlay();
    } else {
        lastStepTimestamp = 0;
    }
}

function handleKeyPress(event) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'KeyH'].includes(event.code)) {
        event.preventDefault();
    }

    if (event.code === 'KeyH') {
        openHelpOverlay();
        return;
    }

    if (event.code === 'Space' && isRunning) {
        togglePause();
        return;
    }

    let pressedDirectionKey = false;

    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            pressedDirectionKey = true;
            trySetDirection(0, -1);
            break;
        case 'ArrowDown':
        case 'KeyS':
            pressedDirectionKey = true;
            trySetDirection(0, 1);
            break;
        case 'ArrowLeft':
        case 'KeyA':
            pressedDirectionKey = true;
            trySetDirection(-1, 0);
            break;
        case 'ArrowRight':
        case 'KeyD':
            pressedDirectionKey = true;
            trySetDirection(1, 0);
            break;
        default:
            break;
    }

    if (pressedDirectionKey && waitingForLevelInput && isRunning && !isPaused && !isLevelLoading(performance.now())) {
        waitingForLevelInput = false;
        pendingReadyPrompt = false;
        lastStepTimestamp = 0;
        setStatus(`Level ${level} started. Have fun!`);
        playTone(520, 0.07);
    }
}

function handleTouchDirection(x, y) {
    if (!isRunning || isPaused || isLevelLoading(performance.now())) {
        return;
    }

    trySetDirection(x, y);

    if (waitingForLevelInput) {
        waitingForLevelInput = false;
        pendingReadyPrompt = false;
        lastStepTimestamp = 0;
        setStatus(`Level ${level} started. Have fun!`);
        playTone(520, 0.07);
    }
}

function handleCanvasTouchStart(event) {
    if (event.touches.length !== 1) {
        return;
    }

    event.preventDefault();
    swipeStartX = event.touches[0].clientX;
    swipeStartY = event.touches[0].clientY;
}

function handleCanvasTouchMove(event) {
    if (!isRunning || isPaused || isLevelLoading(performance.now()) || swipeStartX === null || swipeStartY === null) {
        return;
    }

    if (event.touches.length !== 1) {
        return;
    }

    event.preventDefault();

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    const deltaX = currentX - swipeStartX;
    const deltaY = currentY - swipeStartY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (Math.max(absX, absY) < SWIPE_THRESHOLD) {
        return;
    }

    if (absX > absY) {
        handleTouchDirection(deltaX > 0 ? 1 : -1, 0);
    } else {
        handleTouchDirection(0, deltaY > 0 ? 1 : -1);
    }

    autoHideTouchControlsAfterSwipe();

    swipeStartX = currentX;
    swipeStartY = currentY;
}

function handleCanvasTouchEnd(event) {
    event.preventDefault();
    resetSwipeState();
}

function resetSwipeState() {
    swipeStartX = null;
    swipeStartY = null;
}

function autoHideTouchControlsAfterSwipe() {
    if (hasAutoHiddenTouchControls) {
        return;
    }

    const isSmallScreen = window.matchMedia('(max-width: 700px)').matches;
    if (!isSmallScreen) {
        return;
    }

    hasAutoHiddenTouchControls = true;
    safeStorageSet('snakeTouchControlsHidden', '1');

    if (touchControlsElement) {
        touchControlsElement.classList.add('is-hidden');
    }

    if (touchHintElement) {
        touchHintElement.classList.add('is-hidden');
    }

    setStatus('Swipe control enabled.');
}

function applySavedTouchControlsPreference() {
    if (!hasAutoHiddenTouchControls) {
        return;
    }

    const isSmallScreen = window.matchMedia('(max-width: 700px)').matches;
    if (!isSmallScreen) {
        return;
    }

    if (touchControlsElement) {
        touchControlsElement.classList.add('is-hidden');
    }

    if (touchHintElement) {
        touchHintElement.classList.add('is-hidden');
    }
}

function trySetDirection(x, y) {
    if ((x === 0 && y === 0) || (direction.x === -x && direction.y === -y)) {
        return;
    }

    nextDirection = { x, y };
}

function gameLoop(timestamp) {
    if (!isRunning) {
        return;
    }

    if (!isPaused) {
        if (isLevelLoading(timestamp)) {
            draw();
            drawLevelLoadingOverlay(timestamp);
        } else {
            if (pendingReadyPrompt && waitingForLevelInput) {
                pendingReadyPrompt = false;
                setStatus(`Level ${level} is ready. Press Arrow keys or WASD to go.`);
            }

            if (!waitingForLevelInput) {
                if (!lastStepTimestamp) {
                    lastStepTimestamp = timestamp;
                }

                if (timestamp - lastStepTimestamp >= tickMs) {
                    gameUpdate(timestamp);
                    lastStepTimestamp = timestamp;
                }
            } else {
                draw();
                drawReadyOverlay();
            }
        }
    }

    animationFrameId = requestAnimationFrame(gameLoop);
}

function gameUpdate(now) {
    if (isModeCompleted) {
        return;
    }

    direction = { ...nextDirection };

    if (specialFood && now > specialFood.expiresAt) {
        specialFood = null;
        setStatus('Golden snack disappeared.');
    }

    if (shieldFood && now > shieldFood.expiresAt) {
        shieldFood = null;
    }

    if (shieldUntil && now > shieldUntil) {
        shieldUntil = 0;
        setStatus('Shield power finished.');
    }

    moveEnemies();

    let head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };

    const portalResult = tryTeleport(head);
    head = portalResult.head;

    const collision = checkCollision(head, now);
    if (collision) {
        playTone(190, 0.13, 'triangle', 0.06);
        gameOver();
        return;
    }

    snake.unshift(head);

    const ateSpecial = specialFood && head.x === specialFood.x && head.y === specialFood.y;
    const ateShield = shieldFood && head.x === shieldFood.x && head.y === shieldFood.y;
    const ateNormal = head.x === food.x && head.y === food.y;

    if (ateSpecial) {
        const gain = 30 * comboMultiplier;
        score += gain;
        foodsEaten += 2;
        specialFood = null;
        updateCombo(now);
        placeFood();
        setStatus(`Yummy golden snack! +${gain}`);
        playTone(760, 0.08, 'sine', 0.05);
    } else if (ateShield) {
        score += 20;
        foodsEaten += 1;
        shieldFood = null;
        shieldUntil = now + SHIELD_DURATION_MS;
        setStatus('Shield on! You can pass obstacles and drones.');
        playTone(520, 0.1, 'triangle', 0.05);
    } else if (ateNormal) {
        updateCombo(now);
        const gain = 10 * comboMultiplier;
        score += gain;
        foodsEaten += 1;
        placeFood();
        setStatus(comboMultiplier > 1 ? `Awesome combo x${comboMultiplier}! +${gain}` : `Nice! +${gain} points`);
        playTone(comboMultiplier > 1 ? 620 : 480, 0.05, 'sine', 0.045);

        if (foodsEaten % 5 === 0 && !specialFood) {
            placeSpecialFood();
        }

        if (foodsEaten % 8 === 0 && !shieldFood && !isShieldActive(now)) {
            placeShieldFood(now);
        }
    } else {
        snake.pop();

        if (lastFoodTimestamp && now - lastFoodTimestamp > COMBO_WINDOW_MS) {
            comboMultiplier = 1;
        }
    }

    updateDifficulty(now);
    updateHud(now);
    draw();

    if (portalResult.used) {
        setStatus('Whoosh! Portal jump!');
        playTone(880, 0.06, 'square', 0.035);
    }
}

function updateCombo(now) {
    if (lastFoodTimestamp && now - lastFoodTimestamp <= COMBO_WINDOW_MS) {
        comboMultiplier = Math.min(comboMultiplier + 1, 5);
    } else {
        comboMultiplier = 1;
    }

    lastFoodTimestamp = now;
}

function updateDifficulty(now) {
    const targetLevel = Math.min(currentMode.maxLevel, Math.max(1, Math.floor(score / currentMode.levelUpScore) + 1));

    if (targetLevel > level) {
        level = targetLevel;
        playTone(660, 0.1, 'triangle', 0.05);
        resetSnakeForLevelStart();
        applyLevelMap(level);
        specialFood = null;
        shieldFood = null;
        comboMultiplier = 1;
        lastFoodTimestamp = 0;
        waitingForLevelInput = true;
        startLevelLoading(now);
        shieldUntil = Math.max(shieldUntil, now + 3500);
        placeFood();
        updateHud(now);

        if (level === currentMode.maxLevel && maxLevelReachedScore === 0) {
            maxLevelReachedScore = score;
        }
    }

    if (level === currentMode.maxLevel && !hasShownMaxLevelMessage) {
        hasShownMaxLevelMessage = true;
        waitingForLevelInput = true;
        startLevelLoading(now);
        setStatus(`Amazing! You reached Max Level ${currentMode.maxLevel}!`);

        if (maxLevelReachedScore === 0) {
            maxLevelReachedScore = score;
        }
    }

    const completionTarget = maxLevelReachedScore > 0
        ? maxLevelReachedScore + Math.max(30, Math.floor(currentMode.levelUpScore * 0.5))
        : Number.POSITIVE_INFINITY;

    if (level === currentMode.maxLevel && score >= completionTarget && !isModeCompleted) {
        modeComplete();
        return;
    }

    tickMs = Math.max(currentMode.minTickMs, currentMode.baseTickMs - (level - 1) * currentMode.speedDropPerLevel);
}

function startLevelLoading(now) {
    levelLoadingUntil = now + currentMode.loadingMs;
    pendingReadyPrompt = true;
    setStatus(`Loading Level ${level}... get ready!`);
}

function isLevelLoading(now = performance.now()) {
    return levelLoadingUntil > now;
}

function resetSnakeForLevelStart() {
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
}

function applyLevelMap(targetLevel) {
    const map = buildLevelMap(currentModeKey, targetLevel);
    currentMapName = map.name;

    const obstacleStep = targetLevel <= 2
        ? currentMode.obstacleStepEarly
        : targetLevel <= 5
            ? currentMode.obstacleStepMid
            : currentMode.obstacleStepLate;

    obstacles = map.obstacles
        .filter((_, index) => index % obstacleStep === 0)
        .filter((tile) => !isOnSnake(tile.x, tile.y))
        .map((tile) => ({ x: tile.x, y: tile.y }));

    portals = targetLevel >= currentMode.portalStartLevel
        ? map.portals
            .filter((tile) => !isOnSnake(tile.x, tile.y))
            .slice(0, 2)
            .map((tile) => ({ x: tile.x, y: tile.y }))
        : [];

    const enemyCount = targetLevel < currentMode.enemyStartLevel
        ? 0
        : Math.min(
            map.enemies.length,
            Math.max(1, 1 + Math.floor((targetLevel - currentMode.enemyStartLevel) / currentMode.enemyRampEvery))
        );
    enemies = map.enemies
        .filter((tile) => !isOnSnake(tile.x, tile.y))
        .slice(0, enemyCount)
        .map((enemy) => ({ x: enemy.x, y: enemy.y, dx: enemy.dx, dy: enemy.dy }));

    ensureMapSafetyNearSpawn();
    ensureExitPathFromSpawn();

    if (!isFreeForPickup(food.x, food.y)) {
        placeFood();
    }

    setStatus(`Level ${targetLevel}: ${map.name}. Snake reset at a safe start.`);
}

function buildLevelMap(modeKey, targetLevel) {
    const modeSeed = MODE_MAP_SEEDS[modeKey] || 7;
    const mapIndex = (targetLevel - 1) % LEVEL_MAPS.length;
    const baseMap = LEVEL_MAPS[mapIndex];
    const seed = modeSeed * 991 + targetLevel * 131;
    const transformType = seed % 8;

    let obstacles = transformTiles(baseMap.obstacles, transformType);
    const portals = transformTiles(baseMap.portals, transformType);
    const enemies = createEnemyCandidates(seed, transformType);

    obstacles = mergeTiles(obstacles, generatePatternTiles(seed, targetLevel));
    obstacles = mergeTiles(obstacles, generateLevelSignatureTiles(seed, targetLevel));
    obstacles = obstacles.filter((tile) => tile.x > 0 && tile.x < TILE_COUNT - 1 && tile.y > 0 && tile.y < TILE_COUNT - 1);

    const variantNames = ['Comet Lanes', 'Candy Spiral', 'Tunnel Dash', 'Orbit Maze', 'Wave Run', 'Twin Gate'];
    const variantName = variantNames[(targetLevel + modeSeed) % variantNames.length];

    return {
        name: `${variantName} ${targetLevel}`,
        obstacles,
        portals,
        enemies
    };
}

function transformTiles(tiles, transformType) {
    return tiles
        .map((tile) => transformTile(tile, transformType))
        .filter((tile) => tile.x >= 0 && tile.x < TILE_COUNT && tile.y >= 0 && tile.y < TILE_COUNT);
}

function transformTile(tile, transformType) {
    const max = TILE_COUNT - 1;

    switch (transformType % 8) {
        case 0:
            return { x: tile.x, y: tile.y };
        case 1:
            return { x: max - tile.y, y: tile.x };
        case 2:
            return { x: max - tile.x, y: max - tile.y };
        case 3:
            return { x: tile.y, y: max - tile.x };
        case 4:
            return { x: max - tile.x, y: tile.y };
        case 5:
            return { x: tile.x, y: max - tile.y };
        case 6:
            return { x: tile.y, y: tile.x };
        default:
            return { x: max - tile.y, y: max - tile.x };
    }
}

function mergeTiles(primary, secondary) {
    const merged = [...primary];
    const existing = new Set(primary.map((tile) => `${tile.x},${tile.y}`));

    secondary.forEach((tile) => {
        const key = `${tile.x},${tile.y}`;
        if (!existing.has(key)) {
            existing.add(key);
            merged.push(tile);
        }
    });

    return merged;
}

function generatePatternTiles(seed, targetLevel) {
    const variant = (seed + targetLevel) % 4;
    const tiles = [];

    if (variant === 0) {
        const gateA = 3 + ((seed >> 1) % 14);
        const gateB = 3 + ((seed >> 3) % 14);

        for (let x = 2; x <= 17; x += 1) {
            if (x !== gateA && x !== gateB) {
                tiles.push({ x, y: 6 });
            }

            if (x !== gateB && x !== Math.max(2, gateA - 1)) {
                tiles.push({ x, y: 13 });
            }
        }
    } else if (variant === 1) {
        const gateTop = 3 + ((seed >> 2) % 14);
        const gateBottom = 3 + ((seed >> 4) % 14);

        for (let y = 2; y <= 17; y += 1) {
            if (y !== gateTop) {
                tiles.push({ x: 6, y });
            }

            if (y !== gateBottom) {
                tiles.push({ x: 13, y });
            }
        }
    } else if (variant === 2) {
        for (let i = 2; i <= 17; i += 1) {
            if (i % 3 !== 0) {
                tiles.push({ x: i, y: 2 + ((i + seed) % 6) });
                tiles.push({ x: i, y: 11 + ((i + seed) % 6) });
            }
        }
    } else {
        const gapX = 3 + ((seed >> 1) % 14);
        const gapY = 3 + ((seed >> 3) % 14);

        for (let x = 4; x <= 15; x += 1) {
            if (x !== gapX) {
                tiles.push({ x, y: 4 });
                tiles.push({ x, y: 15 });
            }
        }

        for (let y = 5; y <= 14; y += 1) {
            if (y !== gapY) {
                tiles.push({ x: 4, y });
                tiles.push({ x: 15, y });
            }
        }
    }

    return tiles;
}

function generateLevelSignatureTiles(seed, targetLevel) {
    const tiles = [];

    for (let i = 0; i < 4; i += 1) {
        const x = 2 + ((seed + targetLevel * (i + 3) * 7 + i * 11) % 16);
        const y = 2 + ((seed * 3 + targetLevel * (i + 5) * 5 + i * 13) % 16);
        tiles.push({ x, y });
    }

    return tiles;
}

function createEnemyCandidates(seed, transformType) {
    const baseEnemies = [
        { x: 3, y: 3, dx: 1, dy: 0 },
        { x: 16, y: 16, dx: -1, dy: 0 },
        { x: 3, y: 16, dx: 0, dy: -1 },
        { x: 16, y: 3, dx: 0, dy: 1 },
        { x: 10, y: 2, dx: 1, dy: 0 }
    ];

    return baseEnemies.map((enemy, index) => {
        const transformed = transformTile({ x: enemy.x, y: enemy.y }, (transformType + index) % 8);
        const directionFlip = ((seed + index) % 2 === 0) ? 1 : -1;

        return {
            x: transformed.x,
            y: transformed.y,
            dx: enemy.dx * directionFlip,
            dy: enemy.dy * directionFlip
        };
    });
}

function ensureMapSafetyNearSpawn() {
    const safeTiles = [
        { x: 8, y: 10 },
        { x: 9, y: 10 },
        { x: 10, y: 10 },
        { x: 11, y: 10 },
        { x: 12, y: 10 },
        { x: 10, y: 9 },
        { x: 10, y: 11 }
    ];

    const isSafeTile = (x, y) => safeTiles.some((tile) => tile.x === x && tile.y === y);

    obstacles = obstacles.filter((obstacle) => !isSafeTile(obstacle.x, obstacle.y));
    portals = portals.filter((portal) => !isSafeTile(portal.x, portal.y));
    enemies = enemies.filter((enemy) => !isSafeTile(enemy.x, enemy.y));
}

function ensureExitPathFromSpawn() {
    const exitPathTiles = [
        { x: 11, y: 10 },
        { x: 12, y: 10 },
        { x: 13, y: 10 },
        { x: 14, y: 10 },
        { x: 15, y: 10 },
        { x: 16, y: 10 },
        { x: 17, y: 10 },
        { x: 18, y: 10 },
        { x: 19, y: 10 }
    ];

    const isExitPathTile = (x, y) => exitPathTiles.some((tile) => tile.x === x && tile.y === y);

    obstacles = obstacles.filter((obstacle) => !isExitPathTile(obstacle.x, obstacle.y));
    portals = portals.filter((portal) => !isExitPathTile(portal.x, portal.y));
    enemies = enemies.filter((enemy) => !isExitPathTile(enemy.x, enemy.y));
}

function isFreeForPickup(x, y) {
    return !isOnSnake(x, y) && !hasObstacle(x, y) && !hasPortal(x, y) && !hasEnemy(x, y);
}

function checkCollision(head, now) {
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        return 'wall';
    }

    for (let i = 0; i < snake.length; i += 1) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return 'self';
        }
    }

    const shieldActive = isShieldActive(now);

    if (!shieldActive) {
        for (let i = 0; i < obstacles.length; i += 1) {
            if (obstacles[i].x === head.x && obstacles[i].y === head.y) {
                return 'obstacle';
            }
        }

        for (let i = 0; i < enemies.length; i += 1) {
            if (enemies[i].x === head.x && enemies[i].y === head.y) {
                return 'enemy';
            }
        }
    }

    return null;
}

function tryTeleport(head) {
    if (portals.length !== 2) {
        return { head, used: false };
    }

    const [a, b] = portals;

    if (head.x === a.x && head.y === a.y) {
        return { head: { x: b.x, y: b.y }, used: true };
    }

    if (head.x === b.x && head.y === b.y) {
        return { head: { x: a.x, y: a.y }, used: true };
    }

    return { head, used: false };
}

function placeFood() {
    const tile = findFreeTile();
    if (!tile) {
        return;
    }

    food = tile;
}

function placeSpecialFood() {
    const tile = findFreeTile();
    if (!tile) {
        return;
    }

    specialFood = {
        ...tile,
        expiresAt: performance.now() + SPECIAL_DURATION_MS
    };
    setStatus('Golden snack appeared. Catch it for bonus points!');
}

function placeShieldFood(now) {
    const tile = findFreeTile();
    if (!tile) {
        return;
    }

    shieldFood = {
        ...tile,
        expiresAt: now + 8000
    };
    setStatus('Shield orb appeared. Grab it for safety!');
}

function spawnObstacle() {
    if (obstacles.length >= 18) {
        return;
    }

    const tile = findFreeTile();
    if (tile) {
        obstacles.push(tile);
    }
}

function spawnPortals() {
    const first = findFreeTile();
    if (!first) {
        return;
    }

    const second = findFreeTile([{ x: first.x, y: first.y }]);
    if (!second) {
        return;
    }

    portals = [first, second];
}

function spawnEnemy() {
    if (enemies.length >= 3) {
        return;
    }

    const tile = findFreeTile();
    if (!tile) {
        return;
    }

    const directions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ];

    const move = directions[Math.floor(Math.random() * directions.length)];

    enemies.push({
        x: tile.x,
        y: tile.y,
        dx: move.x,
        dy: move.y
    });
}

function moveEnemies() {
    enemies.forEach((enemy) => {
        let nextX = enemy.x + enemy.dx;
        let nextY = enemy.y + enemy.dy;

        const blocked = isOutOfBounds(nextX, nextY) || hasObstacle(nextX, nextY) || hasPortal(nextX, nextY);

        if (blocked) {
            enemy.dx *= -1;
            enemy.dy *= -1;
            nextX = enemy.x + enemy.dx;
            nextY = enemy.y + enemy.dy;
        }

        if (!isOutOfBounds(nextX, nextY) && !hasObstacle(nextX, nextY) && !hasPortal(nextX, nextY)) {
            enemy.x = nextX;
            enemy.y = nextY;
        }
    });
}

function isShieldActive(now = performance.now()) {
    return shieldUntil > now;
}

function isOutOfBounds(x, y) {
    return x < 0 || x >= TILE_COUNT || y < 0 || y >= TILE_COUNT;
}

function hasObstacle(x, y) {
    return obstacles.some((obstacle) => obstacle.x === x && obstacle.y === y);
}

function hasPortal(x, y) {
    return portals.some((portal) => portal.x === x && portal.y === y);
}

function hasEnemy(x, y) {
    return enemies.some((enemy) => enemy.x === x && enemy.y === y);
}

function isOnSnake(x, y) {
    return snake.some((segment) => segment.x === x && segment.y === y);
}

function findFreeTile(extraBlocked = []) {
    const blockedExtras = extraBlocked || [];

    for (let attempts = 0; attempts < 160; attempts += 1) {
        const x = randomTile();
        const y = randomTile();

        const blockedByExtra = blockedExtras.some((tile) => tile.x === x && tile.y === y);
        if (blockedByExtra) {
            continue;
        }

        if (isOnSnake(x, y)) {
            continue;
        }

        if (hasObstacle(x, y) || hasPortal(x, y) || hasEnemy(x, y)) {
            continue;
        }

        if (food.x === x && food.y === y) {
            continue;
        }

        if (specialFood && specialFood.x === x && specialFood.y === y) {
            continue;
        }

        if (shieldFood && shieldFood.x === x && shieldFood.y === y) {
            continue;
        }

        return { x, y };
    }

    return null;
}

function randomTile() {
    return Math.floor(Math.random() * TILE_COUNT);
}

function updateHud(now = performance.now()) {
    scoreElement.textContent = score;
    levelElement.textContent = `${level}/${currentMode.maxLevel}`;
    comboElement.textContent = `x${comboMultiplier}`;
    modeLabelElement.textContent = currentMode.label;
    mapNameElement.textContent = currentMapName;

    const baseSpeed = currentMode.baseTickMs / tickMs;
    const shieldText = isShieldActive(now) ? ' ⚡' : '';
    speedElement.textContent = `${baseSpeed.toFixed(1)}x${shieldText}`;
}

function setStatus(message) {
    statusElement.textContent = message;
    ariaStatusElement.textContent = message;
}

function closeHelpOverlay() {
    if (helpOverlayElement) {
        helpOverlayElement.classList.add('is-hidden');
    }

    safeStorageSet('snakeHowToSeen', '1');
}

function openHelpOverlay() {
    if (helpOverlayElement) {
        helpOverlayElement.classList.remove('is-hidden');
    }
}

function maybeShowHowToOverlay() {
    const hasSeenHelp = safeStorageGet('snakeHowToSeen', '0') === '1';
    if (hasSeenHelp) {
        return;
    }

    if (helpOverlayElement) {
        helpOverlayElement.classList.remove('is-hidden');
    }
}

function safeStorageGet(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value;
    } catch (error) {
        return fallback;
    }
}

function safeStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    safeStorageSet('snakeSoundEnabled', soundEnabled ? '1' : '0');
    updateSoundButton();
    setStatus(soundEnabled ? 'Sound turned on.' : 'Sound turned off.');

    if (soundEnabled) {
        playTone(500, 0.05);
    }
}

function updateSoundButton() {
    soundBtn.textContent = soundEnabled ? 'Sound: On' : 'Sound: Off';
    soundBtn.setAttribute('aria-pressed', soundEnabled ? 'true' : 'false');
}

function initAudioContext() {
    if (audioContext) {
        return audioContext;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
        return null;
    }

    audioContext = new AudioContextClass();
    return audioContext;
}

function playTone(frequency, duration, type = 'sine', gain = 0.04) {
    if (!soundEnabled) {
        return;
    }

    const context = initAudioContext();
    if (!context) {
        return;
    }

    if (context.state === 'suspended') {
        context.resume();
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.value = gain;

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    const now = context.currentTime;
    gainNode.gain.setValueAtTime(gain, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    drawPortals();
    drawObstacles();
    drawEnemies();
    drawSnake();
    drawFood();
    drawSpecialFood();
    drawShieldFood();
}

function drawBoard() {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0a1030');
    gradient.addColorStop(1, '#060816');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(115, 160, 255, 0.12)';
    ctx.lineWidth = 1;

    for (let i = 0; i <= TILE_COUNT; i += 1) {
        const pos = i * GRID_SIZE;

        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, pos);
        ctx.lineTo(canvas.width, pos);
        ctx.stroke();
    }
}

function drawPortals() {
    if (portals.length !== 2) {
        return;
    }

    const pulse = 0.7 + Math.sin(performance.now() / 160) * 0.25;

    portals.forEach((portal, index) => {
        const x = portal.x * GRID_SIZE + GRID_SIZE / 2;
        const y = portal.y * GRID_SIZE + GRID_SIZE / 2;
        const radius = GRID_SIZE / 2 - 3;

        ctx.strokeStyle = index === 0 ? '#9f8bff' : '#61e7ff';
        ctx.lineWidth = 3;
        ctx.globalAlpha = pulse;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(x, y, radius - 4, 0, Math.PI * 2);
        ctx.fillStyle = index === 0 ? '#6f4fff' : '#25baff';
        ctx.fill();
        ctx.globalAlpha = 1;
    });
}

function drawSnake() {
    const shieldActive = isShieldActive();

    snake.forEach((segment, index) => {
        const x = segment.x * GRID_SIZE + 2;
        const y = segment.y * GRID_SIZE + 2;
        const size = GRID_SIZE - 4;

        const headGlow = index === 0;
        ctx.fillStyle = headGlow ? '#8df4ff' : `hsl(${180 - index * 2}deg 85% ${Math.max(42, 62 - index * 2)}%)`;
        ctx.shadowBlur = headGlow ? 16 : 7;
        ctx.shadowColor = headGlow ? '#78ebff' : 'rgba(92, 240, 255, 0.55)';
        drawRoundRect(x, y, size, size, 6);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (index === 0) {
            drawEyes(x, y, size);

            if (shieldActive) {
                const centerX = x + size / 2;
                const centerY = y + size / 2;
                ctx.strokeStyle = 'rgba(130, 230, 255, 0.85)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(centerX, centerY, size / 2 + 3, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    });
}

function drawEyes(x, y, size) {
    ctx.fillStyle = '#041220';
    const eyeRadius = 2.6;
    const offset = 5;

    const points = direction.x === 1
        ? [[x + size - offset, y + offset], [x + size - offset, y + size - offset]]
        : direction.x === -1
            ? [[x + offset, y + offset], [x + offset, y + size - offset]]
            : direction.y === -1
                ? [[x + offset, y + offset], [x + size - offset, y + offset]]
                : [[x + offset, y + size - offset], [x + size - offset, y + size - offset]];

    points.forEach(([eyeX, eyeY]) => {
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, eyeRadius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawFood() {
    const x = food.x * GRID_SIZE + GRID_SIZE / 2;
    const y = food.y * GRID_SIZE + GRID_SIZE / 2;

    const gradient = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, GRID_SIZE / 2);
    gradient.addColorStop(0, '#ffcee6');
    gradient.addColorStop(1, '#ff477b');
    ctx.fillStyle = gradient;
    ctx.shadowColor = 'rgba(255, 90, 150, 0.75)';
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(x, y, GRID_SIZE / 2 - 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

function drawSpecialFood() {
    if (!specialFood) {
        return;
    }

    const pulse = 0.78 + Math.sin(performance.now() / 140) * 0.2;
    const x = specialFood.x * GRID_SIZE + GRID_SIZE / 2;
    const y = specialFood.y * GRID_SIZE + GRID_SIZE / 2;
    const radius = GRID_SIZE / 2 - 2;

    ctx.strokeStyle = 'rgba(255, 240, 140, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, radius + 1.5, 0, Math.PI * 2);
    ctx.stroke();

    const gradient = ctx.createRadialGradient(x - 2, y - 2, 1, x, y, radius);
    gradient.addColorStop(0, '#fff6bf');
    gradient.addColorStop(1, '#ffcc39');
    ctx.fillStyle = gradient;
    ctx.globalAlpha = pulse;
    ctx.shadowColor = 'rgba(255, 213, 92, 0.85)';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
}

function drawShieldFood() {
    if (!shieldFood) {
        return;
    }

    const x = shieldFood.x * GRID_SIZE + GRID_SIZE / 2;
    const y = shieldFood.y * GRID_SIZE + GRID_SIZE / 2;
    const pulse = 0.8 + Math.sin(performance.now() / 110) * 0.2;

    ctx.globalAlpha = pulse;
    ctx.fillStyle = '#a8f0ff';
    ctx.shadowColor = 'rgba(140, 236, 255, 0.85)';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(x, y, GRID_SIZE / 2 - 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#083248';
    ctx.font = '700 11px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('S', x, y + 0.5);

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
}

function drawObstacles() {
    obstacles.forEach((obstacle) => {
        const x = obstacle.x * GRID_SIZE + 3;
        const y = obstacle.y * GRID_SIZE + 3;
        const size = GRID_SIZE - 6;

        const gradient = ctx.createLinearGradient(x, y, x + size, y + size);
        gradient.addColorStop(0, '#5d6db3');
        gradient.addColorStop(1, '#27356f');
        ctx.fillStyle = gradient;
        ctx.shadowColor = 'rgba(105, 150, 255, 0.4)';
        ctx.shadowBlur = 10;
        drawRoundRect(x, y, size, size, 4);
        ctx.fill();
        ctx.shadowBlur = 0;
    });
}

function drawEnemies() {
    enemies.forEach((enemy) => {
        const centerX = enemy.x * GRID_SIZE + GRID_SIZE / 2;
        const centerY = enemy.y * GRID_SIZE + GRID_SIZE / 2;

        ctx.fillStyle = '#ff7495';
        ctx.shadowColor = 'rgba(255, 116, 149, 0.8)';
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(centerX, centerY, GRID_SIZE / 2 - 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#230010';
        ctx.beginPath();
        ctx.arc(centerX - 3, centerY - 2, 1.5, 0, Math.PI * 2);
        ctx.arc(centerX + 3, centerY - 2, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;
    });
}

function drawPauseOverlay() {
    draw();
    ctx.fillStyle = 'rgba(2, 6, 20, 0.72)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#9de6ff';
    ctx.font = '700 38px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BREAK TIME', canvas.width / 2, canvas.height / 2 - 10);

    ctx.fillStyle = '#d4dcff';
    ctx.font = '16px Segoe UI';
    ctx.fillText('Press SPACE to continue', canvas.width / 2, canvas.height / 2 + 28);
}

function drawReadyOverlay() {
    ctx.fillStyle = 'rgba(2, 6, 20, 0.62)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#8ff2ff';
    ctx.font = '700 28px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`LEVEL ${level}`, canvas.width / 2, canvas.height / 2 - 20);

    ctx.fillStyle = '#d4dcff';
    ctx.font = '16px Segoe UI';
    ctx.fillText('Press Arrow keys or WASD to start', canvas.width / 2, canvas.height / 2 + 16);
}

function drawLevelLoadingOverlay(now) {
    ctx.fillStyle = 'rgba(2, 6, 20, 0.74)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const dots = '.'.repeat((Math.floor(now / 260) % 3) + 1);
    ctx.fillStyle = '#9de6ff';
    ctx.font = '700 30px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`GET READY${dots}`, canvas.width / 2, canvas.height / 2 - 8);

    ctx.fillStyle = '#d6deff';
    ctx.font = '16px Segoe UI';
    const label = level === currentMode.maxLevel ? `Preparing Max Level ${currentMode.maxLevel}` : `Preparing Level ${level}`;
    ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 24);
}

function gameOver() {
    isRunning = false;
    pauseBtn.disabled = true;

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    if (score > highScore) {
        highScore = score;
        safeStorageSet('snakeHighScore', String(highScore));
        highScoreElement.textContent = String(highScore);
    }

    draw();
    ctx.fillStyle = 'rgba(2, 5, 18, 0.78)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ff7ea7';
    ctx.font = '700 38px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GREAT TRY!', canvas.width / 2, canvas.height / 2 - 36);

    ctx.fillStyle = '#eef2ff';
    ctx.font = '600 22px Segoe UI';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 2);
    ctx.fillText(`Level: ${level}`, canvas.width / 2, canvas.height / 2 + 30);

    if (score === highScore && score > 0) {
        ctx.fillStyle = '#8df4ff';
        ctx.font = '600 17px Segoe UI';
        ctx.fillText('New High Score!', canvas.width / 2, canvas.height / 2 + 56);
    }

    setStatus('Great try! Press Restart for another adventure.');
}

function modeComplete() {
    isModeCompleted = true;
    isRunning = false;
    pauseBtn.disabled = true;

    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    if (score > highScore) {
        highScore = score;
        safeStorageSet('snakeHighScore', String(highScore));
        highScoreElement.textContent = String(highScore);
    }

    playTone(760, 0.12, 'triangle', 0.07);
    playTone(980, 0.16, 'sine', 0.06);

    draw();
    ctx.fillStyle = 'rgba(7, 20, 45, 0.72)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#7ff1bd';
    ctx.font = '700 36px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('MODE COMPLETE!', canvas.width / 2, canvas.height / 2 - 40);

    ctx.fillStyle = '#eef6ff';
    ctx.font = '600 22px Segoe UI';
    ctx.fillText(`${currentMode.label} cleared`, canvas.width / 2, canvas.height / 2 - 4);
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 30);

    ctx.fillStyle = '#d9e7ff';
    ctx.font = '16px Segoe UI';
    ctx.fillText('Press Restart to play again', canvas.width / 2, canvas.height / 2 + 64);

    setStatus(`Amazing! You completed ${currentMode.label} mode. Press Restart to play again.`);
}

function drawStartScreen() {
    drawBoard();

    ctx.fillStyle = 'rgba(2, 6, 20, 0.58)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#8ff2ff';
    ctx.font = '700 34px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('HAPPY SNAKE', canvas.width / 2, canvas.height / 2 - 20);

    ctx.fillStyle = '#ced9ff';
    ctx.font = '16px Segoe UI';
    ctx.fillText('Hit Start Game, then press a direction key', canvas.width / 2, canvas.height / 2 + 18);
}

function drawRoundRect(x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function bootstrapGame() {
    try {
        modeSelect.value = currentModeKey;
        updateSoundButton();
        applySavedTouchControlsPreference();
        if (versionLabelElement) {
            versionLabelElement.textContent = `Version ${APP_VERSION}`;
        }
        if (updatedLabelElement) {
            updatedLabelElement.textContent = `Updated ${APP_UPDATED}`;
        }
        drawStartScreen();
        updateHud();
        maybeShowHowToOverlay();
    } catch (error) {
        console.error('Failed to initialize Happy Snake:', error);
        const fallbackMessage = 'Startup issue detected. Please refresh the page to try again.';
        if (statusElement) {
            statusElement.textContent = fallbackMessage;
        }
        if (ariaStatusElement) {
            ariaStatusElement.textContent = fallbackMessage;
        }
    }
}

bootstrapGame();
