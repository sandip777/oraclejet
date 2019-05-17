/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(["ojs/ojcore","jquery","ojs/ojlogger","ojs/ojcomponentcore","ojs/ojeditablevalue"],function(e,t,i,s){"use strict";e.RadioCheckboxUtils={},e.RadioCheckboxUtils.renderOptions=function(){var e=this._optionsDataArray,t=this.element[0];if(e){var i,o="OJ-RADIOSET"===t.tagName?"oj-radioset-wrapper":"oj-checkboxset-wrapper",a=t.querySelector("."+o);if(null==a)(a=document.createElement("div")).className=o,t.appendChild(a);else{var n=a.querySelectorAll(".oj-choice-item");for(i=0;i<n.length;i++){var l=n[i];l.parentNode.removeChild(l)}}var r=this.options.optionRenderer,h=this.options.optionsKeys,d=h&&h.value?h.value:"value";for("function"!=typeof r&&(r=function(e){var t=h&&h.label?h.label:"label",i=document.createElement("oj-option");return i.value=e.data[d],i.textContent=e.data[t],i}),i=0;i<e.length;i++){var c={component:t,index:i,data:e[i]},b=r(c);b&&"OJ-OPTION"===b.tagName&&(b.hasAttribute("data-oj-binding-provider")||b.setAttribute("data-oj-binding-provider","none"),null!==b.value&&void 0!==b.value||(b.value=c.data[d]),a.appendChild(b),s.subtreeAttached(b))}this.refresh()}},e.RadioCheckboxUtils.generateOptionsFromData=function(){var t=this.options.options;if(e.RadioCheckboxUtils.removeDataListener.call(this),t&&e.DataProviderFeatureChecker.isDataProvider(t)){var i,s={description:'The component identified by "'+this.element[0].id+'" is fetching data'},o=e.Context.getContext(this.element[0]).getBusyContext().addBusyState(s);this._optionsDataArray=[];var a=t.fetchFirst()[Symbol.asyncIterator](),n=this,l=function(e){var t;if(e&&e.value){var s=e.value;for(i=0;i<s.data.length;i++)n._optionsDataArray.push(s.data[i]);e.done||(t=a.next().then(l))}return t};a.next().then(l).then(function(){e.RadioCheckboxUtils.renderOptions.call(n),e.RadioCheckboxUtils.addDataListener.call(n),o()},function(){o()})}},e.RadioCheckboxUtils.addDataListener=function(){e.RadioCheckboxUtils.removeDataListener.call(this),this.options.options&&e.DataProviderFeatureChecker.isDataProvider(this.options.options)&&(this._optionsDataProvider=this.options.options,this._optionsDataListener=e.RadioCheckboxUtils.generateOptionsFromData.bind(this),this._optionsDataProvider.addEventListener("refresh",this._optionsDataListener),this._optionsDataProvider.addEventListener("mutate",this._optionsDataListener))},e.RadioCheckboxUtils.removeDataListener=function(){this._optionsDataListener&&(this._optionsDataProvider.removeEventListener("refresh",this._optionsDataListener),this._optionsDataProvider.removeEventListener("mutate",this._optionsDataListener),this._optionsDataProvider=null,this._optionsDataListener=null)},e.__registerWidget("oj._ojRadioCheckbox",t.oj.baseComponent,{version:"1.0.0",defaultElement:"<input>",widgetEventPrefix:"oj",options:{disabled:null,checked:null,type:null},label:function(){return void 0===this.$label&&(this.$label=this._getLabelsForElement()),this.$label},refresh:function(){this._super(),this._setup()},refreshDisabled:function(){this._renderDisabled()},setSelectedClass:function(e){this.element.toggleClass("oj-selected",e),this.$label.toggleClass("oj-selected",e),this.$choiceItem.toggleClass("oj-selected",e)},widget:function(){return this.uiRadioCheckbox},_InitOptions:function(e,t){var i,s;if(this._super(e,t),"checked"in t||(this.initCheckedFromDom=!0,i=!!this.element.prop("checked"),this.option("checked",i,{_context:{internalSet:!0}})),"boolean"!=typeof this.options.checked)throw new Error("checked option must be a boolean");if("disabled"in t||(s=!!this.element.prop("disabled"),this.option("disabled",s,{_context:{internalSet:!0}})),"boolean"!=typeof this.options.disabled)throw new Error("disabled option must be a boolean");"type"in t||this.option("type",this.element.prop("type"),{_context:{internalSet:!0}})},_ComponentCreate:function(){this._super();var e=this.options.type;"checkbox"===e?(this.uiRadioCheckbox=this.element.addClass("oj-checkbox oj-component"),this.$label=this._getLabelsForElement(),this.$label.addClass("oj-checkbox-label")):"radio"===e&&(this.uiRadioCheckbox=this.element.addClass("oj-radio oj-component"),this.$label=this._getLabelsForElement(),this.$label.addClass("oj-radio-label")),this.$choiceItem=this._getChoiceItem();var i=document.createElement("span");i.setAttribute("class","oj-radiocheckbox-icon"),this.element.wrapAll(i);this._focusable(this.element),this._AddHoverable(this.$choiceItem),this._AddActiveable(this.$choiceItem),this._focusable({element:this.$choiceItem,applyHighlight:!0}),this._AddHoverable(this.$label),this._AddActiveable(this.$label),t.each(this.$label,function(){t(this.childNodes).wrapAll("<span class='oj-radiocheckbox-label-text'></span>")}),this._setup()},_SaveAttributes:function(e){this._savedClasses=e.attr("class")},_RestoreAttributes:function(){this._savedClasses?this.element.attr("class",this._savedClasses):this.element.removeAttr("class")},_setup:function(){this._renderDisabled(),this.initCheckedFromDom||this._setCheckedOnDom(this.options.checked),this.options.checked&&this.setSelectedClass(this.options.checked)},_setCheckedOnDom:function(e){e=!!e,this.element.prop("checked",e)},_renderDisabled:function(){this._IsEffectivelyDisabled()?(this.element.prop("disabled",!0).removeAttr("aria-disabled").removeClass("oj-enabled").addClass("oj-disabled"),this.$label.removeClass("oj-enabled").addClass("oj-disabled"),this.$choiceItem.removeClass("oj-enabled").addClass("oj-disabled")):(this.element.prop("disabled",!1).removeAttr("aria-disabled").removeClass("oj-disabled").addClass("oj-enabled"),this.$label.addClass("oj-enabled").removeClass("oj-disabled"),this.$choiceItem.addClass("oj-enabled").removeClass("oj-disabled"))},_setOption:function(e,t){this._superApply(arguments),"disabled"===e&&(t=!!t,this._renderDisabled(t)),"checked"===e&&(this._setCheckedOnDom(t),this.setSelectedClass(t))},_getLabelsForElement:function(){var e,s=this.element.closest("label"),o="label[for='"+this.element.prop("id")+"']",a=t(o);return 0!==s.length&&i.error("Found a label that is an input's ancestor. This is not supported in the ojCheckboxset or ojRadioset component and the component will\nnot work correctly. Use a label as a sibling to the input and use the label 'for' attribute to tie the two together."),0===(a=a.not(s)).length&&(e=this.element.siblings(o),a=a.add(e)),a},_getChoiceItem:function(){var e,t,s,o=null;return(e=this.element.parent())&&(e.hasClass("oj-choice-item")||e.hasClass("oj-choice-row")||e.hasClass("oj-choice-row-inline"))?o=e:(i.warn("The radioset/checkboxset's input and label dom should be wrapped in a dom node with class 'oj-choice-item'. JET is adding this missing dom to make the component work correctly."),"<span class='oj-choice-item oj-choice-item-added'></span>",t="label[for='"+this.element.attr("id")+"']",0!==(s=this.element.siblings().filter(t)).length?(this.element.add(s).wrapAll("<span class='oj-choice-item oj-choice-item-added'></span>"),o=this.element.parent()):(this.element.wrapAll("<span class='oj-choice-item oj-choice-item-added'></span>"),o=this.element.parent())),o},getNodeBySubId:function(e){var t=this._super(e);if(!t){var i=e.subId;"oj-radiocheckbox-input"===i&&(t=this.element[0]),"oj-radiocheckbox-label"===i&&(t=this.label()[0])}return t||null},_destroy:function(){var e=this._super();this._RemoveHoverable(this.$choiceItem),this._RemoveActiveable(this.$choiceItem),this._RemoveHoverable(this.$label),this._RemoveActiveable(this.$label);var i=this.options.type;"checkbox"===i?this.$label.removeClass("oj-enabled oj-disabled oj-selected oj-checkbox-label"):"radio"===i&&this.$label.removeClass("oj-enabled oj-disabled oj-selected oj-radio-label"),this.$choiceItem.removeClass("oj-enabled oj-disabled oj-selected");return t.each(this.$label,function(){var e=this.getElementsByClassName("oj-radiocheckbox-label-text");void 0!==e&&t(e[0].childNodes[0]).unwrap()}),this.element.unwrap(),this.$choiceItem.hasClass("oj-choice-item-added")&&this.element.unwrap(),this.$choiceItem=null,this.$label=null,e}})});