chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(async msg => {
        let response = { action: msg.action };
        if (msg.action === 'fetch_info') {
            const { __un } = await chrome.storage.local.get('__un');
            const { __pw } = await chrome.storage.local.get('__pw');
            const { candidateID } = await chrome.storage.local.get('candidateID');
            const { selectedCity } = await chrome.storage.local.get('selectedCity');
            const { lat } = await chrome.storage.local.get('lat');
            const { lng } = await chrome.storage.local.get('lng');
            const { distance } = await chrome.storage.local.get('distance');
            const { jobType } = await chrome.storage.local.get('jobType');
            const { __ap } = await chrome.storage.local.get('__ap');
            const version = await new Promise(resolve => chrome.management.getSelf(info => resolve(info.version)));

            response.data = {
                $username: __un,
                $password: __pw,
                $candidateID: candidateID,
                $selectedCity: selectedCity,
                $lat: lat,
                $lng: lng,
                $distance: distance,
                $jobType: jobType,
                $active: __ap,
                $version: version
            };
        }
        port.postMessage(response);
    });
});

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
    // Disable action icon by default
    chrome.action.disable();

    // Setup page action rules (show icon on all pages)
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({ pageUrl: {} })],
            actions: [new chrome.declarativeContent.ShowAction()]
        }]);
    });

    if (reason === 'install') {
        await chrome.storage.local.set({
            $active: false,
            __cr: 0,
            __fq: 0.5,
            __gp: 3,
            __tdgp: 3
        });
        chrome.tabs.create({ url: 'https://hiring.amazon.ca/app#/jobSearch' });
    }

    // Optional: watch for candidateId changes
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes.candidateId) {
            const newVal = changes.candidateId.newValue;
            console.log('candidateId changed to:', newVal);
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' &&
        tab.url.includes('hiring.amazon.ca/application/us/') &&
        tab.url.includes('jobId=')) {
        chrome.scripting.executeScript({
            target: { tabId },
            files: ['Createapp.js']
        }).catch(err => console.error('Script injection failed:', err));
    }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === 'start_fetch') {
        chrome.runtime.sendMessage({ action: 'start_fetch' });
    } else if (msg.action === 'stop_fetch') {
        chrome.runtime.sendMessage({ action: 'stop_fetch' });
    }

    if (msg.candidateId) {
        chrome.storage.local.set({ candidateId: msg.candidateId }, () => {
            sendResponse({ status: 'success' });
        });
        return true; // indicates async response
    }
});
