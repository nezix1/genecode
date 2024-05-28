(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    let openLinkedSpoiler = null;
    $("body").on("click", ".spoller__button", (function() {
        const el = $(this);
        const show = el.attr("data-show");
        const hasOverlay = el.hasClass("spoller__button--with-overlay");
        if (1 == show) {
            el.attr("data-show", 0);
            el.next(".spoller__content").slideUp(300);
            if (hasOverlay) $("html").removeClass("lock spoller-open");
            if (el.hasClass("spoller__linked")) openLinkedSpoiler = null;
        } else {
            if (null !== openLinkedSpoiler) {
                openLinkedSpoiler.attr("data-show", 0);
                openLinkedSpoiler.next(".spoller__content").slideUp(300);
            }
            el.attr("data-show", 1);
            el.next(".spoller__content").slideDown(300);
            if (hasOverlay) $("html").addClass("lock spoller-open");
            if (el.hasClass("spoller__linked")) openLinkedSpoiler = el;
        }
    }));
    $("body").on("click", ".spoller__overlay", (function() {
        $(".spoller__button").each((function() {
            const el = $(this);
            if (1 == el.attr("data-show")) {
                el.attr("data-show", 0);
                el.next(".spoller__content").slideUp(300);
            }
        }));
        $("html").removeClass("lock spoller-open");
        $(".spoller__button").removeClass("active");
        openLinkedSpoiler = null;
    }));
    $("body").on("click", ".mobile-menu__button", (function() {
        const el = $(this);
        el.closest("li").find(".mobile-menu__submenu").show(300);
    }));
    $("body").on("click", ".mobile-menu__back", (function() {
        const el = $(this);
        el.closest(".mobile-menu__submenu").hide(300);
    }));
    $("body").on("click", ".icon-menu-mobile", (function() {
        $(".mobile-menu__submenu").hide();
    }));
    $("body").on("click", ".tab", (function() {
        const el = $(this);
        $(".tab--active").removeClass("tab--active");
        el.addClass("tab--active");
        const tabId = $("#" + el.attr("rel"));
        $(".tab__content--active").removeClass("tab__content--active");
        $(tabId).addClass("tab__content--active");
    }));
    $("body").on("click", ".menu__icon.icon-menu", (function() {
        $("html").toggleClass("lock, menu-open");
    }));
    $("body").on("click", ".counter__increment", (function() {
        var $counterInput = $(this).closest(".counter").find(".counter__input");
        var value = parseInt($counterInput.val());
        var minAmount = parseInt($counterInput.attr("min_amount"));
        if (isNaN(minAmount)) minAmount = 1;
        value = value < minAmount ? minAmount : value + 1;
        $counterInput.val(value);
    }));
    $("body").on("click", ".counter__decrement", (function() {
        var $counterInput = $(this).closest(".counter").find(".counter__input");
        var value = parseInt($counterInput.val());
        var minAmount = parseInt($counterInput.attr("min_amount"));
        if (isNaN(minAmount)) minAmount = 1;
        value = value > minAmount ? value - 1 : minAmount;
        $counterInput.val(value);
    }));
    $("body").on("change", ".counter__input", (function() {
        var value = parseInt($(this).val());
        var minAmount = parseInt($(this).attr("min_amount"));
        if (isNaN(minAmount)) minAmount = 1;
        value = isNaN(value) || value < minAmount ? minAmount : value;
        $(this).val(value);
    }));
    $("body").on("change", ".radio__input", (function() {
        const parent = $(this).closest(".radio");
        parent.find(".radio__input").not(this).prop("checked", false);
        var value = $(this).val();
        parent.attr("value", value);
    }));
    $("body").on("click", ".popup__open-button", (function() {
        const popupId = $("#" + $(this).attr("rel"));
        $(popupId).addClass("popup--show");
        $("html").addClass("lock");
    }));
    $("body").on("click", ".popup__overlay, .popup__close", (function() {
        $(this).closest(".popup").removeClass("popup--show");
        if (!$(".popup").hasClass("popup--show")) $("html").removeClass("lock");
    }));
    $("body").on("click", ".menu__overlay", (function() {
        $("html").removeClass("menu-open");
    }));
    $(document).keyup((function(e) {
        if (27 == e.keyCode) {
            $("html").removeClass("menu-open");
            if ($(".popup--secondary").hasClass("popup--show")) $(".popup--secondary").removeClass("popup--show"); else $(".popup").removeClass("popup--show");
            if (!$(".popup").hasClass("popup--show")) $("html").removeClass("lock");
        }
    }));
    $(document).ready((function() {
        $("._select").select2({
            minimumResultsForSearch: -1
        });
        $("._form-select").select2({
            minimumResultsForSearch: -1,
            allowClear: true
        });
    }));
    $(window).scroll((function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 100) {
            $("header").addClass("header--scroll");
            $(".header__mobile").addClass("header__mobile--scroll");
            $(".bottom-menu").addClass("bottom-menu--scroll");
        } else {
            $("header").removeClass("header--scroll");
            $(".header__mobile").removeClass("header__mobile--scroll");
            $(".bottom-menu").removeClass("bottom-menu--scroll");
        }
    }));
    $(document).ready((function() {
        $("input.input-date").flatpickr({
            minDate: "today",
            disableMobile: "true"
        });
        $("input.input-time").flatpickr({
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            time_24hr: true,
            minTime: "8:00",
            maxTime: "22:00",
            disableMobile: "true"
        });
        setTimeout((function() {
            $("body").removeClass("_loader");
        }), 1e3);
    }));
    $(document).ready((function() {
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        function showTooltip($tooltipWrapper) {
            $tooltipWrapper.addClass("show");
        }
        function hideTooltip($tooltipWrapper) {
            $tooltipWrapper.removeClass("show");
        }
        $(".tooltip__button").each((function() {
            var $button = $(this);
            var $tooltipWrapper = $button.find(".tooltip__wrapper");
            if (isMobile) $button.on("click", (function(event) {
                event.preventDefault();
                if ($tooltipWrapper.hasClass("show")) hideTooltip($tooltipWrapper); else {
                    $(".tooltip__wrapper").removeClass("show");
                    showTooltip($tooltipWrapper);
                }
            })); else {
                $button.hover((function() {
                    showTooltip($tooltipWrapper);
                }), (function() {
                    hideTooltip($tooltipWrapper);
                }));
                $button.on("focus", (function() {
                    showTooltip($tooltipWrapper);
                }));
                $button.on("blur", (function() {
                    hideTooltip($tooltipWrapper);
                }));
            }
        }));
        $(document).on("click", (function(event) {
            if (!$(event.target).closest(".tooltip__button").length) $(".tooltip__wrapper").removeClass("show");
        }));
    }));
    window["FLS"] = true;
    isWebp();
})();