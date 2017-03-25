var directives = angular.module('directives', []);

directives.directive('stickyNavigation', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $("#menu").sticky({topSpacing: -1, resposiveWidth: true, zIndex: 100});
        }
    }
});

directives.directive('openMenu', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var desktopNav = $('.navigation-menu');
            var mobileNav = $('.mobile-menu');
            var nav;
            var span = element.find('span');
            if (window.innerWidth >= 900) {
                nav = desktopNav;
            } else {
                nav = mobileNav;
                nav.css('width', '40%');
            }
            setTimeout(function () {
                span.html('  <i class="fa fa-angle-double-right" aria-hidden="true"></i>');
                nav.addClass('bounceOutLeft');
            }, 200);

            element.on('click', function () {
                nav.addClass('animated');
                nav.css('display', 'block');
                if (nav.hasClass('bounceOutLeft')) {
                    setTimeout(function () {
                        var text = attrs['openMenu'];
                        span.html(' <i class="fa fa-angle-double-left" aria-hidden="true"></i>');
                    }, 500);
                    nav.removeClass('bounceOutLeft');
                    nav.addClass('bounceInLeft');
                    var ul = nav.children();
                    var li = ul.children();
                    var a = li.children();
                    a.on('click', function () {
                        setTimeout(function () {
                            var text = attrs['openMenu'];
                            span.html(' <i class="fa fa-angle-double-right" aria-hidden="true"></i>');
                        }, 500);
                        nav.removeClass('bounceInLeft');
                        nav.addClass('bounceOutLeft');
                    });
                } else if (nav.hasClass('bounceInLeft')) {
                    setTimeout(function () {
                        var text = attrs['openMenu'];
                        span.html('  <i class="fa fa-angle-double-right" aria-hidden="true"></i>');
                    }, 500);
                    nav.removeClass('bounceInLeft');
                    nav.addClass('bounceOutLeft');
                }
            });
        }
    }
});

directives.directive('preloader', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(document).ready(function () {
                setTimeout(function () {
                    $('.preloader')
                        .fadeOut('slow');
                    $('.container')
                        .fadeIn('slow');
                    $('#menu')
                        .fadeIn('slow');
                }, 1000);

            });
        }
    }
});

directives.directive('projectBackground', function () {
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var backgroundSrc = attrs['projectBackground'];

            element.css('width', '100%');
            element.css('height', '100%');
            element.css('position', 'absolute');
            element.css('background', 'url("' + backgroundSrc + '")');
            element.css('background-repeat', 'no-repeat');
            element.css('background-position', 'center');
            element.css('transition', 'all linear 0.2s');
            element.css('background-size', 250 + '%');
            var parent = element.parent();
            parent.parent().css('flex-grow',Math.floor(getRandomArbitrary(1,10)));

            $(parent).hover(
                function () {
                    element.css('background-size', 230 + '%');
                }, function () {
                    element.css('background-size', 250 + '%');
                });


        }
    }
});

directives.directive('ngMaskPhone', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $("#phone").mask("+9(999) 999-99-99");
        }

    }
});