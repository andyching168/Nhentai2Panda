src="JQuery.js"
var Title
var NHTitle
var EXTitle
var PixivTitle
var NUM
var Url






function restore_options() {
    //利用get設定預設值並，無值即取得預設置，有值則使用之前儲存的值
    chrome.storage.sync.get({
        NHTitleLang: 'NH_ENG',
		EXTitleLang: 'EX_ENG'
    }, function(items) {
        NHTitle = items.NHTitleLang;
		EXTitle = items.EXTitleLang;
    });
}



chrome.runtime.onMessage.addListener(
function(message, sender, sendResponse) {
	
        if(message.method == "getTitle"){
			
			
			if ( document.URL.search("nhentai.net/g/") != -1 ) {
				if(NHTitle=='NH_ENG')
				{
					Title =document.getElementById("info").getElementsByTagName("h1").item(0).innerText;
				}
				if(NHTitle=='NH_JPN')
				{
					Title =document.getElementById("info").getElementsByTagName("h2").item(0).innerText;
				}
				sendResponse({data:Title, method:"getTitle"});
				} 

			if ( document.URL.search("exhentai.org/") != -1 ) {
				
				if(EXTitle=='EX_ENG')
				{
					Title =document.getElementById("gn").innerText;
				}
				if(EXTitle=='EX_JPN')
				{
					Title =document.getElementById("gj").innerText;
				}
				
				sendResponse({data:Title, method:"getTitle"});
			}
			if ( document.URL.search("e-hentai.org/") != -1 ) {
				
				if(EXTitle=='EX_ENG')
				{
					Title =document.getElementById("gn").innerText;
				}
				if(EXTitle=='EX_JPN')
				{
					Title =document.getElementById("gj").innerText;
				}
				
				sendResponse({data:Title, method:"getTitle"});
			}
			
			if ( document.URL.search("pixiv.net/artworks/") != -1 ) {
				Title =document.getElementById("root").children[2].children[0].children[0].children[0].children[0].children[0].children[0].children[6].children[0].children[0].children[2].innerText;
				sendResponse({data:Title, method:"getTitle"});
			}
			
		}
            if(message.method == "getUrl"){
				Url = document.baseURI;
				sendResponse({data:Url, method:"getUrl"});
				
			}
			if(message.method == "CopyText"){
				copyToTheClipboard(message.textToCopy);
				sendResponse({data:"OK", method:"CopyText"});
			}
			
			
			
        }
);

async function copyToTheClipboard(textToCopy){
    const el = document.createElement('textarea');
    el.value = textToCopy;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}







const searchTitle = () => {
	
}

const onMessage = (message) => {
  switch (message.action) {
    case 'SEARCH':
      searchTitle();
      break;
    default:
      break;
  }
}
restore_options();
chrome.runtime.onMessage.addListener(onMessage);