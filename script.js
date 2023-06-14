class Square {
    constructor(rowIndex, colIndex, color, defaultColor, element, captured) {
      this.rowIndex = rowIndex
      this.colIndex = colIndex
      this.color = color
      this.defaultColor = defaultColor
      this.element = element
      this.captured = captured
      this.tempChecked = false
    }
    setSquareCounter() {
        if (this.defaultColor == 'var(--red)') {
            !capturing ? redCounter++ : redCounter--
        }
        if (this.defaultColor == 'var(--orange)') {
            !capturing ? orangeCounter++ : orangeCounter--
        }
        if (this.defaultColor == 'var(--yellow)') {
           !capturing ? yellowCounter++ : yellowCounter--
        }
        if (this.defaultColor == 'var(--green)') {
            !capturing ? greenCounter++ : greenCounter--
        }
        if (this.defaultColor == 'var(--blue)') {
            !capturing ? blueCounter++ : blueCounter--
        }
        redCounterLabel.textContent = redCounter
        orangeCounterLabel.textContent = orangeCounter
        yellowCounterLabel.textContent = yellowCounter
        greenCounterLabel.textContent = greenCounter
        blueCounterLabel.textContent = blueCounter
    }
    captureCheck(color) {
        if (this.captured) {
            this.color = color
            !predicting ? this.element.style.backgroundColor = color : this.element.style.backgroundColor = this.element.style.backgroundColor
            //square right
            if (squareArr[this.rowIndex][this.colIndex + 1] != null && squareArr[this.rowIndex][this.colIndex + 1].captured == false) {
                if (this.color == squareArr[this.rowIndex][this.colIndex + 1].color) {
                    squareArr[this.rowIndex][this.colIndex + 1].captured = true
                    predicting ? squareArr[this.rowIndex][this.colIndex + 1].tempChecked = true : squareArr[this.rowIndex][this.colIndex + 1].tempChecked = false
                    !predicting ? squareArr[this.rowIndex][this.colIndex + 1].element.style.backgroundColor = color : squareArr[this.rowIndex][this.colIndex + 1].element.classList.add('tempChanged')
                    squareArr[this.rowIndex][this.colIndex + 1].captureCheck(color)
                    if (!predicting) {
                        squareArr[this.rowIndex][this.colIndex + 1].setSquareCounter()
                    }
                }
            }
            //square left
            if (squareArr[this.rowIndex][this.colIndex - 1] != null && squareArr[this.rowIndex][this.colIndex - 1].captured == false) {
                if (this.color == squareArr[this.rowIndex][this.colIndex - 1].color) {
                    squareArr[this.rowIndex][this.colIndex - 1].captured = true
                    predicting ? squareArr[this.rowIndex][this.colIndex - 1].tempChecked = true : squareArr[this.rowIndex][this.colIndex - 1].tempChecked = false
                    !predicting ? squareArr[this.rowIndex][this.colIndex - 1].element.style.backgroundColor = color : squareArr[this.rowIndex][this.colIndex - 1].element.classList.add('tempChanged')
                    squareArr[this.rowIndex][this.colIndex - 1].captureCheck(color)
                    if (!predicting) {
                        squareArr[this.rowIndex][this.colIndex - 1].setSquareCounter()
                    }
                }
            }
            //square down
            if (this.rowIndex <= 23 && squareArr[this.rowIndex + 1][this.colIndex] != null && squareArr[this.rowIndex + 1][this.colIndex].captured == false) {
                if (this.color == squareArr[this.rowIndex + 1][this.colIndex].color) {
                    squareArr[this.rowIndex + 1][this.colIndex].captured = true
                    predicting ? squareArr[this.rowIndex + 1][this.colIndex].tempChecked = true : squareArr[this.rowIndex + 1][this.colIndex].tempChecked = false 
                    !predicting ? squareArr[this.rowIndex + 1][this.colIndex].element.style.backgroundColor = color : squareArr[this.rowIndex + 1][this.colIndex].element.classList.add('tempChanged')
                    squareArr[this.rowIndex + 1][this.colIndex].captureCheck(color)
                    if (!predicting) {
                        squareArr[this.rowIndex + 1][this.colIndex].setSquareCounter()
                    }
                }
            }
            //square up
            if (this.rowIndex != 0 && squareArr[this.rowIndex - 1][this.colIndex] != null && squareArr[this.rowIndex - 1][this.colIndex].captured == false) {
                if (this.color == squareArr[this.rowIndex - 1][this.colIndex].color) {
                    squareArr[this.rowIndex - 1][this.colIndex].captured = true
                    predicting ? squareArr[this.rowIndex - 1][this.colIndex].tempChecked = true : squareArr[this.rowIndex - 1][this.colIndex].tempChecked = false 
                    !predicting ? squareArr[this.rowIndex - 1][this.colIndex].element.style.backgroundColor = color : squareArr[this.rowIndex - 1][this.colIndex].element.classList.add('tempChanged')
                    squareArr[this.rowIndex - 1][this.colIndex].captureCheck(color)
                    if (!predicting) {
                        squareArr[this.rowIndex - 1][this.colIndex].setSquareCounter()
                    }
                }
            }
          }
    }
}

