import React, { useState, useRef } from 'react';
import { Stage, Layer, Circle, Text, Image } from 'react-konva';
import useImage from 'use-image'
import { imageMarkingColors } from '../config/colorCoding';
import { Note } from '../components/note';

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

  const [text, setText] = useState("Click to resize. Double click to edit.")
  const [width, setWidth] = useState(100)
  const [height, setHeight] = useState(10)
  const [selected, setSelected] = useState(false)
  const [noteAdded, setNoteAdded] = useState(false)

  const isDrawing = React.useRef(false);
  const [img] = useImage("https://picsum.photos/500/500");

  const handleMouseDown = (e) => {
    isDrawing.current = true
    if (value === 'note') setNoteAdded(true)
    const pos = e.target.getStage().getPointerPosition()
    if (value === 'note' && !noteAdded) {
      setLines([...lines, { value, points: [pos.x, pos.y] }]);
    }
    if (value !== 'note') {
      setLines([...lines, { value, points: [pos.x, pos.y] }]);
    }
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
          {lines.map((line, i) => (
            <>
              {
                line.value === 'note' && value === 'note' && (
                  <Note
                    x={parseInt(lines[0].points[0]) + 5}
                    y={parseInt(lines[0].points[1]) + 5}
                    text={text}
                    colour={imageMarkingColors['note']}
                    onTextChange={(value) => setText(value)}
                    width={width}
                    height={height}
                    selected={selected}
                    onTextResize={(newWidth, newHeight) => {
                      setWidth(newWidth)
                      setHeight(newHeight)
                    }}
                    onClick={() => {
                      setSelected(!selected);
                    }}
                    onTextClick={(newSelected) => {
                      setSelected(newSelected)
                    }}
                  />
                )
              }
            </>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default FreehandDrawing