import * as DynamicTheme from './DynamicTheme.js';
import { Style } from './Style.js';

const backgroundSchemeColorSelectors = [
        ".display-content>.container",
        ".display-content",
        "::-webkit-scrollbar-track",
        "::-webkit-scrollbar-thumb",
];

const colorHighlightColorSelectors = [
        ".button",
        " .checkbox input:checked~label+.name",
        ".checkbox input:checked~label i",
        ".checkbox input:hover~label i",
        ".segmented-control>input:checked+label",
        ".segmented-control>input:hover+label",
];

const colorMutedBaseColorSelectors = [
        ".checkbox input:not(:checked)~label+.name",
        ".checkbox input:not(:checked):not(:hover)~label i",
        ".segmented-control>input:not(:checked):not(:hover)+label"
];

const dropBoxShadowSelectors = [
        //COMMON
        ".toggle .indicator",
        ".button-border",
        ".box-border",
        ".image-border",
        ".badge-border",
        ".setting-button-border",
        ".segmented-control",
        ".hero-03 .personal-image img",
        ".checkbox label",
        ".blog-intro",
        "table",
        "table thead ",
        ".range-slider__value",
        ".setting-panel",
        "::-webkit-slider-thumb",
        ".radio-group .indicator",
        //contact
        ".form-group input:focus",
        ".form-group textarea:focus",
];

const insetBoxShadowSelectors = [
        ".custom-scrollbar",
        ".blog .blog-image .after",
        ".skill-boxes .box-border",
        ".setting-section .scrollable",
        ".timeline-items.box-border",
        ".range-slider__range",
        "::-webkit-scrollbar-track",
        ".checkbox input:checked~label",
        ".button.active",
        ".setting-button.active",
        ".button:hover",
        ".badge-border:hover",
        "table>tbody>tr:hover",
        ".setting-button:hover",
        ".radio-selection",
];

const concaveBoxShadowSelectors = [
        ".skill-box .skillbar",
        // ".form-group",
        "input[type=range]:focus",
        "::-webkit-slider-thumb:hover",
        //CONTACT
        ".form-group input",
        ".form-group textarea",
        ".toggle",
];

const borderSelectors = [
        //COMMON
        ".button",
        ".box-border",
        ".setting-section .setting-panel",
        " .setting-button",
        ".image-border",
        "table",
        ".toggle",
        ".toggle .indicator",
        ".range-slider__range",
        ".range-slider__value",
        "::-webkit-slider-thumb",
        // "::-webkit-scrollbar-track",
        // "::-webkit-scrollbar-thumb",

        // PORTFOLIO
        ".segmented-control", //TODO: set max limit
        ".radio-selection", //TODO: set max limit
        ".checkbox label", //TODO: set max limit

        // BLOG
        ".blog .blog-image .after",
        ".blog .blog-intro ",

        //CONTACT
        // ".contact .form-item .form-group",
        // ".contact #message.toast",
        ".form-group input",
        ".form-group textarea",
]

const surfaceSelectors = [
        ".button",
        ".setting-button",
        ".box-border",
        ".setting-panel",
        ".image-border",
        ".badge-border",
        ".segmented-control",
        ".checkbox label",
        ".blog-intro",
        "  .form-item .form-group",
        ".range-slider__range",
        ".range-slider__value",
        "::-webkit-slider-thumb",
        ".portfolio-single .modal-content",
        "table thead ",
]

enum BorderStyle { solid, double, dotted, dashed }; // order must matchs with id from HTML radio

// REFACTOR: generic singleton
export class NeuStyle extends Style {
        //  Singleton Pattern
        private static _instance: NeuStyle = new NeuStyle();
        private constructor() { super('neu-style') }
        public static get Instance(): NeuStyle {
                NeuStyle._instance ??= new NeuStyle();
                return NeuStyle._instance;
        }

        distanceX: number = 3;
        distanceY: number = 3;
        blur: number = 4;
        spread: number = 0;
        lightenIntensity: number = 6.9;
        darkenIntensity: number = 6.9;
        lightenSchemeColor: string = "#e6e6e6";
        darkenSchemeColor: string = "#c2c2c2";

        dropBoxShadow: string = '';
        insetBoxShadow: string = '';
        pressedBoxShadow: string = '';
        thumbScrollbarBoxShadow: string = '';

        borderWidth: number = 0;
        borderBrightness: number = -6.9;
        // TODO: implement border style
        borderStyle: BorderStyle = BorderStyle.solid;

        //TODO: implement curvature for colorful background
        // negative: concave - 0: flat - positive: convex
        surfaceCurvature: number = 0;
        bgSurface: string = '';

