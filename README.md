# Time ago in words js

Javascript time ago in words.

* Converts js date or timestamp to time ago in words string.
* Updates smaller units of time (seconds, mins, hours) live.
* Does not depend on any external libaries.
* Works in ie>=8 maybe 7 but I havent checked.

## Usage
On elements you want to apply time ago in words to, set data-time attribute.
This should be a javascript time stamp (`new Date().getTime()`), or a date (`new Date()`).

```html
  <time data-time="1408834800000"></time>
```

Call TimeAgo.init after your document has loaded, it takes only 1 argument, which is an array of dom elements.

```javascript
  var times = document.querySelectorAll('time');

  TimeAgo.init(times);
```

This will set the innerHTML of each target el to a time ago in words string.

