var acceptOrder = document.querySelectorAll('.acceptOrder')
var declineOrder = document.querySelectorAll('.declineOrder')
var completeOrder = document.querySelectorAll('.completeOrder')
var resName = document.querySelector('.resName')
Array.from(acceptOrder).forEach(button =>{
  button.addEventListener('click',function (event){
    var driverId = document.getElementById('driverId').value
    console.log(driverId);
    var orderId = this.parentNode.childNodes[1].childNodes[1].innerText
    // var customerId = this.parentNode.childNodes[1].childNodes[1].innerText
    // var driverAccepted = this.parentNode.childNodes[1].childNodes[5].innerText
      fetch('acceptedOrderDriver', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
           'orderId'  : orderId,
           'driverId' : driverId
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
  })
})

// Array.from(declineOrder).forEach(a =>{
//    a.addEventListener('click',function (event){
//     var orderedItem = this.parentNode.childNodes[1].childNodes[1].innerText
//     var totalPrice = this.parentNode.childNodes[1].childNodes[3].innerText
//     var customerId = this.parentNode.childNodes[1].childNodes[5].innerText
//     var orderId = this.parentNode.childNodes[1].childNodes[7].innerText
//     var resId = this.parentNode.childNodes[1].childNodes[9].innerText
//     var accepted = this.parentNode.childNodes[1].childNodes[11].innerText
//     var completed = this.parentNode.childNodes[1].childNodes[13].innerText
//     var delivered = this.parentNode.childNodes[1].childNodes[15].innerText
//     // console.log(customerId,orderId);
//       fetch('declineOrder', {
//         method: 'delete',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           'customerId': customerId,
//            'orderId'  : orderId,
//            'totalPrice': totalPrice,
//            'resName'  : resName,
//            'resId'    :resId,
//            'accepted': accepted,
//            'completed': completed,
//            'orderedItem': orderedItem,
//            'delivered':delivered
//         })
//       })
//       .then(response => {
//         if (response.ok) return response.json()
//       })
//    })
// })



// Array.from(completeOrder).forEach(c =>{
//     c.addEventListener('click',function (event){
//     var orderedItem = this.parentNode.childNodes[1].childNodes[1].innerText
//     var totalPrice = this.parentNode.childNodes[1].childNodes[3].innerText
//     var customerId = this.parentNode.childNodes[1].childNodes[5].innerText
//     var orderId = this.parentNode.childNodes[1].childNodes[7].innerText
//     var resId = this.parentNode.childNodes[1].childNodes[9].innerText
//     var accepted = this.parentNode.childNodes[1].childNodes[11].innerText
//     var completed = this.parentNode.childNodes[1].childNodes[13].innerText
//     var delivered = this.parentNode.childNodes[1].childNodes[15].innerText
//     // console.log(customerId,orderId);
//       fetch('completeOrder', {
//         method: 'put',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           'customerId': customerId,
//            'orderId'  : orderId,
//            'totalPrice': totalPrice,
//            'resName'  : resName,
//            'resId'    :resId,
//            'accepted': accepted,
//            'completed': completed,
//            'orderedItem': orderedItem,
//            'delivered':delivered
//         })
//       })
//       .then(response => {
//         if (response.ok) return response.json()
//       })
//     })
// })
