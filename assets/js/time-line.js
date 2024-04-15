// let offset = 0;

// function debounce(callback, delay) {
//   let timer;
//   return function (...args) {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(() => {
//       callback(...args);
//       timer = null;
//     }, delay);
//   };
// }

// function isTargetPage() {
//   const targetURLs = [
//     "/LVBI11",
//     "/PVBI11",
//     "/PATC11",
//     "/PATL11",
//     "/BLMO11",
//     "/BLCA11",
//     "/BLCA11",
//     "/TRNT11",
//     "/CVBI11",
//     "/RVBI11",
//     "/AVBI11",
//     "/AVBI",
//     "/MVBI",
//   ];

//   const currentPage = window.location.pathname;
//   return targetURLs.includes(currentPage);
// }

// function menuFixo() {
//   if (!isTargetPage()) return;

//   const header = document.querySelector(".headerFixoMenu");
//   const topBar = header.querySelector(".acessibillity-bar");
//   const headerMenu = header.querySelector(".header");

//   if (header) {
//     if (window.pageYOffset >= header.clientHeight) {
//       topBar.classList.add("fixed");
//       headerMenu.classList.add("fixed");
//     }
//     if (
//       window.pageYOffset >= header.clientHeight &&
//       header.classList.contains("menu-bar") &&
//       offset <= window.pageYOffset
//     ) {
//       header.style.top = `-${header.clientHeight + 20}px`;
//       setTimeout(() => {
//         header.classList.remove("menu-bar");
//         header.style.top = `-${header.clientHeight + 20}px`;
//       }, 400);
//     } else if (
//       offset > window.pageYOffset &&
//       !header.classList.contains("menu-bar")
//     ) {
//       header.classList.add("menu-bar");
//       header.style.top = "0px";
//     }
//     if (offset === 0) {
//       header.style.top = `-${header.clientHeight + 20}px`;
//     }
//     offset = window.pageYOffset;
//     if (window.pageYOffset === 0) {
//       header.classList.remove("menu-bar");
//       topBar.classList.remove("fixed");
//       headerMenu.classList.remove("fixed");
//       header.style.top = "0px";
//     }
//   }
// }

// menuFixo();

// window.addEventListener("scroll", debounce(menuFixo, 5));

//SCRIPT DA VBI