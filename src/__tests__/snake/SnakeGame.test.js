
const getAllCoords = (xMin, xMax, yMin, yMax, stepSize) =>  {
    let res = [];
    for (let y=yMin; y<=yMax; y=y+stepSize){
        for(let x=xMin; x<=xMax; x=x+stepSize){
            res.push([x, y]);
        }
    }
    return res;
}

test("Simple", () => {
    let res = getAllCoords(0, 20, 0, 30, 10);
    expect(res)
        .toStrictEqual([[0, 0], [10, 0],[20, 0], [0, 10], [10, 10], [20, 10],  [0, 20], [10, 20], [20, 20], [0, 30], [10, 30], [20, 30]]);
});