var authSession = null;
var isAuthed = false;
$(document).ready(function() {
    var isMobile = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isMobile = true;
    }

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"))
        return matches ? decodeURIComponent(matches[1]) : undefined
    }
    if (getCookie("hash"))
        isAuthed = true;
    $(".new-modal .back").click(function(e) {
        e.preventDefault();
        if ($(this).parent().hasClass('noncloseable')) return;
        $(this).parent().fadeOut();
    });
    $(".new-modal #close-button").click(function(e) {
        e.preventDefault();
        $(this).parent().parent().fadeOut();
    });
    $('input:file').change(function() {
        if ($(this).val()) {
            $('input:submit').attr('disabled', false);
        }
    });
    $("#exit").click(function(e) {
        e.preventDefault();
        $.get("https://klauncher.ru/back-script/engine/auth.php", {
            action: "logout"
        }).done(function(data) {
            window.location.reload();
        });
    });
    $("#exitFromMenu").click(function(e) {
        e.preventDefault();
        $.get("https://klauncher.ru/back-script/engine/auth.php", {
            action: "logout"
        }).done(function(data) {
            window.location.reload();
        });
    });
    $(".burger").click(function() {
        $(".burger").toggleClass("b-active");
        $(".menu-ul").toggleClass("nav-active");
        $("body").toggleClass("overflow-hidden");
        $(".menu-balance").toggleClass("balance-active");
        $(".menu-notify").removeClass("notify-active");
        if (!$(this).hasClass('b-active')) {
            $(".menu-balance").removeClass("balance-active");
        };
    });
    $('.download-button').click(function(e) {
        $(".modal").fadeOut();
        showDownloadModal();
    });
    $('.bonus-button').click(function(e) {
        $(".modal").fadeOut();
        $("#balance-modal").fadeIn();
        $("#balance-modal .modal-content").show();
        $("#balance-modal .modal-box").hide();
    });
    $('.login-button').click(function(e) {
        $(".modal").fadeOut();
        $("#login-modal").fadeIn();
    });
    $('.register-button').click(function(e) {
        $(".modal").fadeOut();
        $("#register-modal").fadeIn();
    });
    $('.password-reset').click(function(e) {
        $(".modal").fadeOut();
        $("#forgot-password").fadeIn();
    });
    $('.change-email').click(function(e) {
        $(".modal").fadeOut();
        $("#change-email").fadeIn();
    });
    $('.change-password').click(function(e) {
        $(".modal").fadeOut();
        $("#change-password").fadeIn();
    });
    var isShowed = false;
    $('.menu-li-hover').click(function(e) {
        if (e.target == this) {
            if (!isShowed) {
                $(".menu-notify").removeClass("notify-active");
                $(".menu-balance").toggleClass("balance-active");
                isShowed = true;
            } else {
                $(".menu-notify").removeClass("notify-active");
                isShowed = false;
            }
        }
    });
    $('.balance-notify').click(function(e) {
        $(".menu-balance").removeClass("balance-active");
        $(".menu-notify").toggleClass("notify-active");
    });
    $('.notify-bottom').click(function(e) {
        $(".menu-notify").removeClass("notify-active");
        $(".menu-balance").toggleClass("balance-active");
    });
    $('.balance-bottom').click(function(e) {
        $(".menu-balance").removeClass("balance-active");
        $(".modal").fadeOut();
        $("#balance-modal").fadeIn();
    });
    $('.change-nick').click(function(e) {
        $(".modal").fadeOut();
        $("#change-nick").fadeIn();
    });
    $(".mod-f").on('click', function(e) {
        if (e.target == this) {
            $(".modal").fadeOut();
        }
    });
    $(".pop-img").on('click', function() {
        $(".pop-img").removeClass("active");
        $(this).toggleClass("active");
        var id = $(this).attr('id');
        if (id.startsWith("paybonus_")) {
            var bonus = id.replace("paybonus_", "");
            $("#paysum").val(bonus).change();
        }
    });
    $(".minecraft-tags span").on('click', function() {
        $("span").removeClass("active-tags");
        $(this).toggleClass("active-tags");
    });
    $(".quest-help").click(function() {
        $(".quest-help").removeClass("active");
        $(this).toggleClass("active");
    });
    $(".help-tags span").on('click', function() {
        $("span").removeClass("active-tags");
        $(this).toggleClass("active-tags");
        $('[id^="block-help"]').hide();
        var idQee = $(this).attr("id");
        $("." + idQee).show();
    });
    $(".quest-help").click(function() {
        $(".quest-help").removeClass("active");
        $(this).addClass('active');
    });
    $("#addinput").click(function() {
        $('input#promo').show(400);
        $('#reminput').show(400);
        $(this).hide(400);
    });
    $("#reminput").click(function() {
        $('input#promo').hide(400);
        $('#addinput').show(400);
        $(this).hide(400);
    });
    $("#open-nagg").click(function() {
        $(this).hide(400);
        $('#close-nagg').show(400);
        $('.div-nagg').addClass('active');
    });
    $("#close-nagg").click(function() {
        $(this).hide(400);
        $('#open-nagg').show(400);
        $('.div-nagg').removeClass('active');
    });
    $("#close-pok").click(function() {
        $(this).hide(400);
        $('#open-pok').show(400);
        $('.pokypki-all').removeClass('active');
    });
    $("#open-pok").click(function() {
        $(this).hide(400);
        $('#close-pok').show(400);
        $('.pokypki-all').addClass('active');
    });
    $(".block-store").click(function() {
        if (isMobile) {
            if ($(this).hasClass('full')) {
                $(this).toggleClass('full');
                return;
            }
            $(".block-store").removeClass('full');
            $(this).toggleClass('full');
        }
    });
    $('.balance-btn').click(function(e) {
        $(".menu-balance").removeClass("balance-active");
        $(".modal").fadeOut();
        $("#balance-modal").fadeIn();
    });
    $("#refLink").click(function() {
        navigator.clipboard.writeText("https://" + $(this).attr("data-link"));
    });
    $("#buybtn").click(function() {
        if ($(this).hasClass("unauthed")) {
            $(".modal").fadeOut();
            $("#login-modal").fadeIn();
        } else {
            $(".modal").fadeOut();
            $("#buy-item").fadeIn();
        }
    });
    $(document).width();
    $(document).mouseup(function(e) {
        var div = $(".balance-active");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            div.removeClass('balance-active');
        }
    });
    $(document).mouseup(function(e) {
        var div = $(".notify-active");
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            div.removeClass('notify-active');
        }
    });
    $("#paysum").on('input change', function(e) {
        var obj = $(".pop-div").find(".pop-img#paybonus_" + $(this).val());
        $('.pop-div .pop-img').each(function(i) {
            $(this).removeClass("active");
        });
        if (obj.length)
            $(obj).addClass("active");
        if ($.isNumeric($(this).val())) {
            var sum = parseInt($(this).val());
            if (sum <= 0) {
                $("#payhelper").html("");
                $("#payhelper").hide();
                return;
            }
            if (obj.length)
                sum += parseInt($(obj).attr('data-bonus'));
            $("#payhelper").show();
            $("#payhelper").html("Ваш баланс пополнится на " + sum + " руб.");
        } else {
            $("#payhelper").html("");
            $("#payhelper").hide();
        }
    });
    $("#commentShowLogin").click(function(e) {
        $(".modal").fadeOut();
        $("#login-modal").fadeIn();
    });
    $("#commentShowReg").click(function(e) {
        $(".modal").fadeOut();
        $("#register-modal").fadeIn();
    });
    $(".pok").each(function(i, val) {
        $(this).click(function(e) {
            var bid = $(this).attr('data-bid');
            console.log("CLICKED");
            $.ajax({
                url: "https://klauncher.ru/back-script/engine/user.php?action=u_item_info",
                method: "POST",
                data: {
                    item: bid
                },
            }).done(function(result) {
                showInfoModal("Информация о покупке", result);
            });
        });
    });
    $(".modal input").each(function(i, val) {
        $(this).keydown(function(e) {
            var keyCode = (e.keyCode ? e.keyCode : e.which);
            if (keyCode == 13)
                $(this).parents().find("button").first().click();
        });
    });
    $(".carousel-cell").each(function(i, val) {
        $(this).click(function(e) {
            if (!$(this).hasClass("is-selected"))
                return;
            showInfoModal("", $($(this).find("img")).clone());
        });
    });
    $(".scroll-tiles .tile").first().addClass('active');
    $(".scroll-tiles .tile").click(function() {
        var current = $(".scroll-tiles .tile").index(this);
        $(".scroll-tiles .tile").each(function() {
            $(this).removeClass('active');
        });
        $(".news-gl0").each(function() {
            $(this).hide();
        });
        $(this).addClass('active');
        $($(".news-gl0")[current]).show();
    });
});

function showInfoModal(title, content) {
    $("#info-modal #info-title").text(title);
    $("#info-modal #info-content").html(content);
    $(".modal").fadeOut();
    $("#info-modal").fadeIn();
}

function openNotice(_noticeId, _userId) {
    $.get("https://klauncher.ru/back-script/engine/noticeLoader.php", {
        noticeId: _noticeId,
        userId: _userId
    }, function(data) {
        var notice = JSON.parse(data);
        showInfoModal(notice.title, notice.message);
        $(".notify-top").load(location.href + " .notify-top");
    });
}

function deleteNotice(_noticeId, _userId) {
    $(this).parent().fadeOut();
    $.get("https://klauncher.ru/back-script/engine/noticeLoader.php", {
        noticeId: _noticeId,
        userId: _userId,
        mode: 1
    }, function(data) {});
}

function openBalanceModal() {
    $(".modal").fadeOut();
    $("#balance-modal").fadeIn();
}

function togglePassVisibility(callerObject, fieldSelector) {
    $(callerObject).toggleClass("shown");
    $(fieldSelector).each(function() {
        input = $(this);
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else if (input.attr("type") == "text") {
            input.attr("type", "password");
        }
    });
}