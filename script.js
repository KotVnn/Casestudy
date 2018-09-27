// Vẽ ra bóng và di chuyển bóng
let Balls = function (x, y, xgo, ygo, size, color) {
    this.x = x;
    this.y = y;
    this.xgo = xgo;
    this.ygo = ygo;
    this.size = size;
    this.color = color;

    // Di chuyển
    this.go = function () {
        this.x = this.x + this.xgo;
        this.y = this.y + this.ygo;

        // Begin: Điều kiện chạm tường thì bật lại
        let reachLeft = this.x - this.size <= 0;
        let reachRight = this.x + this.size >= canvas.width;
        if (reachLeft || reachRight) {
            this.xgo = -(this.xgo);
        }

        let reachTop = this.y - this.size <= 0;
        let reachBottom = this.y + this.size >= canvas.height;
        if (reachTop || reachBottom) {
            this.ygo = -(this.ygo);
        }
        // End: Điều kiện chạm tường thì bật lại
    };

    // Make Ball
    this.draws = function (canvas) {
        let ctx = canvas.getContext("2d");
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    };

    this.collisionDetect = function (ball) {
        for (let balls of ball) {
            for (let i = 0; i < ball.length; i++) {
                if (ball[i] !== balls && collisioned(ball[i], balls)) {
                    // this.color = colors();
                    // balls.color = colors();
                    // ball[i].xgo = -(ball[i].xgo);
                    // ball[i].ygo = -(ball[i].ygo);
                    balls.xgo = -(balls.xgo);
                    balls.ygo = -(balls.ygo);
                    // console.log(ball[i].x + " ; " + balls.x);
                }
            }
        }

        function collisioned(b1, b2) {
            let sumOfRadiuses = b1.size + b2.size;
            return distance(b1, b2) < sumOfRadiuses;
        }

        function distance(b1, b2) {
            let dx = b1.x - b2.x;
            let dy = b1.y - b2.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    };
};

// Tạo màu sắc random
function colors() {
    let colorRandom = Math.floor(Math.random() * 6 + 1);
    switch (colorRandom) {
        case 1:
            return "red";
            break;
        case 2:
            return "blue";
            break;
        case 3:
            return "yellow";
            break;
        case 4:
            return "green";
            break;
        case 5:
            return "white";
            break;
        case 6:
            return "cyan";
            break;
        case 7:
            return "pink";
            break;
        default:
            return "black";
    }
}

// Tạo hàm random số
function ranNum(max, min) {
    let n = Math.floor(Math.random() * (max - min)) + min;
    return n;
}

// Tạo hàm random âm dương
function ranhl(max, min) {
    let n = ranNum(max, min) % 2;
    if (n === 0) {
        return ranNum(max, min) * (-1);
    } else return ranNum(max, min);

}

// Tạo bóng
function createABulkOfBalls(num) {
    let balls = Array(num);
    while (num > 0) {
        balls[--num] = createRandomBall();
    }
    return balls;

    function createRandomBall() {
        let size = ranNum(55, 20);
        let x = ranNum(1000, 200);
        let y = ranNum(500, 100);
        let color = colors();
        let xgo = ranhl(6, 1);
        let ygo = ranhl(6, 1);

        return new Balls(x, y, xgo, ygo, size, color);
    }
}

// Thực thi
function makeBalls() {
    dim(canvas);
    for (let balls of ball) {
        balls.draws(canvas);
        balls.go();
        balls.collisionDetect(ball);
    }
    window.requestAnimationFrame(makeBalls);
}

// Clear canvas
function dim(canvas) {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}