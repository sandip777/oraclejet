/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(["ojs/ojcore","jquery","ojs/ojdataprovider","ojs/ojcomponentcore","ojs/ojeventtarget","ojs/ojdataprovider"],function(t,e,n){"use strict";var r=function(){function e(t,n){this.dataProvider=t,this.options=n,this._noFilterSupport=!1,this.AsyncIterable=function(){return function(t,e){this._parent=t,this._asyncIterator=e,this[Symbol.asyncIterator]=function(){return this._asyncIterator}}}(),this.AsyncIterator=function(){function t(t,e,n){this._parent=t,this._nextFunc=e,this._params=n}return t.prototype.next=function(){var t=this._nextFunc(this._params);return Promise.resolve(t)},t}(),this.AsyncIteratorResult=function(){return function(t,n,r){this._parent=t,this.value=n,this.done=r,this[e._VALUE]=n,this[e._DONE]=r}}(),this.FetchListResult=function(){return function(t,n,r,i){this._parent=t,this.fetchParameters=n,this.data=r,this.metadata=i,this[e._FETCHPARAMETERS]=n,this[e._DATA]=r,this[e._METADATA]=i}}(),this.Item=function(){return function(t,n,r){this._parent=t,this.metadata=n,this.data=r,this[e._METADATA]=n,this[e._DATA]=r}}(),this.ItemMetadata=function(){return function(t,n){this._parent=t,this.key=n,this[e._KEY]=n}}(),this.FetchListParameters=function(){return function(t,n,r,i,s){this._parent=t,this.size=n,this.sortCriteria=r,this.filterCriterion=i,this.attributes=s,this[e._SIZE]=n,this[e._SORTCRITERIA]=r,this[e._FILTERCRITERION]=i,this[e._FETCHATTRIBUTES]=s}}(),this.FetchByKeysParameters=function(){return function(t,n,r){this._parent=t,this.keys=n,this.attributes=r,this[e._KEYS]=n,this[e._FETCHATTRIBUTES]=r}}(),this.FetchByOffsetParameters=function(){return function(t,n,r,i,s,a){this._parent=t,this.offset=n,this.size=r,this.sortCriteria=i,this.filterCriterion=s,this.attributes=a,this[e._SIZE]=r,this[e._SORTCRITERIA]=i,this[e._OFFSET]=n,this[e._FILTERCRITERION]=s,this[e._FETCHATTRIBUTES]=a}}(),this.FetchByKeysResults=function(){return function(t,n,r){this._parent=t,this.fetchParameters=n,this.results=r,this[e._FETCHPARAMETERS]=n,this[e._RESULTS]=r}}(),this.ContainsKeysResults=function(){return function(t,n,r){this._parent=t,this.containsParameters=n,this.results=r,this[e._CONTAINSPARAMETERS]=n,this[e._RESULTS]=r}}(),this.FetchByOffsetResults=function(){return function(t,n,r,i){this._parent=t,this.fetchParameters=n,this.results=r,this.done=i,this[e._FETCHPARAMETERS]=n,this[e._RESULTS]=r,this[e._DONE]=i}}(),this[e._FROM]=null==this.options?null:this.options[e._FROM],this[e._OFFSET]=null==this.options?0:this.options[e._OFFSET]>0?this.options[e._OFFSET]:0,this[e._SORTCRITERIA]=null==this.options?null:this.options[e._SORTCRITERIA],this[e._DATAMAPPING]=null==this.options?null:this.options[e._DATAMAPPING],this[e._FETCHATTRIBUTES]=null==this.options?null:this.options[e._FETCHATTRIBUTES],this[e._FILTERCRITERION]=null==this.options?null:this.options[e._FILTERCRITERION],this._addEventListeners(t),t.getCapability&&!t.getCapability("filter")&&(this._noFilterSupport=!0)}return e.prototype.containsKeys=function(t){var n=this;return this.dataProvider[e._CONTAINSKEYS]?this.dataProvider[e._CONTAINSKEYS](t):this.fetchByKeys(t).then(function(r){var i=new Set;return t[e._KEYS].forEach(function(t){null!=r[e._RESULTS].get(t)&&i.add(t)}),Promise.resolve(new n.ContainsKeysResults(n,t,i))})},e.prototype.fetchByKeys=function(t){var n=this,r=null!=t?t[e._KEYS]:null,i=null!=t?t[e._FETCHATTRIBUTES]:null;null==i&&(i=this[e._FETCHATTRIBUTES]);var s=new n.FetchByKeysParameters(n,r,i);if(this.dataProvider[e._FETCHBYKEYS])return this.dataProvider[e._FETCHBYKEYS](s).then(function(t){var r=t[e._RESULTS],i=new Map;return r.forEach(function(t,e){var r=n._getMappedItems([t]);i.set(e,r[0])}),new n.FetchByKeysResults(n,s,i)});var a=new this.FetchListParameters(this,e._DEFAULT_SIZE,null,null,i),_=new Map,u=this.dataProvider[e._FETCHFIRST](a)[Symbol.asyncIterator]();return this._fetchNextSet(t,u,_).then(function(t){var e=new Map;return t.forEach(function(t,r){var i=n._getMappedItems([t]);e.set(r,i[0])}),new n.FetchByKeysResults(n,s,e)})},e.prototype.fetchByOffset=function(t){var n=this,r=null!=t?t[e._OFFSET]:null,i=null!=t?t[e._SIZE]:null,s=null!=t?t[e._FETCHATTRIBUTES]:null;null==s&&(s=this[e._FETCHATTRIBUTES]);var a=null!=t?t[e._SORTCRITERIA]:null;null==a&&(a=this[e._SORTCRITERIA]);var _=this._getMappedSortCriteria(a),u=null!=t?t[e._FILTERCRITERION]:null,o=this._getMappedFilterCriterion(u),E=new n.FetchByOffsetParameters(n,r,i,_,o,s);return this.dataProvider[e._FETCHBYOFFSET](E).then(function(t){var r=t[e._RESULTS],i=t[e._DONE],s=new Array;return r.forEach(function(t){var e=n._getMappedItems([t]);s.push(e[0])}),new n.FetchByOffsetResults(n,E,s,i)})},e.prototype.fetchFirst=function(t){var n={};n[e._DATA]=[],n[e._KEYS]=[],n[e._DONE]=!1,n[e._STARTINDEX]=0;var r=null!=t?t[e._SIZE]:null,i=null!=t?t[e._SORTCRITERIA]:null;null==i&&(i=this[e._SORTCRITERIA]);var s=this._getMappedSortCriteria(i),a=null!=t?t[e._FILTERCRITERION]:null;null==a&&(a=this[e._FILTERCRITERION]);var _=this._getMappedFilterCriterion(a),u=null!=t?t[e._FETCHATTRIBUTES]:null;null==u&&(u=this[e._FETCHATTRIBUTES]);var o=this;if(null==o[e._FROM]&&o[e._OFFSET]>0){var E=o[e._OFFSET];return new this.AsyncIterable(this,new this.AsyncIterator(this,function(t){return function(){var n=new o.FetchByOffsetParameters(o,E,r,s,_,u);return o.dataProvider[e._FETCHBYOFFSET](n).then(function(n){var i=n.results,s=i.map(function(t){return t[e._DATA]}),a=(i.map(function(t){return t[e._METADATA]}),i.map(function(t){return t[e._METADATA][e._KEY]}));E+=a.length;var _=o._getMappedDataAndKeys(a,s);o._cacheResult(t,_[e._DATA],_[e._KEYS]),t[e._DONE]=n[e._DONE];var u=n[e._FETCHPARAMETERS],T=null!=u?u[e._SORTCRITERIA]:null,l=null!=u?u[e._FILTERCRITERION]:null,h=o._getUnmappedSortCriteria(T),A=o._getUnmappedFilterCriterion(l),R=new o.FetchByOffsetParameters(o,o[e._OFFSET],r,h,A);return Promise.resolve(new o.AsyncIteratorResult(o,new o.FetchListResult(o,R,_[e._DATA],_[e._METADATA]),t[e._DONE]))})}}(n),t))}var T=new this.FetchListParameters(this,r,s,_,u),l=this.dataProvider[e._FETCHFIRST](T)[Symbol.asyncIterator]();return new this.AsyncIterable(this,new this.AsyncIterator(this,function(n,r){return function(){return r.next().then(function(i){var s=i[e._VALUE][e._DATA],a=i[e._VALUE][e._METADATA],u=a.map(function(t){return t[e._KEY]});o._noFilterSupport&&o._filterResult(_,s,u,a);s.map(function(t,e){return new o.Item(o,a[e],s[e])});var E=o._getMappedDataAndKeys(u,s);o._cacheResult(n,E[e._DATA],E[e._KEYS]),n[e._DONE]=i[e._DONE];var T=null!=t?t[e._SIZE]:null,l=(null!=t&&t[e._OFFSET],i[e._VALUE][e._FETCHPARAMETERS]),h=null!=l?l[e._SORTCRITERIA]:null,A=null!=l?l[e._FILTERCRITERION]:null,R=o._getUnmappedSortCriteria(h),c=o._getUnmappedFilterCriterion(A),f=new o.FetchListParameters(o,T,R,c);return o._fetchUntilKey(f,o[e._FROM],n,r).then(function(){return o._fetchUntilOffset(f,o[e._OFFSET]+n[e._STARTINDEX],s.length,n,r)})})}}(n,l),t))},e.prototype.getCapability=function(t){return this.dataProvider.getCapability(t)},e.prototype.getTotalSize=function(){return this.dataProvider.getTotalSize()},e.prototype.isEmpty=function(){return this.dataProvider.isEmpty()},e.prototype._fetchNextSet=function(n,r,i){var s=this;return r.next().then(function(a){var _=a[e._VALUE],u=_[e._DATA],o=_[e._METADATA],E=o.map(function(t){return t[e._KEY]}),T=!0;return n[e._KEYS].forEach(function(e){i.has(e)||E.map(function(n,r){t.Object.compareValues(n,e)&&i.set(e,new s.Item(s,o[r],u[r]))}),i.has(e)||(T=!1)}),T||a[e._DONE]?i:s._fetchNextSet(n,r,i)})},e.prototype._fetchUntilKey=function(t,n,r,i){var s=this;if(null!=n){var a=r[e._KEYS].filter(function(t){if(n==t)return!0});if(a.length>0){var _=r[e._KEYS].indexOf(a[0]);r[e._KEYS]=r[e._KEYS].slice(_,r[e._KEYS].length),r[e._DATA]=r[e._DATA].slice(_,r[e._DATA].length)}else{if(!r[e._DONE])return i.next().then(function(t){var n=t[e._VALUE][e._DATA],a=t[e._VALUE][e._METADATA].map(function(t){return t[e._KEY]}),_=s._getMappedDataAndKeys(a,n);return s._cacheResult(r,_[e._DATA],_[e._KEYS]),r[e._DONE]=t[e._DONE],s._fetchUntilKey(t[e._FETCHPARAMETERS],_[e._KEYS],r,i)});r[e._DATA]=[],r[e._KEYS]=[]}}return Promise.resolve(null)},e.prototype._fetchUntilOffset=function(t,n,r,i,s){var a=this,_=null!=t&&t[e._SIZE]>0?t[e._SIZE]:r;n=n>0?n:0;var u=i[e._KEYS].slice(n,n+_),o=i[e._DATA].slice(n,n+_);if(this._noFilterSupport){var E=this._getMappedFilterCriterion(t[e._FILTERCRITERION]);this._filterResult(E,o,u,null)}var T=u.map(function(t){return new a.ItemMetadata(a,t)});return o.length<_?i[e._DONE]?(i[e._STARTINDEX]=i[e._STARTINDEX]+o.length,Promise.resolve(new a.AsyncIteratorResult(a,new a.FetchListResult(a,t,o,T),!0))):s.next().then(function(r){var _=r[e._VALUE][e._DATA],u=r[e._VALUE][e._METADATA].map(function(t){return t[e._KEY]});if(a._noFilterSupport){var o=a._getMappedFilterCriterion(t[e._FILTERCRITERION]);a._filterResult(o,_,u,null)}var E=a._getMappedDataAndKeys(u,_);return a._cacheResult(i,E[e._DATA],E[e._KEYS]),i[e._DONE]=r[e._DONE],a._fetchUntilOffset(r[e._VALUE][e._FETCHPARAMETERS],n,_.length,i,s)}):(i[e._STARTINDEX]=i[e._STARTINDEX]+o.length,Promise.resolve(new a.AsyncIteratorResult(a,new a.FetchListResult(a,t,o,T),i[e._DONE])))},e.prototype._cacheResult=function(t,n,r){n.map(function(n){t[e._DATA].push(n)}),r.map(function(n){t[e._KEYS].push(n)})},e.prototype._filterResult=function(t,e,r,i){if(t){t.filter||(t=n.FilterFactory.getFilter({filterDef:t}));for(var s=e.length-1;s>=0;)t.filter(e[s])||(e.splice(s,1),r&&r.splice(s,1),i&&i.splice(s,1)),s--}},e.prototype._getMappedItems=function(t){var n=this;if(null!=this[e._DATAMAPPING]){var r=this[e._DATAMAPPING][e._MAPFIELDS];if(null!=r&&null!=t&&t.length>0){new Array;return t.map(function(t){return r.bind(n)(t)})}}return t},e.prototype._getMappedDataAndKeys=function(t,n){var r=this,i=n.map(function(e,i){return new r.Item(r,new r.ItemMetadata(r,t[i]),n[i])}),s=this._getMappedItems(i),a=s.map(function(t){return t[e._DATA]}),_=s.map(function(t){return t[e._METADATA][e._KEY]}),u=s.map(function(t){return t[e._METADATA]}),o={};return o[e._DATA]=a,o[e._KEYS]=_,o[e._METADATA]=u,o},e.prototype._getMappedFilterCriterion=function(t){if(null!=this[e._DATAMAPPING]){var n=this[e._DATAMAPPING][e._MAPFILTERCRITERION];if(null!=n&&null!=t)return n(t)}return t},e.prototype._getMappedSortCriteria=function(t){if(null!=this[e._DATAMAPPING]){var n=this[e._DATAMAPPING][e._MAPSORTCRITERIA];if(null!=n&&null!=t&&t.length>0)return n(t)}return t},e.prototype._getUnmappedSortCriteria=function(t){if(null!=this[e._DATAMAPPING]){var n=this[e._DATAMAPPING][e._UNMAPSORTCRITERIA];if(null!=n&&null!=t&&t.length>0)return n(t)}return t},e.prototype._getUnmappedFilterCriterion=function(t){if(null!=this[e._DATAMAPPING]){var n=this[e._DATAMAPPING][e._UNMAPFILTERCRITERION];if(null!=n&&null!=t)return n(t)}return t},e.prototype._addEventListeners=function(t){var n=this;t[e._ADDEVENTLISTENER](e._REFRESH,function(t){n.dispatchEvent(t)}),t[e._ADDEVENTLISTENER](e._MUTATE,function(t){n.dispatchEvent(t)})},e._KEY="key",e._KEYS="keys",e._DATA="data",e._STARTINDEX="startIndex",e._SORT="sort",e._SORTCRITERIA="sortCriteria",e._FILTERCRITERION="filterCriterion",e._METADATA="metadata",e._FROM="from",e._OFFSET="offset",e._REFRESH="refresh",e._MUTATE="mutate",e._SIZE="size",e._FETCHPARAMETERS="fetchParameters",e._VALUE="value",e._DONE="done",e._DATAMAPPING="dataMapping",e._MAPFIELDS="mapFields",e._MAPSORTCRITERIA="mapSortCriteria",e._MAPFILTERCRITERION="mapFilterCriterion",e._UNMAPSORTCRITERIA="unmapSortCriteria",e._UNMAPFILTERCRITERION="unmapFilterCriterion",e._RESULTS="results",e._CONTAINSPARAMETERS="containsParameters",e._DEFAULT_SIZE=25,e._CONTAINSKEYS="containsKeys",e._FETCHBYKEYS="fetchByKeys",e._FETCHBYOFFSET="fetchByOffset",e._FETCHFIRST="fetchFirst",e._ADDEVENTLISTENER="addEventListener",e._FETCHATTRIBUTES="attributes",e}();return t.ListDataProviderView=r,t.ListDataProviderView=r,t.EventTargetMixin.applyMixin(r),r});