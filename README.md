# offset-dates (version 0.1.11)
Lightweigth no-dependencies js library to calculate and play with dates and ranges of dates.
Released under the terms of the MIT license. Feel free to use this, fork, contribute or let me know if you would like to see other methods included in the library.

## Documentation

To start using the offsetdate library you just need to include the js file into your code.

```html
<script src="offsetdates.min.js"></script>
```

Once the js file is included, an object called *od* is created and ready to be used.
You can (and it's strongly recommended that you do) chain functions.

Even when you can do this:

```javascript
var date1 = od();
date1.range();
date1.offset(-2,'weeks');
date1.output();
```

you should do this instead:

```javascript
od().range('week').offset(-2, 'weeks').output();
```

The library usage (od) can be divided into 4 main sections:

### 1) Initialization

Couple of initialization methods.

#### single
Default usage, an object with a single date will be created.
 *usage* od.single();
 *parameters* none
 *returns* none

examples:

| Code        | Output |
| ----------- | ------ |
| ```javascript od.single() ``` |        |

#### range
You can calculate dates or ranges of dates. two dates will be created: startDate and endDate

usage range([period])
where
    period: week|month|year|quarter
returns: none

example:
| Code        | Output |
| ----------- | ------ |
| od.range()  |        |
| od.range('week') |        |

od()
od().range()
od().range('week')

### 2) Operations

#### offset
offset an specific period of time to the calculated dates
usage: .offset(amount,period)
where:
    amount: Integer number for the jump
    period: string representation of period, can be weeks|months|years|periods
returns: none

examples:
od.range('week').offset(1,'week').output()
od.range('week').offset(-1,'week').output()

#### beginOfDay
set the time 0:0:00 0000 (hours, minutes, seconds and miliseconds to the specified date, the parameter can be used to set the begin of date to the endDate, for when you are using range
usage: beginOfDay([useEndDate])
where:
    endDate: if specified, the time 0:0:00 will be set to the end date (when range used)
returns: none

#### endOfDay
set the time 23:59:59 99 (hours, minutes, seconds and miliseconds to the specified date, the parameter can be used to set the begin of date to the endDate, for when you are using range
usage: endOfDay([useEndDate])
where:
    endDate: if specified, the time 0:0:00 will be set to the end date (when range used)
returns: none

### 3) Formatting
#### output
Returns the calculated dates, if no parameter is used, the method will return the date objects, string formatted otherwise
usage output([format])
where
    format can be an standar js date format 
returns: none

examples:
od.output()
od.simple().output
od.range('week').output()
od.range('week').output(1)

### 4) Special functions:
These methods should be used directly, no configuration needed.

#### getHolidays
get an array with the holidays for the specified location
usage: getHolidays([country])
where:
    country could be us|mx
by default, the us holidays will be returned
returns: array with date objects, from holidays within specified year
( can be used with offset, to retrieve holidays from a specific year )

### TODO
In future commits, the following items will be included:
* Custom date for library initialization
* Fiscal Week of current week
* First day of month
* Last day of month
* Mutiple dates array results, to be used in select
* Test cases

## License

offsetDates.js is freely distributable under the terms of the [MIT license](https://github.com).