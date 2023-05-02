let gameBoard = document.querySelector('.board')
let colorWheel = ['var(--red)', 'var(--orange)', 'var(--yellow)', 'var(--green)', 'var(--blue)']
let colors = document.querySelectorAll('.color')
let total = 1

// square counter
let redCounterLabel = document.querySelector('.redCounter')
let orangeCounterLabel = document.querySelector('.orangeCounter')
let yellowCounterLabel = document.querySelector('.yellowCounter')
let greenCounterLabel = document.querySelector('.greenCounter')
let blueCounterLabel = document.querySelector('.blueCounter')

let redCounter = 0
let orangeCounter = 0
let yellowCounter = 0
let greenCounter = 0
let blueCounter = 0

// console.log(gameBoard.clientWidth)


// let finishedArray = []
let highScore = 0
let highScoreLabel = document.querySelector('.score')


let counterLabel = document.querySelector('.counter')
let counter = 0

let saveButton = document.querySelector('.saveButton')

let colorHolder = []

for (let y = 25; y > 0; y--) {
    for (let x = 1; x < 26; x++) {
        let square = document.createElement('div')
        let rand = Math.floor(Math.random() * 5)
        square.classList.add('square')
        square.dataset.x = x
        square.dataset.y = y
        square.dataset.color = colorWheel[rand]
        square.dataset.num = total
        square.dataset.defaultColor = colorWheel[rand]
        square.style.backgroundColor = colorWheel[rand]
        gameBoard.append(square)
        total++
    }
}
let square = document.querySelectorAll('.square')

square.forEach(sq => {
    if (sq.dataset.color == colorWheel[0] && !sq.classList.contains('changed')) {
        redCounter++
    }
    if (sq.dataset.color == colorWheel[1] && !sq.classList.contains('changed')) {
        orangeCounter++
    }
    if (sq.dataset.color == colorWheel[2] && !sq.classList.contains('changed')) {
        yellowCounter++
    }
    if (sq.dataset.color == colorWheel[3] && !sq.classList.contains('changed')) {
        greenCounter++
    }
    if (sq.dataset.color == colorWheel[4] && !sq.classList.contains('changed')) {
        blueCounter++
    }
    redCounterLabel.innerText = redCounter
    orangeCounterLabel.innerText = orangeCounter
    yellowCounterLabel.innerText = yellowCounter
    greenCounterLabel.innerText = greenCounter
    blueCounterLabel.innerText = blueCounter
}) 


square[0].classList.add('changed')
let changedArray = []
changedArray.push(square[0])

window.addEventListener('load', (event) => {
    for (let w = 0; w < colorWheel.length; w++) {
        // console.log(colorWheel[w])
        if (colorWheel[w] == changedArray[0].dataset.color) {
            colors[w].classList.add('grayed')
        }
    }
    let x = calculateSize()
    if (x <= 1000) {
        colorPalette.classList.add('hidden')
    }
})

