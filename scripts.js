import data from './data.js'
const itemsContainer = document.querySelector('#items')


for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = data[i].image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)
   const desc = document.createElement('P');
   desc.innerText = data[i].desc
   newDiv.appendChild(desc)
   const price = document.createElement('P');
   price.innerText = data[i].price
   newDiv.appendChild(price)
	// put new div inside items container
	itemsContainer.appendChild(newDiv)
}