// offsetdates.js
// js library to play with dates
// version - 0.1.11
// author - Alfredo Alonso
// license - MIT
gsDate = (function() {
    var _currDate,
        _startDate,
        _endDate,
        _range,
        _userFormat = false,
        _holidays,
        init = function() {
            _currDate = new Date();
            _startDate = new Date();
            _endDate = new Date();
            _range = false;
            _holidays = {
                us: [ [0, 1],[0, 19],[1, 16],[4, 25],[6, 4],[8, 7],[9, 12],[10, 11],[10, 26],[11, 25] ],
                mx: [ [0, 1],[1, 2],[1, 5],[2, 16],[2, 21],[4, 1],[8, 16],[10, 16],[10, 20],[11, 25] ]
            };
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
        setRange = function( period ) {
            var mondayDaysOffset = [6,0,1,2,3,4,5],
                sundayDaysOffset = [0,6,5,4,3,2,1],
                startTimeStamp = _startDate.valueOf(),
                endTimeStamp = _endDate.valueOf(),
                daysToSubstract = mondayDaysOffset[_startDate.getDay()],
                daysToAdd = sundayDaysOffset[_endDate.getDay()];

            switch(period) {
                case 'week':
                    _startDate.setTime( startTimeStamp - daysToSubstract*86400000 );
                    _endDate.setTime( endTimeStamp + daysToAdd*86400000 );
                    break;
                case 'month':
                    _startDate = new Date(_startDate.getFullYear(), _startDate.getMonth(), 1, _startDate.getHours(), _startDate.getMinutes(), _startDate.getSeconds());
                    _endDate = new Date(_endDate.getFullYear(), _endDate.getMonth()+1, 0, _endDate.getHours(), _endDate.getMinutes(), _endDate.getSeconds());
                    break;
                case 'year':
                    _startDate = new Date(_startDate.getFullYear(), 1, 1, _startDate.getHours(), _startDate.getMinutes(), _startDate.getSeconds());
                    _endDate = new Date(_endDate.getFullYear(), 11, 31, _endDate.getHours(), _endDate.getMinutes(), _endDate.getSeconds());
                    break;
                case 'yeartodate':
                    _startDate = new Date(_startDate.getFullYear(), 0, 1, _startDate.getHours(), _startDate.getMinutes(), _startDate.getSeconds());
                    _endDate = new Date(_endDate.getFullYear(), _endDate.getMonth(), _endDate.getDate(), _endDate.getHours(), _endDate.getMinutes(), _endDate.getSeconds());
                    break;
                case 'quarter':
                    var quarterMonth = Math.floor(_startDate.getMonth()/3) * 3;
                    _startDate = new Date(_startDate.getFullYear(), quarterMonth, 1, _startDate.getHours(), _startDate.getMinutes(), _startDate.getSeconds());
                    _endDate = new Date(_endDate.getFullYear(), quarterMonth+3, 0, _endDate.getHours(), _endDate.getMinutes(), _endDate.getSeconds());
                    // _startDate = new Date(_startDate.getFullYear(), 0, 1, _startDate.getHours(), _startDate.getMinutes(), _startDate.getSeconds());
                    // _endDate = new Date(_endDate.getFullYear(), _endDate.getMonth(), _endDate.getDate(), _endDate.getHours(), _endDate.getMinutes(), _endDate.getSeconds());
                    break;
                default:
                    _startDate = new Date();
                    _endDate = new Date();
                    break;
            }

            _range = true;
            return this;
        },
        setSingle = function() {
            _theDate = new Date();
            _range = false;
            return this;
        },
        bod = function( dateFlag ) {
            if (typeof(dateFlag) == 'undefined' || dateFlag == 'start') {
                _startDate.setHours(0);
                _startDate.setMinutes(0);
                _startDate.setSeconds(0);
                _startDate.setMilliseconds(0);
            } else if ( dateFlag == 'end' ) {
                _endDate.setHours(0);
                _endDate.setMinutes(0);
                _endDate.setSeconds(0);
                _endDate.setMilliseconds(0);
            }

            return this;
        },
        eod = function( dateFlag ) {
            if (typeof(dateFlag) == 'undefined' || dateFlag == 'start') {
                _startDate.setHours(23);
                _startDate.setMinutes(59);
                _startDate.setSeconds(59);
                _startDate.setMilliseconds(99);
            } else if ( dateFlag == 'end' ) {
                _endDate.setHours(23);
                _endDate.setMinutes(59);
                _endDate.setSeconds(59);
                _endDate.setMilliseconds(99);
            }

            return this;
        },
        returnFnc = function( format ) {
            var goAndFly = '',
                months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
                shortMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
            
            if ( format ) {
                _outStartDate = _startDate.getDate()+'-'+shortMonths[_startDate.getMonth()]+'-'+_startDate.getFullYear();
                _outEndDate = _endDate.getDate()+'-'+shortMonths[_endDate.getMonth()]+'-'+_endDate.getFullYear();
            } else {
                _outStartDate = _startDate;
                _outEndDate = _endDate;
            }

            goAndFly = _startDate;
            if ( _range ) {
                goAndFly = {startDate:_outStartDate, endDate:_outEndDate};
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
                    _offddYear(ammount);
                    break;
                case 'quarters':
                    _offddQuarter(ammount);
                    break;
                default:
                    break;
            }
            return this;
        },
        /*
        / Weeks
        */
        _offddWeek = function( weeksOffset ) {
            _startDate.setTime( _startDate.valueOf() + 7*Number(weeksOffset)*86400000 );
            _endDate.setTime( _endDate.valueOf() + 7*Number(weeksOffset)*86400000 );
            return this;
        },
        /*
        / Months
        */
        _offddMonth = function( monthsOffset ) {
            _startDate = new Date(_startDate.getFullYear(), _startDate.getMonth()+(monthsOffset), 1, _startDate.getHours(), _startDate.getMinutes(), _startDate.getSeconds());
            _endDate = new Date(_endDate.getFullYear(), _endDate.getMonth()+(monthsOffset)+1, 0, _endDate.getHours(), _endDate.getMinutes(), _endDate.getSeconds());
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
        _offddYear = function( yearsOffset ) {
            _startDate = new Date(_startDate.getFullYear()+(yearsOffset), 0, 1, _startDate.getHours(), _startDate.getMinutes(), _startDate.getSeconds());
            _endDate = new Date(_endDate.getFullYear()+(yearsOffset), 11, 31, _endDate.getHours(), _endDate.getMinutes(), _endDate.getSeconds());
            return this;
        }
        _offddQuarter = function(quartersOffset) {
            var quarterMonth = Math.floor(_startDate.getMonth()/3) * 3;
            _startDate = new Date(_startDate.getFullYear(), quarterMonth+(quartersOffset*3), 1, _startDate.getHours(), _startDate.getMinutes(), _startDate.getSeconds());
            _endDate = new Date(_endDate.getFullYear(), quarterMonth+3+(quartersOffset*3), 0, _endDate.getHours(), _endDate.getMinutes(), _endDate.getSeconds());
            return this;
        },
        holidays = function( country ) {
            var days = [],
                date,
                calendar;
            if ( _holidays.hasOwnProperty(country) ) {
                calendar = _holidays[country];
            } else {
                calendar = _holidays['us'];
            }

            for (var day in calendar) {
                date = new Date(_startDate.getFullYear(), calendar[day][0], calendar[day][1] );
                console.log(date);
                days.push(calendar[day]);
            }

            return days;
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
        offset: offset,
        beginOfDay: bod,
        endOfDay: eod,
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
        getHolidays: holidays,
        // 4th section: output data
        output: returnFnc
    }
})();