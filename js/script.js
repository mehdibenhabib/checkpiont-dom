const plusButtons = document.querySelectorAll('.fa-plus-circle');
const minusButtons = document.querySelectorAll('.fa-minus-circle');
const quantities = document.querySelectorAll('.quantity');
const totalPriceSpan = document.querySelector('.total');
const trashIcons = document.querySelectorAll('.fa-trash-alt');
const likeIcons = document.querySelectorAll('.fa-heart');

let total = 0;
let likedProducts = []; // Array to store liked product indexes

function updateTotalPrice() {
  totalPriceSpan.textContent = `Total: $${total.toFixed(2)}`;
}

function updateLikedProducts(liked, index) {
  if (liked) {
    likedProducts.push(index);
  } else {
    const likedProductIndex = likedProducts.indexOf(index);
    likedProducts.splice(likedProductIndex, 1);
  }
}

plusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const currentQuantity = parseInt(quantities[index].textContent, 10);
    quantities[index].textContent = currentQuantity + 1;
    const productPrice = parseFloat(document.querySelectorAll('.unit-price')[index].textContent.slice(0, -1));
    total += productPrice;
    updateTotalPrice();
  });
});

minusButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const currentQuantity = parseInt(quantities[index].textContent, 10);
    if (currentQuantity > 0) {
      quantities[index].textContent = currentQuantity - 1;
      const productPrice = parseFloat(document.querySelectorAll('.unit-price')[index].textContent.slice(0, -1));
      total -= productPrice;
    }
    updateTotalPrice();
  });
});

trashIcons.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    quantities[index].textContent = 0;
    const productPrice = parseFloat(document.querySelectorAll('.unit-price')[index].textContent.slice(0, -1));
    total -= productPrice * parseInt(quantities[index].textContent); // Ensure total is updated even if quantity is already 0
    updateTotalPrice();

    // Option 1: Hide the product container
    const productContainer = icon.parentElement.parentElement.parentElement;
    productContainer.style.display = 'none';

    // Option 2: Remove the product container from the DOM (more memory efficient)
    // productContainer.remove();

    // Remove liked product from likedProducts array if liked
    updateLikedProducts(likeIcons[index].classList.contains('liked'), index);
  });
});

likeIcons.forEach((icon, index) => {
  icon.addEventListener('click', () => {
    icon.classList.toggle('liked'); // Toggle liked class

    // Change color to pink when liked
    if (icon.classList.contains('liked')) {
      icon.style.color = 'pink';
    } else {
      icon.style.color = 'black'; // Reset color to black when unliked
    }

    updateLikedProducts(icon.classList.contains('liked'), index);
  });
});
