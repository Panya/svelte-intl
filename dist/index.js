'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var store = require('svelte/store');
var formatMessage = _interopDefault(require('format-message'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var buildKey = function (base, curr) { return base ? base + "." + curr : curr; };
var flatObject = function (object) {
    var result = {};
    var iterate = function (item, currentKey) {
        Object.keys(item).forEach(function (key) {
            var value = item[key];
            if (typeof value === 'object')
                iterate(value, buildKey(currentKey, key));
            else
                result[buildKey(currentKey, key)] = value;
        });
    };
    iterate(object, '');
    return result;
};

var flatTranslation = function (translations) { return Object.keys(translations).reduce(function (acc, key) {
    var _a;
    return (__assign(__assign({}, acc), (_a = {}, _a[key] = flatObject(translations[key]), _a)));
}, {}); };
var merge = function (obj1, obj2) {
    if (obj1 === void 0) { obj1 = {}; }
    return Object.keys(obj2).reduce(function (acc, key) {
        if (obj2[key] !== null && typeof obj2[key] === 'object') {
            acc[key] = merge(acc[key], obj2[key]);
        }
        else {
            acc[key] = obj2[key];
        }
        return acc;
    }, obj1);
};
function createMergeableStore(defaultValue) {
    var _a = store.writable(defaultValue), subscribe = _a.subscribe, set = _a.set, update = _a.update;
    var updateMerging = function (newTranslations) { return update(function ($translations) {
        return merge($translations, newTranslations);
    }); };
    return {
        set: set,
        subscribe: subscribe,
        update: updateMerging,
    };
}
var defaultOptions = {
    missingTranslation: 'ignore',
};
var options = createMergeableStore(defaultOptions);
var translations = createMergeableStore({});
var locales = store.derived(translations, function ($translations) { return Object.keys($translations); });
var createLocale = function () {
    var _a = store.writable(''), subscribe = _a.subscribe, set = _a.set, update = _a.update;
    var setLocale = function (newLocale) {
        if (newLocale !== '' && !store.get(translations)[newLocale]) {
            console.error("[svelte-intl] Couldn't find the \"" + newLocale + "\" locale.");
            return false;
        }
        set(newLocale);
        return true;
    };
    return {
        subscribe: subscribe,
        update: update,
        set: setLocale,
    };
};
var locale = createLocale();
var translate = store.derived([locale, translations, options], function (stores) {
    var $locale = stores[0], $translations = stores[1], $options = stores[2];
    formatMessage.setup(__assign(__assign({}, $options), { locale: $locale, translations: flatTranslation($translations) }));
    return formatMessage;
});
var _ = translate;
/** For tests */
var clear = function () {
    locale.set('');
    translations.set({});
    options.set(defaultOptions);
};

var getBrowserLocale = function (defaultLocale) {
    if (defaultLocale === void 0) { defaultLocale = 'en'; }
    var _a, _b, _c;
    var targets = ((_a = window) === null || _a === void 0 ? void 0 : _a.navigator.languages) || // user language preferences list
        [
            ((_b = window) === null || _b === void 0 ? void 0 : _b.navigator).userLanguage || // IE 10-
             ((_c = window) === null || _c === void 0 ? void 0 : _c.navigator.language) || // browser ui language
                defaultLocale,
        ];
    var currentLocales = store.get(locales);
    var _loop_1 = function (i) {
        if (currentLocales.includes(targets[i]))
            return { value: targets[i] }; // exact match
        var bestMatch = currentLocales.find(function (locale) { return targets[i].startsWith(locale); });
        if (bestMatch)
            return { value: bestMatch }; // en-US -> en
    };
    for (var i = 0; i < targets.length; i = i + 1) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    var currentLocale = store.get(locale);
    return currentLocale || currentLocales[0]; // default to current or just first
};

exports._ = _;
exports.clear = clear;
exports.defaultOptions = defaultOptions;
exports.getBrowserLocale = getBrowserLocale;
exports.locale = locale;
exports.locales = locales;
exports.options = options;
exports.translate = translate;
exports.translations = translations;