        private backgroundSchemeColorRule?: CSSStyleRule;
        private colorHighlightColorRule?: CSSStyleRule;
        private colorMutedBaseColorRule?: CSSStyleRule;
        private dropBoxShadowRule?: CSSStyleRule;
        private insetBoxShadowRule?: CSSStyleRule;
        private concaveBoxShadowRule?: CSSStyleRule;
        private thumbScrollbarBoxShadowRule?: CSSStyleRule;
        private borderRule?: CSSStyleRule;
        private surfaceRule?: CSSStyleRule;
        private radioIndicatorUncheckedRule?: CSSStyleRule;
        private radioIndicatorCheckedRule?: CSSStyleRule;

        // lazy initializations
        getBackgroundSchemeColorRule = () => this.backgroundSchemeColorRule ?? (this.backgroundSchemeColorRule = this.insertEmptyRule(backgroundSchemeColorSelectors));
        getColorHighlightColorRule = () => this.colorHighlightColorRule ?? (this.colorHighlightColorRule = this.insertEmptyRule(colorHighlightColorSelectors));
        getColorMutedBaseColorRule = () => this.colorMutedBaseColorRule ?? (this.colorMutedBaseColorRule = this.insertEmptyRule(colorMutedBaseColorSelectors));
        getDropBoxShadowRule = () => this.dropBoxShadowRule ?? (this.dropBoxShadowRule = this.insertEmptyRule(dropBoxShadowSelectors));
        getInsetBoxShadowRule = () => this.insetBoxShadowRule ?? (this.insetBoxShadowRule = this.insertEmptyRule(insetBoxShadowSelectors));
        getConcaveBoxShadowRule = () => this.concaveBoxShadowRule ?? (this.concaveBoxShadowRule = this.insertEmptyRule(concaveBoxShadowSelectors));
        getThumbScrollbarBoxShadowRule = () => this.thumbScrollbarBoxShadowRule ?? (this.thumbScrollbarBoxShadowRule = this.insertEmptyRule(['::-webkit-scrollbar-thumb']));
        getBorderRule = () => this.borderRule ?? (this.borderRule = this.insertEmptyRule(borderSelectors));
        getSurfaceRule = () => this.surfaceRule ?? (this.surfaceRule = this.insertEmptyRule(surfaceSelectors));
        getRadioIndicatorUncheckedRule = () => this.radioIndicatorUncheckedRule ?? (this.radioIndicatorUncheckedRule = this.insertEmptyRule(['.radio-group .indicator::before']));
        getRadioIndicatorCheckedRule = () => this.radioIndicatorCheckedRule ?? (this.radioIndicatorCheckedRule = this.insertEmptyRule(['.radio-group .indicator::after']));

        init() {
                this.initRangeSliders();
                // TODO: Init radio button
        }

        onDisable(): void { }

        private initRangeSliders() {
                this.initRangeSlider('#neu-distance-x', this.distanceX);
                this.initRangeSlider('#neu-distance-y', this.distanceY);
                this.initRangeSlider('#blur', this.blur);
                this.initRangeSlider('#neu-spread', this.spread);
                this.initRangeSlider('#light-intensity', this.lightenIntensity);
                this.initRangeSlider('#dark-intensity', this.darkenIntensity);
                this.initRangeSlider('#neu-border-width', this.borderWidth);
                this.initRangeSlider('#neu-border-brightness', this.borderBrightness);
                this.initRangeSlider('#surface-curvature', this.surfaceCurvature);
        }

        //HELPER
        initRangeSlider(selector: string, value: number) {
                const $slider = $(selector);
                $slider.attr('value', value);
                $slider.next('.range-slider__value').html(value.toString());
        }

        setupCustomizeEvents(): void {
                $("#neu-customizer ,range-slider input").on('input', (event) => {
                        const newValue = (event.target as HTMLInputElement).value;
                        $("#" + event.target.id).next('.range-slider__value').text(newValue);
                        switch (event.target.id) {
                                case 'neu-distance-x':
                                        this.distanceX = parseInt(newValue);
                                        break;
                                case 'neu-distance-y':
                                        this.distanceY = parseInt(newValue);
                                        break;
                                case 'blur':
                                        this.blur = parseInt(newValue);
                                        break;
                                case 'neu-spread':
                                        this.spread = parseInt(newValue);
                                        break;
                                case 'light-intensity':
                                        this.lightenIntensity = parseInt(newValue);
                                        break;
                                case 'dark-intensity':
                                        this.darkenIntensity = parseInt(newValue);
                                        break;
                                case 'neu-border-width':
                                        this.borderWidth = parseInt(newValue);
                                        this.updateBorder();
                                        return;
                                case 'neu-border-brightness':
                                        this.borderBrightness = parseInt(newValue);
                                        this.updateBorder();
                                        return;
                                case 'surface-curvature':
                                        this.surfaceCurvature = parseInt(newValue);
                                        this.updateSurface();
                                        return;
                        }
                        this.updateBoxShadows();
                });

                $('#neu-customizer #neu-border-style-options input').on('input', event => {
                        this.borderStyle = parseInt(event.currentTarget.getAttribute('value')!);
                        console.log(this.borderStyle);
                        this.updateBorder();
                });
        }

