import React, { Component } from 'react';
import Board from './Board';
import './game.css';
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null
    }
  }

  sanitizeInput(input, dimension) {
    let output;
    output = parseInt(input);
    if (Number.isNaN(output)) {
      return {
        valid: false,
        msg: `${input} not valid. 
          Please enter a valid integer for ${dimension}`
      };
    } else if (output < 0 || output > 15) {
      return {
        valid: false,
        msg: `${input} not valid. 
            Please enter a positive integer or less than 15 for ${dimension}`
      };
    } else {
      return {
        valid: true,
        output
      };
    }
  }
  componentDidMount() {
    let width = this.sanitizeInput(
      prompt("Please enter board width"),
      'width'
    );
    while (!width.valid) {
      width = this.sanitizeInput(prompt(width.msg), 'width');
    }
    let height = this.sanitizeInput(
      prompt("Please enter board height"),
      'height'
    );
    while (!height.valid) {
      height = this.sanitizeInput(prompt(height.msg), 'height');
    }
    this.setState({ width: width.output, height: height.output });
  }


  render() {
    return (
      <div className="game-board">
        <div className="game-board">
          {
            (this.state.width !== null && this.state.height !== null) ? <Board width={this.state.width} height={this.state.height} /> : ''
          }
        </div>
      </div>
    );
  }
}
export default Game