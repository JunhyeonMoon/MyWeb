import React from 'react';

const canvasStyle = {
    width: '480',
    height: '320',
    background: '#eee',
    display: 'block',
    margin: '0',
}

class GameCanvas extends React.Component {
    render(){
        return(
          <div>
            <canvas id='myCanvas' style={canvasStyle}></canvas>
          </div>  
        );
    }
}


class NewTab extends React.Component{
    render() {
        return (
            <GameCanvas />
        );
    }
}

export default NewTab;