(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(root.jQuery);
    }

}(this, function ($) {

    'use strict';

    var pluginName = 'contentCard';

    var defaults = {
        /**
         * Should whole element be replaced with compiled template or should content be only appended
         * @type {Boolean}
         */
        replace: true
    }

    /**
     * Plugin constructor
     * @param {HTMLElement} element element to initialize instance on
     * @param {Object} options Options object
     */
    function ContentCard(element, options) {

        this.element = element;
        this.$element = $(element);
        this.options = $.extend(true, {}, defaults, options);

        this.data = $.data(this.element);

        this.render();

        this.bindActions();

    }

    /**
     * Plugin methods
     * @type {Object}
     */
    ContentCard.prototype = {
        /**
         * Gets template if there is one, compiles and catches new one if string template is supplied
         * @return {Function} Compiled template
         */
        getTemplate: function () {
            if (typeof this.options.template === 'string') {
                this.options.template = this.templateEngine(this.options.template);
            }
            return this.options.template;
        },
        render: function () {
            var newElement;

            if (this.options.replace) {
                newElement = $(this.getTemplate()(this.data)).data(pluginName, this).data(this.$element.data());
                this.$element.replaceWith(newElement);
                this.$element = newElement;
                this.element = this.$element.get(0);
            } else {
                $(this.element).html(this.getTemplate()(this.data));
            }
            if (this.options.onRender) {
                this.options.onRender(this.element);
            }
        },
        /**
         * Method that is in charge of binding actions defined in options to their representative elements
         */
        bindActions: function () {
            var self = this;
            Object.keys(this.options.actions).forEach(function (action) {
                self.$element.find('[data-action="' + action + '"]').on('click', function (e) {
                    self.options.actions[action].call(this, e, self.element);
                });
            });
        },
        /**
         * Command proxy thats checks if method is defined and calls given method
         * @param  {String} action Method name
         * @return {var}           Result of called method
         */
        callAction: function (action) {
            return this[action] && this[action].call(this);
        },
        /**
         * Method thats in charge of destroying the instace and removing the element from DOM
         */
        remove: function () {
            this.$element.find('[data-action]').off();
            $.removeData(this.$element);
            this.$element.remove();
        },
        /**
         * Minimal JS engine as found on http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
         * @param  {String} html    Original template source
         * @param  {Object} options Options object
         * @return {Function}       Compiled template function
         */
        templateEngine: function (html, options) {
            var add,
                re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
            add = function (line, js) {
                js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
                return add;
            }
            while (match = re.exec(html)) {
                add(html.slice(cursor, match.index))(match[1], true);
                cursor = match.index + match[0].length;
            }
            add(html.substr(cursor, html.length - cursor));
            code += 'return r.join("");';
            return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
        }
    }

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new ContentCard(this, options));
            } else {
                $.data(this, pluginName).callAction(options);
            }
        });
    }


}));
