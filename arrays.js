let names = ['Akbar','Ali','Hassan']

console.log(names)

console.log(names[0])
console.log(names[1])
console.log(names[2])


 let foods = ['pizza','pasta','burger','alfredo',]
 console.log(foods[3])

 console.log(foods[foods.length - 1])
console.log(foods.length)


let foods = ["pizza", 'pasta']
foods.push('burger')
console.log(foods)


let foods = ['pizza', 'pasta', 'burger', 'cake']
foods.pop()
console.log(foods)

let foods = ['pizza', 'pasta', 'burger']
foods.unshift('haleem')
foods.shift()
console.log(foods)


let foods = ['pizza', 'pasta', 'burger']
for (let i = 0; i < foods.length; i++){
    console.log(foods[i])
}

let foods = ['pizza', 'pasta', 'burger']
for (let food of foods){
    console.log(food)
}

 let foods = ['pizza', 'pasta', 'burger']
 let msg = `I like ${foods[0]}, I like ${foods[1]} ,I like ${foods[2]}`
 console.log(msg)


let foods = ['pizza', 'pasta', 'burger']
 console.log(foods.indexOf('pasta'))
 console.log(foods.indexOf('biryani'))


let foods = ['pizza', 'pasta', 'burger']
console.log(foods.includes('pasta'))
console.log(foods.includes('biryani'))


let foods = ["pizza", "pasta", "burger", "biryani"];
 console.log(foods.includes('sushi'))
console.log(foods.indexOf('burger'))


let foods = ["pizza", "pasta", "burger", "biryani"];
console.log(foods.slice(1,3))
console.log(foods)


let foods = ["pizza", "pasta", "burger", "biryani"];
foods.splice(1, 2)
console.log(foods)


let foods = ["pizza", "pasta", "burger", "biryani", "sushi"];
foods.splice(1,3)
console.log(foods.slice(1,3))
console.log(foods)


let numbers = [1,2,3,4]
let doubled = numbers.map(function(num){
    return num * 2
})
console.log(doubled)
console.log(numbers)



let numbers = [10,20,30,40]
let doubled = numbers.map(function(num){
    return num + 5
 
})

console.log(doubled)
console.log(numbers)


let numbers = [1,2,3,4,5,6]
let even = numbers.filter(function(num){
    return num > 3
})
console.log(even)
console.log(numbers)

let numbers = [10,20,30,40,50]
let even = numbers.filter(function(num){
    return num >30
})

console.log(even)
console.log(numbers)

let numbers = [10, 20, 30, 40];

let total = numbers.reduce(function(sum, num) {
    return sum + num;
}, 0);

console.log(total); 




let numbers = [80, 90, 70, 85];

 let total = numbers.reduce(function(sum, num) {
     return sum + num;
 }, 0);

console.log(total); 


