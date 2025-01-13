import React from 'react';

const HEAD_STYLE = {
  width: '5rem',
  height: '5rem',
  borderRadius: '100%',
  border: '6px solid black',
  position: 'absolute',
  top: '3rem',
  right: '2.8rem',
};

const BODY_STYLE = {
  width: '0.35rem',
  height: '7rem',
  backgroundColor: 'black',
  position: 'absolute',
  top: '8rem',
  right: '5rem',
};

const RIGHT_ARM_STYLE = {
  width: '6.15rem',
  height: '0.35rem',
  backgroundColor: 'black',
  position: 'absolute',
  top: '9.9rem',
  right: '-1rem',
  transform: 'rotate(-30deg)',
  transformOrigin: 'left center',
  borderRadius: '0.3rem',
};

const LEFT_ARM_STYLE = {
  width: '6rem',
  height: '0.35rem',
  backgroundColor: 'black',
  position: 'absolute',
  top: '10rem',
  right: '5rem',
  transform: 'rotate(30deg)',
  transformOrigin: 'right center',
  borderRadius: '0.3rem',
};

const RIGHT_LEG_STYLE = {
  width: '7.2rem',
  height: '0.35rem',
  backgroundColor: 'black',
  position: 'absolute',
  top: '14.65rem',
  right: '-2rem',
  transform: 'rotate(30deg)',
  transformOrigin: 'left center',
  borderRadius: '0.3rem',
};

const LEFT_LEG_STYLE = {
  width: '7.1rem',
  height: '0.35rem',
  backgroundColor: 'black',
  position: 'absolute',
  top: '14.6rem',
  right: '5rem',
  transform: 'rotate(-30deg)',
  transformOrigin: 'right center',
  borderRadius: '0.3rem',
};

const BODY_PARTS = [
  <div style={HEAD_STYLE} key="head" />,
  <div style={BODY_STYLE} key="body" />,
  <div style={RIGHT_ARM_STYLE} key="right-arm" />,
  <div style={LEFT_ARM_STYLE} key="left-arm" />,
  <div style={RIGHT_LEG_STYLE} key="right-leg" />,
  <div style={LEFT_LEG_STYLE} key="left-leg" />,
];

const HangmanDraw = ({ numberOfGuess }) => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '200px', height: '400px' }}>
      {BODY_PARTS.slice(0, numberOfGuess)}
      <div style={{
        width: '0.5rem',
        height: '3rem',
        backgroundColor: 'black',
        position: 'absolute',
        top: '0',
        right: '5rem',
      }} />
      <div style={{
        width: '10rem',
        height: '0.5rem',
        backgroundColor: 'black',
        marginLeft: '-3rem',
      }} />
      <div style={{
        width: '0.5rem',
        height: '25rem',
        backgroundColor: 'black',
        marginLeft: '-3rem',
      }} />
      <div style={{
        width: '15rem',
        height: '0.5rem',
        backgroundColor: 'black',
        borderRadius: '0.375rem',
        marginLeft: '-5rem',
      }} />
    </div>
  );
};

export default HangmanDraw;
