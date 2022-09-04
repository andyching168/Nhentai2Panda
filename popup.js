var Title
var NUM
var Url
src="JQuery.js"
var t=document.getElementById("TitleBar")
var manifestData = chrome.runtime.getManifest();
VersionText.innerText='版本號:'+manifestData.version;



chrome.tabs.getSelected(null, function(tab) {
    
	
	
	
	chrome.tabs.sendRequest(tab.id, {method: "getTitle"}, function(response) {
        if(response.method=="getTitle"){
            Title = response.data;
			console.log(Title);
			
			t.value=Title
			t.onfocus=t.select()
        }
    });
	
	
	chrome.tabs.sendRequest(tab.id, {method: "getUrl"}, function(response) {
        if(response.method=="getUrl"){
            Url = response.data;
			console.log(Url);
			if(Url.search("www.pixiv.net/artworks/") != -1)
			{
				PixivID=Url.substring(31);
				t.value=Title + ' | Pixiv artworks ' + PixivID;
			}
        }
    });
	
	
	
});
copyTitle.onclick = function(){
	var obj = document.getElementById("TitleBar");
  //选择当前对象
  document.getElementById("copyTitle").value="複製成功";
  obj.select(); 
  try{
    //进行复制到剪切板
    if(document.execCommand("Copy","false",null)){
      //如果复制成功
      document.getElementById("copyTitle").value="複製成功";

	  
	  setTimeout(function() {
            copyTitle.value="複製標題";
        },1250);
    }else{
      //如果复制失败
      alert("複製失敗");
    }
  }catch(err){
    //如果报错
    alert("複製錯誤")
  }
}


EXsearch.onclick = function(){

	chrome.tabs.create({ "url":'https://exhentai.org/?f_search='+ t.value }); 
}
EHsearch.onclick = function(){

	chrome.tabs.create({ "url":'https://e-hentai.org/?f_search='+ t.value }); 
}
NHenNum.onclick = function(){
	chrome.tabs.create({ "url":'https://nhentai.net/g/'+ t.value }); 
}

NHsearch.onclick = function(){
	chrome.tabs.create({ "url":'https://nhentai.net/search/?q='+ t.value }); 
}

PIXIVsearch.onclick = function(){
	chrome.tabs.create({ "url":'https://www.pixiv.net/tags/'+ t.value + '/artworks?s_mode=s_tc'}); 
}


RandomNH.onclick = function(){
	chrome.tabs.create({ "url":'https://nhentai.net/random/'}); 
}
Setting.onclick = function(){
	if (chrome.runtime.openOptionsPage) { // New way to open options pages, if supported (Chrome 42+).
        chrome.runtime.openOptionsPage();
    } else { // Reasonable fallback.
        window.open(chrome.runtime.getURL('options.html'));
    }
}


