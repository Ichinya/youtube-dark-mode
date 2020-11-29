chrome.runtime.onMessage.addListener((request, sender, resp) => {
    console.log(request, sender, resp());
});


// chrome.bookmarks.onMoved.addListener(() => {
//     chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
//         chrome.tabs.sendMessage(tabs[0].id, { name: 'BG' });
//     });
// })
