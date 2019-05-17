/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(["ojs/ojcore","jquery","ojs/ojlogger","ojs/ojtranslation","ojs/ojeditablevalue","ojs/ojradiocheckbox","ojs/ojoption"],function(e,t,i,n){"use strict";var o,s={properties:{describedBy:{type:"string"},disabled:{type:"boolean",value:!1},displayOptions:{type:"object",properties:{converterHint:{type:"Array<string>|string",value:["placeholder","notewindow"]},helpInstruction:{type:"Array<string>|string",value:["notewindow"]},messages:{type:"Array<string>|string",value:["inline"]},validatorHint:{type:"Array<string>|string",value:["notewindow"]}}},help:{type:"object",properties:{instruction:{type:"string",value:""}}},helpHints:{type:"object",properties:{definition:{type:"string",value:""},source:{type:"string",value:""}}},labelHint:{type:"string",value:""},labelledBy:{type:"string"},messagesCustom:{type:"Array<Object>",writeback:!0,value:[]},optionRenderer:{type:"function"},options:{type:"object"},optionsKeys:{type:"object",properties:{label:{type:"string"},value:{type:"string"}}},readonly:{type:"boolean",value:!1},required:{type:"boolean",value:!1},translations:{type:"object",value:{},properties:{readonlyNoValue:{type:"string"},required:{type:"object",properties:{hint:{type:"string"},messageDetail:{type:"string"},messageSummary:{type:"string"}}}}},valid:{type:"string",writeback:!0,enumValues:["invalidHidden","invalidShown","pending","valid"],readOnly:!0},value:{type:"Array<any>",writeback:!0}},methods:{refresh:{},validate:{},reset:{},showMessages:{},setProperty:{},getProperty:{},setProperties:{},getNodeBySubId:{},getSubIdByNode:{}},events:{ojAnimateStart:{},ojAnimateEnd:{}},extension:{}};o={doValueChangeCheck:!1},e.__registerWidget("oj.ojCheckboxset",t.oj.editableValue,{version:"1.0.0",defaultElement:"<div>",widgetEventPrefix:"oj",options:{disabled:!1,labelledBy:null,readOnly:!1,optionRenderer:null,options:null,optionsKeys:{},required:!1,value:[]},refresh:function(){this._super(),this._setup()},widget:function(){return this.uiCheckboxset},validate:e.EditableValueUtils.validate,_InitOptions:function(i,n){var o,s,a=[];this._super(i,n),this._IsCustomElement()||e.EditableValueUtils.initializeOptionsFromDom([{attribute:"disabled",validateOption:!0},{attribute:"readonly",option:"readOnly",validateOption:!0},{attribute:"title"},{attribute:"required",coerceDomValue:!0,validateOption:!0}],n,this),this._IsCustomElement()?this._checkValueType(this.options.value):void 0===n.value?(this.$checkboxes=this._findCheckboxesWithMatchingName(),(o=this.$checkboxes.filter(":checked")).length>0&&(o.each(function(){a.push(t(this).val())}),s=a,this.option("value",s,{_context:{writeback:!0,internalSet:!0}})),void 0===this.options.value&&(this.options.value=[])):this._checkValueType(this.options.value)},_ComponentCreate:function(){var i=this.element;if(this._super(),i.is("fieldset"))throw new Error("ojCheckboxset cannot be bound to a fieldset. Use a div instead.");i.uniqueId(),e.RadioCheckboxUtils.generateOptionsFromData.call(this),this._processOjOptions(),this.$checkboxes=this._findCheckboxesWithMatchingName(),this.$checkboxes._ojRadioCheckbox().attr("data-oj-internal",""),this.uiCheckboxset=i.addClass("oj-checkboxset oj-component").attr("role","group"),t(i.get(0).childNodes).filter(function(){return!(this.getAttribute&&"contextMenu"===this.getAttribute("slot"))}).wrapAll("<div class='oj-checkboxset-wrapper'></div>"),this._on(this._events),this._setup()},_ResetComponentState:function(){this._processOjOptions(),this.$checkboxes=this._findCheckboxesWithMatchingName(),this.$checkboxes.filter(".oj-checkbox").each(function(){var e=void 0!==t(this).attr("disabled")&&!!t(this).prop("disabled");t(this)._ojRadioCheckbox("option","disabled",e)}),this.$checkboxes.not(".oj-checkbox")._ojRadioCheckbox()},GetFocusElement:function(){return this._GetContentElement().not(":disabled").first()[0]},_SetDisabledDom:function(){},_IsRequired:function(){return this.options.required},_refreshRequired:e.EditableValueUtils._refreshRequired,_processOjOptions:function(){function e(e,t){for(var i=e.slice(0),n=t.length-1,o=i.length-1;o>0&&n>-1;){var s=t[n].value,a=i[o];if(s!==a){var r=i.indexOf(s);r>-1&&(i[r]=a,i[o]=s,o-=1),n-=1}else o-=1,n-=1}return i}if(this._IsCustomElement()){var t,i,n=this._customOptionRenderer.bind(this),o=this.element.children("oj-option"),s=e(this.options.value,o);if(o.length>0)for(t=0,i=o.length;t<i;t++)o[t].customOptionRenderer=n,this.options.readOnly?this._processReadonlyOptions(o[t],s,!1):this._initInputLabelFromOjOption(o[t]);if(o=this.element.children(".oj-checkboxset-wrapper").find("oj-option"),s=e(this.options.value,o),o.length>0)for(t=0,i=o.length;t<i;t++)o[t].customOptionRenderer=n,this.options.readOnly?this._processReadonlyOptions(o[t],s,!0):this._initInputLabelFromOjOption(o[t])}},_processReadonlyOptions:function(e,t,i){var n,o=e.value,s=t.length;if(i){n=e;do{n=n.parentElement}while(n&&!n.classList.contains("oj-choice-item"));n&&n.classList.contains("oj-choice-item")&&"SPAN"===n.tagName&&n.classList.add("oj-helper-hidden")}else e.classList.add("oj-helper-hidden");if(t&&0!==s){var a=t.indexOf(o);if(a>-1){var r=a===t.length-1;this._initReadonlyLabelFromOjOption(e,n,r)}}else{var l=document.createElement("span"),c=this.getTranslatedString("readonlyNoValue");null!==c&&(l.textContent=c),e.parentElement.insertBefore(l,e)}},_initInputLabelFromOjOption:function(e){var i,n,o=e;t(o).uniqueId();var s=o.getAttribute("id"),a=s+"|cb",r=document.getElementById(a);if(null!==r){n=o;do{n=n.parentElement}while(n&&"LABEL"!==n.tagName);if(n&&(o.textContent&&""!==o.textContent?n.classList.remove("oj-helper-hidden"):n.classList.add("oj-helper-hidden")),!this.options.readOnly){var l=o;do{l=l.parentElement}while(l&&!l.classList.contains("oj-choice-item"));l&&l.classList.contains("oj-helper-hidden")&&l.classList.contains("oj-choice-item")&&"SPAN"===l.tagName&&l.classList.remove("oj-helper-hidden"),o&&o.classList.contains("oj-helper-hidden")&&o.classList.remove("oj-helper-hidden"),r&&r.parentElement.classList.contains("oj-helper-hidden")&&r.parentElement.classList.remove("oj-helper-hidden")}}else i=document.createElement("span"),r=document.createElement("input"),n=document.createElement("label"),i.setAttribute("class","oj-choice-item"),r.setAttribute("type","checkbox"),r.setAttribute("value",o.value),r.setAttribute("id",a),n.setAttribute("for",a),o.textContent&&""!==o.textContent||n.classList.add("oj-helper-hidden"),o.parentElement.insertBefore(i,o),n.appendChild(o),i.appendChild(r),i.appendChild(n);var c=this.element[0].id,h=o.getAttribute("aria-label"),d=o.getAttribute("aria-labelledby");r.setAttribute("data-oj-option-id",s),c&&""!==c?r.setAttribute("name",c):r.removeAttribute("name"),h&&""!==h?r.setAttribute("aria-label",h):r.removeAttribute("aria-label"),d&&""!==d?r.setAttribute("aria-labelledby",d):r.removeAttribute("aria-labelledby"),o.disabled?r.setAttribute("disabled",!0):r.removeAttribute("disabled")},_initReadonlyLabelFromOjOption:function(e,i,o){function s(e,t){var i=e.querySelector("span[data-oj-internal]");if(t&&!i){var o=n.getTranslatedString("oj-converter.plural-separator");(i=document.createElement("span")).setAttribute("data-oj-internal",""),i.textContent=o,e.appendChild(i)}else!t&&i&&i.parentElement.removeChild(i)}var a,r=e,l=this.element.hasClass("oj-choice-direction-row"),c=l&&!o;if(i){t(r).uniqueId();var h=r.getAttribute("id")+"|cb",d=document.getElementById(h);null!==d&&d.parentElement.classList.add("oj-helper-hidden"),i.classList.remove("oj-helper-hidden"),s(r.parentElement,c)}else{e.classList.remove("oj-helper-hidden");var u=document.createElement("span");a=document.createElement("label"),r.parentElement.insertBefore(u,r),u.setAttribute("class","oj-choice-item"),a.appendChild(r),s(a,c),l||a.setAttribute("class","oj-checkbox-label"),u.appendChild(a)}},_customOptionRenderer:function(e){var i=e,n=i.getAttribute("id")+"|cb",o=document.getElementById(n);null!==o&&o.classList.contains("oj-checkbox")&&t(o)._ojRadioCheckbox("option","disabled",i.disabled)},_updateLabelledBy:e.EditableValueUtils._updateLabelledBy,_findCheckboxesWithMatchingName:function(){var e,t,n=this.element.find("input[type=checkbox]:first");return 0===n.length&&i.warn("Could not find any input type=checkbox within this element"),void 0===(e=n.attr("name"))?this.element.find("input[type=checkbox]").not("[name]"):(t='input[type=checkbox][name="'+e+'"]',this.element.find(t))},_NotifyContextMenuGesture:function(e,t,i){var n=this.element.find("input[type=checkbox]:tabbable").first();this._OpenContextMenu(t,i,{launcher:n})},_GetMessagingLauncherElement:function(){return this.widget()},_setup:function(){this._propagateDisabled(this.options.disabled),null!==this.$checkboxes&&(1===this.$checkboxes.length?this.element.addClass("oj-checkboxset-single"):this.element.removeClass("oj-checkboxset-single")),this.element.hasClass("oj-choice-direction-column")||this.element.hasClass("oj-choice-direction-row")||this.element.addClass("oj-choice-direction-column"),this._refreshRequired(this.options.required);var e=this.widget();this._updateLabelledBy(e[0],null,this.options.labelledBy,e)},_events:{change:function(e){this._HandleChangeEvent(e)}},_checkValueType:function(e){void 0===e?this.option("value",[],{_context:{writeback:!0,internalSet:!0}}):this._confirmValueIsArray(e)},_confirmValueIsArray:function(e){if(!Array.isArray(e))throw new Error("Invalid 'value' set on JET Checkboxset: "+e+".It must be an Array. ")},_HandleChangeEvent:function(e){var i,n;(n=this.$checkboxes).length>0&&n.each(function(){this===e.target&&t(this)._ojRadioCheckbox("setSelectedClass",e.target.checked)}),i=this._GetDisplayValue(),this._SetValue(i,e,o)},_GetDisplayValue:function(e){return this._GetElementValue()},_SetDisplayValue:function(e){var i,n,o,s,a=this.$checkboxes.length;if(this._checkValueType(e),null==e||0===e.length)this.$checkboxes._ojRadioCheckbox("option","checked",!1);else for(i=0;i<a;i++){o=this.$checkboxes[i],s=t(o),n=this._GetOptionValue(o);var r=this._GetOptionIndex(e,n),l=s._ojRadioCheckbox("option","checked");-1!==r?l||s._ojRadioCheckbox("option","checked",!0):l&&s._ojRadioCheckbox("option","checked",!1)}},_GetElementValue:function(){var e=this,t=[],i=this.$checkboxes.filter(":checked");return 0===i.length?[]:(i.each(function(){t.push(e._GetOptionValue(this))}),t)},_GetOptionIndex:function(t,i){var n,o=t.indexOf(i);if(-1===o){n=t.length;for(var s=0;s<n;s++)if(e.Object.compareValues(t[s],i)){o=s;break}}return o},_GetOptionValue:function(e){var t,i;return this._IsCustomElement()?(t=document.getElementById(e.getAttribute("data-oj-option-id")))&&(i=t.value):i=e.value,i},_GetDefaultStyleClass:function(){return"oj-checkboxset"},_GetContentElement:function(){return null!=this.$checkboxes?this.$checkboxes:(this.$checkboxes=this._findCheckboxesWithMatchingName(),this.$checkboxes)},_AriaRequiredUnsupported:function(){return!0},_AfterSetOptionRequired:e.EditableValueUtils._AfterSetOptionRequired,_propagateDisabled:function(e){var i=!!e;this.$checkboxes.each(function(){t(this).data("oj-_ojRadioCheckbox").__setAncestorComponentDisabled(i)}),this.$checkboxes._ojRadioCheckbox("refreshDisabled")},_setOption:function(t,i,n){var o=this.options.labelledBy;switch(this._super(t,i,n),t){case"disabled":this._propagateDisabled(i);break;case"readOnly":this.options.readOnly=!!i,this._processOjOptions();break;case"value":this._processOjOptions();break;case"labelledBy":var s=this.widget();this._updateLabelledBy(s[0],o,i,s);break;case"options":e.RadioCheckboxUtils.generateOptionsFromData.call(this);break;case"optionsKeys":case"optionRenderer":e.RadioCheckboxUtils.renderOptions.call(this)}},_AfterSetOption:function(e,t,i){switch(this._superApply(arguments),e){case"required":this._AfterSetOptionRequired(e)}},getNodeBySubId:function(e){var t,i,n=this._super(e);if(!n)switch(t=this.$checkboxes.get(),e.subId){case"oj-checkboxset-inputs":n=t;break;case"oj-checkboxset-checkbox":if(void 0!==(i=e.value)){var o,s,a=t.length,r=[];for(o=0;o<a;o++)r[o]=this._GetOptionValue(t[o]);-1!==(s=this._GetOptionIndex(r,i))&&(n=t[s])}}return n||null},getSubIdByNode:function(e){for(var t=this._GetContentElement()[0].parentElement.parentElement.parentElement,i=e;i&&i!==t;){if("LABEL"===i.nodeName&&(i=document.getElementById(i.for)),"INPUT"===i.nodeName)return{subId:"oj-checkboxset-checkbox",value:this._GetOptionValue(i)};i=i.parentElement}return this._super(e)},_destroy:function(){var i=this._super(),n=this.element[0].firstElementChild;return this.$checkboxes&&this.$checkboxes._ojRadioCheckbox("destroy"),t(n).contents().unwrap(),e.RadioCheckboxUtils.removeDataListener.call(this),i}}),s.extension._WIDGET_NAME="ojCheckboxset",s.extension._ALIASED_PROPS={readonly:"readOnly"},e.CustomElementBridge.register("oj-checkboxset",{metadata:s})});