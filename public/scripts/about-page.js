// About Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // Gallery navigation functionality
  const galleryPrevBtn = document.querySelector('.chevron_left');
  const galleryNextBtn = document.querySelector('.chevron_right');
  
  if (galleryPrevBtn && galleryNextBtn) {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.gallery-item');
    
    galleryPrevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateGallery();
    });
    
    galleryNextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateGallery();
    });
    
    function updateGallery() {
      slides.forEach((slide, index) => {
        slide.style.display = index === currentSlide ? 'block' : 'none';
      });
    }
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe sections for animation
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
  });
  
  // Button click ripple effect
  document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add CSS for animations dynamically
const style = document.createElement('style');
style.textContent = `
  .fade-in-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .fade-in-visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  button, a {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);
