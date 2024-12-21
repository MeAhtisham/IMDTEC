function showDropdown(dropdown) {
  dropdown.style.display = 'block';
}

function hideDropdown(dropdown) {
  dropdown.style.display = 'none';
}

const sidebarLinks = document.querySelectorAll('.sidebar-link');
const contentItems = document.querySelectorAll('.content-item');
const megaDropdown = document.querySelector('.mega-dropdown');
const closeDropdown = document.getElementById('closeDropdown');


sidebarLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    const targetId = link.getAttribute('data-target');
    contentItems.forEach(item => {
      item.classList.remove('active');
    });
    document.getElementById(targetId).classList.add('active');
  });
});


const servicesLink = document.getElementById('servicesLink');
servicesLink.addEventListener('mouseenter', () => {
  megaDropdown.style.display = 'block';
});


closeDropdown.addEventListener('click', () => {
  megaDropdown.style.display = 'none';
});



document.addEventListener('click', (e) => {
  if (!megaDropdown.contains(e.target) && !servicesLink.contains(e.target)) {
    megaDropdown.style.display = 'none';
  }
});


window.addEventListener('scroll', (e) => {
  if (megaDropdown.style.display === 'block') {
    megaDropdown.style.position = 'fixed';
  }
});
const secteursLink = document.getElementById('secteursLink');
secteursLink.addEventListener('mouseenter', () => {
  document.getElementById('secteursDropdown').style.display = 'block';
});


const closeSecteursDropdown = document.getElementById('closeSecteursDropdown');
closeSecteursDropdown.addEventListener('click', () => {
  document.getElementById('secteursDropdown').style.display = 'none';
});

document.addEventListener('click', (e) => {
  if (!document.getElementById('secteursDropdown').contains(e.target) && !secteursLink.contains(e.target)) {
    document.getElementById('secteursDropdown').style.display = 'none';
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.getElementById('menuIcon');
  const dropdownMenu = document.getElementById('dropdownMenu');


  menuIcon.addEventListener('click', function () {
    if (dropdownMenu.classList.contains('active')) {
      dropdownMenu.classList.remove("active");
    }
    else {
      dropdownMenu.classList.add("active");
    }


    menuIcon.classList.toggle('active');
    mobileMenu.style.display = 'none';

  });

  document.addEventListener('click', function (event) {
    if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {

      menuIcon.classList.remove('active');
      dropdownMenu.classList.remove("active");
    }
  });
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {

      menuIcon.classList.remove('active');
      dropdownMenu.classList.remove("active");
    });
  });
});



const modal = document.getElementById('search-modal');
const searchInput = document.getElementById('search-input');
const previousSearchesList = document.getElementById('previous-searches');

function getCookies() {
  const cookies = document.cookie.split('; ');
  const cookieObj = {};
  cookies.forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookieObj[name] = value;
  });
  return cookieObj;
}


function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}


function storeSearch(query) {
  let searches = getCookies().searches ? JSON.parse(getCookies().searches) : [];


  searches.unshift(query);
  if (searches.length > 5) {
    searches.pop();
  }

  setCookie('searches', JSON.stringify(searches), 7);
  displayPreviousSearches();
}

function displayPreviousSearches() {
  const dummySearches = ['Example Search 1', 'Test Search', 'Bain and company'];
  let searches = getCookies().searches ? JSON.parse(getCookies().searches) : [];
  const allSearches = [...dummySearches, ...searches];
  previousSearchesList.innerHTML = '';
  allSearches.forEach(search => {
    const li = document.createElement('li');
    li.textContent = search;
    previousSearchesList.appendChild(li);
  });
}
const shistory = document.getElementById('search-history');
document.getElementById('searchIcon').addEventListener('click', function () {
  document.getElementById("search-modal").classList.add("open");
  mobileMenu.style.display = 'none';
  shistory.classList.add("history-open");
  displayPreviousSearches();
});


function closeModal() {
  document.getElementById("search-modal").classList.remove("open");
  shistory.classList.remove("history-open");
}


document.getElementById("close-modal").addEventListener("click", function () {
  closeModal();
});

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

searchInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter' && searchInput.value.trim() !== '') {
    const searchQuery = searchInput.value.trim();
    storeSearch(searchQuery);
    searchInput.value = '';
  }
});

const navLinks = document.querySelectorAll('.nav-item');
navLinks.forEach(link => {
  link.addEventListener('mouseenter', closeModal);
});
document.getElementById('dropdownMenu').addEventListener('click', closeModal);

function addSearchTerm() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    const listItem = document.createElement('li');
    listItem.textContent = searchTerm;
    previousSearchesList.appendChild(listItem);
    searchInput.value = '';
  }
}
document.getElementById('search-button').addEventListener('click', addSearchTerm);

searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addSearchTerm();
  }
});





const servicesDropdown = document.getElementById('servicesDropdown');
const secteursDropdown = document.getElementById('secteursDropdown');

let activeDropdown = null;

document.getElementById('servicesLink').addEventListener('mouseenter', function () {
  if (activeDropdown === 'secteurs') {
    hideDropdown(secteursDropdown);
  }
  showDropdown(servicesDropdown);
  activeDropdown = 'services';
});

document.getElementById('servicesLink').addEventListener('mouseleave', function () {
  if (activeDropdown === 'services') {
    hideDropdown(servicesDropdown);
    activeDropdown = null;
  }
});

document.getElementById('secteursLink').addEventListener('mouseenter', function () {
  if (activeDropdown === 'services') {
    hideDropdown(servicesDropdown);
  }
  showDropdown(secteursDropdown);
  activeDropdown = 'secteurs';
});

document.getElementById('secteursLink').addEventListener('mouseleave', function () {
  //  nk
});

document.getElementById('servicesLink').addEventListener('mouseenter', function () {
  if (activeDropdown === 'secteurs') {
    hideDropdown(secteursDropdown);
  }
});

const menuIcon = document.getElementById('menuIcon-mobile');
const mobileMenu = document.querySelector('.menu-mobile');
const closeModalMobile = document.getElementById('close-modal-mobile');

menuIcon.addEventListener('click', function () {
  mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
  mobileMenu.classList.toggle('show');
});

closeModalMobile.addEventListener('click', function () {
  mobileMenu.style.display = 'none';
  mobileMenu.classList.remove('show');
});

const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
  item.addEventListener('click', function (e) {
    const subMenu = this.querySelector('.sub-menu');
    const arrow = this.querySelector('.arrow-icon i');


    if (subMenu) {
      e.preventDefault();
      subMenu.classList.toggle('show');
      this.classList.toggle('open');
    }
  });
});
