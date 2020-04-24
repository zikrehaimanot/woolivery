var acceptOrder = document.querySelectorAll('.acceptOrder')
var declineOrder = document.querySelectorAll('.declineOrder')
var completeOrder = document.querySelectorAll('.completeOrder')
var resName = document.querySelector('.resName')
// console.log(acceptOrder);
Array.from(acceptOrder).forEach(button =>{
  button.addEventListener('click',function (event){
   button.classList.add('keepYellow')
    console.log(this.parentNode.childNodes[1].childNodes[1].innerText);
    var orderId = this.parentNode.childNodes[1].childNodes[1].innerText
    var customerId = this.parentNode.childNodes[1].childNodes[3].innerText
     console.log(orderId, customerId);
      fetch('acceptedOrder', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({

           'orderId'  : orderId,
           'customerId': customerId,

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
Array.from(completeOrder).forEach(c =>{
    c.addEventListener('click',function (event){
      // this.style.background = 'green'
      c.classList.add('keepGreen')

    // console.log(this.parentNode.childNodes[1].childNodes[1].innerText);
    // var orderedItem = this.parentNode.childNodes[1].childNodes[1].innerText
    // var totalPrice = this.parentNode.childNodes[1].childNodes[3].innerText
    // console.log(this.parentNode.childNodes[1].childNodes[1].innerText);
    // console.log(this.parentNode.childNodes[1].childNodes[3].innerText);
    var customerId = this.parentNode.childNodes[1].childNodes[3].innerText
    var orderId = this.parentNode.childNodes[1].childNodes[1].innerText
    console.log(customerId, orderId);
    // var resId = this.parentNode.childNodes[1].childNodes[9].innerText
    // var accepted = this.parentNode.childNodes[1].childNodes[11].innerText
    // var completed = this.parentNode.childNodes[1].childNodes[13].innerText
    // var delivered = this.parentNode.childNodes[1].childNodes[15].innerText
     // console.log(c);
      fetch('completeOrder',{
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({

         'orderId'  : orderId,
        'customerId': customerId,


        })
      })
      .then(response => {
        console.log(response);
        if (response.ok) return response.json()
      }).catch(err =>{
        console.log(err);
      })
      // .then(data => {
      //   console.log(data)
      //   window.location.reload(true)
      // })
    })
})
Array.from(declineOrder).forEach(a =>{
   a.addEventListener('click',function (event){
     a.classList.add('keepRed')

     // console.log("whyyyyyyy");
    var orderId = this.parentNode.childNodes[1].childNodes[1].innerText
    // var totalPrice = this.parentNode.childNodes[1].childNodes[3].innerText
    var customerId = this.parentNode.childNodes[1].childNodes[3].innerText
    // var orderId = this.parentNode.childNodes[1].childNodes[7].innerText
    // var resId = this.parentNode.childNodes[1].childNodes[9].innerText
    // var accepted = this.parentNode.childNodes[1].childNodes[11].innerText
    // var completed = this.parentNode.childNodes[1].childNodes[13].innerText
    // var delivered = this.parentNode.childNodes[1].childNodes[15].innerText
    // console.log(customerId,orderId);
    console.log(customerId);
      fetch('declineOrder', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'customerId': customerId,
           'orderId'  : orderId,
           // 'totalPrice': totalPrice,
           // 'resName'  : resName,
           // 'resId'    :resId,
           // 'accepted': accepted,
           // 'completed': completed,
           // 'orderedItem': orderedItem,
           // 'delivered':delivered
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
   })
})
