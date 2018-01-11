var index = new Vue({
    el: '#app',
    data: function () {
        return {
            message: 'Hello Vue!',
            webCounter: {},
            titleArray: ['全部', '常用', '收藏', '禁用'],
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
            if (this.currentIndex === 0) {
                return data;
            } else if (this.currentIndex === 1) {
                //常用，通过浏览次数排序
                return data.sort((key1, key2) => {
                    return this.webCounter[key2].count - this.webCounter[key1].count;
                });
            } else if (this.currentIndex === 2) {
                // 收藏，通过收藏按钮来记录
                let result = [];
                data.forEach((key) => {
                    if (this.webCounter[key].isStar) {
                        result.push(key);
                    }
                });
                return result;

            } else if (this.currentIndex === 3) {
                //禁用，通过禁用按钮来记录
                let result = [];
                data.forEach((key) => {
                    if (this.webCounter[key].isForbid) {
                        result.push(key);
                    }
                });
                return result;
            }

        },
    },
    methods: {
        forbidText: function (key) {
            return this.webCounter[key].isForbid ? '已禁用' : '禁用';
        },
        starText: function (key) {
            return this.webCounter[key].isStar ? '已收藏' : '收藏';
        },
        showTitle: function (index) {
            this.currentIndex = index;
        },
        isTitleActive: function (index) {
            if (index === this.currentIndex) {
                return "is-active";
            }
            return "";
        },
        clearAll: function () {
            this.webSiteList = [];
        },
        rightBtnClick: function (key) {

        },
        forbid: function (key) {
            this.webCounter[key].isForbid = !this.webCounter[key].isForbid ;
            chrome.storage.sync.set({"webCounter": this.webCounter}, ()=> {
                console.log("forbid sucess " + key + "- "+ this.webCounter[key].isForbid);
            });
        },
        star: function (key) {
            this.webCounter[key].isStar = !this.webCounter[key].isStar;
            chrome.storage.sync.set({"webCounter": this.webCounter}, () => {
                console.log("star sucess " + key + "- "+ this.webCounter[key].isStar);
            });
        },
        goToWeb: function (key) {
            window.open(this.webCounter[key].url);

        }
    }
});