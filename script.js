document.addEventListener('DOMContentLoaded', () => {
  // Navigation
  const navButtons = document.querySelectorAll('.nav-button');
  const buttonCategories = document.querySelectorAll('.button-category');
  
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      navButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Hide all categories
      buttonCategories.forEach(category => category.classList.remove('active'));
      
      // Show selected category
      const targetCategory = document.getElementById(button.dataset.target);
      if (targetCategory) {
        targetCategory.classList.add('active');
      }
    });
  });
  
  // Get notification element
  const notification = document.getElementById('notification');
  const notificationText = notification.querySelector('.notification-text');
  const notificationIcon = notification.querySelector('.notification-icon');
  
  // Function to show notification
  const showNotification = (message, type = 'info') => {
    notificationText.textContent = message;
    
    // Set icon based on type
    if (type === 'success') {
      notificationIcon.className = 'notification-icon fas fa-check-circle';
      notificationIcon.style.color = '#34C759';
    } else if (type === 'error') {
      notificationIcon.className = 'notification-icon fas fa-exclamation-circle';
      notificationIcon.style.color = '#FF3B30';
    } else {
      notificationIcon.className = 'notification-icon fas fa-info-circle';
      notificationIcon.style.color = '#007AFF';
    }
    
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  };
  
  // Add haptic feedback simulation
  const hapticFeedback = (intensity = 'medium') => {
    if ('vibrate' in navigator) {
      switch (intensity) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(15);
          break;
        case 'heavy':
          navigator.vibrate([10, 30, 10]);
          break;
        default:
          navigator.vibrate(15);
      }
    }
  };
  
  // Add hover effects to all buttons
  document.querySelectorAll('button').forEach(button => {
    const glowEffect = button.querySelector('.glow-effect');
    
    if (glowEffect) {
      // Mouse move effect
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate position as percentage
        const xPercent = x / rect.width;
        const yPercent = y / rect.height;
        
        // Subtle movement
        glowEffect.style.transform = `scale(1.02) translate(${(xPercent - 0.5) * 5}px, ${(yPercent - 0.5) * 5}px)`;
        glowEffect.style.opacity = '0.8';
      });
      
      // Reset on mouse leave
      button.addEventListener('mouseleave', () => {
        glowEffect.style.transform = 'scale(1)';
        glowEffect.style.opacity = '0.7';
      });
    }
    
    // Touch events for mobile
    button.addEventListener('touchstart', () => {
      button.style.transform = 'scale(0.98)';
      if (glowEffect) glowEffect.style.opacity = '0.9';
    }, { passive: true });
    
    button.addEventListener('touchend', () => {
      button.style.transform = 'scale(1)';
      if (glowEffect) glowEffect.style.opacity = '0.7';
      hapticFeedback('light');
    }, { passive: true });
    
    // Click event for all buttons
    button.addEventListener('click', () => {
      // Skip nav buttons
      if (button.classList.contains('nav-button')) return;
      
      hapticFeedback('medium');
      
      // Get button type and style
      let buttonType = '';
      let buttonStyle = '';
      
      if (button.classList.contains('ios-button')) {
        buttonType = 'iOS';
        buttonStyle = Array.from(button.classList)
          .find(cls => cls !== 'ios-button' && cls !== 'active')
          || 'standard';
      } else if (button.classList.contains('material-button')) {
        buttonType = 'Material';
        buttonStyle = Array.from(button.classList)
          .find(cls => cls !== 'material-button' && cls !== 'active')
          || 'standard';
      } else if (button.classList.contains('neumorphic-button')) {
        buttonType = 'Neumorphic';
        buttonStyle = Array.from(button.classList)
          .find(cls => cls !== 'neumorphic-button' && cls !== 'active')
          || 'standard';
      } else if (button.classList.contains('glass-button')) {
        buttonType = 'Glass';
        buttonStyle = Array.from(button.classList)
          .find(cls => cls !== 'glass-button' && cls !== 'active')
          || 'standard';
      } else if (button.classList.contains('animated-button')) {
        buttonType = 'Animated';
        buttonStyle = Array.from(button.classList)
          .find(cls => cls !== 'animated-button' && cls !== 'active')
          || 'standard';
      } else if (button.classList.contains('interactive-button')) {
        buttonType = 'Interactive';
        buttonStyle = Array.from(button.classList)
          .find(cls => cls !== 'interactive-button' && cls !== 'active')
          || 'standard';
      } else if (button.classList.contains('special-button')) {
        buttonType = 'Special';
        buttonStyle = Array.from(button.classList)
          .find(cls => cls !== 'special-button' && cls !== 'active')
          || 'standard';
      }
      
      // Show notification
      showNotification(`${buttonType} ${buttonStyle} button clicked`, 'success');
    });
  });
  
  // Special interactive buttons
  
  // Ripple effect
  const rippleButtons = document.querySelectorAll('.animated-button.ripple');
  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size/2}px`;
      ripple.style.top = `${e.clientY - rect.top - size/2}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Loading button
  const loadingButtons = document.querySelectorAll('.interactive-button.loading');
  loadingButtons.forEach(button => {
    button.addEventListener('click', () => {
      const loader = button.querySelector('.loader');
      const text = button.querySelector('.button-text');
      
      if (!button.classList.contains('active')) {
        button.classList.add('active');
        loader.style.opacity = '1';
        text.textContent = 'Loading...';
        
        setTimeout(() => {
          button.classList.remove('active');
          loader.style.opacity = '0';
          text.textContent = 'Loading';
          showNotification('Loading complete', 'success');
        }, 3000);
      }
    });
  });
  
  // Toggle switch
  const toggleSwitches = document.querySelectorAll('.interactive-button.toggle-switch');
  toggleSwitches.forEach(button => {
    const text = button.querySelector('.button-text');
    const switchThumb = button.querySelector('.switch-thumb');
    const switchTrack = button.querySelector('.switch-track');
    
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      
      if (button.classList.contains('active')) {
        text.textContent = 'On';
        switchThumb.style.transform = 'translateX(20px)';
        switchTrack.style.backgroundColor = 'rgba(52, 199, 89, 0.3)';
        showNotification('Feature enabled', 'success');
      } else {
        text.textContent = 'Off';
        switchThumb.style.transform = 'translateX(0)';
        switchTrack.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        showNotification('Feature disabled', 'info');
      }
    });
  });
  
  // Counter button
  const counterButtons = document.querySelectorAll('.interactive-button.counter');
  counterButtons.forEach(button => {
    let count = 0;
    const text = button.querySelector('.button-text');
    
    button.addEventListener('click', () => {
      count++;
      text.textContent = `Count: ${count}`;
      
      if (count % 10 === 0) {
        showNotification(`Milestone reached: ${count}`, 'success');
      }
    });
  });
  
  // Download button
  const downloadButtons = document.querySelectorAll('.interactive-button.download');
  downloadButtons.forEach(button => {
    const progressBar = button.querySelector('.progress-bar');
    const text = button.querySelector('.button-text');
    
    button.addEventListener('click', () => {
      if (!button.classList.contains('active')) {
        button.classList.add('active');
        text.textContent = 'Downloading...';
        
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          progressBar.style.width = `${progress}%`;
          
          if (progress >= 100) {
            clearInterval(interval);
            text.textContent = 'Downloaded';
            showNotification('Download complete', 'success');
            
            setTimeout(() => {
              progressBar.style.width = '0';
              text.textContent = 'Download';
              button.classList.remove('active');
            }, 2000);
          }
        }, 150);
      }
    });
  });
  
  // Like button
  const likeButtons = document.querySelectorAll('.interactive-button.like');
  likeButtons.forEach(button => {
    const icon = button.querySelector('i');
    const count = button.querySelector('.like-count');
    let liked = false;
    let likeCount = 0;
    
    button.addEventListener('click', () => {
      liked = !liked;
      
      if (liked) {
        icon.className = 'fas fa-heart';
        icon.style.color = '#FF2D55';
        likeCount++;
        button.style.borderColor = '#FF2D55';
      } else {
        icon.className = 'far fa-heart';
        icon.style.color = '';
        likeCount--;
        button.style.borderColor = '';
      }
      
      count.textContent = likeCount;
      
      // Add heart animation
      if (liked) {
        const heart = document.createElement('span');
        heart.innerHTML = '❤️';
        heart.className = 'floating-heart';
        heart.style.position = 'absolute';
        heart.style.fontSize = '20px';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.pointerEvents = 'none';
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.opacity = '1';
        heart.style.transition = 'all 1s ease';
        
        button.appendChild(heart);
        
        setTimeout(() => {
          heart.style.transform = 'translate(-50%, -100px)';
          heart.style.opacity = '0';
        }, 50);
        
        setTimeout(() => {
          heart.remove();
        }, 1000);
      }
    });
  });
  
  // Expand options button
  const expandButtons = document.querySelectorAll('.interactive-button.expand-options');
  expandButtons.forEach(button => {
    const optionsContainer = button.querySelector('.options-container');
    let expanded = false;
    
    button.addEventListener('click', () => {
      expanded = !expanded;
      
      if (expanded) {
        optionsContainer.style.transform = 'translateX(0)';
        optionsContainer.style.opacity = '1';
      } else {
        optionsContainer.style.transform = 'translateX(60px)';
        optionsContainer.style.opacity = '0';
      }
    });
    
    // Option item clicks
    const optionItems = button.querySelectorAll('.option-item');
    optionItems.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const actions = ['Edit', 'Delete', 'Share'];
        showNotification(`${actions[index]} action triggered`, 'info');
        
        // Close options after clicking an option
        expanded = false;
        optionsContainer.style.transform = 'translateX(60px)';
        optionsContainer.style.opacity = '0';
      });
    });
  });
  
  // Typing button
  const typingButtons = document.querySelectorAll('.interactive-button.typing');
  typingButtons.forEach(button => {
    const dots = button.querySelectorAll('.dot');
    
    button.addEventListener('click', () => {
      if (!button.classList.contains('active')) {
        button.classList.add('active');
        
        // Animate dots
        dots.forEach((dot, index) => {
          dot.style.animation = `bounce 1.5s ${index * 0.2}s infinite`;
        });
        
        setTimeout(() => {
          dots.forEach(dot => {
            dot.style.animation = '';
          });
          button.classList.remove('active');
        }, 3000);
      }
    });
  });
  
  // Sound button
  const soundButtons = document.querySelectorAll('.interactive-button.sound');
  soundButtons.forEach(button => {
    const waves = button.querySelectorAll('.wave');
    let isPlaying = false;
    
    button.addEventListener('click', () => {
      isPlaying = !isPlaying;
      
      if (isPlaying) {
        button.querySelector('i').className = 'fas fa-volume-up';
        
        // Animate sound waves
        waves.forEach((wave, index) => {
          wave.style.animation = `soundWave 1s ${index * 0.2}s infinite alternate`;
        });
      } else {
        button.querySelector('i').className = 'fas fa-volume-mute';
        
        // Stop animation
        waves.forEach(wave => {
          wave.style.animation = '';
        });
      }
    });
  });
  
  // Neumorphic toggle
  const neumorphicToggles = document.querySelectorAll('.neumorphic-button.toggle');
  neumorphicToggles.forEach(button => {
    const slider = button.querySelector('.toggle-slider');
    let toggled = false;
    
    button.addEventListener('click', () => {
      toggled = !toggled;
      
      if (toggled) {
        slider.style.transform = 'translateX(40px)';
        button.style.backgroundColor = '#d4e0f7';
      } else {
        slider.style.transform = 'translateX(0)';
        button.style.backgroundColor = '';
      }
    });
  });
  
  // Liquid button
  const liquidButtons = document.querySelectorAll('.special-button.liquid');
  liquidButtons.forEach(button => {
    const liquidEffect = button.querySelector('.liquid-effect');
    
    button.addEventListener('mousemove', () => {
      liquidEffect.style.animation = 'liquidMove 2s linear infinite';
    });
    
    button.addEventListener('mouseleave', () => {
      liquidEffect.style.animation = '';
    });
  });
  
  // Glitch button
  const glitchButtons = document.querySelectorAll('.special-button.glitch');
  glitchButtons.forEach(button => {
    const glitchEffect = button.querySelector('.glitch-effect');
    
    button.addEventListener('mouseenter', () => {
      // Create glitch animation
      const glitchAnimation = () => {
        glitchEffect.style.opacity = Math.random() > 0.8 ? '0.5' : '0';
        glitchEffect.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 5 - 2.5}px)`;
      };
      
      // Run glitch animation at random intervals
      const glitchInterval = setInterval(glitchAnimation, 100);
      
      // Store interval ID on the button
      button.glitchInterval = glitchInterval;
    });
    
    button.addEventListener('mouseleave', () => {
      // Clear interval when mouse leaves
      clearInterval(button.glitchInterval);
      glitchEffect.style.opacity = '0';
      glitchEffect.style.transform = 'translate(0, 0)';
    });
  });
  
  // Add keyframe animations dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      0% {
        transform: scale(0);
        opacity: 0.5;
      }
      100% {
        transform: scale(2);
        opacity: 0;
      }
    }
    
    @keyframes soundWave {
      0% {
        height: 5px;
      }
      100% {
        height: 20px;
      }
    }
    
    @keyframes liquidMove {
      0% {
        transform: rotate(30deg) translateY(0);
      }
      50% {
        transform: rotate(30deg) translateY(20%);
      }
      100% {
        transform: rotate(30deg) translateY(0);
      }
    }
    
    .ripple-effect {
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.4);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    
    .floating-heart {
      position: absolute;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);
  
  // Initialize all buttons that need initialization
  document.querySelectorAll('.interactive-button.toggle-switch').forEach(button => {
    const text = button.querySelector('.button-text');
    text.textContent = 'Off';
  });
});
