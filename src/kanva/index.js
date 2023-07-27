import React, { useState, useRef } from 'react';
import { Stage, Layer, Circle, Text, Image } from 'react-konva';
import useImage from 'use-image'
import { imageMarkingColors } from '../config/colorCoding';

const FreehandDrawing = (props) => {
  const {
    image,
    value
  } = props
  // Sample DataStructure
  // {
  //   "spot" : {
  //     circle: ["10", "20", "11", "20"]
  //   }
  // }

  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const [annotations, setAnnotations] = useState({})
  const isDrawing = React.useRef(false);
  const [img] = useImage("https://picsum.photos/500/500");

  const updateDrawing = (drawing) => {
    setAnnotations(...annotations, { [value]: { "lines": drawing } })
  }

  const handleMouseDown = (e) => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, { value, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div>
      <Stage
        width={500}
        height={500}
        onMouseDown={handleMouseDown}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          <Text text="Just start drawing" x={5} y={30} />
          <Image
            image={img}
            x={0}
            y={0}
            offsetX={0}
            offsetY={0}
          />
          {lines.map((line, i) => (
            <>
              {
                line.value === value && <Circle
                  key={i}
                  x={line.points[0]}
                  y={line.points[1]}
                  radius={6}
                  fill={imageMarkingColors[line.value]}
                />
              }
            </>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default FreehandDrawing