function resetBoard(loadString) {
    redCounter = 0
    orangeCounter = 0
    yellowCounter = 0
    greenCounter = 0
    blueCounter = 0
    counterLabel.textContent = 0
    let i = 0 //tracks incrementing for loadString if it isnt null
    capturing = false
    if (saving == true) {
        squareArr.forEach(row => {
            row.forEach(sq => {
                sq.color = sq.defaultColor
                sq.element.style.backgroundColor = sq.defaultColor
                sq.captured = false
                sq.setSquareCounter()
            })
        })
    }
    else {
        loadString == null ? console.log('null') : console.log('load string 0: ' + loadString.charAt(0))
        let randomNumberArr = []
            for (let x = 0; x < 625; x++) {
                loadString == null ? randomNumberArr[x] = colors[Math.floor(Math.random() * 5)] : randomNumberArr[x] = colors[parseInt(loadString.charAt(x))]
            }
        console.log(randomNumberArr)
        squareArr = new Array(25).fill(0).map((_, rowIndex) => new Array(25).fill(0).map((_, colIndex) => ({ value: 0, rowIndex, colIndex }))); //initialize new object array
        let boardLoading = document.querySelector('.boardLoading')
        document.querySelector('.board').remove()
        let squareContainer = document.createElement('div')
        squareContainer.classList.add('board')
        boardLoading.parentNode.insertBefore(squareContainer, boardLoading.nextSibling) //reset and insert new board

        squareArr.forEach(row => {
            row.forEach(({ value, rowIndex, colIndex }) => {
            let captured = false
            let color = randomNumberArr[i]
            const squareElement = document.createElement('div');
            squareElement.classList.add('square');
            squareElement.style.backgroundColor = color
            let square = new Square(rowIndex, colIndex, color, color, squareElement, captured)
            square.setSquareCounter()
            squareContainer.appendChild(squareElement);
            row.splice(colIndex, 1, square)
            i++
            })
        })
    }
    squareArr[0][0].captured = true
    capturing = true
    squareArr[0][0].setSquareCounter()
    squareArr[0][0].captureCheck(squareArr[0][0].color)
    capturing = false
    colorButtons.forEach(color => {
    color.classList.remove('grayed')
    if (color.dataset.color == squareArr[0][0].color) {
        color.classList.add('grayed')
    }
    })
}



const colors = ['var(--red)', 'var(--orange)', 'var(--yellow)', 'var(--green)', 'var(--blue)']

let colorButtons = document.querySelectorAll('.color')

let resetButton = document.querySelector('.resetButton')
let saveButton = document.querySelector('.saveButton')
let radarButton = document.querySelector('.predictButton')

let colorPalette = document.querySelector('.colorPalette') //element to hide color palette
let palContainer = document.querySelector('.widthChange')
let palButton = document.querySelector('.ddl')
let ddlArrow = document.querySelector('.ddlArrow')
let otherColors = document.querySelector('.otherColors') //container of other colors in color palette
let colorOptions = document.querySelectorAll('.option') //click event label for each color

let capturing = false //determine whether to increment or decrement square counters
let saving = false //determine if user is saving board
let predicting = false //determine if radar button is checked

let redCounter = 0
let orangeCounter = 0
let yellowCounter = 0
let greenCounter = 0
let blueCounter = 0

let redCounterLabel = document.querySelector('.redCounter')
let orangeCounterLabel = document.querySelector('.orangeCounter')
let yellowCounterLabel = document.querySelector('.yellowCounter')
let greenCounterLabel = document.querySelector('.greenCounter')
let blueCounterLabel = document.querySelector('.blueCounter')
let counterLabel = document.querySelector('.counter')

let importButton = document.querySelector('.import')
let exportButton = document.querySelector('.export')
let loadLabel = document.querySelector('.loadLabel')

let menu = document.querySelector('.menu') //screen resizing selectors
let game = document.querySelector('.left')
let lBoard = document.querySelector('.scoreWrap')
let ham = document.querySelector('.ham')
let xMark = document.querySelector('xMark')



