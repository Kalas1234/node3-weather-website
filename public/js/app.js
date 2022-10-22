console.log('client side server js is loaded')


 fetch('https://puzzle.mead.io/puzzle').then((response)=>
 {
response.json().then((data)=>{
    console.log(data);
})
})

// fetch('http://localhost:3000/weather?address=indore').then((response)=>
//  {
// response.json().then((data)=>{
//     if(data.error)
//     {
//         console.log(data.error)
//     }
//     else
//     {
//         console.log(data.location)
//         console.log(data.address)
//     }

// })
// })


const weatherForm=document.querySelector('form')
const search=document.querySelector('input') //return an object named value whose one of the property is value
console.log(search)
const messageOne=document.querySelector('#message-1')
messageOne.textContent='from javascript'
const messageTwo=document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e)=>
 {
     const location=search.value;
    //console.log(location)
    e.preventDefault()
    //console.log('testing')
    if(location==='')
    {
        console.log("please type location")
    }

    messageOne.textContent='loading....'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+ location).then((response)=>
 {
response.json().then((data)=>{
    if(data.error)
    {
        messageOne.textContent=data.error
        //console.log(data.error)
    }
    else
    {
        messageOne.textContent=data.location
        messageTwo.textContent=data.address
        // console.log(data.location)
        // console.log(data.address)
    }

})
})
}
)



