// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const currentTheme = localStorage.getItem('theme') || 'dark';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Product Data
const products = [
    {
        id: 1,
        name: "VS Code Noir",
        category: "Унисекс",
        description: "Темный и загадочный аромат с нотами сандала, пачули и ванили. Идеален для ночных кодинг-сессий.",
        price: 89.99,
        rating: 4.8,
        notes: ["Сандал", "Пачули", "Ваниль", "Бергамот"],
        intensity: "Eau de Parfum",
        volume: "100ml"
    },
    {
        id: 2,
        name: "Debugger's Focus",
        category: "Для мужчин",
        description: "Свежий цитрусовый аромат, помогающий сосредоточиться на решении сложных задач.",
        price: 75.50,
        rating: 4.6,
        notes: ["Лимон", "Имбирь", "Дубовый мох", "Амбра"],
        intensity: "Eau de Toilette",
        volume: "100ml"
    },
    {
        id: 3,
        name: "Syntax Bloom",
        category: "Для женщин",
        description: "Цветочный и нежный аромат с нотками жасмина, розы и фиалки для творческих решений.",
        price: 95.00,
        rating: 4.9,
        notes: ["Жасмин", "Роза", "Фиалка", "Мускус"],
        intensity: "Eau de Parfum",
        volume: "75ml"
    },
    {
        id: 4,
        name: "Git Commit",
        category: "Унисекс",
        description: "Древесный аромат для уверенности и стабильности в работе над проектами.",
        price: 82.00,
        rating: 4.7,
        notes: ["Кедр", "Ветивер", "Кардамон", "Амбра"],
        intensity: "Eau de Parfum",
        volume: "100ml"
    },
    {
        id: 5,
        name: "React Essence",
        category: "Унисекс",
        description: "Динамичный аромат для быстрых и эффективных решений в современной разработке.",
        price: 78.50,
        rating: 4.5,
        notes: ["Грейпфрут", "Мята", "Мох", "Мускус"],
        intensity: "Eau de Toilette",
        volume: "100ml"
    },
    {
        id: 6,
        name: "Python Zen",
        category: "Для мужчин",
        description: "Чистый и элегантный аромат, отражающий философию простоты и ясности кода.",
        price: 88.00,
        rating: 4.8,
        notes: ["Мандарин", "Нероли", "Мускус", "Древесные ноты"],
        intensity: "Eau de Parfum",
        volume: "75ml"
    }
];

// Render Products
const productGrid = document.getElementById('productGrid');

function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <i class="fas fa-wine-bottle"></i>
            </div>
            <span class="product-category">${product.category}</span>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <div class="product-rating">
                ${generateStars(product.rating)}
                <span>${product.rating}</span>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> В корзину
                </button>
                <button class="btn btn-outline" onclick="showProductDetails(${product.id})">
                    <i class="fas fa-info-circle"></i> Подробнее
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Filter Products
const filterTags = document.querySelectorAll('.filter-tag');
filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        
        const filter = tag.textContent;
        let filteredProducts = products;
        
        if (filter === 'Для мужчин') {
            filteredProducts = products.filter(p => p.category === 'Для мужчин');
        } else if (filter === 'Для женщин') {
            filteredProducts = products.filter(p => p.category === 'Для женщин');
        } else if (filter === 'Унисекс') {
            filteredProducts = products.filter(p => p.category === 'Унисекс');
        } else if (filter === 'Новинки') {
            filteredProducts = products.slice(0, 3); // First 3 as "new"
        }
        
        renderProducts(filteredProducts);
    });
});

// Product Details Modal
const modal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    