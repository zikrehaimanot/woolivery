var createElement = document.getElementsByClassName('createElement')[0].onclick = moreMenuItems
var signupRes = document.getElementsByClassName('form-group')[8]
var parentNode = document.getElementsByClassName('form-group')[9]
var cloneLabel = document.getElementsByClassName('cloneLabel')[0]

function moreMenuItems(){
  // var makeLabel = document.createElement('label')
  var clone = signupRes.cloneNode(true)
  // makeLabel.innerHTML = "Menu Item"
  // makeLabel.name = "menu"
  parentNode.appendChild(clone)
  // var input = document.createElement("input");
  //  signupRes.appendChild(input)
  //
  //  var makePrice = document.createElement('label')
  //  makePrice.innerHTML = "Prices"
  //  makePrice.name = "prices"
  //  signupRes.appendChild(makePrice)
  //
  //  var input = document.createElement("input");
  //   signupRes.appendChild(input)
}
