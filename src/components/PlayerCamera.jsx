import React, { useRef, useState, useContext } from 'react';
import ml5 from 'ml5';
import Sketch from 'react-p5';
import { GameContext } from '../context/GameContext';

const PlayerCamera = function PlayerCamera() {
  const gameContext = useContext(GameContext);

  const video = useRef();
  const poseNet = useRef();
  const pose = useRef();
  const skeleton = useRef();
  const brain = useRef();
  const [poseLabel, setPoseLabel] = useState('N');

  const classifyPose = () => {
    if (pose.current) {
      const gotResult = (error, results) => {
        console.log(error);
        console.log(results);
        setPoseLabel('hi');
        // if (results[0].confidence > 0.75) {
        //   setPoseLabel(results[0].label.toUpperCase());
        // }
        // classifyPose();
      };

      const inputs = [];
      for (let i = 0; i < pose.current.keypoints.length; i += 1) {
        const { x } = pose.current.keypoints[i].position;
        const { y } = pose.current.keypoints[i].position;
        inputs.push(x);
        inputs.push(y);
      }
      console.log(inputs);
      console.log(brain.current);
      brain.current.classify(inputs, gotResult);
    }
    // else {
    //   setTimeout(classifyPose(), 100);
    // }
  };

  function modelLoaded() {
    console.log('poseNet ready');
  }

  const brainLoaded = (p5) => {
    console.log('pose classification ready!');
    classifyPose(p5);
  };

  function gotPoses(poses) {
    if (poses.length > 0) {
      pose.current = poses[0].pose;
      skeleton.current = poses[0].skeleton;

      // TODO: Fix since this currently is never called since pose classification doesn't work...
      if (gameContext.gameStats.capturePose) {
        const newGameStats = { ...gameContext.gameStats };
        newGameStats.capturePose = false;
        newGameStats.playerMove = 'FILL ME IN';
        newGameStats.botMove = 'RANDOM FILL ME IN';

        gameContext.setGameStats(newGameStats);
      }
    }
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(640, 480).parent(canvasParentRef);
    video.current = p5.createCapture(p5.VIDEO);
    video.current.hide();
    poseNet.current = ml5.poseNet(video.current, modelLoaded);
    poseNet.current.on('pose', gotPoses);

    const options = {
      inputs: 34,
      outputs: 4,
      task: 'classification',
      debug: true,
    };

    brain.current = ml5.neuralNetwork(options);
    const modelInfo = {
      model:
        'https://teachablemachine.withgoogle.com/models/5UuIp_h24/model.json',
      metadata:
        'https://teachablemachine.withgoogle.com/models/5UuIp_h24/metadata.json',
      weights:
        'https://teachablemachine.withgoogle.com/models/5UuIp_h24/model.weights.bin',
    };
    brain.current.load(modelInfo, brainLoaded);
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

    p5.fill(255, 0, 255);
    p5.noStroke();
    p5.textSize(512);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text(poseLabel, p5.width / 2, p5.height / 2);
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default PlayerCamera;
