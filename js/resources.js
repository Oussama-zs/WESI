
document.addEventListener('DOMContentLoaded', function() {
    const resourceHeaders = document.querySelectorAll('.resource-header');
    
    resourceHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const card = this.closest('.resource-card');
        const content = this.nextElementSibling;
        const chevron = this.querySelector('.chevron');
        
        // Toggle current card
        const isActive = card.classList.toggle('active');
        content.classList.toggle('active');
        chevron.textContent = isActive ? '▲' : '▼';
      });
    });

    // Handle mobile/desktop view
    function handleResourcesView() {
      const mobileDiv = document.getElementById('resources-mobile');
      const desktopDiv = document.getElementById('resources');
      
      if (window.innerWidth <= 768) {
        if (mobileDiv) mobileDiv.style.display = 'block';
        if (desktopDiv) desktopDiv.style.display = 'none';
      } else {
        if (mobileDiv) mobileDiv.style.display = 'none';
        if (desktopDiv) desktopDiv.style.display = 'block';
      }
    }

    // Initial setup
    handleResourcesView();
    window.addEventListener('resize', handleResourcesView);
  });
  
  // Mobile Clubs Toggle Functionality
  document.addEventListener('DOMContentLoaded', function() {
    const clubHeaders = document.querySelectorAll('.club-header');
    
    clubHeaders.forEach(header => {
      header.addEventListener('click', function() {
        const card = this.closest('.club-card');
        const content = this.nextElementSibling;
        const chevron = this.querySelector('.chevron');
        
        // Toggle current card
        const isActive = card.classList.toggle('active');
        content.classList.toggle('active');
        chevron.textContent = isActive ? '▲' : '▼';
      });
    });
    
    // Handle mobile/desktop view for clubs
    function handleClubsView() {
      const mobileClubs = document.getElementById('clubs-mobile');
      const desktopClubs = document.getElementById('CLUBS');
      
      if (window.innerWidth <= 768) {
        if (mobileClubs) mobileClubs.style.display = 'block';
        if (desktopClubs) desktopClubs.style.display = 'none';
      } else {
        if (mobileClubs) mobileClubs.style.display = 'none';
        if (desktopClubs) desktopClubs.style.display = 'block';
      }
    }
    
    // Initial setup for clubs view
    handleClubsView();
    window.addEventListener('resize', handleClubsView);
  });