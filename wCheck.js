/******************************************
 * Websanova.com
 *
 * Resources for web entrepreneurs
 *
 * @author          Websanova
 * @copyright       Copyright (c) 2012 Websanova.
 * @license         This websanova wCheck jQuery plug-in is dual licensed under the MIT and GPL licenses.
 * @link            http://www.websanova.com
 * @github          http://github.com/websanova/wCheck
 * @version         Version 1.0.0
 *
 ******************************************/

(function($) {
    
    function Check(el, options) {
        this.$el = $(el);
        this.options = options;

        this.name = '';
        this.checked = false;

        this.generate();
    };
    
    Check.prototype = {
        generate: function() {
            if (!this.$check) {
                var _self = this;
                var name = '';

                if (this.options.mode ===  'radio') {
                    this.name = this.$el.attr('name');
                    name = 'wCheck-name-' + this.$el.attr('name');
                }

                this.$selector = $('<div class="wCheck-selector"></div>');
                this.$check = $('<div class="wCheck wCheck-off wCheck-mode-' + this.options.mode + ' ' + name + '"></div>');
                this.$check.append(this.$selector);
                this.$el.hide().after(this.$check);
                
                this.$check
                .mouseover(function(e) { _self.$el.trigger('mouseover'); })
                .mouseout(function(e) { _self.$el.trigger('mouseout'); })
                .click(function(e) { _self.$el.trigger('click'); })
                .hover(
                    function(){ _self.$check.css({backgroundPosition:'center -' + _self.options.height + 'px'}); },
                    function(){ _self.$check.css({backgroundPosition:'center 0px'}); }
                );

                this.createLabel();

                if (this.$el.attr('checked') === 'checked') this.setCheck(true);

                this.setWidth(this.options.width);
                this.setHeight(this.options.height);
                this.setTheme(this.options.theme);
                this.setSelector(this.options.selector);
            }
            return this.$check;
        },

        reset: function() {
            this.checked = false;
            this.$check.removeClass('wCheck-on').addClass('wCheck-off');
            this.$el.removeAttr('checked');
        },

        createLabel: function() {
            var text = this.$el.attr('data-label');

            if (text && text !== '') {
                var id = this.$el.attr('id') || Math.random() * 100;

                this.$el.attr('id', id);
                this.$label = $('<label for="' + id + '" class="wCheck-label"></label>');

                this.setLabel(text);
                this.$check.after(this.$label);
            }
        },

        setCheck: function(checked) {
            this.checked = checked;

            if (this.options.mode === 'radio') {
                $('.wCheck-name-' + this.name).removeClass('wCheck-on').addClass('wCheck-off');
                this.$check.removeClass('wCheck-off').addClass('wCheck-on');

                $('input:' + this.options.mode + '[name=' + this.name + ']')
                .each(function(){ if($(this).data('wCheck')) $(this).data('wCheck').checked = false; })
                .removeAttr('checked');

                this.$el.attr('checked', 'checked');
            }
            else if (this.options.mode === 'checkbox') {
                if (this.checked) {
                    this.$check.removeClass('wCheck-off').addClass('wCheck-on');
                    this.$el.attr('checked', 'checked');
                }
                else {
                    this.$check.removeClass('wCheck-on').addClass('wCheck-off');
                    this.$el.removeAttr('checked');
                }
            }
        },

        setLabel: function(text) {
            this.$label.html(text);
        },

        setTheme: function(theme) {
            this.$check.css('backgroundImage', 'url(' + theme + ')');
        },

        setSelector: function(selector) {
            this.$selector.css('backgroundImage', 'url(' + selector + ')');
        },

        setWidth: function(width) {
            this.$check.css('width', width);
            this.$selector.css('width', width);
        },

        setHeight: function(height) {
            this.$check.css('height', height);
            this.$selector.css('height', height);
        }
    };
    
    $.fn.wCheck = function(options, value) {
        if (typeof options === 'string') {
            var values = [];
            var elements = this.each(function() {
                var wCheck = $(this).data('wCheck');

                if (wCheck) {
                    var func = (value ? 'set' : 'get') + options.charAt(0).toUpperCase() + options.substring(1).toLowerCase();

                    if (wCheck[options]) {
                        wCheck[options].apply(wCheck, [value]);
                    } else if (value) {
                        if (wCheck[func]) wCheck[func].apply(wCheck, [value]);
                        if (wCheck.options[options]) wCheck.options[options] = value;
                    } else {
                        if(wCheck[func]) values.push(wCheck[func].apply(wCheck, [value]));
                        else if (wCheck.options[options]) values.push(wCheck.options[options]);
                        else values.push(null);
                    }
                }
            });

            if (values.length === 1) { return values[0]; }
            else if (values.length > 0) { return values; }
            else { return elements; }
        }

        options = $.extend({}, $.fn.wCheck.defaults, options);
        
        function get(el) {
            var wCheck = $.data(el, 'wCheck');
            if (!wCheck) {
                wCheck = new Check(el, options);
                $.data(el, 'wCheck', wCheck);
            }
            return wCheck;
        }

        function set() {
            var wCheck = get(this);
            wCheck.setCheck(wCheck.options.mode === 'radio' ? true : !wCheck.checked);
        }

        this.each(function() { if ($(this).attr('type') === options.mode) get(this); });

        this.click(set);

        return this;
    };

    $.fn.wRadio = function(options, value) {
        options = options || {};
        options.mode = 'radio';
        if (!options.theme) options.theme = './img/circle-classic-blue.png';
        if (!options.selector) options.selector = './img/selector-circle-dot-blue.png';
        return $.fn.wCheck.apply(this, [options, value]);
    };
    
    $.fn.wCheck.defaults = {
        theme: './img/square-classic-blue.png',   // background image to use
        selector: './img/selector-checkmark.png', // selector image to use
        mode: 'checkbox',                         // two modes, checkbox or radio
        width: 16,                                // width of check/radio
        height: 16                                // height of check/radio
    };
    
})(jQuery);
