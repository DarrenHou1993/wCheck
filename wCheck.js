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
 * @version         Version 1.1.1
 *
 ******************************************/

(function($) {
    
    function Check(el, options) {
        this.$el = $(el);
        this.options = options;

        this.mode = this.$el.prop('type').toLowerCase();
        this.name = '';
        this.checked = false;

        this.generate();
    };
    
    Check.prototype = {
        generate: function() {
            if (!this.$check) {
                var _self = this;

                if (this.mode ===  'radio') {
                    this.name = this.$el.attr('name');
                }

                this.$check = $('<div class="wCheck wCheck-off wCheck-mode-' + this.mode + ' ' + (this.mode === 'radio' && this.name ? 'wCheck-name-' + this.name : '') + '"></div>');
                this.$selector = $('<div class="wCheck-selector"></div>');
                this.$check.append(this.$selector);
                this.$el.hide().after(this.$check);
                
                this.$el.click(function(){ _self.onClick(); }); // triggers on label click and $check click.  Also triggers any click events on element ($el)
                this.$check
                .click(function(e) { _self.$el.click(); })
                .hover(
                    function(){ _self.onFocus(); },
                    function(){ _self.onBlur(); }
                );

                if (this.$el.prop('checked')) { this.setCheck(true); }

                this.createLabel(); // make sure this is run before setTheme()
                this.setTheme(this.options.theme);
                this.setSelector(this.options.selector);
            }
            return this.$check;
        },

        createLabel: function() {
            var text = this.$el.attr('data-label'),
                id = this.$el.attr('id'),
                _self = this;

            if (text && text !== '') {
                id = id || Math.random() * 100;

                this.$el.attr('id', id);
                this.$label = $('<label for="' + id + '" class="wCheck-label"></label>');
                this.setLabel(text);
                this.$check.after(this.$label);
            }
            else if (this.options.useExistingLabel && id) {
                this.$label = $('label[for="' + id + '"]').addClass('wCheck-label');
            }

            if (this.$label) {
                this.$label.hover(
                    function(e){ _self.onFocus(); },
                    function(e){ _self.onBlur(); }
                );
            }
        },

        onClick: function() {
            this.setCheck(this.mode === 'radio' ? true : !this.checked);
        },

        onFocus: function() {
            this.$check.addClass('wCheck-hover');
            
            if (this.$label && this.options.highlightLabel) {
                this.$label.addClass('wCheck-label-hover');
            }
        },

        onBlur: function() {
            this.$check.removeClass('wCheck-hover');

            if (this.$label && this.options.highlightLabel) {
                this.$label.removeClass('wCheck-label-hover');
            }
        },

        setCheck: function(checked) {
            this.checked = checked;

            if (this.mode === 'radio') {
                $('.wCheck-name-' + this.name).removeClass('wCheck-on').addClass('wCheck-off');
                this.$check.removeClass('wCheck-off').addClass('wCheck-on');

                $('input:' + this.mode + '[name=' + this.name + ']')
                .each(function() { 
                    if ($(this).data('wCheck')) {
                        $(this).data('wCheck').checked = false;
                    }
                })
                .removeAttr('checked');

                this.$el.prop('checked', true);
            }
            else if (this.mode === 'checkbox') {
                if (this.checked) {
                    this.$check.removeClass('wCheck-off').addClass('wCheck-on');
                    this.$el.prop('checked', true);
                }
                else {
                    this.$check.removeClass('wCheck-on').addClass('wCheck-off');
                    this.$el.prop('checked', false);
                }
            }
        },

        setLabel: function(text) {
            this.$label.html(text);
        },

        setTheme: function(theme) {
            this.$check.attr('class', this.$check.attr('class').replace(/wCheck-theme-.+\s|wCheck-theme-.+$/, ''));
            this.$check.addClass('wCheck-theme-' + theme);

            if (this.$label) {
                this.$label.attr('class', this.$label.attr('class').replace(/wCheck-label-theme-.+\s|wCheck-label-theme-.+$/, ''));
                this.$label.addClass('wCheck-label-theme-' + theme);
            }
        },

        setSelector: function(selector) {
            this.$selector.attr('class', this.$selector.attr('class').replace(/wCheck-selector-.+\s|wCheck-selector-.+$/, ''));
            this.$selector.addClass('wCheck-selector-' + selector);
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
                        if (wCheck[func]) { wCheck[func].apply(wCheck, [value]); }
                        if (wCheck.options[options]) { wCheck.options[options] = value; }
                    } else {
                        if(wCheck[func]) { values.push(wCheck[func].apply(wCheck, [value])); }
                        else if (wCheck.options[options]) { values.push(wCheck.options[options]); }
                        else { values.push(null); }
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
                var _options = jQuery.extend(true, {}, options);
                wCheck = new Check(el, _options);
                $.data(el, 'wCheck', wCheck);
            }

            return wCheck;
        }

        return this.each(function() { get(this); });
    };

    $.fn.wCheck.defaults = {
        theme: 'square-classic-blue',   // theme
        selector: 'checkmark',          // selector
        useExistingLabel: true,         // if there is a for="id" matching use it
        highlightLabel: false           // toggle highlighting active/hover label
    };

    $.fn.wRadio = function(options, value) {
        options = $.extend({}, $.fn.wRadio.defaults, options);

        return $.fn.wCheck.apply(this, [options, value]);
    };
    
    $.fn.wRadio.defaults = {
        theme: 'circle-classic-blue',   // theme
        selector: 'circle-dot-blue',    // selector
        useExistingLabel: true,         // if there is a for="id" matching use it
        highlightLabel: false           // toggle highlighting active/hover label
    };
    
})(jQuery);