        onHighlightColorUpdated(): void {
                this.getColorHighlightColorRule().style.setProperty('color', DynamicTheme.highlightColor.hex, 'important');
        }

        onSchemeColorUpdated(): void {
                this.getBackgroundSchemeColorRule().style.setProperty('background', DynamicTheme.schemeColor.hex, 'important');
                this.updateBoxShadows();
                this.updateSurface();
                this.updateBorder();
                this.updateRadio();
        }

        onBaseColorUpdated(): void {
                this.getColorMutedBaseColorRule().style.setProperty('color', DynamicTheme.mutedBaseColor, 'important');
                $('.radio-group label .text').each((index, element) => {
                        element.style.borderColor = DynamicTheme.mutedBaseColor;
                });
        }

        private updateBoxShadows() {
                this.lightenSchemeColor = DynamicTheme.schemeColor.getLighten(this.lightenIntensity);
                this.darkenSchemeColor = DynamicTheme.schemeColor.getDarken(this.darkenIntensity);
                this.dropBoxShadow = `${this.distanceX}px ${this.distanceY}px ${this.blur}px ${this.spread}px ${this.darkenSchemeColor}, -${this.distanceX}px -${this.distanceY}px ${this.blur}px ${this.spread}px ${this.lightenSchemeColor}`;
                this.insetBoxShadow = `inset ${this.distanceX}px ${this.distanceY}px ${this.blur}px ${this.spread}px ${this.darkenSchemeColor}, inset -${this.distanceX}px -${this.distanceY}px ${this.blur}px ${this.spread}px ${this.lightenSchemeColor}`;
                this.pressedBoxShadow = `${this.dropBoxShadow}, ${this.insetBoxShadow}`; // TODO: Does not look good!
                this.thumbScrollbarBoxShadow = `inset -${this.distanceX}px -${this.distanceY}px ${this.blur}px ${this.spread}px ${this.darkenSchemeColor}, inset ${this.distanceX}px ${this.distanceY}px ${this.blur}px${this.spread}px  ${this.lightenSchemeColor}`;

                this.getDropBoxShadowRule().style.setProperty('box-shadow', this.dropBoxShadow, 'important');
                this.getInsetBoxShadowRule().style.setProperty('box-shadow', this.insetBoxShadow, 'important');
                this.getConcaveBoxShadowRule().style.setProperty('box-shadow', this.pressedBoxShadow, 'important');
                this.getThumbScrollbarBoxShadowRule().style.setProperty('box-shadow', this.thumbScrollbarBoxShadow, 'important');

                // const s: number = 0.4; //personal website portfolio scale
                // const scaledDropBoxShadow = `${this.distance / s}px ${this.distance / s}px ${this.blur / s}px ${this.darkenSchemeColor}, -${this.distance / s}px -${this.distance / s}px ${this.blur / s}px ${this.lightenSchemeColor}`;
                // (document.querySelector('#personal-website-portfolio')?.querySelector('.image-border') as HTMLElement).style.setProperty('box-shadow', scaledDropBoxShadow, 'important');
        }

        private updateSurface() {
                const leftSurfaceColor = DynamicTheme.schemeColor.getLighten(this.surfaceCurvature);
                const rightSurfaceColor = DynamicTheme.schemeColor.getDarken(this.surfaceCurvature);
                this.bgSurface = `linear-gradient(145deg, ${leftSurfaceColor}, ${rightSurfaceColor})`
                this.getSurfaceRule().style.setProperty('background', this.bgSurface, 'important');
        }

        private updateBorder() {
                const borderColor: string = DynamicTheme.schemeColor.getLighten(this.borderBrightness);
                const borderStyle: string = `${this.borderWidth}px ${BorderStyle[this.borderStyle]} ${borderColor}`;
                this.getBorderRule().style.setProperty('border', borderStyle);
        }

        private updateRadio() {
                //TODO: Variablize
                const checkBoxShadow = `-4px -2px 4px 0px ${this.lightenSchemeColor}, 4px 2px 8px 0px ${this.darkenSchemeColor}`
                const uncheckBoxShadow = `-4px -2px 4px 0px ${this.darkenSchemeColor}, 4px 2px 8px 0px ${this.lightenSchemeColor}`
                this.getRadioIndicatorCheckedRule().style.setProperty('box-shadow', checkBoxShadow, 'important');
                this.getRadioIndicatorUncheckedRule().style.setProperty('box-shadow', uncheckBoxShadow, 'important');
        }
}