function reset() {
    if (colorHolder.length == 0) {
        console.log('new board')
    square.forEach(sq => {
        sq.classList.remove('changed')
        rand = Math.floor(Math.random() * 5)
        sq.dataset.color = colorWheel[rand]
        sq.dataset.defaultColor = colorWheel[rand]
        sq.style.backgroundColor = colorWheel[rand]
    })
    }
    else {
        console.log('loading save')
        for (let u = 0; u < square.length; u++) {
            if (square[u].classList.contains('changed')) {
                square[u].classList.remove('changed')
            }
            // console.log(colorHolder[u])
            square[u].dataset.color = colorHolder[u]
            square[u].style.backgroundColor = colorHolder[u]
        }
    }
    colors.forEach(color => {
        if (color.classList.contains('grayed')) {
            color.classList.remove('grayed')
            color.setAttribute('onclick', 'colorChange(this)')
        }
    })
    square[0].classList.add('changed')
    changedArray = []
    changedArray.push(square[0])
    counter = 0
    counterLabel.innerText = counter
    let redCounter = 0
    let orangeCounter = 0
    let yellowCounter = 0
    let greenCounter = 0
    let blueCounter = 0
    for (let w = 0; w < colorWheel.length; w++) {
        // console.log(colorWheel[w])
        if (colorWheel[w] == changedArray[0].dataset.color) {
            colors[w].classList.add('grayed')
        }
    }

    initialCheck()
    
    square.forEach(sq => {
        sq.classList.remove('tempChanged')
        if (sq.dataset.color == colorWheel[0] && !sq.classList.contains('changed')) {
            redCounter++
        }
        if (sq.dataset.color == colorWheel[1] && !sq.classList.contains('changed')) {
            orangeCounter++
        }
        if (sq.dataset.color == colorWheel[2] && !sq.classList.contains('changed')) {
            yellowCounter++
        }
        if (sq.dataset.color == colorWheel[3] && !sq.classList.contains('changed')) {
            greenCounter++
        }
        if (sq.dataset.color == colorWheel[4] && !sq.classList.contains('changed')) {
            blueCounter++
        }
        redCounterLabel.innerText = redCounter
        orangeCounterLabel.innerText = orangeCounter
        yellowCounterLabel.innerText = yellowCounter
        greenCounterLabel.innerText = greenCounter
        blueCounterLabel.innerText = blueCounter
    }) 
    
}



function save() {
    colorHolder = []
    console.log('saving board')
    square.forEach(sq => {
        colorHolder.push(sq.dataset.defaultColor)
    })
    console.log(colorHolder)
    saveButton.classList.add('active')
}

function del() {
    colorHolder.length = 0
    saveButton.classList.remove('active')
}

function initialCheck() {
    for (let i = 0; i < changedArray.length; i++ ) {
        let num = parseInt(changedArray[i].dataset.num)

    if (square[num] != null) {
    if (square[num - 1].dataset.color == square[num].dataset.color && Math.abs(square[num - 1].dataset.x - square[num].dataset.x) == 1)
    {
        if (!changedArray.includes(square[num])) {
            square[num].classList.add('changed')
            // console.log('length: ' + changedSquare.length)
            changedArray.push(square[num])
        }
    }
    }
    if (square[num + 24] != null) {
    if (square[num - 1].dataset.color == square[num + 24].dataset.color && square[num + 24].dataset.y > 0)
    {
        if (!changedArray.includes(square[num + 24])) {
            square[num + 24].classList.add('changed')
            // console.log('length: ' + changedSquare.length)
            changedArray.push(square[num + 24])
        }
    }
    }
    // horizontal left movement
    if (square[num - 2] != null) {
        if (square[num - 1].dataset.color == square[num - 2].dataset.color && Math.abs(square[num - 1].dataset.x - square[num - 2].dataset.x) == 1) {
            if (!changedArray.includes(square[num - 2])) {
                square[num - 2].classList.add('changed')
                // console.log('length: ' + changedSquare.length)
                changedArray.push(square[num - 2])
            }
        }
    }
    // vertical up movement
    if (square[num - 26] != null) {
        if (square[num - 1].dataset.color == square[num - 26].dataset.color && square[num - 26].dataset.y < 26) {
            if (!changedArray.includes(square[num - 26])) {
                square[num - 26].classList.add('changed')
                // console.log('length: ' + changedSquare.length)
                changedArray.push(square[num - 26])
            }
        }
    }
}
}





initialCheck()

document.querySelectorAll(".color").forEach(color =>
    color.addEventListener("click", event => {
        console.log('hi')
        console.log(color)
        colors.forEach(color => {0
            if (color.classList.contains('grayed')) {
                color.classList.remove('grayed')
            }
        })
        color.classList.add('grayed')
        color.onclick = null
        let c = event.target.getAttribute('data-color')
        colorChange(c)
    }))



