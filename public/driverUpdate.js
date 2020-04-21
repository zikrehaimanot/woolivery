var pickedUp = document.querySelectorAll('.pickedUp')
var delivered = document.querySelectorAll('.delivered')

Array.from(pickedUp).forEach(button =>{
  button.addEventListener('click',function (event){
    var driverId = document.querySelector('.driverId').innerHTML
    console.log(driverId,"shittty");
    var driverReason = document.getElementById('driverReason').value
    console.log(driverReason);
    // console.log(this.parentNode.childNodes[1].childNodes[1].innerText);
    var orderId = this.parentNode.childNodes[1].childNodes[1].innerText
    var customerId = this.parentNode.childNodes[1].childNodes[3].innerText
    // console.log(orderId, customerId);
      fetch('pickedUp', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({

           'orderId'  : orderId,
           'customerId' : customerId,
           'reason'   : driverReason,
           'driverId': driverId,
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      // .then(data => {
      //   console.log(data)
      //   window.location.reload(true)
      // })
  })
})

Array.from(delivered).forEach(button =>{
  button.addEventListener('click',function (event){
    // console.log(this.parentNode.childNodes[1].childNodes[1].innerText);
    var orderId = this.parentNode.childNodes[1].childNodes[1].innerText
    var customerId = this.parentNode.childNodes[1].childNodes[3].innerText
    console.log(orderId, customerId);
      fetch('delivered', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({

           'orderId'  : orderId,
           'customerId' : customerId
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      }).then(data => {
        console.log(data)
        window.location.reload(true)
      })
  })
})
