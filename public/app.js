//client side js

const weatherForm= document.querySelector('form')
const search= document.querySelector('input')
const firstMsg= document.querySelector('#firstP')
const secondMsg= document.querySelector('#secondP')


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location= search.value
    firstMsg.textContent="Loading..."
    secondMsg.textContent=""
    fetch("http://localhost:3000/weather?adress="+location).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            firstMsg.textContent="error: "+data.error
            secondMsg.textContent=""
        }
        else{
            firstMsg.textContent=data.location
            secondMsg.textContent=data.forecast
          
        }
        
    })
})
    
})