var acceptOrder = document.querySelectorAll('.acceptOrder')
var declineOrder = document.querySelectorAll('.declineOrder')
var completeOrder = document.querySelectorAll('.completeOrder')
var resName = document.querySelector('.resName')
Array.from(acceptOrder).forEach(button =>{
  button.addEventListener('click',function (event){
    console.log(this.parentNode.parentNode.childNodes[1].childNodes[1].innerText);
    var driverId = document.getElementById('driverId').value
    // console.log(driverId);
    var orderId = this.parentNode.parentNode.childNodes[1].childNodes[1].innerText

    // var customerId = this.parentNode.childNodes[1].childNodes[1].innerText
    // var driverAccepted = this.parentNode.childNodes[1].childNodes[5].innerText
      fetch('acceptedOrderDriver', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
           'orderId'  : orderId,
           'driverId' : driverId,

        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
  })
})
