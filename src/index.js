// ==================      ELEMENTS      ================== //

const square11 = document.getElementById('sq11');
const square12 = document.getElementById('sq12');
const square13 = document.getElementById('sq13');
const square21 = document.getElementById('sq21');
const square22 = document.getElementById('sq22');
const square23 = document.getElementById('sq23');
const square31 = document.getElementById('sq31');
const square32 = document.getElementById('sq32');
const square33 = document.getElementById('sq33');

// ==================      FRAMES / PREVIEW / BUTTONS      ================== //

const addFrameBtn = document.getElementById('addFrame');
const addFrameBox = document.getElementById('newFrame');
const drawBtn = document.getElementById('draw');
const fullscreen = document.getElementById('fullscreen');

const speedRange = document.getElementById('speedRange');
const speedRangeValue = document.getElementById('speedRangeValue');

const paint = document.getElementById('canvas');
var ctx = paint.getContext('2d');

let frameNames = [];
for (i=0; i<100; i++) {
    let x = 'frame'+i;
    frameNames.push(x);
    window['frame' + i] = document.getElementById(x);
};


let framesUrls = [];


// ==================      TOOLS      ================== //

const painter1 = document.getElementById('paint');
const colorPicker1 = document.getElementById('choose');
const mover1 = document.getElementById('move');
const transformer1 = document.getElementById('transform');

// ==================      FRAMES FUNCTIONALITY      ================== //

let currentFrame = 0;
function zeroFrame() {
    clearCanva();
    let canvas = document.getElementById(currentFrame);
    let c = canvas.getContext('2d');
    c.fillStyle = '#c4c4c4';
    c.fillRect(3, 3, 20, 20);
    c.fillRect(27, 3, 20, 20);
    c.fillRect(51, 3, 20, 20);
    c.fillRect(3, 27, 20, 20);
    c.fillRect(27, 27, 20, 20);
    c.fillRect(51, 27, 20, 20);
    c.fillRect(3, 51, 20, 20);
    c.fillRect(27, 51, 20, 20);
    c.fillRect(51, 51, 20, 20);
    framesUrls[currentFrame] = canvas.toDataURL("image/png");
}

zeroFrame();

function addFrame() {
    let markup = `
        <div class="frameBox">
            <canvas class="frame" id="${currentFrame+1}" width="74" height="74"></canvas>
            <button class="copy">copy</button>
            <button class="del">del</button>
        </div>
    `;
    addFrameBox.insertAdjacentHTML('beforebegin', markup);
    currentFrame++;
    let canvas = document.getElementById(currentFrame);
    let c = canvas.getContext('2d');
    c.fillStyle = '#c4c4c4';
    c.fillRect(3, 3, 20, 20);
    c.fillRect(27, 3, 20, 20);
    c.fillRect(51, 3, 20, 20);
    c.fillRect(3, 27, 20, 20);
    c.fillRect(27, 27, 20, 20);
    c.fillRect(51, 27, 20, 20);
    c.fillRect(3, 51, 20, 20);
    c.fillRect(27, 51, 20, 20);
    c.fillRect(51, 51, 20, 20);
    console.log("window['frame' + currentFrame]", window['frame' + currentFrame]);
    console.log("framesUrls 0, 1, 2, 3, 4", frame0, frame1, frame2, frame3, frame4);
    framesUrls[currentFrame] = canvas.toDataURL("image/png");
    console.log('framesUrls', framesUrls);

}

function clearCanva() {
    square11.style.backgroundColor = '#c4c4c4';
    square12.style.backgroundColor = '#c4c4c4';
    square13.style.backgroundColor = '#c4c4c4';
    square21.style.backgroundColor = '#c4c4c4';
    square22.style.backgroundColor = '#c4c4c4';
    square23.style.backgroundColor = '#c4c4c4';
    square31.style.backgroundColor = '#c4c4c4';
    square32.style.backgroundColor = '#c4c4c4';
    square33.style.backgroundColor = '#c4c4c4';
}

