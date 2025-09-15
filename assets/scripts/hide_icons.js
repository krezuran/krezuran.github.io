document.addEventListener("DOMContentLoaded", function() {
    const iconContainer = document.querySelector(".glowing-icons");
    if (iconContainer) {
        const icons = iconContainer.querySelectorAll("a");
        
        if (icons[0]) {
            icons[0].style.display = ""; 
        }
        if (icons[3]) {
            icons[3].style.display = "none";
        }
    }
});