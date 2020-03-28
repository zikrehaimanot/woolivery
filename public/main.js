var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa fa-trash");



//Related to put/messages
Array.from(thumbUp).forEach(function(element) { //for each item called thumbs up (icon)
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const email = this.parentNode.parentNode.childNodes[3].innerText
        const review = this.parentNode.parentNode.childNodes[5].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('orders', {
          method: 'put',
          headers: {'Content-Type': 'application/json'}, //is the headers section by convention?
          body: JSON.stringify({
            'name': name,
            // 'email': email,
            'review':review
            // 'thumbUp':thumbUp
          })
        })

        .then(response => {
          if (response.ok) return response.json() //take the responses if they are ok, pass them into the dom
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)//refresh
        })
      });
});
// mirror image of thumbUp ...the difference is what is done to the
//number in the routes.js
// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const email = this.parentNode.parentNode.childNodes[3].innerText
//         const review = this.parentNode.parentNode.childNodes[5].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
//         console.log(thumbDown)
//         fetch('orders', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             // 'email': email,
//             'review':review
//             // 'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const email = this.parentNode.parentNode.childNodes[3].innerText
        const review = this.parentNode.parentNode.childNodes[5].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        fetch('orders', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'email': email,
            'review':review,
            'thumbUp':thumbUp
          })
        }).then(function (response) {
         window.location.reload() //take the response and reload the page
        })
      });
});
