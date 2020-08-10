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
        };

        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
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
        this.drawBall(ctx);
        this.drawPaddle(ctx);
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
                alert('GAME OVER');

                //TODO error: not reload correctly
                window.location.reload();
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
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext('2d');

        this.initState();

        document.addEventListener('keydown', this.keyDownHandler, false);
        document.addEventListener('keyup', this.keyUpHandler, false);
        const intervalId = setInterval(() => this.draw(canvas, ctx), 10);
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