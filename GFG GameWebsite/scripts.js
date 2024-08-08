document.addEventListener("DOMContentLoaded", function() {
    const categoryButtons = document.querySelectorAll(".categories button");
    const gameCards = document.querySelectorAll(".game-card");

    categoryButtons.forEach(button => {
        button.addEventListener("click", function() {
            this.classList.toggle("selected");
        });
    });

    gameCards.forEach(card => {
        card.addEventListener("click", function() {
            const url = this.getAttribute("data-url");
            window.location.href = url;
        });
    });
});
