chrome.contextMenus.onClicked.addListener(function(info,tab) {  
    console.log("id: %s, selection: %s, url: %s",info.menuItemId,info.selectionText,tab.url);  
	
});
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


function genericOnClick(info) {  
    console.log(  
        "ID是：" + info.menuItemId + "\n" +  
        "現在的網址是：" + info.pageUrl + "\n" +  
        "選取的文字是：" + (info.selectionText ? info.selectionText : "") + "\n" +  
        "現在hover元素的圖片來源：" + (info.srcUrl ? info.srcUrl : "") + "\n" +  
        "現在hover的連結：" + (info.linkUrl ? info.linkUrl : "") + "\n" +  
        "現在hover的frame是：" + (info.frameUrl ? info.frameUrl : "") + "\n"  
    );  
	
} 
function genericOnNHSearch(info, tab) {  
chrome.tabs.create({ "url":'https://nhentai.net/search/?q='+ (info.selectionText ? info.selectionText : "") }); 
	
	
	
}  

function NHMagicNumberSearch(info, tab) {  
	if(/^[0-9]*$/.test((info.selectionText ? info.selectionText : ""))){
	chrome.tabs.create({ "url":'https://nhentai.net/g/'+ (info.selectionText ? info.selectionText : "")}); 	
console.log("true");
	}
	else{
		chrome.notifications.create("", notificationNotNumber);
	}
}

function PixivNumberSearch(info, tab) {  
	if(/^[0-9]*$/.test((info.selectionText ? info.selectionText : ""))){
	chrome.tabs.create({ "url":'https://www.pixiv.net/artworks/'+ (info.selectionText ? info.selectionText : "")}); 	
console.log("true");
	}
	else{
		chrome.notifications.create("", notificationNotNumber);
	}
}



function COPYNUM(url) {  
	if(url.search("nhentai.net/g/") != -1){
	const input = document.createElement("input");
	input.style.position = "fixed";
    input.style.opacity = 0;
	input.value = url.substring(22,28);
  //选择当前对象
document.body.appendChild(input);
input.select();
   document.execCommand("Copy");
   var notificationCopyOK = {
    type: "basic",
    iconUrl: "icon.png",
    title: "複製完成:",
    message: input.value
	};
    chrome.notifications.create("", notificationCopyOK);
  document.body.removeChild(input);
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
	chrome.tabs.create({ "url":'http://www.google.com/searchbyimage?image_url='+ encodeURIComponent(url) });
}


function genericOnPixivSearch(info, tab) {  
	chrome.tabs.create({ "url":'https://www.pixiv.net/tags/'+ (info.selectionText ? info.selectionText : "") + '/artworks?s_mode=s_tc'});
}  

function genericOnEXSearch(info, tab) {  
	chrome.tabs.create({ "url":'https://exhentai.org/?f_search='+ (info.selectionText ? info.selectionText : "") });
}  
function genericOnEHSearch(info, tab) {  
	chrome.tabs.create({ "url":'https://e-hentai.org/?f_search='+ (info.selectionText ? info.selectionText : "") });
}  



function createMenus() {  
	
	var parent = chrome.contextMenus.create({  
        title: "NHentai2Panda快速選項",  
        contexts: ['all'],      
        onclick:genericOnClick
    });  
	var imageSearchSauceNAO = chrome.contextMenus.create({  
	title: "尋找來源(Sauce NAO)",
    contexts:["image"],
	"parentId": parent, 
    onclick: function(info) {
        handleImageURLSauceNAO(info.srcUrl)
    }
	});
	
	var imageSearchGoogle = chrome.contextMenus.create({  
	title: "尋找來源(Google以圖搜圖)",
    contexts:["image"],
	"parentId": parent, 
    onclick: function(info) {
        handleImageURLGoogle(info.srcUrl)
    }
	});
	var CopyNum = chrome.contextMenus.create({  
	title: "複製6位數字",
    contexts:["all"],
	"parentId": parent, 
    onclick: function(info) {
        COPYNUM(info.pageUrl)
    }
	});
	
	
	

	
	
	
	var NHMagicNumber = chrome.contextMenus.create({  
        "title": "NHentai6位數"+" ["+"%s"+"]",  
        "type": "normal",  
        "contexts": ['selection'],  
        "parentId": parent,  
        "onclick":NHMagicNumberSearch
    });
	
	var NHMagicNumber = chrome.contextMenus.create({  
        "title": "Pixiv ID"+" ["+"%s"+"]",  
        "type": "normal",  
        "contexts": ['selection'],  
        "parentId": parent,  
        "onclick":PixivNumberSearch
    });
	
	var searchEX = chrome.contextMenus.create({  
        "title": "Pixiv搜尋"+" ["+"%s"+"]",  
        "type": "normal",  
        "contexts": ['selection'],  
        "parentId": parent,  
        "onclick":genericOnPixivSearch
    });
	
	
	var randomNH = chrome.contextMenus.create({  
        "title": "N站隨機推薦",  
        "type": "normal",  
        "contexts": ['all'],  
        "parentId": parent,  
        "onclick": function(){
			chrome.tabs.create({ "url":'https://nhentai.net/random/'}); 
			}
    });  

	var searchEX = chrome.contextMenus.create({  
        "title": "EXHentai(裏)搜尋"+" ["+"%s"+"]",  
        "type": "normal",  
        "contexts": ['selection'],  
        "parentId": parent,  
        "onclick":genericOnEXSearch
    });
	
	var searchEH = chrome.contextMenus.create({  
        "title": "E-Hentai(表)搜尋"+" ["+"%s"+"]",  
        "type": "normal",  
        "contexts": ['selection'],  
        "parentId": parent,  
        "onclick":genericOnEHSearch
    });
	
	
	var searchNH = chrome.contextMenus.create({  
        "title": "NHentai搜尋"+" ["+"%s"+"]",  
        "type": "normal",  
        "contexts": ['selection'],  
        "parentId": parent,  
        "onclick":genericOnNHSearch
    });
    var settingpage = chrome.contextMenus.create({  
        "title": "Nhentai2Panda設定",  
        "type": "normal",  
        "contexts": ['all'],  
        "parentId": parent,  
        "onclick": function(){
	if (chrome.runtime.openOptionsPage) { // New way to open options pages, if supported (Chrome 42+).
        chrome.runtime.openOptionsPage();
    } else { // Reasonable fallback.
        window.open(chrome.runtime.getURL('options.html'));
    }
}
    });  
    // 使用chrome.contextMenus.create的方法回傳值是項目的id  
    console.log(parent);
	
	
     
    // 使用chrome.contextMenus.create的方法回傳值是項目的id  
    console.log(parent);
	
}  


createMenus();  