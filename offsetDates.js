gsDate = (function() {
    var _currDate,
        _startDate,
        _endDate,
        _range,
        _userFormat = false,
        init = function() {
            _currDate = new Date();
            _startDate = _currDate;
            _endDate = _currDate;
            _range = false;
        },
        getDate = function() {
            return _currDate.toString();
        },
        setDate = function( customDate ) {
            if ( customDate == undefined ) {
                _currDate = new Date();
            } else {
                _currDate = _setCustomDate(customDate);
            }
            return this;
        },
        // todo: validate date string
        _setCustomDate = function( customDate ) {
            return this;
        },
        setRange = function() {
            _startDate = _currDate;
            _endDate = _currDate;
            _range = true;
            return this;
        },
        setSingle = function() {
            _theDate = _currDate;
            _range = false;
            return this;
        },
        returnFnc = function( format ) {
            console.log('---------------------------');
            var goAndFly = '',
                months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
                shortMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
            
            console.log('format',format);
            if ( format ) {
                _startDate = _startDate.getDate()+'-'+shortMonths[_startDate.getMonth()]+'-'+_startDate.getFullYear();
                _endDate = _endDate.getDate()+'-'+shortMonths[_endDate.getMonth()]+'-'+_endDate.getFullYear();
            }

            goAndFly = _startDate;
            console.log('range',_range);
            if ( _range ) {
                goAndFly = {startDate:_startDate, endDate:_endDate};
            }

            return goAndFly;
        },
        offset = function( ammount, timeType ) {
            if (ammount == undefined  || typeof ammount != 'number') {
                throw new _NaNException();
            }

            switch(timeType) {
                case 'miliseconds':
                    break;
                case 'seconds':
                    break;
                case 'minutes':
                    break;
                case 'hours':
                    break;
                case 'days':
                    break;
                case 'weeks':
                    _offddWeek(ammount);
                    break;
                case 'months':
                    _offddMonth(ammount);
                    break;
                case 'years':
                    break;
                case 'quarters':
                    break;
                default:
                    break;
            }
            return this;
        },
        /*
        / Weeks
        */
        beginOfWeek = function() {
            
        },
        _offddWeek = function( weeksOffset ) {
            console.log("startDate",_startDate);
            console.log("endDate",_endDate);

            var tmpStartDate = new Date(),
                tmpTimeStamp = _startDate.valueOf();
            tmpStartDate.setTime( tmpTimeStamp + 7*weeksOffset*86400000 );
            _startDate = tmpStartDate;

            tmpTimeStamp = _endDate.valueOf();
            tmpStartDate.setTime( tmpTimeStamp + 7*weeksOffset*86400000 );
            _endDate = tmpStartDate;

            return this;

        //     var dateOne = new Date(),
        //         dateTwo = new Date(),
        //         mondayDaysOffset = [6,0,1,2,3,4,5],
        //         sundayDaysOffset = [0,6,5,4,3,2,1],
        //         tmpTimeStamp = _currDate.valueOf(),
        //         daysToSubstract = mondayDaysOffset[_currDate.getDay()],
        //         daysToAdd = sundayDaysOffset[_currDate.getDay()];

        //     dateOne.setTime( tmpTimeStamp - daysToSubstract*86400000 + 7*weeksOffset*86400000 );
        //     dateTwo.setTime( tmpTimeStamp + daysToAdd*86400000 + 7*weeksOffset*86400000);
        //     dateOne.setHours(0);
        //     dateOne.setMinutes(0);
        //     dateOne.setSeconds(0);
        //     dateTwo.setHours(23);
        //     dateTwo.setMinutes(59);
        //     dateTwo.setSeconds(59);

        //     _startDate = dateOne;
        //     _endDate = dateTwo;
        //     return this;
        },
        /*
        / Months
        */
        _offddMonth = function( monthsOffset ) {
            if (monthsOffset == undefined || typeof monthsOffset != 'number') {
                monthsOffset = 0;
            }
            _startDate = new Date(_currDate.getFullYear(), _currDate.getMonth()+(monthsOffset), 1, 0, 0, 0);
            _endDate = new Date(_currDate.getFullYear(), _currDate.getMonth()+(monthsOffset)+1, 0, 23, 59, 59);
            return this;
        },
        /*
        / Years
        */
        _yearToDate = function() {
            _startDate = new Date(_currDate.getFullYear(), 0, 1, 0, 0, 0);
            _endDate = new Date(_currDate.getFullYear(), _currDate.getMonth(), _currDate.getDate(), 23, 59, 59);
            return this;
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
        },
        _NaNException = function(message) {
            this.message = 'Amount provided is not of the expected type (NaN)';
            this.name = "VariableType_Exception";
            this.toString = function() {
                return this.name+": "+this.message;
            }
        };
        init();

    return {
        // 1st section: definition
        range: setRange,
        single: setSingle,
        // 2nd section: update
        setDate: setDate,
        startOn: function() {},
        endOn: function() {},
        offset: offset,
        // 3rd section: retrieve data
        getMiliseconds:function() {},
        getSeconds:function() {},
        getMinutes:function() {},
        getHours:function() {},
        getDays:function() {},
        getWeeks:function() {},
        getMonths:function() {},
        getYears:function() {},
        getQuarters:function() {},
        // 4th section: output data
        output: returnFnc,

        //TODO:
        // firstDay(),
        // lastDay(),
        // weekOfYear()
        // multiple dates
        // single date functions, just like week of year, bicentenary year, holidays
        
        // offsetWeek: ddWeek,
        // getCurrentMonth: ddMonth,
        // getCurrentYear: ddYear,
        // getCurrentQuarter: ddQuarter,
        // getYearToDate: yearToDate,
        // offsetWeeks: offddWeek,
        // offsetMonths: offddMonth,
        // offsetYears: offddYear,
        // offsetQuarters: offddQuarter,
        // last4Quarters: last4Qtr
    }
})();