function colorChange(c) {
    console.log(c)
    counter++
    counterLabel.innerText = counter
    document.querySelectorAll('.changed').forEach(changedSquare => {
        changedSquare.dataset.color = c
        changedSquare.style.backgroundColor = c
        // console.log('run: ' + j)
    })

    // changedArray.forEach(item => {
    //     if (!finishedArray.includes(item)) {
    //         finishedArray.push(item)
    //         console.log('finishedArray contents: ' + item.dataset.num)
    //     }
    // })

    // changedArray = []

    // changedSquare = document.querySelectorAll('.changed')

    // using classlist loop
    
    // for (let i = 0; i < changedSquare.length; i++) {
    // console.log("num: " + changedSquare[i].dataset.num)
    // let num = parseInt(changedSquare[i].dataset.num)

    //using array loop

    for (let i = 0; i < changedArray.length; i++ ) {
        let num = parseInt(changedArray[i].dataset.num)
    // console.log(num)
    // console.log('Starting Square: ' + square[num - 1].getAttribute('data-color'))
    // console.log('Adjacent Right Square: ' + square[num].getAttribute('data-color'))
    // console.log('Square Below: ' + square[num + 24].getAttribute('data-color'))
    // console.log(square[num + 24].dataset.num)
    // console.log("fail num x: " + num)

    // horizontal right movement
    if (square[num] != null) {
    if (square[num - 1].dataset.color == square[num].dataset.color && Math.abs(square[num - 1].dataset.x - square[num].dataset.x) == 1)
    {
        // console.log('right')
        if (!changedArray.includes(square[num])) {
            // console.log('sick')
            square[num].classList.add('changed')
            // console.log('length: ' + changedSquare.length)
            changedArray.push(square[num])
        }
    }
    }
    if (square[num + 24] != null) {
    if (square[num - 1].dataset.color == square[num + 24].dataset.color && square[num + 24].dataset.y > 0)
    {
        if (!changedArray.includes(square[num + 24])) {
            square[num + 24].classList.add('changed')
            // console.log('length: ' + changedSquare.length)
            changedArray.push(square[num + 24])
        }
    }
    }

    // horizontal left movement
    if (square[num - 2] != null) {
        if (square[num - 1].dataset.color == square[num - 2].dataset.color && Math.abs(square[num - 1].dataset.x - square[num - 2].dataset.x) == 1) {
            if (!changedArray.includes(square[num - 2])) {
                square[num - 2].classList.add('changed')
                // console.log('length: ' + changedSquare.length)
                changedArray.push(square[num - 2])
            }
        }
    }

    // vertical up movement
    if (square[num - 26] != null) {
        if (square[num - 1].dataset.color == square[num - 26].dataset.color && square[num - 26].dataset.y < 26) {
            if (!changedArray.includes(square[num - 26])) {
                square[num - 26].classList.add('changed')
                // console.log('length: ' + changedSquare.length)
                changedArray.push(square[num - 26])
            }
        }
    } 
}

redCounter = 0
orangeCounter = 0
yellowCounter = 0
greenCounter = 0
blueCounter = 0


square.forEach(sq => {
    if (sq.dataset.color == colorWheel[0] && !sq.classList.contains('changed')) {
        redCounter++
    }
    if (sq.dataset.color == colorWheel[1] && !sq.classList.contains('changed')) {
        orangeCounter++
    }
    if (sq.dataset.color == colorWheel[2] && !sq.classList.contains('changed')) {
        yellowCounter++
    }
    if (sq.dataset.color == colorWheel[3] && !sq.classList.contains('changed')) {
        greenCounter++
    }
    if (sq.dataset.color == colorWheel[4] && !sq.classList.contains('changed')) {
        blueCounter++
    }
    redCounterLabel.innerText = redCounter
    orangeCounterLabel.innerText = orangeCounter
    yellowCounterLabel.innerText = yellowCounter
    greenCounterLabel.innerText = greenCounter
    blueCounterLabel.innerText = blueCounter
})  
// console.log('length: ' + changedSquare.length)
    if (changedArray.length > 624) {
        
        if (counter < highScore || highScore == 0) {
            highScore = counter
            highScoreLabel.innerText = highScore
            // alert('New Record! You won in ' + counter + " turns!")
            // setTimeout(reset, 1000)
        }
        else {
            // alert('Congrats! You won in ' + counter + " turns!")
            // setTimeout(reset, 1000)
        }
        
    }
}

