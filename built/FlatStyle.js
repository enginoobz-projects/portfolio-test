var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';
var lightenIntensity = 5;
var darkenIntensity = 5;
var backgroundHighlightColorSelectors = formatString([
    // ".flat-style .button-border",
    ".radio-selection",
    ".flat-style .portfolio-filter .pill-button.active",
    ".pill-button",
    " .theme-skin .pill-button.active"
]);
var backgroundLightenSchemeColorSelectors = formatString([
    ".flat-style .box-border",
    ".flat-style .image-border",
    ".flat-style .contact .form-item .form-group",
    ".flat-style .segmented-control",
    ".flat-style .checkbox label",
    ".flat-style .pallet-border",
    ".color-pallet",
    ".flat-style .pallet-button"
]);
var colorBaseColorSelectors = formatString([
    ".flat-style .portfolio-filter .pill-button ",
]);
function formatString(selectorsArray) {
    return selectorsArray.join(", ");
}
var FlatStyle = /** @class */ (function (_super) {
    __extends(FlatStyle, _super);
    function FlatStyle() {
        var _this = _super.call(this) || this;
        _this.lightenSchemeColor = "#680317";
        _this.darkenSchemeColor = "#680317";
        return _this;
    }
    Object.defineProperty(FlatStyle, "Instance", {
        get: function () {
            var _a;
            (_a = FlatStyle._instance) !== null && _a !== void 0 ? _a : (FlatStyle._instance = new FlatStyle());
            return FlatStyle._instance;
        },
        enumerable: false,
        configurable: true
    });
    FlatStyle.prototype.onEnable = function () {
        $("body").addClass('flat-style');
        $("#flat-customizer").show();
        this.setupHoverEvents();
        this.setupClickEvents();
        this.updateRadioUI();
        this.update();
    };
    FlatStyle.prototype.onDisable = function () {
        $(" .theme-skin .pill-button:not(.active)").off('mouseenter mouseleave');
    };
    FlatStyle.prototype.setupHoverEvents = function () {
        $(".segmented-control label").off('mouseenter').on('mouseenter', function () {
            var id = $(this).attr("for");
            if (!$("#" + id).prop("checked"))
                $(this).css('color', DynamicTheme.highlightColor.hex);
        });
        $(" .pill-button:not(.active)").off('mouseenter mouseleave').hover(function () {
            // TODO: variablize
            $(this).css('background', DynamicTheme.highlightColor.getDarken(15));
        }, function () {
            // jQuery will alter the style INLINE, so by setting value to null we  get the original value
            $(this).css('background', DynamicTheme.highlightColor.hex);
        });
        $(" .theme-skin .pill-button:not(.active)").off('mouseenter mouseleave').hover(function () {
            $(this).css('background', DynamicTheme.highlightColor.getDarken(15));
        }, function () {
            // jQuery will alter the style INLINE, so by setting value to null we  get the original value
            $(this).css('background', DynamicTheme.highlightColor.hex);
        });
        $(" .pallet-button").off('mouseenter mouseleave');
        $(" .portfolio-filter .pill-button:not(.active)").off('mouseenter mouseleave').hover(function () {
            $(this).css('background', DynamicTheme.highlightColor.hex);
        }, function () {
            // jQuery will alter the style INLINE, so by setting value to null we  get the original value
            $(this).css('background', '');
        });
        $("table>tbody>tr").off('mouseenter mouseleave').hover(function () {
            $(this).css('background', DynamicTheme.highlightColor.hex);
        }, function () {
            $(this).css('background', '');
        });
        $(" .badge-border").off('mouseenter mouseleave');
    };
    FlatStyle.prototype.setupClickEvents = function () {
        $(".segmented-control input").off('click').click(function () {
            $(".segmented-control label[for='" + this.id + "']").css('color', DynamicTheme.baseColor);
            $(".segmented-control input[type='radio']:not(:checked)").each(function () {
                $(".segmented-control label[for='" + this.id + "']").css('color', DynamicTheme.mutedBaseColor);
            });
        });
        $(".checkbox input").off('click').click(function () {
            if (!$(this).prop("checked")) {
                $(this).siblings(".name").css('color', DynamicTheme.mutedBaseColor);
            }
            else {
                $(this).siblings(".name").css('color', DynamicTheme.highlightColor.hex);
            }
        });
    };
    FlatStyle.prototype.update = function () {
        this.updateColor();
        DynamicTheme.trackScrollbarRule.style.background = this.lightenSchemeColor;
        DynamicTheme.thumbScrollbarRule.style.background = this.darkenSchemeColor;
        DynamicTheme.sliderThumbRule.style.boxShadow = 'none';
        DynamicTheme.sliderThumbFocusRule.style.boxShadow = 'none';
    };
    //TODO: Separate update functions for highlight, scheme, colorfull elements
    FlatStyle.prototype.updateColor = function () {
        this.lightenSchemeColor = DynamicTheme.schemeColor.getLighten(lightenIntensity);
        this.darkenSchemeColor = DynamicTheme.schemeColor.getDarken(darkenIntensity);
        $(backgroundLightenSchemeColorSelectors).css('background-color', this.lightenSchemeColor);
        $(backgroundHighlightColorSelectors).css('background-color', DynamicTheme.highlightColor.hex);
        $(".flat-style :not(.portfolio-filter) .pill-button").css('color', DynamicTheme.highlightColor.getInvertBlackWhite());
        $("#flat-skin-button .pill-button").css('background-color', DynamicTheme.highlightColor.getDarken(15));
        $(colorBaseColorSelectors).css('color', DynamicTheme.baseColor);
    };
    FlatStyle.prototype.updateRadioUI = function () {
        $("input[type='radio']:checked").each(function () {
            $("label[for='" + this.id + "']").css('color', DynamicTheme.highlightColor.getInvertBlackWhite());
        });
        $("input[type='radio']:not(:checked)").each(function () {
            $("label[for='" + this.id + "']").css('color', DynamicTheme.mutedBaseColor);
        });
    };
    FlatStyle.prototype.updateCheckboxUI = function () {
        $("input[type='checkbox']:checked").each(function () {
            $("label[for='" + this.id + "'] i").css('color', DynamicTheme.highlightColor.hex);
            $("label[for='" + this.id + "']").next().css('color', DynamicTheme.highlightColor.hex);
        });
        $("input[type='checkbox']:not(:checked)").each(function () {
            $("label[for='" + this.id + "'] i").css('color', DynamicTheme.mutedBaseColor);
            $("label[for='" + this.id + "']").next().css('color', DynamicTheme.mutedBaseColor);
        });
    };
    FlatStyle.prototype.resetUncheckedButtons = function (currentCheckedButton) {
        $('#portfolio .pill-button').not(currentCheckedButton).css('background', 'transparent');
    };
    return FlatStyle;
}(Style));
export { FlatStyle };
