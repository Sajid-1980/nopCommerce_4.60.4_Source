// Get all the tab links
var tabLinks = document.querySelectorAll('.fortabe');

// Get all the tab content elements
var tabContents = document.querySelectorAll('.tab-pane');

// Add click event listener to each tab link
tabLinks.forEach(function (tabLink) {
    tabLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior

        // Remove 'active' class from all tab links and content elements
        tabLinks.forEach(function (link) {
            link.classList.remove('active');
        });
        tabContents.forEach(function (content) {
            content.classList.remove('show', 'active');
        });

        // Add 'active' class to the clicked tab link
        this.classList.add('active');

        // Get the target tab content ID from the 'href' attribute
        var targetId = this.getAttribute('href');

        // Add 'show' and 'active' classes to the target tab content
        document.querySelector(targetId).classList.add('show', 'active');
    });
});
