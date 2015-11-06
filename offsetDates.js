gsDate = (function() {
    var _currDate = new Date(),
        _startDate = new Date(),
        _endDate = new Date(),
        userFormat = false,
        init = function() {},
        setCurrentDate = function() {
            _currDate = new Date();
            return this;
        },
        setFormat = function(newFormat) {
            userFormat = true;
            return this;
        },
        returnDates = function() {
            var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                shortMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
            if (userFormat) {
                _startDate = _startDate.getDate()+'-'+shortMonths[_startDate.getMonth()]+'-'+_startDate.getFullYear();
                _endDate = _endDate.getDate()+'-'+shortMonths[_endDate.getMonth()]+'-'+_endDate.getFullYear();
            }

            return {
                startDate:_startDate,
                endDate:_endDate
            };
        },
        /*
        / Weeks
        */
        ddWeek = function( weeksOffset ) {
            return offddWeek(weeksOffset);
        },
        offddWeek = function( weeksOffset ) {
            if (weeksOffset == undefined  || typeof weeksOffset != 'number') {
                weeksOffset = 0;
            }
            var dateOne = new Date(),
                dateTwo = new Date(),
                mondayDaysOffset = [6,0,1,2,3,4,5],
                sundayDaysOffset = [0,6,5,4,3,2,1],
                tmpTimeStamp = _currDate.valueOf(),
                daysToSubstract = mondayDaysOffset[_currDate.getDay()],
                daysToAdd = sundayDaysOffset[_currDate.getDay()];

            dateOne.setTime( tmpTimeStamp - daysToSubstract*86400000 + 7*weeksOffset*86400000 );
            dateTwo.setTime( tmpTimeStamp + daysToAdd*86400000 + 7*weeksOffset*86400000);
            dateOne.setHours(0);
            dateOne.setMinutes(0);
            dateOne.setSeconds(0);
            dateTwo.setHours(23);
            dateTwo.setMinutes(59);
            dateTwo.setSeconds(59);

            _startDate = dateOne;
            _endDate = dateTwo;

            return returnDates();
        },
        /*
        / Months
        */
        ddMonth = function() {
            return offddMonth(0);
        },
        offddMonth = function( monthsOffset ) {
            if (monthsOffset == undefined || typeof monthsOffset != 'number') {
                monthsOffset = 0;
            }
            _startDate = new Date(_currDate.getFullYear(), _currDate.getMonth()+(monthsOffset), 1, 0, 0, 0);
            _endDate = new Date(_currDate.getFullYear(), _currDate.getMonth()+(monthsOffset)+1, 0, 23, 59, 59);
            return returnDates();
        },
        /*
        / Years
        */
        ddYear = function() {
            return offddYear(0);
        },
        yearToDate = function() {
            _startDate = new Date(_currDate.getFullYear(), 0, 1, 0, 0, 0);
            _endDate = new Date(_currDate.getFullYear(), _currDate.getMonth(), _currDate.getDate(), 23, 59, 59);
            return returnDates();
        },
        offddYear = function( yearsOffset ) {
            if (yearsOffset == undefined || typeof yearsOffset != 'number') {
                yearsOffset = 0;
            }
            _startDate = new Date(_currDate.getFullYear()+(yearsOffset), 0, 1, 0, 0, 0);
            _endDate = new Date(_currDate.getFullYear()+(yearsOffset), 11, 31, 23, 59, 59);
            return returnDates();  
        }
        ddQuarter = function( quartersOffset ) {
            var quarterMonth = Math.floor(_currDate.getMonth()/3) * 3;
            if (quartersOffset == undefined || typeof quartersOffset != 'number') {
                quartersOffset = 0;
            }
            _startDate = new Date(_currDate.getFullYear(), quarterMonth+(quartersOffset*3), 1, 0, 0, 0);
            _endDate = new Date(_currDate.getFullYear(), quarterMonth+3+(quartersOffset*3), 0, 23, 59, 59);

            return returnDates();
        },
        offddQuarter = function(quartersOffset) {
            return ddQuarter(quartersOffset);
        },
        last4Qtr = function() {
            var quarterMonth = Math.floor(_currDate.getMonth()/3) * 3;
            _startDate = new Date(_currDate.getFullYear(), quarterMonth-9, 1, 0, 0, 0);
            _endDate = new Date(_currDate.getFullYear(), quarterMonth+3, 0, 23, 59, 59);
            return returnDates();
        };

    return {
        format: setFormat,
        setDate: setCurrentDate,
        currentWeek: ddWeek,
        currentMonth: ddMonth,
        currentYear: ddYear,
        currentQuarter: ddQuarter,
        yearToDate: yearToDate,
        offsetWeeks: offddWeek,
        offsetMonths: offddMonth,
        offsetYears: offddYear,
        offsetQuarters: offddQuarter,
        last4Quarters: last4Qtr
    }
})();