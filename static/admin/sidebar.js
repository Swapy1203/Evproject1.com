document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('main');

  console.log('Toggle init:', { toggleBtn, sidebar, main }); // sanity log

  if (!toggleBtn || !sidebar || !main) return;

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const collapsed = sidebar.classList.contains('collapsed');
    console.log('Sidebar collapsed:', collapsed);

    if (collapsed) {
      sidebar.style.width = '0';
      sidebar.style.padding = '0';
      main.style.marginLeft = '0';
    } else {
      sidebar.style.width = '250px';
      sidebar.style.padding = '1rem';
      main.style.marginLeft = '0'; // keep natural layout if using flex
    }
  });
});

