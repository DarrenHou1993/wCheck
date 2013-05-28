# wCheck.js

A jQuery plugin for fully customizable `checkbox` and `radio` input options.  The plugin uses images for background themes and selectors to allow for compatability with more browsers.  Applying this plugin will not effect any existing functionality on your radio and checkbox inputs and you should still be able to fire any existing events already created on them.

* [View the wCheck demo](http://wcheck.websanova.com)
* [Download the lastest version of wCheck](https://github.com/websanova/wCheck/tags)

## Related Plugins

* [wSelect](http://wselect.websanova.com) - Custom select boxes.
* [wInput](http://winput.websanova.com) - Input plugin that handles backwards compatability for placeholders.
* [wChar](http://wchar.websanova.com) - On the fly character counter for inputs.

## Settings

Available options with notes, the values here are the defaults.

```js
$.fn.wCheck.defaults = {
    theme: './img/square-classic-blue.png',   // background image to use
    selector: './img/selector-checkmark.png', // selector image to use
    mode: 'checkbox',                         // two modes, checkbox or radio
    width: 16,                                // width of check/check
    height: 16                                // height of check/check
};
```


## Examples

To start off you will need to include the following two files:

```js
<script type="text/javascript" src="./wCheck.js"></script>
<link rel="Stylesheet" type="text/css" href="./wCheck.css" />
```

You can then apply the plugins to any radio and checkbox like so:

```js
$('input:radio').wRadio();
$('input:checkbox').wCheck();
```

Set your own theme and selector by specifying the paths to the images.  Note that the theme image is comprised of two images for _off_ and _hover_ state.  These images should be of the same size with the hover state below the off state.  Just look in the `img` folder of this plugin for samples.  Also don't forget to set the size if using dimensions other than 16px by 16px

```js
$('input:radio').wRadio({
    theme: '/path/to/myTheme.png',
    selector: '/path/to/mySelector.png',
    width: 16,
    height 16
});
```

You can also optionally set a `label` attribute for the radio and checkbox elements and the plugin will create a nicely formatted clickable label for each option.  This can be done by setting the `data-label` attribute.

```html
<input type="check" name="question1" value="yes" data-label="Yes, I would like to subscribe"/>
<input type="check" name="question1" value="no" data-label="No, I don't want to subscribe"/>
```

One thing that should be avoided is manually setting or removing the `checked` attribute.  For this there are two helper functions that can be used to set and reset the `checked` attribute programatically.

```js
$('#radio1').wRadio('check', true);
$('#checkbox1').wCheck('check', false);

$('input:radio').wRadio('reset');
$('input:checkbox').wCheck('reset');
```


## Resources

* [More jQuery plugins by Websanova](http://websanova.com/plugins)
* [jQuery Plugin Development Boilerplate](http://www.websanova.com/tutorials/jquery/jquery-plugin-development-boilerplate)
* [The Ultimate Guide to Writing jQuery Plugins](http://www.websanova.com/tutorials/jquery/the-ultimate-guide-to-writing-jquery-plugins)


## License

MIT licensed

Copyright (C) 2011-2013 Websanova http://www.websanova.com