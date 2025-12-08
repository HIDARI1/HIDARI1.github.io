// Skills categories and cards functionality
document.addEventListener('DOMContentLoaded', () => {
  // Initialize categories (accordion)
  const categories = document.querySelectorAll('.skill-category');
  
  categories.forEach((category) => {
    const header = category.querySelector('.skill-category-header');
    
    // Open first category by default
    if (category === categories[0]) {
      category.classList.add('active');
    }
    
    header.addEventListener('click', () => {
      const isActive = category.classList.contains('active');
      
      // Close all categories
      categories.forEach((cat) => {
        cat.classList.remove('active');
      });
      
      // Open clicked category if it wasn't active
      if (!isActive) {
        category.classList.add('active');
      }
    });
  });

  const articles = document.querySelectorAll('.skills-cards article');

  if (articles.length === 0) return;

  // Initialize skill levels
  articles.forEach((article) => {
    const level = parseInt(article.getAttribute('data-level')) || 0;
    const progressFill = article.querySelector('.skill-progress-fill');
    const percentageText = article.querySelector('.skill-percentage');
    
    // Set CSS variable for the level
    article.style.setProperty('--skill-level', `${level}%`);

    // Animate percentage and progress bar on hover
    article.addEventListener('mouseenter', () => {
      // Animate percentage counter with easing
      let current = 0;
      const duration = 1200; // 1.2 seconds
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        current = level * easeOut;
        
        if (percentageText) {
          percentageText.textContent = Math.round(current);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          if (percentageText) {
            percentageText.textContent = level;
          }
        }
      };
      
      requestAnimationFrame(animate);

      // Animate progress bar
      if (progressFill) {
        progressFill.style.width = `${level}%`;
      }
    });

    // Reset on mouse leave
    article.addEventListener('mouseleave', () => {
      if (percentageText) {
        percentageText.textContent = '0';
      }
      if (progressFill) {
        progressFill.style.width = '0%';
      }
    });
  });

  document.addEventListener('pointermove', (event) => {
    articles.forEach((article) => {
      // Get the bounding rectangle of the article
      const rect = article.getBoundingClientRect();

      // Calculate center point of the article
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate pointer position relative to center
      const relativeX = event.clientX - centerX;
      const relativeY = event.clientY - centerY;

      // Normalize to -1 to 1 range (at card edges)
      // x: -1 (left edge) to 1 (right edge)
      // y: -1 (top edge) to 1 (bottom edge)
      const x = relativeX / (rect.width / 2);
      const y = relativeY / (rect.height / 2);

      // Update CSS custom properties for each article
      article.style.setProperty('--pointer-x', x.toFixed(3));
      article.style.setProperty('--pointer-y', y.toFixed(3));
    });
  });

  // Reset position when pointer leaves
  document.addEventListener('pointerleave', () => {
    articles.forEach((article) => {
      article.style.setProperty('--pointer-x', '-10');
      article.style.setProperty('--pointer-y', '-10');
    });
  });
});

