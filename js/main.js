document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scrolling when menu is open
      if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = '';
      });
    });
  }

  // 2. Sticky Header Scroll Effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 3. Portfolio Tab Switcher (Environments Section)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (tabBtns.length > 0 && tabPanes.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button and target pane
        btn.classList.add('active');
        const targetPane = document.getElementById(targetTab);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }

  // 4. Accordion FAQ
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');

      if (trigger && content) {
        trigger.addEventListener('click', () => {
          const isActive = item.classList.contains('active');

          // Close all open FAQ items
          faqItems.forEach(i => {
            i.classList.remove('active');
            const c = i.querySelector('.faq-content');
            if (c) c.style.maxHeight = null;
          });

          // Toggle current FAQ item
          if (!isActive) {
            item.classList.add('active');
            // Set max-height to scroll height to expand smoothly
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        });
      }
    });
  }

  // 5. Intersection Observer for Entrance Animations
  const animElements = document.querySelectorAll('.fade-in-up');
  if (animElements.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          obs.unobserve(entry.target); // Trigger once
        }
      });
    }, observerOptions);

    animElements.forEach(el => observer.observe(el));
  }

  // 6. Contact Form Interactive Handler (If Present)
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Visual transition to submitting
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Enviando...';
      submitBtn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success feedback
        formFeedback.style.display = 'block';
        formFeedback.classList.add('success');
        formFeedback.innerHTML = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
        
        // Reset form
        contactForm.reset();
        
        // Hide feedback after 5 seconds
        setTimeout(() => {
          formFeedback.style.display = 'none';
          formFeedback.classList.remove('success');
        }, 5000);
      }, 1500);
    });
  }

  // 7. Environment Modal Popup (Click to View Reference Image)
  const envItems = document.querySelectorAll('.env-item');
  const envModal = document.getElementById('envModal');
  const envModalImg = document.getElementById('envModalImg');
  const envModalTitle = document.getElementById('envModalTitle');
  const envModalDesc = document.getElementById('envModalDesc');
  const envModalClose = document.getElementById('envModalClose');
  const envModalOverlay = document.getElementById('envModalOverlay');

  if (envItems.length > 0 && envModal && envModalImg && envModalTitle && envModalDesc) {
    envItems.forEach(item => {
      item.style.cursor = 'pointer';

      item.addEventListener('click', () => {
        const title = item.textContent || item.innerText;
        const image = item.getAttribute('data-image');
        const desc = item.getAttribute('data-desc');

        if (image) {
          envModalImg.src = image;
          envModalImg.alt = "Projeto de iluminação de referência para " + title;
          envModalTitle.textContent = title;
          envModalDesc.textContent = desc || 'Conceito e precisão técnica aplicados sob medida pela Geometria da Luz.';
          
          // Open Modal
          envModal.classList.add('active');
          envModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden'; // Prevent main page scroll
        }
      });
    });

    // Close Modal helper
    const closeModal = () => {
      envModal.classList.remove('active');
      envModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    if (envModalClose) envModalClose.addEventListener('click', closeModal);
    if (envModalOverlay) envModalOverlay.addEventListener('click', closeModal);

    // Escape key press to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && envModal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 8. Dynamic WhatsApp Button Positioning & Anchoring
  const whatsappFloat = document.getElementById('whatsappFloatingBtn');
  const footerEl = document.querySelector('footer');
  const footerBottomEl = document.querySelector('.footer-bottom');

  if (whatsappFloat && footerEl) {
    const adjustWhatsappPosition = () => {
      const footerRect = footerEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const bottomOffset = Math.max(0, footerRect.bottom - viewportHeight);
      const footerBottomHeight = footerBottomEl ? footerBottomEl.offsetHeight : 60;
      
      const standardBottom = window.innerWidth <= 576 ? 24 : 40;
      const targetBottom = Math.max(standardBottom, (footerBottomHeight - bottomOffset) + 60);
      
      whatsappFloat.style.setProperty('bottom', targetBottom + 'px', 'important');
    };
    window.addEventListener('scroll', adjustWhatsappPosition);
    window.addEventListener('resize', adjustWhatsappPosition, { passive: true });
    adjustWhatsappPosition();
  }
});
