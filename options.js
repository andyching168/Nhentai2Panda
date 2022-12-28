//將設置用chrome.storage.sync儲存
function save_options() {
    var NH_TitleLang = document.getElementById('NHTitleLang').value;
	var EX_TitleLang = document.getElementById('EXTitleLang').value;
    chrome.storage.sync.set({
        NHTitleLang: NH_TitleLang,
		EXTitleLang: EX_TitleLang,
    }, function() {
        //提供儲存成功的提示
        document.getElementById('status').style.display="";
        setTimeout(function() {
            document.getElementById('status').style.display="none";//隱藏
        }, 2000);
    });
}

// 將設定調整為預設值的功能
function restore_options() {
    //利用get設定預設值並，無值即取得預設置，有值則使用之前儲存的值
    chrome.storage.sync.get({
        NHTitleLang: 'NH_ENG',
		EXTitleLang: 'EX_ENG'
    }, function(items) {
        document.getElementById('NHTitleLang').value = items.NHTitleLang;
		document.getElementById('EXTitleLang').value = items.EXTitleLang;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('status').style.display="none";//隱藏