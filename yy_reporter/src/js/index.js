var index = new Vue({
    el: '#app',
    data: function () {
        return {
            message: 'Hello Vue!',
            webCounter: {},
            titleArray: ['全部','常用','收藏','禁用'],
            currentIndex: 0,
        }
    },
    created: function () {
        console.log("index.js init");
        chrome.storage.sync.get('webCounter', (obj) => {
            //这里存的是所有的浏览记录
            this.webCounter = obj.webCounter;
            console.log(this.webCounter)
            // drawWebSite(obj.webCounter);
        });
    },
    computed: {
        webSiteList: function () {
            let data = Object.keys(this.webCounter);
            if(this.currentIndex === 0){
                return  data;
            }else if(this.currentIndex === 1) {
                //常用，通过浏览次数排序
                return data.sort((key1, key2) =>{
                    return this.webCounter[key2].count - this.webCounter[key1].count;
                });
            }else if(this.currentIndex === 2) {
               // 收藏，通过收藏按钮来记录
                let result = [];
                data.forEach((key) => {
                    if(this.webCounter[key].isStar){
                        result.push(key);
                    }
                });
                return result;

            }else if(this.currentIndex === 3) {
               //禁用，通过禁用按钮来记录
                let result = [];
                data.forEach((key) => {
                    if(this.webCounter[key].isForbid){
                        result.push(key);
                    }
                });
                return result;
            }

        }
    },
    methods: {
        showTitle: function (index) {
            this.currentIndex = index;
        },
        isTitleActive: function (index) {
            if(index === this.currentIndex) {
                return "is-active";
            }
            return "";
        },
        clearAll: function () {
            this.webSiteList = [];
        },
        drawWebSite: function (obj) {
            let li = document.getElementById("list");
            if (!obj || !Object.keys(obj)) {
                while (li.hasChildNodes())
                    //当div下还存在子节点时 循环继续
                {
                    li.removeChild(li.firstChild);
                }
            } else {
                Object.keys(obj).forEach(function (key) {

                    let el1 = document.createElement('a');
                    el1.className = "panel-block";
                    el1.innerHTML = "<figure class='image is-16x16'><img src=" + obj[key].icon + "></figure><span style='margin-left: 5px'>" + key + "</span>";
                    // el1.innerHTML = " <span class='panel-icon'><i class='fa fa-home'></i></span> " + key;
                    el1.addEventListener("click", function () {
                        window.open(obj[key].url);
                    });
                    li.appendChild(el1);
                });
            }
        }

    }
});