(async function () {
    console.log('Amazon Apply Bot started...');

    function clickElement(element) {
        if (!element) {
            console.log('Element not found for clicking');
            return false;
        }
        try {
            element.click();
            element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
            element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true }));
            element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
            if (element.focus) element.focus();
            return true;
        } catch (error) {
            console.error('Click error:', error);
            return false;
        }
    }

    function redirectToSearch() {
        console.log('Returning to search page in 5 seconds...');
        setTimeout(() => {
            window.location.href = 'https://hiring.amazon.ca/app#/jobSearch';
        }, 5000);
    }

    let dropdownClicked = false;
    let scheduleCardClicked = false;
    let applyButtonClicked = false;
    let createAppButtonClicked = false;

    function getScheduleCardToClick(scheduleCards) {
        if (scheduleCards.length >= 3) return scheduleCards[2];
        if (scheduleCards.length >= 2) return scheduleCards[1];
        if (scheduleCards.length >= 1) return scheduleCards[0];
        return null;
    }

    const observer = new MutationObserver(() => {
        try {
            // Step 1: Click Dropdown (before schedule cards)
            const dropdown = document.querySelector('[data-test-component="StencilReactRow"].jobDetailScheduleDropdown');
            if (dropdown && !dropdownClicked) {
                console.log('Clicking schedule dropdown...');
                if (clickElement(dropdown)) {
                    dropdownClicked = true;
                }
                return;
            }

            // Step 2: Click a schedule card
            const scheduleCards = document.querySelectorAll('[data-test-component="StencilReactCard"][role="button"]');
            if (scheduleCards.length > 0 && !scheduleCardClicked) {
                const card = getScheduleCardToClick(scheduleCards);
                if (card && clickElement(card)) {
                    scheduleCardClicked = true;
                    console.log('Schedule card clicked');
                }
                return;
            }

            // Step 3: Click Apply button
            const applyBtn = document.querySelector('[data-test-id="jobDetailApplyButtonDesktop"]');
            if (applyBtn && !applyButtonClicked) {
                if (clickElement(applyBtn)) {
                    applyButtonClicked = true;
                    console.log('Apply button clicked');
                }
                return;
            }

            // Step 4: Click Create Application (in final step tab)
            const createAppBtn = [...document.querySelectorAll('button')]
                .find(btn => btn.textContent?.trim() === 'Create Application' ||
                    btn.querySelector('div[data-test-component="StencilReactRow"]')?.textContent?.trim() === 'Create Application');

            if (createAppBtn && !createAppButtonClicked) {
                if (clickElement(createAppBtn)) {
                    createAppButtonClicked = true;
                    console.log('Create Application clicked');
                    observer.disconnect();
                    redirectToSearch();
                }
            }
        } catch (err) {
            console.error('Observer error:', err);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style', 'disabled']
    });

    // Initial trigger
    setTimeout(() => {
        const dropdown = document.querySelector('[data-test-component="StencilReactRow"].jobDetailScheduleDropdown');
        if (dropdown && !dropdownClicked) clickElement(dropdown);

        const scheduleCards = document.querySelectorAll('[data-test-component="StencilReactCard"][role="button"]');
        if (scheduleCards.length > 0 && !scheduleCardClicked) {
            const card = getScheduleCardToClick(scheduleCards);
            if (card) clickElement(card);
        }

        const applyBtn = document.querySelector('[data-test-id="jobDetailApplyButtonDesktop"]');
        if (applyBtn && !applyButtonClicked) clickElement(applyBtn);

        const createAppBtn = [...document.querySelectorAll('button')]
            .find(btn => btn.textContent?.trim() === 'Create Application');
        if (createAppBtn && !createAppButtonClicked) clickElement(createAppBtn);
    }, 1500);

    console.log('Observer activated...');
})();