//event listener for colors
colorButtons.forEach(color =>
    color.addEventListener("click", event => {
        !predicting ? counterLabel.textContent = parseInt(counterLabel.textContent) + 1 : counterLabel.textContent = counterLabel.textContent
        capturing = true
        let color = event.target.dataset.color
        colorButtons.forEach(col => {
            col.classList.remove('grayed')
        })
        if (predicting) {
            squareArr.forEach(row => {
                row.forEach(sq => {
                    sq.color = sq.element.style.backgroundColor
                    if (sq.tempChecked == true) {
                        sq.captured = false
                        sq.tempChecked = false
                        sq.element.classList.remove('tempChanged')
                        console.log('removing')
                    }
                })
            })
        }
        event.target.classList.add('grayed')
        squareArr.forEach(row => {
            row.forEach(sq => {
                if (sq.captured == true) {
                    sq.captureCheck(color)
                }
            })
        })
        capturing = false
    }))

//resetButton
resetButton.addEventListener('click', () => {
    resetBoard()
})

//saveButton
saveButton.addEventListener('click', () => {
    !saveButton.classList.contains('active') ? saveButton.classList.add('active') : saveButton.classList.remove('active')
    saving = !saving
})

//radarButton
radarButton.addEventListener('click', () => {
    !radarButton.classList.contains('active') ? radarButton.classList.add('active') : radarButton.classList.remove('active')
    predicting = !predicting
    squareArr.forEach(row => {
        row.forEach(sq => {
            sq.color = sq.element.style.backgroundColor
            if (sq.tempChecked == true) {
                sq.captured = false
                sq.tempChecked = false
                sq.element.classList.remove('tempChanged')
                console.log('removing')
            }
        })
    })
    colorButtons.forEach(color => {
        color.classList.remove('grayed')
        if (squareArr[0][0].color == color.dataset.color) {
            color.classList.add('grayed')
        }
    })
})

//Open and close color palette
palButton.addEventListener('click', () => {
    !palContainer.classList.contains('open') ? palContainer.classList.add('open') : palContainer.classList.remove('open')
    palContainer.classList.contains('open') ? ddlArrow.classList.add('flip') : ddlArrow.classList.remove('flip')
    !palContainer.classList.contains('open') ? otherColors.classList.add('hidden') : otherColors.classList.remove('hidden')
})

colorOptions.forEach(color => {
    color.addEventListener('click', () => {
        let p = color.getElementsByTagName('div') //each color option within element
        let root = document.querySelector(":root")
        root.style.setProperty('--red', p[0].style.backgroundColor)
        root.style.setProperty('--orange', p[1].style.backgroundColor)
        root.style.setProperty('--yellow', p[2].style.backgroundColor)
        root.style.setProperty('--green', p[3].style.backgroundColor)
        root.style.setProperty('--blue', p[4].style.backgroundColor)
        root.style.setProperty('--activeRed', p[0].dataset.darken)
        root.style.setProperty('--activeOrange', p[1].dataset.darken)
        root.style.setProperty('--activeYellow', p[2].dataset.darken)
        root.style.setProperty('--activeGreen', p[3].dataset.darken)
        root.style.setProperty('--activeBlue', p[4].dataset.darken)
    })
})

exportButton.addEventListener('click', () => {
    let text = ''
    loadLabel.textContent = ''
    squareArr.forEach(row => {
        row.forEach(sq => {
            text += colors.indexOf(sq.defaultColor)
            loadLabel.textContent = text
        })
    })
})

importButton.addEventListener('click', () => {
    let loadColors = ''
    loadColors = loadLabel.textContent
    loadColors == null || loadColors.length < 625 ? console.log('no board exported') : resetBoard(loadColors)
})

//mobile hamburger menu
menu.addEventListener('click', () => {
    if (game.classList.contains('opaque')) {
        game.classList.remove('opaque')
        lBoard.classList.remove('opaque')
        ham.classList.remove('fa', 'fa-close')
        ham.classList.add('fa', 'fa-list')
        colorPalette.classList.add('hidden')
    }
    else {
        game.classList.add('opaque')
        lBoard.classList.add('opaque')
        ham.classList.remove('fa', 'fa-list')
        ham.classList.add('fa', 'fa-close')
        colorPalette.classList.remove('hidden')
    }
})



window.addEventListener('resize', calculateSize)
function calculateSize() {
    let gameBoard = document.querySelector('.board')
    console.log('running')
    let winLength = window.innerWidth
    let winHeight = window.innerHeight
    console.log(winLength)
    if (winLength >= 1001) {
    let width = winHeight * .65
    let height = winHeight * .65
    gameBoard.style.width = width + 'px'
    gameBoard.style.height = height + 'px'
    console.log(gameBoard.style.width)
    }
    else if (winLength >= 501){
        let width = winLength * .70
        let height = winLength * .70
        gameBoard.style.width = width + 'px'
        gameBoard.style.height = height + 'px'
    }
    else {
        let width = winLength * .90
        let height = winLength * .90
        gameBoard.style.width = width + 'px'
        gameBoard.style.height = height + 'px'
    }
    return winLength
}

window.addEventListener('load', () => {
    resetBoard()
    let x = calculateSize()
    if (x < 1000) {
        palContainer.classList.add('hidden')
    }
})




