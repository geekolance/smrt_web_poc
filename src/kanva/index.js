import React, {useState, useRef} from 'react';
import { Stage, Layer, Line, Text, Image } from 'react-konva';
import useImage from 'use-image';

const FreehandDrawing = (props) => {
  const {
    image,
    value
  } = props
  // Sample DataStructure
  // {
  //   "spot" : {
  //     lines: ["10", "20", "11", "20"]
  //   }
  // }

  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const [annotations, setAnnotations] = useState({})
  const isDrawing = React.useRef(false);
  const [img] = useImage("https://picsum.photos/500/500");

  const handleMouseDown = (e) => {
    console.log("in here")
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    setAnnotations
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
    <div >
      <Stage
        width={500}
        height={500}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        // onTap={handleMouseDown}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
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
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default FreehandDrawing