let count = 0
let countDisplay = document.getElementById("count")

// count display function
function updateDisplay(){
    countDisplay.textContent = count

}

updateDisplay()

// increment
document.getElementById("increment").addEventListener("click", function(){
    count += 1
    countDisplay.classList.remove("positive", "negative")
    countDisplay.classList.add("positive") 
    updateDisplay()
})

// decrement
document.getElementById("decrement").addEventListener("click", function(){
    if (count > 0) {
        count -= 1
        countDisplay.classList.remove("positive", "negative")
        countDisplay.classList.add("negative")  // red — sirf tab jab ghata
    }
    if (count === 0) {
        countDisplay.classList.remove("positive", "negative")  // black — jab 0 ho
    }
    updateDisplay()
})

// reset
document.getElementById("reset").addEventListener("click", function(){
    count = 0
   
    updateDisplay()
})