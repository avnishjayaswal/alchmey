import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { isEmpty } from "lodash";
import {
  MovesCount,
  MovesLeft,
  setClosestColor,
  setDeltaValue,
  reset
} from "../Services/UserSlice";
import MartixCircle from "./MartixCircle";
import MatrixSqare from "./MatrixSqare";

const AlchmeyMatrix = () => {

  let deltaVal ;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const matrixVal = useSelector((state) => state.user.matrix);
  const MoveCountVal = useSelector((state) => state.user.MoveCount);

  const [errorMessage, setErrorMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  let tempSRowNum = 0;
  let tempSColNum = 0;

  const [rgbMatrix, setRgbMatrix] = useState([])
  const [rowCount, setRowCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);

  const [currentRowPos, setCurrentRowPos] = useState(0);
  const [currentColumnPos, setCurrentColumnPos] = useState(0);

  const deltaValue = useSelector((state) => state.user.deltaValue);
  const movesLeft = useSelector((state) => state.user.MovesLeft);


  useEffect(() => {
    if (!isEmpty(user)) {
      setRowCount(user?.height);
      setColumnCount(user?.width);
    }
  }, [user?.height, user?.width]);

  useEffect(() => {
    setRgbMatrix(RgbMatrix())
  }, [rowCount, columnCount]);

  useEffect(() => {
    console.log("dialog" , showDialog , dialogMessage)

    if (showDialog) {

      const result = window.confirm(dialogMessage);
      console.log(result)
      if (!result) {
        reset() ;
        setShowDialog(false);
      } 
   
    }
  }, [dialogMessage, showDialog]);

  useEffect(() => {

    console.log("move left" , movesLeft , deltaValue)

    if (movesLeft > 0 && deltaValue * 100 < 10) {
      setShowDialog(true);
      setDialogMessage("Success!.Do you want to play again?");
    } else if (movesLeft <= 0 && deltaValue * 100 >= 10) {
      setShowDialog(true);
      setDialogMessage("Failed!.Do you want to play again?");
    } else {
      setShowDialog(false);
      setDialogMessage("");
    }
  }, [deltaValue, movesLeft]);

  const RgbMatrix = () => {
    let tempMatrix = [];
    let matrix = [];
    for (let rowNum = 0; rowNum < rowCount + 2; rowNum++) {
      tempMatrix = [];
      for (let colNum = 0; colNum < columnCount  + 2; colNum++) {
        if (
          (rowNum === 0 && colNum === 0) ||
          (rowNum === 0 && colNum === columnCount  + 1) ||
          (rowNum === rowCount + 1 && colNum === 0) ||
          (rowNum === rowCount + 1 && colNum === columnCount  + 1)
        ) {
          tempMatrix.push({
            rowIndex: rowNum,
            colIndex: colNum,
            rgbArr: [],
            isHighlighted: false,
          });
        } else {
          tempMatrix.push({
            rowIndex: rowNum,
            colIndex: colNum,
            rgbArr: [0, 0, 0],
            isHighlighted: false,
          });
        }
      }
      matrix.push(tempMatrix);
    }
    return matrix;
  };

  const getSelectedSourceDetail = (sRowNum, sColNum, rgb) => {
    tempSRowNum = sRowNum;
    tempSColNum = sColNum;
  };

  const onMartixCircleClick = (rowPos, colPos, rgb) => {
    dispatch(MovesCount(MoveCountVal + 1));
    setCurrentColumnPos(colPos);
    setCurrentRowPos(rowPos);
  };

  const setRgbTileColor = (
    rowPos,
    colPos,
    rowCount,
    columnCount,
    rgbColor,
    rgbMatrix
  ) => {
    let leftSourceRGB = [];
    let topSourceRGB = [];
    let rightSourceRGB = [];
    let bottomSourceRGB = [];
    let leftFr = 0;
    let topFr = 0;
    let rightFr = 0;
    let bottomFr = 0;

    if (rowPos === 0 || rowPos === rowCount + 1) {
      for (let indx = 1; indx <= rowCount; indx++) {
        let currentMatrixRowIndex = indx;
        let currentMatrixColumnIndex = colPos;
        leftSourceRGB = rgbMatrix[currentMatrixRowIndex][0].rgbArr;
        topSourceRGB = rgbMatrix[0][currentMatrixColumnIndex].rgbArr;
        rightSourceRGB =
          rgbMatrix[currentMatrixRowIndex][columnCount + 1].rgbArr;
        bottomSourceRGB =
          rgbMatrix[rowCount + 1][currentMatrixColumnIndex].rgbArr;

        leftFr =
          (columnCount + 1 - currentMatrixColumnIndex) / (columnCount + 1);
        topFr = (rowCount + 1 - currentMatrixRowIndex) / (rowCount + 1);
        rightFr =
          (columnCount + 1 - (columnCount + 1 - currentMatrixColumnIndex)) /
          (columnCount + 1);
        bottomFr =
          (rowCount + 1 - (rowCount + 1 - currentMatrixRowIndex)) /
          (rowCount + 1);

        let r1 = leftSourceRGB[0] ? leftSourceRGB[0] * leftFr : 0;
        let g1 = leftSourceRGB[1] ? leftSourceRGB[1] * leftFr : 0;
        let b1 = leftSourceRGB[2] ? leftSourceRGB[2] * leftFr : 0;

        let r2 = topSourceRGB[0] ? topSourceRGB[0] * topFr : 0;
        let g2 = topSourceRGB[1] ? topSourceRGB[1] * topFr : 0;
        let b2 = topSourceRGB[2] ? topSourceRGB[2] * topFr : 0;

        let r3 = rightSourceRGB[0] ? rightSourceRGB[0] * rightFr : 0;
        let g3 = rightSourceRGB[1] ? rightSourceRGB[1] * rightFr : 0;
        let b3 = rightSourceRGB[2] ? rightSourceRGB[2] * rightFr : 0;

        let r4 = bottomSourceRGB[0] ? bottomSourceRGB[0] * bottomFr : 0;
        let g4 = bottomSourceRGB[1] ? bottomSourceRGB[1] * bottomFr : 0;
        let b4 = bottomSourceRGB[2] ? bottomSourceRGB[2] * bottomFr : 0;

        let r = r1 + r2 + r3 + r4;
        let g = g1 + g2 + g3 + g4;
        let b = b1 + b2 + b3 + b4;
        let f = 255 / Math.max(r, g, b, 255);
        rgbMatrix[currentMatrixRowIndex][currentMatrixColumnIndex].rgbArr = [
          r * f,
          g * f,
          b * f,
        ];
      }
    } else if (colPos === 0 || colPos === columnCount + 1) {
      for (let indx = 1; indx <= columnCount; indx++) {
        let currentMatrixRowIndex = rowPos;
        let currentMatrixColumnIndex = indx;
        leftSourceRGB = rgbMatrix[currentMatrixRowIndex][0].rgbArr;
        topSourceRGB = rgbMatrix[0][currentMatrixColumnIndex].rgbArr;
        rightSourceRGB =
          rgbMatrix[currentMatrixRowIndex][columnCount + 1].rgbArr;
        bottomSourceRGB =
          rgbMatrix[rowCount + 1][currentMatrixColumnIndex].rgbArr;
        leftFr =
          (columnCount + 1 - currentMatrixColumnIndex) / (columnCount + 1);
        topFr = (rowCount + 1 - currentMatrixRowIndex) / (rowCount + 1);
        rightFr =
          (columnCount + 1 - (columnCount + 1 - currentMatrixColumnIndex)) /
          (columnCount + 1);
        bottomFr =
          (rowCount + 1 - (rowCount + 1 - currentMatrixRowIndex)) /
          (rowCount + 1);

        let r1 = leftSourceRGB[0] ? leftSourceRGB[0] * leftFr : 0;
        let g1 = leftSourceRGB[1] ? leftSourceRGB[1] * leftFr : 0;
        let b1 = leftSourceRGB[2] ? leftSourceRGB[2] * leftFr : 0;

        let r2 = topSourceRGB[0] ? topSourceRGB[0] * topFr : 0;
        let g2 = topSourceRGB[1] ? topSourceRGB[1] * topFr : 0;
        let b2 = topSourceRGB[2] ? topSourceRGB[2] * topFr : 0;

        let r3 = rightSourceRGB[0] ? rightSourceRGB[0] * rightFr : 0;
        let g3 = rightSourceRGB[1] ? rightSourceRGB[1] * rightFr : 0;
        let b3 = rightSourceRGB[2] ? rightSourceRGB[2] * rightFr : 0;

        let r4 = bottomSourceRGB[0] ? bottomSourceRGB[0] * bottomFr : 0;
        let g4 = bottomSourceRGB[1] ? bottomSourceRGB[1] * bottomFr : 0;
        let b4 = bottomSourceRGB[2] ? bottomSourceRGB[2] * bottomFr : 0;

        let r = r1 + r2 + r3 + r4;
        let g = g1 + g2 + g3 + g4;
        let b = b1 + b2 + b3 + b4;
        let f = 255 / Math.max(r, g, b, 255);
        rgbMatrix[currentMatrixRowIndex][currentMatrixColumnIndex].rgbArr = [
          r * f,
          g * f,
          b * f,
        ];
      }
    }
  };


  const displayMatrixColor = (rowPos, colPos, rgbMatrix) => {
    for (let i = 0; i < rgbMatrix.length; i++) {
      for (let j = 0; j < rgbMatrix[i].length; j++) {
        if (rowPos === i && colPos === j) {
          let value = rgbMatrix[i][j];

          if (MoveCountVal === 1) {
            value.rgbArr = [255, 0, 0];
            setRgbTileColor(
              rowPos,
              colPos,
              rowCount,
              columnCount,
              [255, 0, 0],
              rgbMatrix
            );
          } else if (MoveCountVal === 2) {
            value.rgbArr = [0, 255, 0];
            setRgbTileColor(
              rowPos,
              colPos,
              rowCount,
              columnCount,
              [0, 255, 0],
              rgbMatrix
            );
          } else if (MoveCountVal === 3) {
            value.rgbArr = [0, 0, 255];

            setRgbTileColor(
              rowPos,
              colPos,
              rowCount,
              columnCount,
              [0, 0, 255],
              rgbMatrix
            );
          }
        }
      }
    }
  };

  useEffect(() => {
    if (MoveCountVal > 3) return;
    displayMatrixColor(currentRowPos, currentColumnPos, rgbMatrix);
    const { tileRowNum, tileColumnNum, minDeltaValue, closestColorRGB } =
      getHighlightedTileDetails();
    heighlightMatchingTile(tileRowNum, tileColumnNum, rgbMatrix);
    getClosestRgbAndMovesCount(
      closestColorRGB,
      MoveCountVal,
      minDeltaValue
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MoveCountVal, currentRowPos, currentColumnPos]);

  const getHighlightedTileDetails = () => {
    let minDeltaValue = 1;
    let closestColorRGB;
    let tileRowNum = 0;
    let tileColumnNum = 0;
    for (let i = 1; i < rgbMatrix.length; i++) {
      for (let j = 1; j < rgbMatrix[i].length; j++) {
        let tempValue = rgbMatrix[i][j].rgbArr;

        let delta =
          (1 / 255) *
          (1 / Math.sqrt(3)) *
          Math.sqrt(
            (user.target[0] - tempValue[0]) ** 2 +
              (user.target[1] - tempValue[1]) ** 2 +
              (user.target[2] - tempValue[2]) ** 2
          );
        if (minDeltaValue >= delta) {
          minDeltaValue = delta;
          closestColorRGB = tempValue;
          tileRowNum = i;
          tileColumnNum = j;
        }
      }
    }

    return { tileRowNum, tileColumnNum, minDeltaValue, closestColorRGB };
  };

  const getClosestRgbAndMovesCount = (closestColor, movesCountVal, deltaVal) => {
    dispatch(MovesCount(movesCountVal))
    dispatch(setClosestColor(closestColor))
    dispatch(setDeltaValue(deltaVal))
  };

  const heighlightMatchingTile = (
    tileRowNum,
    tileColumnNum,
    rgbMatrix
  ) => {
    let isMatchFound = false;
    rgbMatrix.forEach((items, index) => {
      items.forEach((sItem, sIndex) => {
        if (index === tileRowNum && sIndex === tileColumnNum && !isMatchFound) {
          sItem.isHighlighted = true;
          isMatchFound = true;
        } else {
          sItem.isHighlighted = false;
        }
      });
    });
  };

  const draggedTileInfo = (tRowNum, tColNum, rgb, isDropped) => {
    if (isDropped && MoveCountVal >= 3) {
      rgbMatrix[tempSRowNum][tempSColNum].rgbArr = rgb;

      setRgbTileColor(
        tempSRowNum,
        tempSColNum,
        rowCount,
        // row,
        columnCount,
        // column,
        rgb,
        rgbMatrix
      );
      const { tileRowNum, tileColumnNum, minDeltaValue, closestColorRGB } =
        getHighlightedTileDetails();
      heighlightMatchingTile(tileRowNum, tileColumnNum, rgbMatrix);
      getClosestRgbAndMovesCount(
        closestColorRGB,
        // movesCount + 1,
        dispatch(MovesCount(MoveCountVal + 1)),
        minDeltaValue
      );

      // setMovesCount(movesCount + 1);
      dispatch(MovesCount(MoveCountVal + 1));
    }
  };


  useEffect(() => {
    if (user?.maxMoves > 0) {
      dispatch(MovesLeft(user.maxMoves - MoveCountVal))
    }
  }, [MoveCountVal , user]);

  return (
    <>
      <div className="container mt-5">
        {rgbMatrix.map((items, index) => (
          <div className="row justify-content-md-center" key={index}>
            {items.map((sItem, sIndex) => {
              return (
                <>
                  {(sItem.rowIndex === 0 || sItem.rowIndex === rowCount + 1) &&
                    sItem.rgbArr.length === 0 && (
                      <span style={{ width: "10px", margin: "2px" }}></span>
                    )}

                  {(sItem.rowIndex === 0 || sItem.rowIndex === rowCount + 1) &&
                    sItem.rgbArr.length > 0 && (
                      <MartixCircle
                        key={`${sItem.rowIndex}-${sItem.colIndex}`}
                        rowPos={sItem.rowIndex}
                        colPos={sItem.colIndex}
                        rgb={sItem.rgbArr}
                        onClick={() => {
                          onMartixCircleClick(
                            sItem.rowIndex,
                            sItem.colIndex,
                            sItem.rgbArr
                          );
                        }}
                        getSourceDetail={getSelectedSourceDetail}
                      />
                    )}

                  {sItem.rowIndex !== 0 &&
                    sItem.rowIndex !== rowCount + 1 &&
                    (sItem.colIndex === 0 || sItem.colIndex === columnCount  + 1) && (
                      <MartixCircle
                        key={`${sItem.rowIndex}-${sItem.colIndex}`}
                        rowPos={sItem.rowIndex}
                        colPos={sItem.colIndex}
                        rgb={sItem.rgbArr}
                        onClick={() => {
                          onMartixCircleClick(
                            sItem.rowIndex,
                            sItem.colIndex,
                            sItem.rgbArr
                          );
                        }}
                        getSourceDetail={getSelectedSourceDetail}
                      />
                    )}

                  {sItem.rowIndex !== 0 &&
                    sItem.rowIndex !== rowCount + 1 &&
                    sItem.colIndex !== 0 &&
                    sItem.colIndex !== columnCount  + 1 && 
                    <MatrixSqare 
                    key={`${sItem.rowIndex}-${sItem.colIndex}`}
                      rowPos={sItem.rowIndex}
                      colPos={sItem.colIndex}
                      isBorderHighlighted={sItem.isHighlighted}
                      rgb={sItem.rgbArr}
                      draggedTileDetails={draggedTileInfo}
                    />}
                </>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default AlchmeyMatrix;
