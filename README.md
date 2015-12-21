# offset-dates (version 0.1.12)
Lightweigth no-dependencies js library to calculate and play with dates and ranges of dates.

One of the key elements is that you can use the range initiator to return a pair of dates, and you can perform operations on those dates through the offset method.

Released under the terms of the MIT license. Feel free to use this, fork, contribute or let me know if you would like to see other methods included in the library.

## Documentation

To start using the offsetdate library you just need to include the js file into your code.

```html
<script src="offsetdates.min.js"></script>
```

Once the js file is included, an object called *od* is created and ready to be used. If you don't use any of the helper functions, you will get an object created whit the current system date.  
You can (and it's strongly recommended that you do) chain functions.

### Hello world!

Easy as ever:  
```javascript
od.output(); // date in local time
```

### Chaining 
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

## Methods

The usage can be divided into 4 main sections:

### 1) Initialization

There are two initialization modes, single mode is the default one.

#### single
Default usage, an object with a single date will be created.

*Usage:* od.single()  
*Parameters:* none  
*Returns:* none  

#### range
You can calculate dates or ranges of dates. two dates will be created: *startDate* and *endDate*. If no period is specified, both start and end date will hold the same date/time value.

*Usage:* od.range( [period] )  
*Parameters:* 
* **period** String with possible values: week|month|year|quarter  
*Returns:* none  
*Example:*  
```javascript
od();
od().range();
od().range('week');
```

### 2) Operations

#### offset
Offset (adds or substract) a specific period of time to the calculated dates, accordingly to the parameters used.

*Usage:* offset( amount, period )  
*Parameters:*
* **amount**: Integer number, used to skip specified period of time.
* **period**: String value, representation of the period, can be weeks|months|years|periods 
*Returns:* none  
*Example:*  
```javascript
od.range('week').offset(1,'week');
od.range('week').offset(-1,'week');
```

#### beginOfDay
Set time 0:0:00 0000 (hours, minutes, seconds and miliseconds) to the current od date. A parameter can be used to set the 0 time to the endDate (when using ranged dates).

*Usage:* beginOfDay( [useEndDate] )
*Parameters:*
* **useEndDate** Boolean, to specify if the time 0:0:00 will be set to the end date
*Returns:* none  
*Example:*  
```javascript
od.beginOfDay();
od.range('week').beginOfDay();
od.range('week').beginOfDay( true );
´´´

#### endOfDay
Set time 23:59:59 9999 (hours, minutes, seconds and miliseconds) to the current od date. A parameter can be used to set the 0 time to the endDate (when using ranged dates).

*Usage:* endOfDay( [useEndDate] )
*Parameters:*
* **useEndDate** Boolean, to specify if the time 0:0:00 will be set to the end date
*Returns:* none  
*Example:*  
```javascript
od.endOfDay('end');
od.range('week').endOfDay( true );
´´´

### 3) Formatting

#### output
Returns the current values of the date or an object with two dates (startDate and endDate). 
The method will return a date object (or a pair of such) if no parameter is used.
If a parameter is used the method will return formatted string (or a pair of such).

*Usage:* output( [format] )
*Parameters:*
* **format** String with a standar js date format, more on js date formats on the [Language Specification](http://www.ecma-international.org/ecma-262/6.0/#sec-date-time-string-format).
*Returns:* Date object or formatted string
*Example:*  
```javascript
od.output();
od.simple().output();
od.range('week').output();
od.range('week').output(1);
´´´

### 4) Special functions:

These methods should be used directly, no configuration needed.

#### getHolidays

Returns an array with the holidays for the location on the parameters. US is the default location.

*Usage:* getHolidays( [country] )
*Parameters:*
* **format** String with the country. Possible values: us|mx.
You can use offset method to retrieve holidays from other years.
*Returns:* array with date objects
*Example:*  
```javascript
od.output();
od.simple().output();
od.range('week').output();
od.range('week').output(1);
´´´

### TODO
* Custom date output format.
* Fiscal Weeks.
* First/last day of month/year.
* Mutiple dates array results, to be used directly in documents.
* Test cases.

## License

offsetDates.js is freely distributable under the terms of the [MIT license](https://github.com/jocelo/offset-dates/blob/master/LICENSE).