function copyFrame() {
    let markup = `
        <div class="frameBox">
            <canvas class="frame" id="${currentFrame+1}" width="74" height="74"></canvas>
            <button class="copy" id="copy${currentFrame+1}">copy</button>
            <button class="del" id="del${currentFrame+1}">del</button>
        </div>
    `;
    addFrameBox.insertAdjacentHTML('beforebegin', markup);
    currentFrame++; 
    let canvas = document.getElementById(currentFrame);
    let c = canvas.getContext('2d');
    c.fillStyle = square11.style.backgroundColor;
    c.fillRect(3, 3, 20, 20);
    c.fillStyle = square12.style.backgroundColor;
    c.fillRect(27, 3, 20, 20);
    c.fillStyle = square13.style.backgroundColor;
    c.fillRect(51, 3, 20, 20);
    c.fillStyle = square21.style.backgroundColor;
    c.fillRect(3, 27, 20, 20);
    c.fillStyle = square22.style.backgroundColor;
    c.fillRect(27, 27, 20, 20);
    c.fillStyle = square23.style.backgroundColor;
    c.fillRect(51, 27, 20, 20);
    c.fillStyle = square31.style.backgroundColor;
    c.fillRect(3, 51, 20, 20);
    c.fillStyle = square32.style.backgroundColor;
    c.fillRect(27, 51, 20, 20);
    c.fillStyle = square33.style.backgroundColor;
    c.fillRect(51, 51, 20, 20);
    framesUrls[currentFrame] = canvas.toDataURL("image/png");
}

/*function copyFrame2 () {
    let markup2 = findFrameBox(event).cloneNode(true);
    console.log('markup2', markup2);
    //document.getElementById('frames').removeChild(findFrameBox(event));
    addFrameBox.insertAdjacentHTML('beforebegin', markup2);
}*/

function deleteFrame() {
    console.log('targetToFrame(event): ', findFrameBox(event));
    console.log('targetToFrame(event).firstElementChild: ', findFrameBox(event).firstElementChild);
    console.log('targetToFrame(event).firstElementChild.id: ', findFrameBox(event).firstElementChild.id);
    document.getElementById('frames').removeChild(findFrameBox(event));
    framesUrls.splice(findFrameBox(event).firstElementChild.id, 1);
}

addFrameBtn.addEventListener('click', function(event){
    console.log ('addFrameBtn');
    addFrame();
    clearCanva();
});

function findFrameBox(event) {
    let target = event.target;
    const findParent = () => {
        target = target.parentNode;
        if(!target.classList.contains('frameBox')) {
            findParent();
        }
        return target;
    };
    return findParent();
}

document.addEventListener('click', (event) => {
    console.log('event.target: ', event.target);
    console.log('event.target.classList.value: ', event.target.classList.value);
    console.log('event.target.id: ', event.target.id);
    
    if (event.target.classList.value == 'copy') {
        copyFrame(event);
    }
    if (event.target.classList.value == 'del') {
        deleteFrame(event);
    }
    
});

// ==================      ANIMATION      ================== //

console.log('speedRange.value', speedRange.value);
speedRange.onmouseup = function () {
    console.log('speedRange.value', speedRange.value);
    speedRangeValue.innerHTML = speedRange.value.toString();
    startAnimation();
}

function draw (frameSrc) {
    let frame = new Image();
    frame.src = frameSrc;
    ctx.drawImage(frame, 0, 0);
}

let count = 0;
let intervalX;

function startAnimation () {
    if (intervalX) clearInterval(intervalX);
    intervalX = setInterval(() => {
        let frameSrc = framesUrls[count % framesUrls.length];
        draw(frameSrc);
        count++
      }, 1000/speedRange.value)
}

drawBtn.onclick = function () {
    startAnimation();
}

fullscreen.onclick = function () {
    toggleFullScreen();
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        paint.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
        document.exitFullscreen(); 
        }
    }
}

// ==================      TOOLS FUNCTIONALITY      ================== //

let toolState = {
    currentTool: '',
}

function changeTool (clickedElement) {
    painter1.classList.remove('highlight');
    colorPicker1.classList.remove('highlight');
    mover1.classList.remove('highlight');
    transformer1.classList.remove('highlight');
    if (clickedElement === 'painter1') {
        if (toolState.currentTool === 'painter1') toolState.currentTool = '';
        else {
            toolState.currentTool = 'painter1';
            painter1.classList.add('highlight');
        }
    } else if (clickedElement === 'colorPicker1') {  
        if (toolState.currentTool === 'colorPicker1') toolState.currentTool = '';
        else {
            toolState.currentTool = 'colorPicker1';
            colorPicker1.classList.add('highlight');
        }
    } else if (clickedElement === 'mover1') {
        if (toolState.currentTool === 'mover1') toolState.currentTool = '';
        else {
            toolState.currentTool = 'mover1';
            mover1.classList.add('highlight');
        }
    } else if (clickedElement === 'transformer1') {
        if (toolState.currentTool === 'transformer1') toolState.currentTool = '';
        else {
            toolState.currentTool = 'transformer1';
            transformer1.classList.add('highlight');
        }
    }
}

