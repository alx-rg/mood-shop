import data from './data.js'
const itemsContainer = document.querySelector('#items')
const itemList = document.getElementById('item-list')

const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')




for (let i = 0; i < data.length; i += 1) {
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	const img = document.createElement('img');
	img.src = data[i].image
	img.width = 300
	img.height = 300
	newDiv.appendChild(img)
	itemsContainer.appendChild(newDiv)
	const desc = document.createElement('P')
	desc.innerText = data[i].desc
	newDiv.appendChild(desc)
	const price = document.createElement('P')
	price.innerText = data[i].price
	newDiv.appendChild(price)
	const button = document.createElement('button')
	button.id = data[i].name
	button.dataset.price = data[i].price
	button.innerHTML = "Add to Cart"
	newDiv.appendChild(button)
}

//--------------------------------------------
// button feature

const all_items_button = Array.from(document.querySelectorAll('button'))

all_items_button.forEach(elt => elt.addEventListener('click', () => {
	addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
	showItems()
 }))

//--------------------------------------------
// Start of shopping cart feature

const cart = [ ]

//--------------------------------------------
// Handle change events on update input
itemList.onchange = function(e) {
	if(e.target && e.target.classList.contains('update')) {
		//console.log(e.target)
		const name = e.target.dataset.name
		const qty = parseInt(e.target.value)
		updateCart(name, qty)
	}
}

//--------------------------------------------
// Handle clicks on list

itemList.onclick = function(e){
//	console.log('Clicked list!')
//	console.log(e.target)
	if ((e.target) && e.target.classList.contains('remove')) {
		const name = e.target.dataset.name
		removeItem(name)
	}
	 else if ((e.target) && e.target.classList.contains('add-one')) {
		const name = e.target.dataset.name
		addItem(name)
	} else if ((e.target) && e.target.classList.contains('remove-one')) {
		const name = e.target.dataset.name
		removeItem(name, 1)
	}

}


//--------------------------------------------
// Add Item
function addItem(name, price) {
	for (let i=0; i< cart.length; i +=1){
		if (cart[i].name === name) {
			cart[i].qty += 1
			showItems()
			return
		}
	}
	const item = {name, price, qty: 1}
	cart.push(item)
	showItems()
}

//--------------------------------------------
// Show items
function showItems() {
	const qty = getQty()
	//console.log(`You have ${qty} items in your cart`)
	cartQty.innerHTML = `You have ${qty} items in your cart`


	let itemStr = ''
	for (let i = 0; i <cart.length; i += 1) {
	//	console.log(` - ${ cart[i].name } $${ cart[i].price } x ${ cart[i].qty }`)
	//const name = cart[i].name
	//const price = cart[i].price
	//const qty = cart[i].qty
	// { name : 'Apple', price: 0.99, qty: 3 }
	
		const {name, price, qty} = cart[i]
		// I need to get the decimals down to two: Did so below:
		const total = (price * qty)
		const totalprice = total.toFixed(2)

		itemStr += ` <li> 
			${ name } $${ price } x ${ qty } = $${totalprice} 
			<button class='remove' data-name='${name}'>Remove All</button>
			<button class='add-one' data-name='${name}'> + 1 </button>
			<button class='remove-one' data-name='${name}'> - 1</button>
			<input class='update' type='number' data-name='${name}'>
		</li>`
	}

	itemList.innerHTML = itemStr

	//console.log(`Total in cart: $${getTotal()}`)
	
	cartTotal.innerHTML = `Total in cart: $${getTotal()}`
}

//--------------------------------------------
// Get Quantity
function getQty() {
	let qty = 0
	for (let i = 0; i < cart.length; i +=1) {
		qty += cart[i].qty
	}
	return qty
}

//--------------------------------------------
//Get total
function getTotal(){
	let total = 0
	for (let i = 0; i <cart.length; i +=1) {
		total += cart[i].price * cart[i].qty
	}
	return total.toFixed(2)
}

//--------------------------------------------
// Remove items
function removeItem(name, qty = 0) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			if (qty > 0) {
				cart[i].qty -= qty
			}
			if (cart[i].qty < 1 || qty === 0){
				cart.splice(i, 1)
			}
			showItems()
			return
		}
	}
}

//--------------------------------------------
// Remove items
function updateCart(name, qty) {
	for (let i = 0; i < cart.length; i += 1) {
		if (cart[i].name === name) {
			if (qty < 1 ) {
				removeItem(name)
				return
			}
			cart[i].qty = qty
			showItems()
			return
		}
	}
}

console.log(all_items_button)

         //--------------------------------------------
         // Test code begins

         addItem("apple", 2.20)
         addItem('Frisbee', 10.67)
         addItem("apple", 2.20)
         addItem("orange", 3.03)
         addItem('Opinion', 0.31)
         addItem("apple", 2.20)

         //showItems()

         removeItem('apple', 1)
         removeItem('Frisbee')

         showItems()