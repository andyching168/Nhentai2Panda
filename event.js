
var notificationNotNumber = {
    type: "basic",
    iconUrl: "icon.png",
    title: "錯誤",
    message: "這不是純數字"
};
var notificationNotNH = {
    type: "basic",
    iconUrl: "icon.png",
    title: "錯誤-無法複製",
    message: "需要在NHentai相冊中使用"
};

chrome.runtime.onInstalled.addListener(() => {
  createMenus();  
});

function genericOnNHSearch(selectionText) {  
chrome.tabs.create({ "url":'https://nhentai.net/search/?q='+ (selectionText ? selectionText : "") }); 
	
	
	
}  

function NHMagicNumberSearch(selectionText) {  
	if(/^[0-9]*$/.test((selectionText ? selectionText : ""))){
	chrome.tabs.create({ "url":'https://nhentai.net/g/'+ (selectionText ? selectionText : "")}); 	
console.log("true");
	}
	else{
		chrome.notifications.create("", notificationNotNumber);
	}
}

function PixivNumberSearch(selectionText) {  
	if(/^[0-9]*$/.test((selectionText ? selectionText : ""))){
	chrome.tabs.create({ "url":'https://www.pixiv.net/artworks/'+ (selectionText ? selectionText : "")}); 	
console.log("true");
	}
	else{
		chrome.notifications.create("", notificationNotNumber);
	}
}



function COPYNUM(url) { 
	if(url.search("nhentai.net/g/") != -1){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id,{method: "CopyText",textToCopy: url.substring(22,28) }, function(response) {
			//var T=response.data;
			console.log(response);
		})
})
var notificationCopyOK = {
    type: "basic",
    iconUrl: "icon.png",
    title: "複製成功",
    message: url.substring(22,28)
}
  chrome.notifications.create("", notificationCopyOK);
	}
	
	
	
	
else{
		chrome.notifications.create("", notificationNotNH);
	}
}



function handleImageURLSauceNAO(url) {
    // now do something with the URL string in the background page
	chrome.tabs.create({ "url":'http://saucenao.com/search.php?db=999&url='+ encodeURIComponent(url) });
}

function handleImageURLGoogle(url) {
    // now do something with the URL string in the background page
	chrome.tabs.create({ "url":'https://lens.google.com/uploadbyurl?url='+ encodeURIComponent(url) });
}


function genericOnPixivSearch(selectionText) {  
	chrome.tabs.create({ "url":'https://www.pixiv.net/tags/'+ (selectionText ? selectionText : "") + '/artworks?s_mode=s_tc'});
}  

function genericOnEXSearch(selectionText) {  
	console.log("genericOnEXSearch");
	
	chrome.tabs.create({ "url":'https://exhentai.org/?f_search='+ (selectionText ? selectionText : "") });
}  
function genericOnEHSearch(selectionText) {  
	chrome.tabs.create({ "url":'https://e-hentai.org/?f_search='+ (selectionText ? selectionText : "") });
}  



function createMenus() {  
	
	var parent = chrome.contextMenus.create({  
        title: "NHentai2Panda快速選項", 
		id:"RightClickMenu",
        contexts: ['all']
    });  
	var imageSearchSauceNAO = chrome.contextMenus.create({  
	title: "尋找來源(Sauce NAO)",
    contexts:["image"],
	id:"imageSearchSauceNAO",
	"parentId": parent
	});
	
	var imageSearchGoogle = chrome.contextMenus.create({  
	title: "尋找來源(Google以圖搜圖)",
    contexts:["image"],
	"id":"imageSearchGoogle",
	"parentId": parent
	});
	var CopyNum = chrome.contextMenus.create({  
	title: "複製6位數字",
	"id":"CopyNum",
    contexts:["all"],
	"parentId": parent
	});
	
	
	

	
	
	
	var NHMagicNumber = chrome.contextMenus.create({  
        "title": "NHentai6位數"+" ["+"%s"+"]",  
        "type": "normal",  
        "contexts": ['selection'],  
		"id":"NHMagicNumber",
        "parentId": parent
    });
	
	var PixivMagicNumber = chrome.contextMenus.create({  
        "title": "Pixiv ID"+" ["+"%s"+"]",  
        "type": "normal",  
        "contexts": ['selection'],  
		"id":"PixivMagicNumber",
        "parentId": parent
    });
	
	var searchPixiv = chrome.contextMenus.create({  
        "title": "Pixiv搜尋"+" ["+"%s"+"]",  
        "type": "normal",  
        "contexts": ['selection'],  
		"id":"searchPixiv",
        "parentId": parent
    });
	
	
	var randomNH = chrome.contextMenus.create({  
        "title": "N站隨機推薦",  
        "type": "normal",  
        "contexts": ['all'],  
		"id":"randomNH",
        "parentId": parent
    });  

	var searchEX = chrome.contextMenus.create({  
        "title": "EXHentai(裏)搜尋"+" ["+"%s"+"]",  
        "type": "normal",  
        "contexts": ['selection'],  
		"id":"searchEX",
        "parentId": parent
    });
	
	var searchEH = chrome.contextMenus.create({  
        "title": "E-Hentai(表)搜尋"+" ["+"%s"+"]",  
        "type": "normal",  
        "contexts": ['selection'],  
		"id":"searchEH",
        "parentId": parent
    });
	
	
	var searchNH = chrome.contextMenus.create({  
        "title": "NHentai搜尋"+" ["+"%s"+"]",  
        "type": "normal",  
        "contexts": ['selection'],  
		"id":"searchNH",
        "parentId": parent
    });
    var settingpage = chrome.contextMenus.create({  
        "title": "Nhentai2Panda設定",  
        "type": "normal",  
        "contexts": ['all'],
		"id":"settingpage",
        "parentId": parent
    });  
    // 使用chrome.contextMenus.create的方法回傳值是項目的id  
    console.log(parent);
	
	
     
    // 使用chrome.contextMenus.create的方法回傳值是項目的id  
    console.log(parent);
	
}  


chrome.contextMenus.onClicked.addListener(function(info,tab) {  
    console.log("id: %s, selection: %s, url: %s",info.menuItemId,info.selectionText,tab.url);  
	switch (info.menuItemId) {
		case "imageSearchSauceNAO":
			handleImageURLSauceNAO(info.srcUrl);
		break;
		case "imageSearchGoogle":
			handleImageURLGoogle(info.srcUrl);
		break;
		case "CopyNum":
			COPYNUM(info.pageUrl);
		break;
		case "NHMagicNumber":
			NHMagicNumberSearch(info.selectionText);
		break;
		case "PixivMagicNumber":
			PixivNumberSearch(info.selectionText);
		break;
		case "searchPixiv":
			genericOnPixivSearch(info.selectionText);
		break;
		case "randomNH":
			chrome.tabs.create({ "url":'https://nhentai.net/random/'}); 
		break;
		case "searchEX":
			genericOnEXSearch(info.selectionText);
		break;
		case "searchEH":
			genericOnEHSearch(info.selectionText);
		break;
		case "searchNH":
			genericOnNHSearch(info.selectionText);
		break;
		case "settingpage":
			chrome.runtime.openOptionsPage();
		break;
		default:
        //當 expression 的值都不符合上述條件
        //要執行的陳述句
		break;
}
	
});