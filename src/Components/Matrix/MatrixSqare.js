import React, {useState , useEffect} from "react";

const MatrixSqare = (props) => {
  const [isDropped, setIsDropped] = useState(false);

  useEffect(() => {
    props.draggedTileDetails(props.rowPos, props.colPos, props.rgb, isDropped);
    // console.log(props.rowPos, props.colPos, props.rgb, isDropped)
  }, [isDropped]);

  return (
    <>
      <span
        className="sqare"
        title={`rgb(${props.rgb[0]},${props.rgb[1]},${props.rgb[2]})`}
        style={{
          backgroundColor: `rgb(${props.rgb[0]},${props.rgb[1]},${props.rgb[2]})`,
          border: `2px solid ${
            props.isBorderHighlighted ? "rgb(255,0,0)" : "rgb(128,128,128)"
          }`,
          width: "10px",
          margin: "2px",
        }}
        draggable={true}
        onDragStart={(e) => {
          setIsDropped(false);
        }}
        onDragEnd={() => {
          setIsDropped(true);
        }}
      >
        -
      </span>
    </>
  );
};

export default MatrixSqare;
