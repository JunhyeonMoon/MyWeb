/****** 
https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript
2D 벽돌깨기 튜토리얼 REACT로 진행
*******/

import React from 'react';

const canvasStyle = {
    background: '#eee',
    display: 'block',
    margin: '0',
}


class Brick {
    constructor() {
        this.brickRowCount = 3;
        this.brickColumnCount = 5;
        this.brickWidth = 75;
        this.brickHeight = 20;
        this.brickPadding = 10;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 30;
        this.bricks = [];

        for(var c=0; c<this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for(var r=0; r<this.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0 , status: 1};
            }
        }
    }

    drawBricks(ctx) {
        for(var c=0; c<this.brickColumnCount; c++) {
            for(var r=0; r<this.brickRowCount; r++) {
                if(this.bricks[c][r].status === 1){
                    var brickX = (c*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
                    var brickY = (r*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
                    this.bricks[c][r].x = brickX;
                    this.bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
}



class GameCanvas extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            x: 0,
            y: 0,
            dx: 0,
            dy: 0,
            ballRadius: 10,
            width: 480,
            height: 320,
            paddleWidth: 70,
            paddleHeight: 10,
            paddleX: (480 - 70) / 2,
            rightPressed: false,
            leftPressed: false,
            intervalId: 0,
        };
        this.score = 0;
        this.lives = 3;
        this.Brick = new Brick();
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
    }

    collisionDetection() {
        let x = this.state.x;
        let y = this.state.y;
        let dy = this.state.dy;
        let isCollide = false;
        for(var c=0; c<this.Brick.brickColumnCount; c++) {
            for(var r=0; r<this.Brick.brickRowCount; r++) {
                var b = this.Brick.bricks[c][r];
                if(b.status === 1 && 
                    x > b.x && x < b.x+this.Brick.brickWidth && y > b.y && y < b.y+this.Brick.brickHeight) {
                    dy = -dy;
                    isCollide = true;
                    b.status = 0;
                    this.score++;
                    if(this.score === this.Brick.brickRowCount*this.Brick.brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        clearInterval(this.state.intervalId);
                        document.location.reload();
                    }
                }
            }
        }

        if(isCollide){
            this.setState({dy: dy});
        }
    }

    mouseMoveHandler(e) {
        var relativeX = e.clientX - this.canvas.offsetLeft;
        if(relativeX > 0 && relativeX < this.canvas.width) {
            this.setState({paddleX: relativeX - this.state.paddleWidth/2});
        }
    }

    keyDownHandler(e){
        if(e.keyCode === 39){
            this.setState({rightPressed: true});
        }

        if(e.keyCode === 37){
            this.setState({leftPressed: true});
        }
    }

    keyUpHandler(e){
        if(e.keyCode === 39){
            this.setState({rightPressed: false});
        }

        if(e.keyCode === 37){
            this.setState({leftPressed: false});
        }
    }

    drawScore(ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: "+this.score, 8, 20);
    }

    drawLives(ctx) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives: "+ this.lives, this.canvas.width-65, 20);
    }

    drawBall(ctx){
        var x = this.state.x;
        var y = this.state.y;
        var ballRadius = this.state.ballRadius;
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();        
    }

    drawPaddle(ctx){
        var paddleWidth = this.state.paddleWidth;
        var paddleHeight = this.state.paddleHeight;
        var paddleX = this.state.paddleX;
        
        ctx.beginPath();
        ctx.rect(paddleX, this.state.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
    }

    draw(canvas, ctx){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.Brick.drawBricks(ctx);
        this.drawBall(ctx);
        this.drawPaddle(ctx);
        this.drawScore(ctx);
        this.drawLives(ctx);
        this.collisionDetection();
        var x = this.state.x; var y = this.state.y;
        var dx = this.state.dx; var dy = this.state.dy;
        var br = this.state.ballRadius;
        var paddleX = this.state.paddleX;
        if(x + dx > canvas.width - br || x + dx < br){
            dx = -dx;
        }

        if(y + dy < br){
            dy = -dy;
        }else if(y + dy > canvas.height - br){
            if(x > paddleX && x < paddleX + this.state.paddleWidth){
                dy = -dy;
            }else{
                this.lives--;
                if(!this.lives){
                    alert('GAME OVER');
                    document.location.reload();
                    clearInterval(this.state.intervalId);
                } else {
                    let x = this.canvas.width / 2;
                    let y = this.canvas.height - 30;
                    let dx = 2;
                    let dy = -2;
                    let paddleX = (this.canvas.width - this.state.paddleWidth) / 2;
                    this.setState({
                        x: x,
                        y: y,
                        dx: dx,
                        dy: dy,
                        paddleX: paddleX,
                    });
                    return;
                }
            }
        }

        if(this.state.rightPressed && paddleX < canvas.width - this.state.paddleWidth){
            paddleX += 7;
        }
        else if(this.state.leftPressed && paddleX > 0){
            paddleX -= 7;
        }

        this.setState({
            x: x += dx,
            y: y += dy,
            dx: dx,
            dy: dy,
            paddleX: paddleX,
        });
    }

    initState(){
        this.setState({
            x: this.state.width/2,
            y: this.state.height-30,
            dx: 2,
            dy: -2,
        });
    }

    canvasControl(){
        this.canvas = document.getElementById("myCanvas");
        var ctx = this.canvas.getContext('2d');

        this.initState();

        document.addEventListener('keydown', this.keyDownHandler, false);
        document.addEventListener('keyup', this.keyUpHandler, false);        
        document.addEventListener("mousemove", this.mouseMoveHandler.bind(this), false);
        const intervalId = setInterval(() => this.draw(this.canvas, ctx), 10);
        this.setState({intervalId: intervalId});
        
    }

    componentDidMount(){
        this.canvasControl();
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId);
    }

    render(){
        return(
          <div>
            <canvas id="myCanvas" width={this.state.width} height={this.state.height} style={canvasStyle}></canvas>
          </div>
        );
    }
}


class CanvasTutorial extends React.Component{
    render() {
        return (
            <GameCanvas />
        );
    }
}

export default CanvasTutorial;