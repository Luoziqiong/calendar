(function () {
    /*用于记录日期显示的时候，根据dateObj中的日期的年月显示*/
    var dateObj = ({
        _date: new Date(),

        getDate: function () {
            return this._date;
        },
        setDate: function (date) {
            this._date = date;
        }

    });
    //设置calendar div中的HTML部分
    renderHtml();
    //表格中显示日期
    showCalendarData();
    //绑定事件
    bindEvent();
    /**
     * 渲染html结构
     */
    function renderHtml() {
        var calendar = document.getElementById("calendar");
        var titleBox = document.createElement("div");
        var bodyBox = document.createElement("div");

        //设置标题盒子中的html
        titleBox.className = 'calendar-title-box';
        titleBox.innerHTML = "<span class='prev-month' id='prevMonth'></span>" +
            "<span class='calendar-title' id='calendarTitle'></span>" +
            "<span class='next-month' id='nextMonth'></span>";
        calendar.appendChild(titleBox);

        //设置表格区的HTML
        bodyBox.className = "calendar-body-box";
        var _headHtml = "<tr>" +
            "<th>日</th>" +
            "<th>一</th>" +
            "<th>二</th>" +
            "<th>三</th>" +
            "<th>四</th>" +
            "<th>五</th>" +
            "<th>六</th>" +
            "</tr>";
        var _bodyHtml = "";

        //一个月最多31天，所以一个月最多占6行表格
        for (var i = 0; i < 6; i++) {
            _bodyHtml += "<tr>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "</tr>"
        }
        bodyBox.innerHTML = "<table class='calendar-table' id='calendarTable' >" +
            _headHtml + _bodyHtml + "</table>";
        //添加到div中
        calendar.appendChild(bodyBox);
    }
    /**
     * 表格中显示数据，并设置类名
     */
    function showCalendarData() {
        var _year = dateObj.getDate().getFullYear();
        var _month = dateObj.getDate().getMonth();
        var _dateStr = getDateStr(dateObj.getDate());
        //设置顶部标题栏中年月日信息
        var calendarTitle = document.getElementById('calendarTitle');
        var titleStr = _dateStr.substr(0, 4) + "年" + _dateStr.substr(4, 2) + "月";
        calendarTitle.innerText = titleStr;

        //设置表格中的日期数据
        var _table = document.getElementById('calendarTable');
        var _tds = document.getElementsByTagName("td");
        var _firstDay = new Date(_year, _month, 1);
        for (var i = 0; i < _tds.length; i++) {
            var _thisDay = new Date(_year, _month, i + 1 - _firstDay.getDay());
            var _thisDayStr = getDateStr(_thisDay);
            _tds[i].innerText = _thisDay.getDate();
            _tds[i].data = _dateStr;
            if (_thisDayStr == getDateStr(new Date())) {
                _tds[i].className = 'currentDay';
            } else if (_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
                _tds[i].className = 'currentMonth';
            } else {
                _tds[i].className = 'otherMonth';
            }
        }
    }
    /**
     * 绑定上个月下个月事件
     */
    function bindEvent() {
        var prevMonth = document.getElementById("prevMonth");
        var nextMonth = document.getElementById("nextMonth");
        addEvent(prevMonth, 'click', toPrevMonth);
        addEvent(nextMonth, 'click', toNextMonth);
    }
    /**
     * 绑定事件
     */
    function addEvent(dom, eType, func) {
        if (dom.addEventListener) {//DOM2.0
            dom.addEventListener(eType, function (e) {
                func(e);
            });
        } else if (dom.attachEvent) {//IE5+
            dom.attachEvent('on' + eType, function (e) {
                func(e);
            });
        } else {//DOM 0
            dom['on' + eType] = function (e) {
                func(e);
            }
        }
    }
    /**
     * 点击上个月图标触发
     */
    function toPrevMonth() {
        var date = dateObj.getDate();
        dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        showCalendarData();
    }
    /**
     * 点击下个月图标触发
     */
    function toNextMonth() {
        var date = dateObj.getDate();
        dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
        showCalendarData();

    }
    /**
     * 日期转化为字符串xxxx年xx月xx日
     */
    function getDateStr(date) {
        var _year = date.getFullYear();
        var _month = date.getMonth()+1;
        var _d = date.getDate();
        _month = (_month > 9) ? ("" + _month) : ("0" + _month);
        _d = (_d > 9) ? ("" + _d) : ("0" + _d);
        return _year + _month + _d;
    }
})();