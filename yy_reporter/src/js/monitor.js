import util from './util.js'
function message(msg) {
    console.log(msg);
}
function init() {
    // chrome.storage.sync.clear();
    /**
     * tab状态变化的时候触发，比如从loading到complete
     */
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        //chrome隐身模式下无法监听
        if (changeInfo && changeInfo.status === 'complete' && tab) {
            message(tabId);
            message(changeInfo);
            message(tab);
            let hostname = util.getUrlObject(tab.url).hostname;
            message(hostname);
            chrome.storage.sync.get('webCounter', (obj) => {
                message(obj);
                if (!obj.webCounter) {
                    obj.webCounter = {};
                }
                //如果存在就count加一
                let webSite = obj.webCounter[hostname];
                if (webSite) {
                    webSite.count = webSite.count + 1;
                } else {
                    webSite = {};
                    webSite.count = 1;
                }
                webSite.title = tab.title;
                webSite.url = tab.url;
                webSite.icon = tab.favIconUrl;
                obj.webCounter[hostname] = webSite;
                chrome.storage.sync.set({'webCounter': obj.webCounter}, () => {
                    message("save " + hostname + " ----->" + webSite.count + ",icon=" + webSite.icon);
                });
            });
        }
    });
}
// function test() {
/**
 * 新建tab的时候触发
 */
// chrome.tabs.onCreated.addListener(function (tab) {
// });
//     /**
//      * tab被选中触发
//      */
//     chrome.tabs.onActivated.addListener(function (activeInfo) {
//         console.log('Tab ' + activeInfo.tabId + ' in window ' + activeInfo.windowId + ' is active now.');
//     });
//
//     chrome.tabs.onHighlighted.addListener(function (highlightInfo) {
//         console.log('Tab ' + highlightInfo.tabIds + ' in window ' + highlightInfo.windowId + ' is highlighted now.');
//     });
//     /**
//      * 遍历出所有的tab对象;如果前面参数不加过滤条件就是返回所有的tab（包括所有的window）
//      */
//     chrome.tabs.query({}, function (tabs) {
//         tabs.forEach(function (tab) {
//             console.log(tab);
//             if (tab.index === 1) {
//                 //选中指定的第二个tab
//                 // chrome.tabs.highlight({tabs:tab.index});
//             }
//         });
//     });
//
//     /**
//      * tab在window中移动位置的时候触发
//      */
//     chrome.tabs.onMoved.addListener(function (tabId, moveInfo) {
//         console.log('Tab ' + tabId + ' has been moved:');
//         console.log(moveInfo);
//     });
//     /**
//      * onDetached 从一个window中把一个tab挪出去，成为一个新的window中tab，或者放入其他window中
//      */
//     chrome.tabs.onDetached.addListener(function (tabId, detachInfo) {
//         console.log('Tab ' + tabId + ' in window ' + detachInfo.oldWindowId + ' at position ' + detachInfo.oldPosition + ' has been detached.');
//     });
//     /**
//      * onAttached有新的tab插入到window中
//      */
//     chrome.tabs.onAttached.addListener(function (tabId, attachInfo) {
//         console.log('Tab ' + tabId + ' has been attached to window ' + attachInfo.newWindowId + ' at position ' + attachInfo.newPosition + ' .');
//     });
//     /**
//      * 删除一个tab
//      */
//     chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
//         console.log('Tab ' + tabId + ' in window ' + removeInfo.windowId + ', and the window is ' + (removeInfo.isWindowClosing ? 'closed.' : 'open.'));
//     });
//
//     chrome.tabs.onReplaced.addListener(function (addedTabId, removedTabId) {
//         console.log('Tab ' + removedTabId + ' has been replaced by tab ' + addedTabId + '.');
//     });
// }
init();