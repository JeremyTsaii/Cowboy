import React, { useRef, useContext } from 'react';
import ml5 from 'ml5';
import Sketch from 'react-p5';
import { GameContext } from '../context/GameContext';

const PoseDic = {
  a: 'Reload',
  b: 'Shield',
  c: 'Shoot',
};

const PlayerCamera = function PlayerCamera() {
  const { gameStats, setGameStats } = useContext(GameContext);
  const game = useRef();
  game.current = gameStats;
  const video = useRef();
  const poseNet = useRef();
  const pose = useRef();
  const skeleton = useRef();
  const brain = useRef();
  const poseLabel = useRef();

  const classifyPose = () => {
    if (pose.current) {
      const gotResult = (error, results) => {
        if (results[0].confidence > 0.75) {
          poseLabel.current = PoseDic[results[0].label];
        }
        setTimeout(classifyPose, 500);
      };

      const inputs = [];
      for (let i = 0; i < pose.current.keypoints.length; i += 1) {
        const { x } = pose.current.keypoints[i].position;
        const { y } = pose.current.keypoints[i].position;
        inputs.push(x);
        inputs.push(y);
      }
      brain.current.classify(inputs, gotResult);
    }
  };

  const gotPoses = (poses) => {
    if (poses.length > 0) {
      pose.current = poses[0].pose;
      skeleton.current = poses[0].skeleton;

      if (game.current.capturePose) {
        // Get player move
        const newGameStats = { ...game.current };
        newGameStats.capturePose = false;
        newGameStats.playerMove = poseLabel.current;

        // Get bot move
        const moves = Object.values(PoseDic);
        const random = Math.floor(Math.random() * moves.length);
        newGameStats.botMove = moves[random];

        // Update state according to game rules
        if (newGameStats.playerMove === 'Reload') {
          newGameStats.playerAmmo += 1;
        }
        if (newGameStats.botMove === 'Reload') {
          newGameStats.botAmmo += 1;
        }
        if (
          newGameStats.playerMove === 'Shoot' &&
          newGameStats.playerAmmo > 0
        ) {
          newGameStats.playerAmmo -= 1;
          if (newGameStats.botMove !== 'Shield') {
            newGameStats.botLives -= 1;
          }
        }
        if (
          newGameStats.botMove === 'Shoot' &&
          newGameStats.botAmmo > 0
        ) {
          newGameStats.botAmmo -= 1;
          if (newGameStats.playerMove !== 'Shield') {
            newGameStats.playerLives -= 1;
          }
        }
        if (
          newGameStats.playerLives === 0 ||
          newGameStats.botLives === 0
        ) {
          newGameStats.isGameOver = true;
          newGameStats.isPlaying = false;
        }

        setGameStats(newGameStats);
        game.current = newGameStats;
      }

      classifyPose();
    }
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(640, 480).parent(canvasParentRef);
    video.current = p5.createCapture(p5.VIDEO);
    video.current.hide();
    poseNet.current = ml5.poseNet(video.current);
    poseNet.current.on('pose', gotPoses);

    const options = {
      inputs: 34,
      outputs: 3,
      task: 'classification',
      debug: true,
    };

    brain.current = ml5.neuralNetwork(options);
    const modelInfo = {
      model: '/model/model.json',
      metadata: '/model/model_meta.json',
      weights: '/model/model.weights.bin',
    };
    brain.current.load(modelInfo);
  };

  const draw = (p5) => {
    p5.push();
    p5.translate(video.current.width, 0);
    p5.scale(-1, 1);
    p5.image(
      video.current,
      0,
      0,
      video.current.width,
      video.current.height,
    );

    if (pose.current) {
      for (let i = 0; i < skeleton.current.length; i += 1) {
        const a = skeleton.current[i][0];
        const b = skeleton.current[i][1];
        p5.strokeWeight(2);
        p5.stroke(0);

        p5.line(
          a.position.x,
          a.position.y,
          b.position.x,
          b.position.y,
        );
      }
      for (let i = 0; i < pose.current.keypoints.length; i += 1) {
        const { x } = pose.current.keypoints[i].position;
        const { y } = pose.current.keypoints[i].position;
        p5.fill(0);
        p5.stroke(255);
        p5.ellipse(x, y, 16, 16);
      }
    }
    p5.pop();

    p5.fill(0, 230, 118);
    p5.noStroke();
    p5.textSize(70);
    p5.text(poseLabel.current, p5.width / 12, p5.height / 6);
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default PlayerCamera;
