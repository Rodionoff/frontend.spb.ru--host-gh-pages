(() => {
  const navbarItems = document.querySelector('.navbar-items');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const main = document.querySelector('.main');
  const lines = Array.from(document.getElementsByClassName('line'));

  navbarToggle.addEventListener('click', toggleNavbar);

  function toggleNavbar() {
    navbarItems.classList.toggle('show');

    if (navbarItems.classList.contains('show')) {
      // navbarToggle.innerHTML = 'x';
      lines.forEach(line => line.classList.add('hiddenToggle'));
      main.addEventListener('click', baz);
    } else {
      // navbarToggle.innerHTML = 'v';
      lines.forEach(line => line.classList.remove('hiddenToggle'));
    }
  }

  function baz() {
    navbarItems.classList.remove('show');
    main.removeEventListener('click', baz);
    // navbarToggle.innerHTML = 'v';
    lines.forEach(line => line.classList.remove('hiddenToggle'))
    // console.log('works');
  }

})()