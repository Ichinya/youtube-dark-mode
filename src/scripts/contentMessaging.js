window.onload(testMessage());

// function testMessage() {
//     chrome.runtime.sendMessage(
//         { payload: 'Hello' },
//         () => console.log(2+2)
//     );
// }

chrome.runtime.onMessage.addListener((request, sender) => {
    console.log(request, sender);
});