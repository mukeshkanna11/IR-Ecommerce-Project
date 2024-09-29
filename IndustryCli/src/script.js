document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('productGrid');
  const searchBar = document.getElementById('searchBar');
  let products = [];

  // Fetch products from Fake Store API
  async function fetchProducts() {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      products = await res.json();
      displayProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  // Display fetched products
  function displayProducts(products) {
    productGrid.innerHTML = ''; // Clear previous results
    products.forEach(product => {
      const productCard = `
        <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition flex flex-col justify-between h-full">
          <img src="${product.image}" alt="${product.title}" class="h-40 w-full object-contain mb-2">
          <div class="flex-grow">
            <h2 class="font-bold text-lg mb-2">${product.title}</h2>
            <p class="text-gray-600 mb-2">$${product.price}</p>
          </div>
          <button class="openModal mt-2 bg-blue-500 text-white px-4 py-2 rounded w-full font-poppins italic" data-id="${product.id}">
            View Details
          </button>
        </div>
      `;
      productGrid.innerHTML += productCard;
    });

    // Attach click event listeners to each "View Details" button
    document.querySelectorAll('.openModal').forEach(button => {
      button.addEventListener('click', openModal);
    });
  }

  // Modal functionality (will only open when 'View Details' is clicked)
  function openModal(e) {
    const productId = e.target.getAttribute('data-id');
    const product = products.find(p => p.id == productId);

    // Update modal content
    document.getElementById('modalTitle').innerText = product.title;
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalDescription').innerText = product.description;
    document.getElementById('modalQuantity').innerText = `Available Quantity: ${product.rating.count}`;

    // Show modal
    document.getElementById('productModal').classList.remove('hidden');

    // Handle order placement
    const placeOrderButton = document.getElementById('placeOrder');
    placeOrderButton.onclick = () => {
      const orderQuantity = document.getElementById('orderQuantity').value;
      alert(`Order placed for ${orderQuantity} units of "${product.title}"`);
      closeModal(); // Close modal after placing order
    };
  }

  // Close modal
  document.getElementById('closeModal').addEventListener('click', () => {
    closeModal();
  });

  // Function to close modal
  function closeModal() {
    document.getElementById('productModal').classList.add('hidden');
  }

  // Search functionality
  searchBar.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
  });

  // Fetch products on page load
  fetchProducts();
});
