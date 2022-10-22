
chrome.runtime.onInstalled.addListener(()=>{
    chrome.action.setBadgeText({
        text:"OFF",
    });
    chrome.action.setBadgeBackgroundColor({
        // text:"OFF",
        color:'gray',
    });

    });

const extension = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

chrome.action.onClicked.addListener(async (tab)=> {
    if(tab.url.startsWith(extension) || tab.url.startsWith(webstore)){
        // check the action badge if on or off 
        const prevState = await chrome.action.getBadgeText({tabId: tab.id});
        const nextState = prevState === 'ON'? 'OFF': 'ON'


        // chrome.action.setBadgeBackgroundColor({
        //     // text:"OFF",
        //     color:'ORANGE'
        // });
        

        await chrome.action.setBadgeText({
            // text:"ON"
            
            tabId: tab.id,
            text: nextState,
        });

        if(nextState ==="ON"){
            chrome.action.setBadgeBackgroundColor({
                color:'green'

            });
            await chrome.scripting.insertCSS({
                files: ["focus.css"],
                target: {tabId: tab.id},
            });
        } else if(nextState === "OFF"){
            chrome.action.setBadgeBackgroundColor({
                color:'gray'

            });
            await chrome.scripting.removeCSS({
                files: ["focus.css"],
                target: {tabId: tab.id},
            });
        }
    }

});


