const navbar = document.getElementsByClassName('navbar')[0];
const navbarItems = document.getElementsByClassName('navbar-items')[0];
const navbarToggle = document.getElementsByClassName('navbar-toggle')[0];
const html = document.getElementsByTagName('html')[0];
const body = document.getElementsByTagName('body')[0];
const main = document.getElementsByClassName('main')[0];
const lines = Array.from(document.getElementsByClassName('line'));

navbarToggle.addEventListener('click', toggleNavbar);

function toggleNavbar() {
  navbarItems.classList.toggle('show');

  if (navbarItems.classList.contains('show')) {
    // navbarToggle.innerHTML = 'x';
    lines.forEach(line => line.classList.add('hiddenToggle'));
    main.addEventListener('click', foo);
  } else {
    // navbarToggle.innerHTML = 'v';
    lines.forEach(line => line.classList.remove('hiddenToggle'));
  }
}

function foo() {
  navbarItems.classList.remove('show');
  main.removeEventListener('click', foo);
  // navbarToggle.innerHTML = 'v';
  lines.forEach(line => line.classList.remove('hiddenToggle'))
  console.log('works');
}

