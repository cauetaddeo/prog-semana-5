// Aplicação Principal
class TaskManagerApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavbar();
    this.setupModals();
    this.setupNotifications();
  }

  // Navbar Mobile
  setupNavbar() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
      });

      // Fechar menu ao clicar em link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('active');
        });
      });
    }
  }

  // Modais
  setupModals() {
    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
      const modal = document.querySelector('.modal');
      if (modal && event.target === modal) {
        modal.classList.remove('active');
      }
    });
    // Fechar modal ao clicar no botão de fechar
    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        if (modal) {
          modal.classList.remove('active');
        }
      });
    });
    // Abrir modal ao clicar em botão
    const openModalButtons = document.querySelectorAll('.open-modal');  
    openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('active');
        }
      });
    }
    );
  }
}