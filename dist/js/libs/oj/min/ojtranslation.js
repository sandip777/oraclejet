/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(["ojs/ojcore-base","ojs/ojconfig"],function(e,r){"use strict";var n={setBundle:function(e){n._bundle=e},getResource:function(e){return n._getResourceString(e)},applyParameters:function(e,r){return null==e?null:n._format(e,r)},getTranslatedString:function(e,r){var t=n._getResourceString(e);if(null==t)return e;var a={};return arguments.length>2?a=Array.prototype.slice.call(arguments,1):2===arguments.length&&("object"==typeof(a=arguments[1])||a instanceof Array||(a=[a])),n.applyParameters(t,a)},getComponentTranslations:function(e){var r=n._getBundle()[e];if(null==r)return{};for(var t={},a=Object.keys(r),u=0;u<a.length;u++){var s=a[u];t[s]=r[s]}return t},_getResourceString:function(r){var t=r?r.split("."):[],a=n._getBundle();e.Assert.assertObject(a);for(var u=0;u<t.length&&a;u++){a=a[t[u]]}return a||null},_format:function(e,r){var n,t,a=e.length,u=[],s=null,o=!1,l=!1,i=!1,c=!1;for(t=0;t<a;t++){var f=e.charAt(t),g=!1;if(o)g=!0,o=!1;else switch(f){case"$":o=!0;break;case"{":c||(l||(n=!1,s=[]),l=!0);break;case"}":if(l&&s.length>0){var d=r[s.join("")];u.push(void 0===d?"null":d)}l=!1;break;case"[":l||(i?c=!0:i=!0);break;case"]":c?c=!1:i=!1;break;default:g=!0}g&&(l?","===f||" "===f?n=!0:n||s.push(f):c||u.push(f))}return u.join("")},_getBundle:function(){var t=n._bundle;if(t)return t;if(e.__isAmdLoaderPresent()){var a=r.getConfigBundle();return e.Assert.assert(void 0!==a,"ojtranslations module must be defined"),a}return{}}};return n});