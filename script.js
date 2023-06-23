const gridBox = document.getElementsByClassName("grid-container");
const startNum = 16;

let chosenColor = "rgb(0, 0, 0)";
let randomColor = false;

const gridSlider = document.getElementById("slider");
const gridLabel = document.getElementById("slider-value");
const eraseBtn = document.getElementById("erase-btn");
const blackBtn= document.getElementById("black");
const randomBtn = document.getElementById("random");
const pickBtn = document.getElementById("pick");

gridSlider.onchange = (e) => changeGrid(e.target.value);
eraseBtn.onclick = () => eraseGrid();
blackBtn.onclick = () => changeColor("black");
randomBtn.onclick = () => changeColor("random");
pickBtn.onclick = () => changeColor("pick");

drawGrid(startNum);

function drawGrid (pickNum) {
    let squareColor = "rgb(255, 255, 255)";
    let squareFilter = "brightness(1)";
    
    for (let i = 1; i <= pickNum; i++) {
        const divRow = document.createElement("div");

        divRow.className = "row";
        divRow.id = "row" + i;
        gridBox[0].appendChild(divRow);

        divRow.style.display = "flex";
        divRow.style.justifyContent = "center";

        for (let j = 1; j <= pickNum; j++) {
            const square = document.createElement("div");

            square.className = "square";
            square.id = "r" + i + "s" + j;
            divRow.appendChild(square);
            
            square.style.width = (1 / pickNum) * 100 + "%";
            square.style.aspectRatio = "1 / 1";
            square.style.backgroundColor = "rgb(255, 255, 255)";
            square.style.filter = "brightness(1)";
            square.addEventListener (
                "mouseenter", (event) => {
                    if (randomColor) {
                        const currentColor = event.target.style.backgroundColor;
                        const currentFilter = event.target.style.filter;

                        if (currentColor !== "rgb(255, 255, 255)" && currentColor !== "rgb(0, 0, 0)") {
                            squareColor = currentColor;
                            squareFilter = darkenColor(currentFilter);
                            event.target.style.filter = squareFilter;
                        }
                        else {
                            squareColor = chooseColor();
                        }
                    }
                    else {
                        squareColor = chosenColor;
                    }
                   event.target.style.backgroundColor = squareColor;
                }
            );
        }
    }
}

function changeColor(newColor) {
    const dots = document.querySelectorAll(".dot")
    dots.forEach(dot => {
        dot.style.backgroundColor = "black";
    });

    switch(newColor) {
        case "black":
            const blackDot = document.getElementById("black-dot");
            blackDot.style.backgroundColor = "yellow";
            blackDot.style.boxShadow = "0 0 5px yellow";
            chosenColor = "rgb(0, 0, 0)";
            randomColor = false;
            break;
        case "random":
            const randomDot = document.getElementById("random-dot");
            randomDot.style.backgroundColor = "yellow";
            randomDot.style.boxShadow = "0 0 5px yellow";
            randomColor = true;
            break;
        case "pick":
            const pickDot = document.getElementById("pick-dot");
            pickDot.style.backgroundColor = "yellow";
            pickDot.style.boxShadow = "0 0 5px yellow";
            chosenColor = document.getElementById("choose-color").value;
            randomColor = false;
            break;
        
    }
    return;
}

function eraseGrid() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.style.backgroundColor = "rgb(255, 255, 255)";
        square.style.filter = "brightness(1)";
    });
}

function changeGrid(value) {
    gridLabel.innerHTML = value + " x " +  value;
    const rows = document.querySelectorAll(".row");
    
    rows.forEach(row => {
        row.remove();
    });

    drawGrid(value);
}

function chooseColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    let rgbString = "rgb(" + r + ", " + g + ", " + b + ")";
    return rgbString;
}

function darkenColor(origFilter) {
    let start = origFilter.indexOf("(") + 1;
    let end = origFilter.indexOf(")");
    let numString = origFilter.substring(start, end);

    if (numString >= .1) {
        numString = numString - .1;
    }
    else {
        numString = 0;
    }

    return "brightness(" + numString + ")";
}