(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-input/u-input"],{"15a4":function(t,e,n){"use strict";var i=n("5023"),u=n.n(i);u.a},"1d43":function(t,e,n){"use strict";n.r(e);var i=n("72a2"),u=n("52f0");for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);n("15a4");var o,r=n("f0c5"),l=Object(r["a"])(u["default"],i["b"],i["c"],!1,null,"fd4b50e8",null,!1,i["a"],o);e["default"]=l.exports},5023:function(t,e,n){},"52f0":function(t,e,n){"use strict";n.r(e);var i=n("c9c7"),u=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=u.a},"72a2":function(t,e,n){"use strict";var i={uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"d917"))}},u=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__get_style([t.getStyle])),i=t.__get_style([t.getStyle]);t._isMounted||(t.e0=function(e){t.showPassword=!t.showPassword}),t.$mp.data=Object.assign({},{$root:{s0:n,s1:i}})},a=[];n.d(e,"b",(function(){return u})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}))},c9c7:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=u(n("13ee"));function u(t){return t&&t.__esModule?t:{default:t}}var a={name:"u-input",mixins:[i.default],props:{value:{type:String,default:""},type:{type:String,default:"text"},inputAlign:{type:String,default:"left"},placeholder:{type:String,default:"请输入内容"},disabled:{type:Boolean,default:!1},maxlength:{type:[Number,String],default:140},placeholderStyle:{type:String,default:"color: #c0c4cc;"},confirmType:{type:String,default:"done"},customStyle:{type:Object,default:function(){return{}}},fixed:{type:Boolean,default:!1},focus:{type:Boolean,default:!1},passwordIcon:{type:Boolean,default:!0},border:{type:Boolean,default:!1},borderColor:{type:String,default:"#dcdfe6"},autoHeight:{type:Boolean,default:!0},selectOpen:{type:Boolean,default:!1},height:{type:[Number,String],default:""},clearable:{type:Boolean,default:!0}},data:function(){return{defaultValue:this.value,inputHeight:70,textareaHeight:100,validateState:!1,focused:!1,showPassword:!1,marginRight:0}},watch:{value:function(t,e){this.defaultValue=t,t!=e&&"select"==this.type&&this.handleInput({detail:{value:t}})},focused:function(t){this.clearable&&this.value&&this.getMarginRight()}},computed:{inputMaxlength:function(){return Number(this.maxlength)},getStyle:function(){var t={};return t.minHeight=this.height?this.height+"rpx":"textarea"==this.type?this.textareaHeight+"rpx":this.inputHeight+"rpx",t.marginRight=this.marginRight+"px",t=Object.assign(t,this.customStyle),t}},created:function(){this.$on("on-form-item-error",this.onFormItemError)},mounted:function(){this.getMarginRight()},methods:{getMarginRight:function(){var e=this;this.$nextTick((function(){e.$uGetRect(".u-input__right-icon").then((function(n){e.marginRight=n.width+t.upx2px(20)}))}))},handleInput:function(t){var e=this;this.defaultValue=t.detail.value,this.$emit("input",t.detail.value),this.$nextTick((function(){e.dispatch("u-form-item","on-form-change",t.detail.value)}))},handleBlur:function(t){var e=this;this.focused=!1,this.$emit("blur",t.detail.value),this.$nextTick((function(){e.dispatch("u-form-item","on-form-blur",t.detail.value)}))},onFormItemError:function(t){this.validateState=t},onFocus:function(t){this.focused=!0,this.$emit("focus")},onConfirm:function(t){this.$emit("confirm",t.detail.value)},onClear:function(t){this.$emit("input","")},inputClick:function(){this.$emit("click")}}};e.default=a}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-input/u-input-create-component',
    {
        'uview-ui/components/u-input/u-input-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("1d43"))
        })
    },
    [['uview-ui/components/u-input/u-input-create-component']]
]);
