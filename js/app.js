// Enemies our player must avoid

var allEnemies = [];

//define Enemy Class
var Enemy = function() {
    this.x = -110;
    this.y = 50 + (Math.floor(Math.random() * 3) * 80);
    if (allEnemies.length <= 3) {
        this.speed = (Math.random()) * 240 + 240;
        this.sprite = 'images/enemy-bug.png';
    } else {
        this.speed = -((Math.random()) * 240 + 240);
        this.sprite = 'images/enemy-bug-turned.png';

    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += (dt * this.speed);
    if (this.speed > 0) {
        if (this.x > 510) {
            this.x = -110;
            this.y = 50 + (Math.floor(Math.random() * 3) * 83);
        }
    }
    if (this.speed < 0) {
        if (this.x < -100) {
            this.x = 520;
            this.y = 50 + (Math.floor(Math.random() * 3) * 83);
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//instantiate enemies
allEnemies.push(new Enemy);
allEnemies.push(new Enemy);
allEnemies.push(new Enemy);

var players = [];
var activeCount = 0;
var playerPics = ['images/char-boy.png',
    'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'
];

//define player class
var player = function() {
    this.sprite = playerPics[activeCount];
    this.x = (activeCount * 101);
    this.y = 50 + 83 * 4;
    this.active = false;
};

player.prototype.update = function() {
    //TODO additional player functionality
};


//Make active player follow directional inputs
player.prototype.handleInput = function(keyPressed) {
    if (keyPressed === "left") {
        if (this.x > 50) {
            this.x -= 101;
        }
    }
    if (keyPressed === "right") {
        if (this.x < 400) {
            this.x += 101;
        }
    }
    if (keyPressed === "up") {
        if (this.y > 50) {
            this.y -= 83;
        } else {
            reached(true);
        }
    }
    if (keyPressed === "down") {
        if (this.y < 350) {
            this.y += 83;
        }
    }
};

//render functionality for player
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//instantiate Players
for (num = 0; num < 5; num++) {
    players.push(new player);
    activeCount++;
}
activeCount = 0;
players[activeCount].active = true;

//
function makeActive() {
    players[activeCount].active = false;
    activeCount++;
    if (activeCount < 5) {
        players[activeCount].active = true;
    }
    if (activeCount === 5) {
        reset();
    }

}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    players.forEach(function(player) {
        if (player.active) {
            player.handleInput(allowedKeys[e.keyCode]);
        }
    });
});

//on some collision
function reached(state) {
    players.forEach(function(player) {
        if (player.active) {
            //bugged
            if (state === false) {
                player.x = 1200;
                player.y = 50 + 83 * 4;
                makeActive();
                state = undefined;
            }
            //path crossed
            if (state === true) {
                allEnemies.push(new Enemy);
                reset();
            }
        }
    });
    allEnemies.forEach(function(enemy) {
        enemy.x = -110;
        enemy.y = 50 + (Math.floor(Math.random() * 3) * 83);
    });
}

//reset level
function reset() {
    activeCount = 0;
    players = [];
    for (num = 0; num < 5; num++) {
        players.push(new player);
        activeCount++;
    }
    activeCount = 0;
    players[activeCount].active = true;
}