let predictButton = document.querySelector('.predictButton')

function predictSwitch() {
    if (predictButton.classList.contains('active')) {
        predictButton.classList.remove('active')
        colors.forEach(color => {
            color.removeAttribute('onmouseover', 'predictColor(this)') 
            color.setAttribute('onclick', 'colorChange(this)')  
            color.classList.remove('noClick')     
        })
        for (let h = changedArray.length - 1; h >= 0; h--) {
            // changedArray[h].dataset.color = c.dataset.color
            if (changedArray[h].classList.contains('tempChanged')) {
                changedArray.splice(h, 1)
            }
        }
         square.forEach(sq => {
        if (sq.classList.contains('tempChanged')) {
            sq.classList.remove('tempChanged')
        }
    })
    }
    else {
        predictButton.classList.add('active')
        colors.forEach(color => {
            color.setAttribute('onmouseover', 'predictColor(this)')
            color.removeAttribute('onclick', 'colorChange(this)')
            color.classList.add('noClick')
        })
    }
}

function predictColor(c) {
    // console.log(c.dataset.color)
    // console.log(c)

    // console.log('length start: ' + changedArray.length)

    

    for (let h = changedArray.length - 1; h >= 0; h--) {
        // changedArray[h].dataset.color = c.dataset.color
        if (changedArray[h].classList.contains('tempChanged')) {
            changedArray.splice(h, 1)
        }
    }

    square.forEach(sq => {
        if (sq.classList.contains('tempChanged')) {
            sq.classList.remove('tempChanged')
        }
    })

    changedArray.forEach(item => {
        item.dataset.color = c.dataset.color
    })
    

    // console.log('length after clears: ' + changedArray.length)
    

    for (let i = 0; i < changedArray.length; i++ ) {
        let num = parseInt(changedArray[i].dataset.num)


    // horizontal right movement
    if (square[num] != null) {
    if (square[num - 1].dataset.color == square[num].dataset.color && Math.abs(square[num - 1].dataset.x - square[num].dataset.x) == 1)
    {
        if (!changedArray.includes(square[num]) && !square[num].classList.contains('changed')) {
            square[num].classList.add('tempChanged')
            // console.log('length: ' + changedSquare.length)
            changedArray.push(square[num])
        }
    }
    }
    if (square[num + 24] != null) {
    if (square[num - 1].dataset.color == square[num + 24].dataset.color && square[num + 24].dataset.y > 0)
    {
        if (!changedArray.includes(square[num + 24]) && !square[num + 24].classList.contains('changed')) {
            square[num + 24].classList.add('tempChanged')
            // console.log('length: ' + changedSquare.length)
            changedArray.push(square[num + 24])
        }
    }
    }

    // horizontal left movement
    if (square[num - 2] != null) {
        if (square[num - 1].dataset.color == square[num - 2].dataset.color && Math.abs(square[num - 1].dataset.x - square[num - 2].dataset.x) == 1) {
            if (!changedArray.includes(square[num - 2]) && !square[num - 2].classList.contains('changed')) {
                square[num - 2].classList.add('tempChanged')
                // console.log('length: ' + changedSquare.length)
                changedArray.push(square[num - 2])
            }
        }
    }

    // vertical up movement
    if (square[num - 26] != null) {
        if (square[num - 1].dataset.color == square[num - 26].dataset.color && square[num - 26].dataset.y < 26) {
            if (!changedArray.includes(square[num - 26]) && !square[num - 26].classList.contains('changed')) {
                square[num - 26].classList.add('tempChanged')
                // console.log('length: ' + changedSquare.length)
                changedArray.push(square[num - 26])
            }
        }
    }
    
    
    
}

changedArray.forEach(item => {
    item.dataset.color = item.dataset.defaultColor
})

// console.log('length after checks: ' + changedArray.length)

return document.querySelectorAll('.tempChanged').length

}

