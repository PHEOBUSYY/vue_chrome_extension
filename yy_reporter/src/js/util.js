export default {
    getUrlObject: function (href) {
        let l = document.createElement("a");
        l.href = href;
        return l;
    }
}