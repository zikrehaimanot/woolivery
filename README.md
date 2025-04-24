# WooLivery 

Full Stack Application meant to recreate modern food delivery apps but with a twist. We're driver friendly. WooLivery aims to be a responsible medium for entrepreneurs and consumers to interact. The application is built for three types of users to use. People who want to order food, restaurant owners looking to sell food, drivers looking to make money delivering orders.

## The Home Page

![home page WooLivery](home.png)

## Restaurant Listings Page

![restaurant listings](res.png)

## Customer Cart

![customer cart](cart.png)

## Order Confirmation page

![Order Confirmation](orderCon.png)

## Driver Accept Order page

![Drive page](acceptOrder.png)

## How This Site Was Made:

## Tech Used: HTML , CSS , JS , Node.js , MongoDB , Express , EJS, Nexamo API

This site is a culmination of weeks of building project after project. It begins with a markup similar to HTML5, whats unique is that there are many pages that use EJS. EJS allowed me to embed JavaScript onto the page which meant I could access data from my Mongo database. I made use of EJS partial's so that I could reuse some components and reduce redundant coding.

WooLivery has both client side and server side JavaScript. When ordering food customers, client side JS is being used but when that order is sent to the database I use Node.JS.

The application also has text alerts for the customer as their food is being made. I used Nexamo (now vonage) to send text messages.

## How to Use the App:

1.) Clone repo <br>
2.) npm install <br>
3.) run node server.js <br>
4.)Navigate to localhost:8080 <br>

## THEN

5.) signup and specify what type of user you are (restaurant owner, driver or user). (to get the full experience you'll need all three) <br>
6.) create a restaurant.<br>
7.) login as a customer and place an order at your restaurant.<br>
8.) go back into your restaurant account and accept the order and mark it completed. ( if you do this on an incognito tab you can keep the order status page open as a  customer and keep tracking it as the status gets updated.) <br>
9.) if you put your real phone number when signing up as a customer you should be receiving texts. <br>
10.) Drivers only see orders when they've been marked completed by the restaurant. <br>
11.) log in as a driver once you've marked the order completed as the restaurant owner. <br>
12.) accept your order. <br>
13.) your order will go to your my orders page. <br>
14 pick up the order and send the customer a reason why you're driving ( i drive to pay my student loans.) this pushes the customer to leave a healthy tip <br>
15.) deliver the order to the customer (text notifications still being sent) <br>
16.) on the customer portal you can also track the order on the order confirmation page. <br>
