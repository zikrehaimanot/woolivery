var clickMenuItem = document.getElementsByClassName('resItem')
var cart = document.querySelector('.cart')
let order = []
let checkout = document.querySelector('.checkout') // line 297 MAIN CSS
let totalPrice = 0
let displayPrice = document.querySelector('.displayPrice')
let customerId = document.querySelector('.userId').innerText
let resId;
let resIdValidate = []
let clearCart = document.querySelector('.clearCart')

clearCart.addEventListener('click', () => {
  // console.log("hi");
  // order = []
  // resIdValidate= []
  // totalPrice = 0
  window.location.reload(true)
})

Array.from(clickMenuItem).forEach(cell => {
  cell.addEventListener('click', function (event) {
    if(order.length > 0 && this.childNodes[7].innerText !== resIdValidate[0]){
      alert("please only order from 1 resturant at a time")
    }else{

    let item =  this.childNodes[1].innerText
    let price = this.childNodes[3].innerText
    resId = this.childNodes[5].innerText
    let resturantId = this.childNodes[7].innerText
    /// resId is the id of who made it..... resturantId is the id for the object in mongo
    resIdValidate.push(resturantId)
    order.push(item)
    console.log(order);
    addToCart(item, price)
    updateTotal(price)
    }
  })
})
function addToCart (item, price){
  var li = document.createElement('li')
  var p = document.createElement('p')
  p.innerHTML = item + ' ' + price
  li.appendChild(p)
  cart.appendChild(li)
  if (order.length > 0){
    checkout.classList.remove("hide");
  }
}

function updateTotal(price){
  totalPrice += parseInt(price)
  displayPrice.innerHTML = "$" + totalPrice
}

function removeFromCart(resId){
  window.reload(true)
}

checkout.addEventListener('click', () =>{
  fetch('checkout', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'resId': resId,
      'orderedItem': order ,
      'totalPrice': totalPrice,
      'customer': customerId,
      'accepted': false,
      'completed': false,
      'delivered': false,
      'pickedUp': false,
      'driverId': null,
      'driverAccepted': false,
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  }).then(data => {
    console.log(data)
    window.location = data.redirectUrl;
  })
});
