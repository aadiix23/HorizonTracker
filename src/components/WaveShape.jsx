import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const WaveShape = ({ width = '100%', height = '100%', style }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 400 150" style={style} preserveAspectRatio="none">
            <Defs>
                <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                    <Stop offset="0" stopColor="#E961FF" stopOpacity="1" />
                    <Stop offset="1" stopColor="#8A2BE2" stopOpacity="1" />
                </LinearGradient>
            </Defs>
            <Path
                d="M 0 60 L 120 20 L 280 90 L 400 40 L 400 90 L 280 140 L 120 70 L 0 110 Z"
                fill="url(#grad)"
            />
        </Svg>
    );
};

export default WaveShape;
