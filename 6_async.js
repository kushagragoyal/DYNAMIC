//LET US UNDERSTAND THE ASYNC AWAIT WITH AN EXAMPLE OF MOVIE HALL QUEUE

console.log('person 1: Shows ticket')                           //PERSON 1: SHOWS TICKETS
console.log('person 2: Shows ticket')                           //PERSON 2: SHOWS TICKETS

const WifeBringingTickets = new Promise((resolve, reject) => {  //WIFE ARRIVED WITH TICKETS AND THEY SHOWED THE
    setTimeout(() => {                                          //TICKETS AND WENT IN
    resolve(`person 3: Shows ticket`)
},3000)
})

const BringPopcorn = new Promise ((resolve,reject) => {         //WIFE ARRIVED BUT SINCE SHE IS HUNGARY SO SHE
    setTimeout (() => {                                         //WANTS POPCORN BEFORE THEY GO IN, THERFORE
        console.log(`Wife: I have tickets \nHus: We should go in \nWife: I am hungry \n` )
        resolve(`HUS: I will bring some popcorn for you`)       //HUSBAND PROMISES HER TO BRING POPCORN FOR HER
    },2000)
})

const ButterPopcorn = new Promise ((resolve,reject) => {
    setTimeout (() => {                                         //HUSBAND WENT AND BOUGHT THE POPCORN, BUT WIFE
        console.log(`Hus: I got the popcorn \n Wife: I need butter on the popcorn\n`)
        resolve(`Hus: I will bring butter popcorn for you`)     //WANTS BUTTER POPCORN, SO HUSBAND PROMISES HER
    },2000)                                                     //TO BRING THE BUTTER POPCORN FOR HER
})

const CD = new Promise ((resolve,reject) => {
    setTimeout (() => {                                         //HUSBAND WENT AND BOUGHT THE POPCORN, BUT WIFE
        console.log(`Hus: I got the butter on the popcorn\n Wife: I need a coke as well`)
        resolve(`Hus: I will bring coke for you as well`)       //WANTS BUTTER POPCORN, SO HUSBAND PROMISES HER
    },2000)                                                     //TO BRING THE BUTTER POPCORN FOR HER
})

BringPopcorn                                                    //IN THE ABOVE SEQUENCE 1st WIFE WILL ASK HUS
    .then((t) => {                                              //FOR POPCORN AS SHE IS HUNGARY
        console.log(t)
        ButterPopcorn                                           //HUS WILL BRING THE POPCORN BUT SHE WANTED 
            .then((t) => {                                      //BUTTER POPCORN
                console.log(t)
                CD
                .then((t) => {
                    console.log(t)        
                    WifeBringingTickets                             //HUS BRINGS BUTTER POPCORN THEN THEY SHOW 
                    .then((t) => {                              //TICKET AND GOES IN
                        console.log(t)
                    })
            })
        })
}
)

console.log('person 4: Shows ticket')                           //PERSON 4: SHOWS TICKETS
console.log('person 5: Shows ticket')                           //PERSON 5: SHOWS TICKETS

//NOW THE SEQUENCE OF OUTPUT IN THE ABOVE CODE WILL BE 
//PERSON 1: SHOWS TICKETS
//PERSON 2: SHOWS TICKETS
//PERSON 4: SHOWS TICKETS
//PERSON 5: SHOWS TICKETS
//Wife: I have tickets      Hus: We should go in        Wife: I am hungry      I will bring some popcorn for you
//Hus: I got the popcorn    Wife: I need butter on the popcorn      Hus: I will bring butter popcorn for you
//PERSON 3: SHOWS TICKETS

//NOW IN THE ABOVE CODE CONSOLE.LOG STATEMENTS SHOULD ONLY HAPPEN IF THEIR FOLLOWING RESOLVE IS RESOLVED, LIKE
//If the husband don't bring popcorn Wife can't ask for butter popcorn, And until hus don't bring butter popcorn
//they can't go in. NOW HERE WE WANT TO WAIT UNTIL HUS BRING BUTTER POPCORN AND THEN ONLY THEY CAN GO IN, USING
//AYNC HERE WILL MAKE CODE UNDERSTANDING AND READABILTY EASY IN THIS CASE
