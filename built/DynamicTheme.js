import * as Selectors from './color-selectors.js';
import { StyleRegistry } from './StyleRegistry.js';
import { darkBaseValue, lightBaseValue } from './Color.js';
import { TinyColor } from './TinyColor.js';
export let styleSheet;
export let cssRules;
let $squareImg;
let borderRadius = 15;
export let colorfull1 = new TinyColor("#00a584");
export let colorfull2 = new TinyColor("#ebbc00");
export let colorfull3 = new TinyColor("#e93666");
// export let schemeColor: Color = new TinyColor("#680317");
export let schemeColor = new TinyColor("#D4D4D4");
export let highlightColor = new TinyColor("#055CB3");
export let baseColor = darkBaseValue;
const lightMutedBaseColor = "#b2b2b2";
const darkMutedBaseColor = "#4D4D4D";
export let mutedBaseColor = darkMutedBaseColor;
export let currentStyle;
let styleRegistry;
// PSEUDO RULES
export let trackScrollbarRule;
export let thumbScrollbarRule;
export let sliderThumbRule;
export let sliderThumbHoverRule;
export let sliderTrackForcusRule;
export let colorSwatchRule;
export let radioLabelHoverRule;
export let radioLabelCheckedRule;
export let radioLabelUncheckedRule;
export let checkboxLabelHoverRule;
export let checkboxNameCheckedRule;
export let checkboxIconCheckedRule;
export let checkboxNameUncheckedRule;
export let checkboxIconUncheckedRule;
let placeholderRule;
let papePilingTooltipRule;
let selectionRule;
let selectionOldFirefoxRule;
let hoverEventsAreSetup = false;
let clickEventsAreSetup = false;
function getStyleSheet() {
    for (let i = 0; i < document.styleSheets.length; i++) {
        let cursheet = document.styleSheets[i];
        if (cursheet.title == 'style')
            styleSheet = cursheet;
    }
}
export function changeStyle(htmlElement, newStyle) {
    currentStyle === null || currentStyle === void 0 ? void 0 : currentStyle.onDisable();
    currentStyle = newStyle;
    // update option buttons
    $('.theme-skin .button-border a').removeClass('active');
    $(htmlElement).children('.pill-button').addClass('active');
    $(".customizer").hide();
    $("body").removeClass();
    currentStyle.onEnable();
}
export function init() {
    getStyleSheet();
    setupCustomizeEvents();
    $squareImg = $(".hero-image .square img");
    cssRules = styleSheet.cssRules || styleSheet.rules;
    // TODO: lazy init
    trackScrollbarRule = cssRules[styleSheet.insertRule(`::-webkit-scrollbar-track {}`)];
    thumbScrollbarRule = cssRules[styleSheet.insertRule(`::-webkit-scrollbar-thumb {}`)];
    placeholderRule = cssRules[styleSheet.insertRule(`.form-control::placeholder {color: ${mutedBaseColor}; opacity: 1;}`)];
    papePilingTooltipRule = cssRules[styleSheet.insertRule(`#pp-nav li .pp-tooltip  {color: ${baseColor}}`)];
    sliderThumbRule = cssRules[styleSheet.insertRule(`::-webkit-slider-thumb {}`)];
    sliderThumbHoverRule = cssRules[styleSheet.insertRule(`::-webkit-slider-thumb:hover {}`)];
    sliderTrackForcusRule = cssRules[styleSheet.insertRule(`input[type=range]:focus {}`)];
    colorSwatchRule = cssRules[styleSheet.insertRule(`::-webkit-color-swatch{}`)];
    radioLabelHoverRule = cssRules[styleSheet.insertRule(`.segmented-control>input:hover+label {}`)];
    radioLabelCheckedRule = cssRules[styleSheet.insertRule(`.segmented-control>input:checked+label {}`)];
    radioLabelUncheckedRule = cssRules[styleSheet.insertRule(`.segmented-control>input:not(:checked)+label {}`)];
    checkboxLabelHoverRule = cssRules[styleSheet.insertRule(` .checkbox input:hover~label i {}`)];
    checkboxNameCheckedRule = cssRules[styleSheet.insertRule(`.checkbox input:checked~label+.name {}`)];
    checkboxIconCheckedRule = cssRules[styleSheet.insertRule(` .checkbox input:checked~label i {}`)];
    checkboxNameUncheckedRule = cssRules[styleSheet.insertRule(` .checkbox input:not(:checked)~label+.name {}`)];
    checkboxIconUncheckedRule = cssRules[styleSheet.insertRule(` .checkbox input:not(:checked)~label i {}`)];
    styleRegistry = new StyleRegistry();
    $("#scheme-color-picker").attr('value', schemeColor.hex);
    $("#highlight-color-picker").attr('value', highlightColor.hex);
    // updateSchemeColor(schemeColor.hex);
    // updateHighlightColor(highlightColor.hex);
    $('#border-radius').attr('value', borderRadius);
    $("#border-radius").next('.range-slider__value').html(borderRadius.toString());
}
function setupCustomizeEvents() {
    $("#color-switcher .pallet-button").on('click', function () {
        $("#color-switcher .color-pallet").toggleClass('show');
        $(this).toggleClass('active');
    });
    setupColorPickerEvents();
    setupRangeSliderEvents();
}
function setupColorPickerEvents() {
    $("#highlight-color-picker").on('input', function (event) {
        updateHighlightColor(event.target.value);
    });
    $("#scheme-color-picker").on('input', function (event) {
        updateSchemeColor(event.target.value);
    });
    $("#colorfull1-picker").on('input', function (event) {
        colorfull1.setHex(event.target.value);
        updateColorfull(1);
    });
    $("#colorfull2-picker").on('input', function (event) {
        colorfull2.setHex(event.target.value);
        updateColorfull(2);
    });
    $("#colorfull3-picker").on('input', function (event) {
        colorfull3.setHex(event.target.value);
        updateColorfull(3);
    });
}
function setupRangeSliderEvents() {
    $("#border-radius").on('input', (event) => {
        const newValue = event.target.value;
        $("#" + event.target.id).next('.range-slider__value').text(newValue);
        switch (event.target.id) {
            case 'border-radius':
                borderRadius = parseInt(newValue);
                break;
        }
        updateBorder();
    });
}
function updateBorder() {
    $(Selectors.borderRadiusSelectors).css('border-radius', borderRadius);
    $('.background-item').css('border-radius', borderRadius * 6); // since its zoom is 1/6
    trackScrollbarRule.style.setProperty('border-radius', `${borderRadius}px`, 'important');
    thumbScrollbarRule.style.setProperty('border-radius', `${borderRadius}px`, 'important');
}
function updateColorfull(colorfullNumber) {
    let colorfull;
    let timelineSelector;
    if (colorfullNumber == 1) {
        colorfull = colorfull1;
        timelineSelector = '#education-timeline';
    }
    if (colorfullNumber == 2) {
        colorfull = colorfull2;
        timelineSelector = '#experience-timeline';
    }
    if (colorfullNumber == 3) {
        colorfull = colorfull3;
        timelineSelector = '#achievements-timeline';
    }
    $(`.colorfull${colorfullNumber}, .background-colorfull${colorfullNumber}>.badge`).css('color', colorfull.hex);
    $(`.background-colorfull${colorfullNumber}`).css('background-color', colorfull.hex);
    $(`.background-colorfull${colorfullNumber}`).css('color', colorfull.getInvertBlackWhite());
    $(`${timelineSelector} .timeline-item`).css('border-left-color', colorfull.hex);
    $(`.badge-pill.background-colorfull${colorfullNumber} .badge`).css('background', colorfull.getInvertBlackWhite());
}
;
function updateHighlightColor(hex) {
    highlightColor.setHex(hex);
    $(Selectors.colorHighlightColorSelectors).css("color", highlightColor.hex);
    $(Selectors.backgroundHighlightColorSelectors).css("background-color", highlightColor.hex);
    setupCommonHoverEvents();
    setupCommonClickEvents();
    currentStyle.onHighlightColorUpdated();
}
function updateSchemeColor(hex) {
    schemeColor.setHex(hex);
    updateBaseColor();
    updateCommonElements();
    updatePseudoElements();
    setupCommonHoverEvents();
    setupCommonClickEvents();
    currentStyle.onSchemeColorUpdated();
}
function setupCommonHoverEvents() {
    // lazily setup
    if (hoverEventsAreSetup)
        return;
    hoverEventsAreSetup = true;
    $(".portfolio .portfolio-icon a, .list-inline.socials li a i, #myMenu li a, .social a i").on('mouseenter', (event) => {
        $(event.currentTarget).css('color', highlightColor.hex);
    });
    $(".social a i").on('mouseleave', function () {
        $(this).css('color', baseColor);
    });
    $(".list-inline.socials li a i, #myMenu li a").on('mouseleave', function () {
        $(this).css('color', 'white');
    });
}
function setupCommonClickEvents() {
    // lazily setup
    if (clickEventsAreSetup)
        return;
    clickEventsAreSetup = true;
    $('#portfolio .pill-button').on('click', function () {
        currentStyle.resetInactiveButtons(this);
    });
}
function updateCommonElements() {
    $(Selectors.backgroundSchemeColorSelectors).css("background-color", schemeColor.hex);
    $(Selectors.colorBaseColorSelectors).css("color", baseColor);
    $(Selectors.backgroundBaseColorSelectors).css("background-color", baseColor);
    $(Selectors.colorMutedBaseColorSelectors).css("color", mutedBaseColor);
}
function updatePseudoElements() {
    thumbScrollbarRule.style.background = schemeColor.hex;
    placeholderRule.style.color = mutedBaseColor;
    papePilingTooltipRule.style.color = baseColor;
}
function updateBaseColor() {
    const lastBaseColor = baseColor;
    baseColor = schemeColor.getInvertBlackWhite();
    mutedBaseColor = (baseColor == lightBaseValue) ? lightMutedBaseColor : darkMutedBaseColor;
    const heroImg = (baseColor == lightBaseValue) ? "light-element_square" : "dark-element_square";
    $squareImg.attr('src', `assets/img/${heroImg}.png`);
    if (lastBaseColor != baseColor) {
        currentStyle.onBaseColorUpdated();
        //TODO: revoke onBaseColorChangedEvent
    }
}
