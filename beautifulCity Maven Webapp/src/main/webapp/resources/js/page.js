$.extend({
    // ajax分页
    page: function(options) {
        var defaults = {
            'visiblePages': 6 // 可见页码(不能小于4)
        };
        var opts = $.extend({}, defaults, options);
        var curPage = opts.curPage;
        // 创建分页列表
        function createPageList(curPage) {
            var li = '<li class="zh-prev"><a><span class="zh-icon-prev"></span></a></li>';
            if(opts.totalPages <= opts.visiblePages) { // 总页数<=可见页
                for(var i=1; i<=opts.totalPages; i++) {
                    if(curPage == i) {
                        li += '<li class="zh-cur"><a>'+i+'</a></li>';
                    } else {
                        li += '<li><a>'+i+'</a></li>';
                    }
                }
            } else { // 总页数>可见页
                if(curPage < opts.visiblePages-1) { // 当前页<可见页-1
                    for(var i=1; i<=opts.visiblePages-1; i++) {
                        if(curPage == i) {
                            li += '<li class="zh-cur"><a>'+i+'</a></li>';
                        } else {
                            li += '<li><a>'+i+'</a></li>';
                        }
                    }
                    li += '<li class="zh-ellipsis">...</li>';
                    li += '<li><a>'+opts.totalPages+'</a></li>';
                } else if(curPage >= opts.visiblePages-1) {  // 当前页>=可见页-1
                    if(opts.totalPages-curPage <= opts.visiblePages-4) { // 能连到结束
                        li += '<li><a>1</a></li>';
                        li += '<li class="zh-ellipsis">...</li>';
                        for(var i=opts.totalPages-(opts.visiblePages-2); i<=opts.totalPages; i++) {
                            if(curPage == i) {
                                li += '<li class="zh-cur"><a>'+i+'</a></li>';
                            } else {
                                li += '<li><a>'+i+'</a></li>';
                            }
                        }
                    } else { // 不能连到结束
                        li += '<li><a>1</a></li>';
                        li += '<li class="zh-ellipsis">...</li>';
                        for(var i=curPage-(opts.visiblePages-4); i<=curPage+1; i++) {
                            if(curPage == i) {
                                li += '<li class="zh-cur"><a>'+i+'</a></li>';
                            } else {
                                li += '<li><a>'+i+'</a></li>';
                            }
                        }
                        li += '<li class="zh-ellipsis">...</li>';
                        li += '<li><a>'+opts.totalPages+'</a></li>';
                    }
                }
            }
            li += '<li class="zh-next"><a><span class="zh-icon-next"></span></a></li>';
            li += '<li class="zh-total">共'+opts.totalPages+'页</li>';
            $(opts.ele).html(li);
        }
        createPageList(curPage);
        // 点击页码
        $(opts.ele).off('click');
        $(opts.ele).on('click', 'li:not(.zh-prev, .zh-next, .zh-total, .zh-ellipsis)', function() {
            curPage = +$(this).text();
            $(this).addClass('zh-cur').siblings().removeClass('zh-cur');
            createPageList(curPage);
            if(opts.change && typeof opts.change === 'function') {
                opts.change.call(null, curPage);
            }
        });
        // 点击前一页
        $(opts.ele).on('click', '.zh-prev', function() {
            curPage = +$(opts.ele).children('.zh-cur').text();
            curPage--;
            if(curPage < 1) return;
            createPageList(curPage);
            if(opts.change && typeof opts.change === 'function') {
                opts.change.call(null, curPage);
            }
        });
        // 点击后一页
        $(opts.ele).on('click', '.zh-next', function() {
            curPage = +$(opts.ele).children('.zh-cur').text();
            curPage++;
            if(curPage > opts.totalPages) return;
            createPageList(curPage);
            if(opts.change && typeof opts.change === 'function') {
                opts.change.call(null, curPage);
            }
        });
    }
});