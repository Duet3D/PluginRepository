(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["GamepadJogger"],{"./node_modules/cache-loader/dist/cjs.js?!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/plugins/GamepadJogger/Jogger.vue?vue&type=script&lang=js&":function(e,t,o){"use strict";o.r(t);o("./node_modules/core-js/modules/es.array.concat.js"),o("./node_modules/core-js/modules/es.array.filter.js"),o("./node_modules/core-js/modules/es.array.for-each.js"),o("./node_modules/core-js/modules/es.array.splice.js"),o("./node_modules/core-js/modules/es.string.trim.js"),o("./node_modules/core-js/modules/web.dom-collections.for-each.js");var s=o("./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),n=o("./node_modules/@babel/runtime/helpers/esm/typeof.js"),i=o("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),a=o("./node_modules/vuex/dist/vuex.esm.js"),d={plugin:0,gcode:1,move:2,custom:3};t["default"]={data:function data(){return{actions:[],enabled:!1,gamepadName:"",activeControls:[],showSetAction:!1,settingAction:null,moving:!1,showResetDialog:!1,debug:!1,stepList:[.1,1,5,10,20,50,100],stepIndex:2,feedRateList:[1,5,15,30,60,100],feedRateIndex:3,addNewItem:!1,newEntry:{action:"",command:""},lastAction:0}},computed:Object(i["default"])(Object(i["default"])({},Object(a["mapState"])("machine/model",["move","state"])),{},{stepValue:function stepValue(){return this.stepList[this.stepIndex]},feedRateValue:function feedRateValue(){return 60*this.feedRateList[this.feedRateIndex]}}),mounted:function mounted(){this.loadSettings(),setInterval(this.checkGamepad,100)},unmounted:function unmounted(){clearInterval(this.checkGamepad)},methods:Object(i["default"])(Object(i["default"])({},Object(a["mapActions"])("machine",["sendCode"])),{},{buildAction:function buildAction(e,t,o){return{action:e,control:"",type:t,command:o,pressed:!1}},isActionSet:function isActionSet(e){return""!==e},buttonPressed:function buttonPressed(e){return"object"==Object(n["default"])(e)?e.pressed:1==e},setActionDialog:function setActionDialog(e){this.settingAction=e,this.showSetAction=!0},resetSettings:function resetSettings(){var e=this;this.actions=[],this.move.axes.forEach((function(t){e.actions.push(e.buildAction("".concat(t.letter,"+"),d.move)),e.actions.push(e.buildAction("".concat(t.letter,"-"),d.move))})),this.actions.push(this.buildAction("Home X",d.gcode,"G28 X")),this.actions.push(this.buildAction("Home Y",d.gcode,"G28 Y")),this.actions.push(this.buildAction("Home Z",d.gcode,"G28 Z")),this.actions.push(this.buildAction("Home All",d.gcode,"G28")),this.actions.push(this.buildAction("Step +",d.plugin,"step+")),this.actions.push(this.buildAction("Step -",d.plugin,"step-")),this.actions.push(this.buildAction("Feed Rate +",d.plugin,"feed+")),this.actions.push(this.buildAction("Feed Rate -",d.plugin,"feed-")),this.saveSettings(),this.showResetDialog=!1},clearAction:function clearAction(e){e.control=""},loadSettings:function loadSettings(){var e=localStorage.getItem("joggerSettings");e?this.actions=JSON.parse(e):this.resetSettings()},saveSettings:function saveSettings(){localStorage.setItem("joggerSettings",JSON.stringify(this.actions))},generateGCodeMoveCommand:function generateGCodeMoveCommand(e){var t=this;if(!this.moving){this.moving=!0;var o="";e.forEach((function(e){var s=e.action[0],n="+"===e.action[1]?"":"-",i="".concat(n).concat(t.stepValue);o+=" ".concat(s).concat(i)}));var s="M120\nG91\nG1 ".concat(o.trim()," F").concat(this.feedRateValue,"\nG90\nM121");this.debug?console.log(s):this.sendCode(s),this.moving=!1}},generateGCodeCommand:function generateGCodeCommand(e){this.moving||"idle"!==this.state.status||(this.debug?console.log(e.command):(this.moving=!0,this.sendCode(e.command),this.moving=!1))},performPluginAction:function performPluginAction(e){if(!(Date.now()-this.lastAction<500))switch(this.lastAction=Date.now(),e.command){case"step+":this.stepIndex<this.stepList.length-1&&(this.stepIndex++,this.sendCode('M117 "Jogger Step :  '.concat(this.stepValue,'"')));break;case"step-":this.stepIndex>0&&(this.stepIndex--,this.sendCode('M117 "Jogger Step :  '.concat(this.stepValue,'"')));break;case"feed+":this.feedRateIndex<this.feedRateList.length-1&&(this.feedRateIndex++,this.sendCode('M117 "Jogger Feed Rate :  '.concat(this.feedRateList[this.feedRateIndex],'"')));break;case"feed-":this.feedRateIndex>0&&this.feedRateIndex--,this.sendCode('M117 "Jogger Feed Rate :  '.concat(this.feedRateList[this.feedRateIndex],'"'));break}},checkGamepad:function checkGamepad(){var e=this,t=navigator.getGamepads?navigator.getGamepads():navigator.webkitGetGamepads?navigator.webkitGetGamepads:[];if(t.length>0&&t[0]){this.gamepadName=t[0].id;var o=t[0];if(this.activeControls=[],o.buttons.forEach((function(t,o){e.buttonPressed(t)&&e.activeControls.push("B".concat(o))})),this.activeAxes="",o.axes.forEach((function(t,o){if(1-Math.abs(t)<.5){var s=t>0?"+":"-";e.activeControls.push("A".concat(o).concat(s))}})),this.actions.forEach((function(e){return e.pressed=!1})),this.settingAction&&this.activeControls.length>0)this.settingAction.control=this.activeControls[0],this.settingAction=null,this.showSetAction=!1,this.saveSettings();else if(this.activeControls.length>0){var n=new Array;if(this.activeControls.forEach((function(t){n.push.apply(n,Object(s["default"])(e.actions.filter((function(e){return e.control===t}))))})),n.forEach((function(e){return e.pressed=!0})),this.debug&&console.log(n),!this.enabled)return;var i=n.filter((function(e){return e.type===d.move}));if(i.length>0)return void this.generateGCodeMoveCommand(i);var a=n.filter((function(e){return e.type===d.gcode||e.type===d.custom}));if(a.length>0)return void this.generateGCodeCommand(a[0]);var c=n.filter((function(e){return e.type===d.plugin}));if(c.length>0)return void this.performPluginAction(c[0])}}},addCustomAction:function addCustomAction(e,t){this.actions.push(this.buildAction(e,d.custom,t)),this.saveSettings(),this.newEntry.action="",this.newEntry.command="",this.addNewItem=!1},removeCustomAction:function removeCustomAction(e){this.actions.splice(e,1),this.saveSettings()}})}},'./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"35d3388f-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/plugins/GamepadJogger/Jogger.vue?vue&type=template&id=0d422489&':function(e,t,o){"use strict";o.r(t),o.d(t,"render",(function(){return render})),o.d(t,"staticRenderFns",(function(){return s}));var render=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",[e._v("Gamepad Name : "+e._s(e.gamepadName))]),o("div",[o("v-switch",{attrs:{inset:"",label:"Enable"},model:{value:e.enabled,callback:function(t){e.enabled=t},expression:"enabled"}})],1),o("v-row",[o("v-col",{attrs:{cols:"6"}},[e._v(" Steps"),o("br"),o("v-btn-toggle",{attrs:{mandatory:"",exclusive:""},model:{value:e.stepIndex,callback:function(t){e.stepIndex=t},expression:"stepIndex"}},e._l(e.stepList,(function(t){return o("v-btn",{key:t},[e._v(" "+e._s(t))])})),1)],1),o("v-col",{attrs:{cols:"6"}},[e._v(" Feed Rate (mm/s)"),o("br"),o("v-btn-toggle",{attrs:{mandatory:"",exclusive:""},model:{value:e.feedRateIndex,callback:function(t){e.feedRateIndex=t},expression:"feedRateIndex"}},e._l(e.feedRateList,(function(t){return o("v-btn",{key:t},[e._v(" "+e._s(t))])})),1)],1)],1),o("v-simple-table",[o("thead",[o("tr",[o("td",[o("h2",[e._v("Configuration")])]),o("td",{staticClass:"cell-right",attrs:{colspan:"4"}},[o("v-btn",{staticClass:"mr-2",on:{click:function(t){e.addNewItem=!0}}},[e._v("New Action")]),o("v-btn",{attrs:{color:"red"},on:{click:function(t){e.showResetDialog=!0}}},[e._v("Reset")])],1)]),o("tr",[o("th",[e._v("Action")]),o("th",[e._v("Set")]),o("th",[e._v("Configure")]),o("th",[e._v("Custom Command")]),o("th",[e._v("Controller Button Id")])])]),o("tbody",e._l(e.actions,(function(t,s){return o("tr",{key:s,staticClass:"action-control",class:{"action-pressed":t.pressed}},[o("td",[e._v(e._s(t.action))]),o("td",[e._v(e._s(e.isActionSet(t.control)))]),o("td",[o("v-btn",{staticClass:"mr-1",attrs:{color:"info"},on:{click:function(o){return e.setActionDialog(t)}}},[e._v("Set")]),o("v-btn",{staticClass:"mr-1",attrs:{color:"warning"},on:{click:function(o){return e.clearAction(t)}}},[e._v("Clear")]),o("v-btn",{directives:[{name:"show",rawName:"v-show",value:3===t.type,expression:"action.type === 3"}],attrs:{color:"error"},on:{click:function(t){return e.removeCustomAction(s)}}},[e._v("Delete")])],1),o("td",[o("span",{directives:[{name:"show",rawName:"v-show",value:3===t.type,expression:"action.type === 3"}]},[e._v(e._s(t.command))])]),o("td",[e._v(e._s(t.control))])])})),0)]),o("v-dialog",{attrs:{"max-width":"325"},model:{value:e.showSetAction,callback:function(t){e.showSetAction=t},expression:"showSetAction"}},[o("v-card",[o("v-card-title",[e._v("Set Action")]),o("v-card-text",[e._v("Press a button or move an axis to set value")]),o("v-card-actions",[o("v-btn",{on:{click:function(t){e.showSetAction=!e.showSetAction}}},[e._v("Cancel")])],1)],1)],1),o("v-dialog",{attrs:{"max-width":"325"},model:{value:e.showResetDialog,callback:function(t){e.showResetDialog=t},expression:"showResetDialog"}},[o("v-card",{attrs:{"max-width":"325",outlined:""}},[o("v-card-title",[e._v("Reset Settings")]),o("v-card-text",[e._v("Click reset to confirm reset.")]),o("v-card-actions",[o("v-btn",{attrs:{color:"red",width:"150"},on:{click:e.resetSettings}},[e._v("Reset")]),e._v(" "),o("v-btn",{attrs:{color:"info",width:"150"},on:{click:function(t){e.showResetDialog=!1}}},[e._v("Cancel")])],1)],1)],1),o("v-dialog",{attrs:{"max-width":"325"},model:{value:e.addNewItem,callback:function(t){e.addNewItem=t},expression:"addNewItem"}},[o("v-card",[o("v-card-title",[e._v("Add New Action")]),o("v-card-text",[o("v-form",[o("v-text-field",{attrs:{label:"Action Name"},model:{value:e.newEntry.action,callback:function(t){e.$set(e.newEntry,"action",t)},expression:"newEntry.action"}}),o("v-textarea",{attrs:{label:"Command","auto-grow":"",filled:""},model:{value:e.newEntry.command,callback:function(t){e.$set(e.newEntry,"command",t)},expression:"newEntry.command"}}),o("v-btn",{on:{click:function(t){return e.addCustomAction(e.newEntry.action,e.newEntry.command)}}},[e._v("Save")]),o("v-btn",{on:{click:function(t){e.addNewItem=!1}}},[e._v("Close")])],1)],1)],1)],1)],1)},s=[]},"./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/plugins/GamepadJogger/Jogger.vue?vue&type=style&index=0&lang=css&":function(e,t,o){},"./src/plugins/GamepadJogger/Jogger.vue":function(e,t,o){"use strict";o.r(t);var s=o("./src/plugins/GamepadJogger/Jogger.vue?vue&type=template&id=0d422489&"),n=o("./src/plugins/GamepadJogger/Jogger.vue?vue&type=script&lang=js&"),i=(o("./src/plugins/GamepadJogger/Jogger.vue?vue&type=style&index=0&lang=css&"),o("./node_modules/vue-loader/lib/runtime/componentNormalizer.js")),a=o("./node_modules/vuetify-loader/lib/runtime/installComponents.js"),d=o.n(a),c=o("./node_modules/vuetify/lib/components/VBtn/VBtn.js"),r=o("./node_modules/vuetify/lib/components/VBtnToggle/VBtnToggle.js"),l=o("./node_modules/vuetify/lib/components/VCard/VCard.js"),u=o("./node_modules/vuetify/lib/components/VCard/index.js"),m=o("./node_modules/vuetify/lib/components/VGrid/VCol.js"),g=o("./node_modules/vuetify/lib/components/VDialog/VDialog.js"),v=o("./node_modules/vuetify/lib/components/VForm/VForm.js"),h=o("./node_modules/vuetify/lib/components/VGrid/VRow.js"),p=o("./node_modules/vuetify/lib/components/VDataTable/VSimpleTable.js"),f=o("./node_modules/vuetify/lib/components/VSwitch/VSwitch.js"),b=o("./node_modules/vuetify/lib/components/VTextField/VTextField.js"),_=o("./node_modules/vuetify/lib/components/VTextarea/VTextarea.js"),j=Object(i["default"])(n["default"],s["render"],s["staticRenderFns"],!1,null,null,null);t["default"]=j.exports,d()(j,{VBtn:c["default"],VBtnToggle:r["default"],VCard:l["default"],VCardActions:u["VCardActions"],VCardText:u["VCardText"],VCardTitle:u["VCardTitle"],VCol:m["default"],VDialog:g["default"],VForm:v["default"],VRow:h["default"],VSimpleTable:p["default"],VSwitch:f["default"],VTextField:b["default"],VTextarea:_["default"]})},"./src/plugins/GamepadJogger/Jogger.vue?vue&type=script&lang=js&":function(e,t,o){"use strict";o.r(t);var s=o("./node_modules/cache-loader/dist/cjs.js?!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/plugins/GamepadJogger/Jogger.vue?vue&type=script&lang=js&");t["default"]=s["default"]},"./src/plugins/GamepadJogger/Jogger.vue?vue&type=style&index=0&lang=css&":function(e,t,o){"use strict";o.r(t);var s=o("./node_modules/mini-css-extract-plugin/dist/loader.js?!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/plugins/GamepadJogger/Jogger.vue?vue&type=style&index=0&lang=css&"),n=o.n(s);for(var i in s)["default"].indexOf(i)<0&&function(e){o.d(t,e,(function(){return s[e]}))}(i);t["default"]=n.a},"./src/plugins/GamepadJogger/Jogger.vue?vue&type=template&id=0d422489&":function(e,t,o){"use strict";o.r(t);var s=o('./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"35d3388f-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/plugins/GamepadJogger/Jogger.vue?vue&type=template&id=0d422489&');o.d(t,"render",(function(){return s["render"]})),o.d(t,"staticRenderFns",(function(){return s["staticRenderFns"]}))},"./src/plugins/GamepadJogger/index.js":function(e,t,o){"use strict";o.r(t);var s=o("./src/routes/index.js"),n=o("./src/plugins/GamepadJogger/Jogger.vue");Object(s["registerRoute"])(n["default"],{Settings:{Jogger:{icon:"mdi-gamepad-variant",caption:"Jogger",path:"/Jogger"}}})}}]);
//# sourceMappingURL=GamepadJogger.2e485424.js.map