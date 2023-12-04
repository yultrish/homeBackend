// shopping.js

// Function to display products on the page
async function displayProducts() {
  try {
    // Fetch product data from your server
    const response = await fetch('http://localhost:7070/shop/v1/products'); // Replace with your server URL

    if (!response.ok) {
      throw new Error(`Server returned an error: ${response.status}`);
    }

    const products = await response.json();
    console.log(products)

    // Get the container where you want to display products
    const productContainer = document.querySelector('.row');

    // Clear existing content in the container
    productContainer.innerHTML = '';

    // Loop through the products and create HTML elements for each product
    products.forEach((product) => {
      const productElement = document.createElement('div');
      productElement.classList.add('col-4');

      // Create product image element
      const productImage = document.createElement('img');
      productImage.src = product.image; // Replace with the actual image URL
      productImage.alt = product.name;

      // Create product name element
      const productName = document.createElement('h4');
      productName.textContent = product.name;

      // Create product rating element
      const productRating = document.createElement('div');
      productRating.classList.add('rating');

      // Assuming your product data includes a rating value
      for (let i = 0; i < product.rating; i++) {
        const starIcon = document.createElement('i');
        starIcon.classList.add('fas', 'fa-star');
        productRating.appendChild(starIcon);
      }

      // Create product price element
      const productPrice = document.createElement('p');
      productPrice.textContent = `GHC${product.price.toFixed(2)}`;

      // Append elements to the product container
      productElement.appendChild(productImage);
      productElement.appendChild(productName);
      productElement.appendChild(productRating);
      productElement.appendChild(productPrice);

      // Append the product container to the product listing
      productContainer.appendChild(productElement);
    });
  } catch (error) {
    console.error(error);
  }
}

// Call the function to display products when the page loads
window.addEventListener('DOMContentLoaded', () => {
  displayProducts();

});





