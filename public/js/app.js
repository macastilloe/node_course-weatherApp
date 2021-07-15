
console.log('Client side javascript is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.getElementById('location')
const messageTwo = document.getElementById('forecast')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value
    

    //clean existing value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''


    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data={}) => {
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            
        }
        
    })
})
})