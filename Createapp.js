(async function() {
    // Helper function to click elements
    function clickElement(element) {
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(clickEvent);
        // Double-click attempt for reliability
        setTimeout(() => {
            element.click();
        }, 500);
    }

    // Function to redirect back to job search after completion
    function redirectToJobSearch() {
        setTimeout(() => {
            window.location.href = 'https://hiring.amazon.ca/app#/jobSearch';
        }, 10000);
    }

    // Main observer to handle the application process
    const observer = new MutationObserver(() => {
        // Look for the Next button
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            const buttonText = button.querySelector('div[data-test-component="StencilReactRow"]')?.textContent?.trim();
            
            if (buttonText === 'Next') {
                clickElement(button);
                observer.disconnect();
                
                // After clicking Next, wait for Create Application button
                setTimeout(() => {
                    const createAppButton = [...document.querySelectorAll('button')]
                        .find(btn => btn.querySelector('div[data-test-component="StencilReactRow"]')?.textContent?.trim() === 'Create Application');
                    
                    if (createAppButton) {
                        clickElement(createAppButton);
                        observer.disconnect();
                        redirectToJobSearch();
                    }
                }, 2000);
                return;
            }
        });

        // Direct check for Create Application button
        const createAppButton = [...document.querySelectorAll('button')]
            .find(btn => btn.querySelector('div[data-test-component="StencilReactRow"]')?.textContent?.trim() === 'Create Application');
        
        if (createAppButton) {
            clickElement(createAppButton);
            observer.disconnect();
            redirectToJobSearch();
        }
    });

    // Start observing the DOM for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();