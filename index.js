// JavaScript code to toggle the visibility of the navigation menu
document.addEventListener('DOMContentLoaded', function () {
    let navigation = document.querySelector('.toggle-menu');
    let navigating = false;
    let navBar = document.querySelector('header nav ul');
    let header = document.querySelector('header'); // Select the header element
    // let links = document.querySelectorAll('.nav-link');

});

function toggleCircle(circle) {
    var checkmark = circle.querySelector('i');
    checkmark.classList.toggle('show');
    circle.classList.toggle('clicked'); // Toggle the 'clicked' class
}