 // function to find sum of array

        function getSum(arr) {
            let sum = 0
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i]

            }
            return sum
        }

        let numbers = [10,20,30,40]
        let result = getSum(numbers)
        document.write(`sum is ${result}`)



        // function to find largest & smallest of array


        function findMinMax(arr){
            let largest = arr[0]
            let smallest = arr[0]
            for(let i = 1; i < arr.length; i ++){
                if(arr[i] > largest){
                    largest = arr[i]
                }
                if(arr[i] < smallest){
                    smallest = arr[i]
                }
            }
            return {largest, smallest}
        }



