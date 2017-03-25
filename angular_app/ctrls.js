var ctrls = angular.module('ctrls',['services']);

ctrls.controller('MainCtrl',function ($scope,$rootScope,ConnectionService) {

    $scope.changeLanguage = function(){
        if($rootScope.language=='ru'){
            localStorage.setItem('lang','en');
            $rootScope.language = 'en';
        }else {
            localStorage.setItem('lang','ru');
            $rootScope.language = 'ru';
        }
        ConnectionService.loadLanguagePack($rootScope);
    };

    $scope.openLightbox = function (images) {
        var img_options = [];
        angular.forEach(images,function (image) {
           var option = {};
           option.src = image.src;
           option.opts = {};
           if($rootScope.language=="ru"){
               option.opts.caption = image.caption_ru;
           }else {
               option.opts.caption = image.caption_en;
           }

           img_options.push(option);
        });
        $.fancybox.open(
            img_options, {
                loop : true,
                touch: true
            }
        );
    }

    $scope.send = function (user) {
        ConnectionService.sendMessage(user,$rootScope);
        $.fancybox.open(
            {
                src  : '#send',
                type : 'inline'
            },{
                beforeClose : function () {
                    $rootScope.response = undefined;
                }
            }
        )
    }
});

