(() => {
  const main = document.querySelector('.main');
  const navbar = document.querySelector('.navbar');

  navbar.addEventListener('click', (e) => {

    const targetClassList = e.target.classList;

    (targetClassList.contains('navbar-toggle')) && (() => {
      if (navbar.classList.contains('show')) {
        navbar.classList.remove('show');

        main.onclick = undefined;

        return
      }

      navbar.classList.add('show');

      main.onclick = () => navbar.classList.remove('show');
    })()
  })
})();