onkeypress = function () {
    if (event.code === 'KeyP') {
        let clickedElement = 'painter1';
        changeTool (clickedElement);
    }
    else if (event.code === 'KeyC') {
        let clickedElement = 'colorPicker1';
        changeTool (clickedElement);
    }
    else if (event.code === 'KeyM') {
        let clickedElement = 'mover1';
        changeTool (clickedElement);
    }
    else if (event.code === 'KeyT') {
        let clickedElement = 'transformer1';
        changeTool (clickedElement);
    }
}

painter1.addEventListener('click', function(event){
    console.log ('PAINTER');
    let clickedElement = 'painter1';
    changeTool (clickedElement);
});

colorPicker1.addEventListener('click', function(event){
    console.log ('COLOR PICKER');
    let clickedElement = 'colorPicker1';
    changeTool (clickedElement);
});

mover1.addEventListener('click', function(event){
    console.log ('MOVER');
    let clickedElement = 'mover1';
    changeTool (clickedElement);
});

transformer1.addEventListener('click', function(event){
    console.log ('TRANSFORMER');
    let clickedElement = 'transformer1';
    changeTool (clickedElement);
});

document.addEventListener('click', (event) => {
    
    
    if (toolState.currentTool === 'colorPicker1') {
        console.log('getComputedStyle(currentColor1).backgroundColor', getComputedStyle(currentColor1).backgroundColor);
        if (event.target.classList.value !== 'txt') {
            
            if (event.target.classList.value === 'txt2' || event.target.id === 'blueBtn' || event.target.id === 'redBtn' || event.target.id === 'currentBtn' || event.target.id === 'prevBtn') {
                if (event.target.id === 'currentTxt' || event.target.id === 'currentBtn') currentColor1.style.backgroundColor = currentColor1.style.backgroundColor;
                else if (event.target.id === 'prevTxt' || event.target.id === 'prevBtn') currentColor1.style.backgroundColor = getComputedStyle(prevColor1).backgroundColor;
                else if (event.target.id === 'redTxt' || event.target.id === 'redBtn') currentColor1.style.backgroundColor = getComputedStyle(redColor1).backgroundColor;
                else if (event.target.id === 'blueTxt' || event.target.id === 'blueBtn') currentColor1.style.backgroundColor = getComputedStyle(blueColor1).backgroundColor;
            } else currentColor1.style.backgroundColor = getComputedStyle(event.target).backgroundColor;
            // localStorage.setItem('currentColor1', currentColor1.style.backgroundColor);
        }
        console.log('OOOOPS');
        
    }
    if (toolState.currentTool === 'painter1') {
        if (event.target.classList.value == 'square') {
            console.log('event.target.id', event.target.id);
            event.target.style.backgroundColor = currentColor1.style.backgroundColor;
            prevColor1.style.backgroundColor = event.target.style.backgroundColor;
            
            let canvas = document.getElementById(currentFrame);
            let c = canvas.getContext('2d');
            c.fillStyle = square11.style.backgroundColor;
            c.fillRect(3, 3, 20, 20);
            c.fillStyle = square12.style.backgroundColor;
            c.fillRect(27, 3, 20, 20);
            c.fillStyle = square13.style.backgroundColor;
            c.fillRect(51, 3, 20, 20);
            c.fillStyle = square21.style.backgroundColor;
            c.fillRect(3, 27, 20, 20);
            c.fillStyle = square22.style.backgroundColor;
            c.fillRect(27, 27, 20, 20);
            c.fillStyle = square23.style.backgroundColor;
            c.fillRect(51, 27, 20, 20);
            c.fillStyle = square31.style.backgroundColor;
            c.fillRect(3, 51, 20, 20);
            c.fillStyle = square32.style.backgroundColor;
            c.fillRect(27, 51, 20, 20);
            c.fillStyle = square33.style.backgroundColor;
            c.fillRect(51, 51, 20, 20);
            framesUrls[currentFrame] = canvas.toDataURL("image/png");
        }
    }

});

// ==================      COLOR MANAGEMENT      ================== //

const current1 = document.getElementById('currentBtn');
const prev1 = document.getElementById('prevBtn');
const red1 = document.getElementById('redBtn');
const blue1 = document.getElementById('blueBtn');

const currentColor1 = document.getElementById('current');
const prevColor1 = document.getElementById('prev');
const redColor1 = document.getElementById('red');
const blueColor1 = document.getElementById('blue');

current1.addEventListener('click', function(event){
    console.log ('current1');
});

prev1.addEventListener('click', function(event){
    console.log ('prev1');
});

red1.addEventListener('click', function(event){
    console.log ('red1');
});

blue1.addEventListener('click', function(event){
    console.log ('blue1');
});