function paletteSwap(c) {
    let p = c.getElementsByTagName('div')
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
    
}

function width() {
    let palContainer = document.querySelector('.widthChange')
    let ddlArrow = document.querySelector('.ddlArrow')
    let otherColors = document.querySelector('.otherColors')
    
    if (palContainer.classList.contains('test')) {
        palContainer.classList.remove('test')
        // ddlArrow.innerText = '🠺'
        ddlArrow.classList.remove('flip')
        
        otherColors.classList.add('hidden')
    }
    else {
        palContainer.classList.add('test')
        // ddlArrow.innerText = '🠸'
        ddlArrow.classList.add('flip')
        otherColors.classList.remove('hidden')
    }
}

// Save and Export Boards

let loadLabel = document.querySelector('.loadLabel')

function exportBoard() {
    // loadLabel.value = ''
    let loadString = ''
    square.forEach(sq => {
        if (sq.dataset.defaultColor == 'var(--red)') {
            loadString += '0'
        }
        else if (sq.dataset.defaultColor == 'var(--orange)') {
            loadString += '1'
        }
        else if (sq.dataset.defaultColor == 'var(--yellow)') {
            loadString += '2'
        }
        else if (sq.dataset.defaultColor == 'var(--green)') {
            loadString += '3'
        }
        else if (sq.dataset.defaultColor == 'var(--blue)') {
            loadString += '4'
        }
    })
    loadLabel.value = loadString
}

function importBoard() {
    let loadText = document.querySelector('.loadLabel').value
    console.log(loadText)
    let colorArr = []

    for (let x = 0; x < loadText.length; x++) {
        colorArr.push(parseInt(loadText[x]))
    }
    console.log(colorArr)
    
    for (let y = 0; y < colorArr.length; y++) {
        console.log('hi')
        // square[y].classList.remove('changed')
        square[y].dataset.color = colorWheel[colorArr[y]]
        square[y].dataset.defaultColor = colorWheel[colorArr[y]]
        square[y].style.backgroundColor = colorWheel[colorArr[y]]
    }
    square.forEach(sq => {
        sq.classList.remove('changed')
    })

    colors.forEach(color => {
        if (color.classList.contains('grayed')) {
            color.classList.remove('grayed')
            color.setAttribute('onclick', 'colorChange(this)')
        }
    })

    for (let w = 0; w < colorWheel.length; w++) {
        // console.log(colorWheel[w])
        if (colorWheel[w] == changedArray[0].dataset.color) {
            colors[w].classList.add('grayed')
        }
    }
    counter = 0
    counterLabel.innerText = '0'
    square[0].classList.add('changed')
    changedArray = []
    changedArray.push(square[0])
    console.log(changedArray)
    initialCheck()
}



window.addEventListener('resize', calculateSize)

let colorPalette = document.querySelector('.colorPalette')
let menu = document.querySelector('.menu')
let game = document.querySelector('.left')
let lBoard = document.querySelector('.scoreWrap')
let ham = document.querySelector('.ham')
let xMark = document.querySelector('xMark')

function calculateSize() {
    let winLength = window.innerWidth
    let winHeight = window.innerHeight
    if (winLength >= 1001) {
        console.log(winLength)
    let width = winHeight * .65
    let height = winHeight * .65
    gameBoard.style.width = width + 'px'
    gameBoard.style.height = height + 'px'
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
    
    // console.log(gameBoard.clientWidth)
    // square.forEach(sq => {
    //     sq.style.width = (width * .04) + 'px'
    //     sq.style.height = (height * .04) + 'px'
    // })
    return winLength
}



function changeMenu() {
    console.log('hi')
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
}
