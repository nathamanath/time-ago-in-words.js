# Time ago in words js

Vanilla javascript time ago in words.

## Usage
On elements you want to apply time ago in words to, set data-time attribute.

```html
  <time data-time="1408834800000"></time>
```

Call TimeAgo.init, it takes 1 argument, which is an array of elements.

```jsvascript
  var times = document.querySelectorAll('time');

  TimeAgo.init(times);
```

