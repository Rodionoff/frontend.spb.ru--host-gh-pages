// <p class="footer-copyright">
//   2018 - 2019
//   </p>

const footerYearParagraph = document.querySelector('.footer .footer-copyright');

const currentYear = new Date().getFullYear();
const currentYearString = `2018 - ${currentYear}`;


if (footerYearParagraph.innerHTML !== currentYearString) {
  footerYearParagraph.innerHTML = currentYearString;
}
