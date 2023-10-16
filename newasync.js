//LET US UNDERSTAND THE ASYNC AWAIT WITH AN EXAMPLE OF MOVIE HALL QUEUE

console.log('person 1: Shows ticket')                         
console.log('person 2: Shows ticket')                           

const asyncEg = async () => {
    
    const BringPopcorn = new Promise ((resolve,reject) => {         
        setTimeout (() => {                                         
            resolve(`HUS: I will bring some popcorn for you`)       
        },2000)
    })
    let popcorn = await BringPopcorn
    console.log(`Wife: I have tickets \n Hus: We should go in \n Wife: I am hungry \n` )
    console.log(popcorn)

    const ButterPopcorn = new Promise ((resolve,reject) => {
        setTimeout (() => {                                  
            resolve(`Hus: I will bring butter popcorn for you`)     
        },2000)  
    })
    let butter = await ButterPopcorn
    console.log(`Hus: I got the popcorn \n Wife: I need butter on the popcorn\n`)
    console.log(butter)

    const CD = new Promise ((resolve,reject) => {
        setTimeout (() => {                                         
            resolve(`Hus: I will bring coke for you as well`)       
        },2000)                                                    
    })
    let ColdDrink = await CD
    console.log(`Hus: I got the butter on the popcorn\n Wife: I need a coke as well`)
    console.log(ColdDrink)

    const WifeBringingTickets = new Promise((resolve, reject) => { 
        setTimeout(() => {                                          
        resolve(`person 3: Shows ticket`)
    },3000)
    })
    let ticket = await WifeBringingTickets

    return ticket   

}

asyncEg().then((t) => console.log(t))

console.log('person 4: Shows ticket')                         
console.log('person 5: Shows ticket')  