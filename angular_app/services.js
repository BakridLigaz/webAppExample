var services =angular.module('services',[]);

services.factory('ConnectionService',function ($http) {
   return {
       loadSteps: function (scope) {
            $http({
                method: 'GET',
                url: 'php/steps.php'
            })
                .then(
                    function (res) {
                        scope.steps = res.data;
                    },
                    function (err) {
                        console.log(err);
                    }
                )
       },
       loadProjects: function (scope) {
           $http({
               method: 'GET',
               url: 'php/project.php'
           })
               .then(
                   function (res) {
                       scope.projects = res.data;
                       scope.latestProject = scope.projects[0];
                       console.log(scope.projects);
                       console.log(scope.projects);
                   },
                   function (err) {
                       console.log(err);
                   }
               )
       },
       loadDoList: function (scope) {
           $http({
               method: 'GET',
               url: 'php/do.php'
           })
               .then(
                   function (res) {
                       scope.doList = res.data;
                   },
                   function (err) {
                       console.log(err);
                   }
               )
       },
       loadLanguagePack: function (scope) {

         $http.get('locales/'+scope.language+'.json')
             .then(function (res) {
                 scope.languagePack = res.data;
             },function (err) {
                 alert("language error");
             });
       },
       sendMessage: function (user,scope) {
           $http({
               method: 'POST',
               url: 'php/message.php',
               data: user
           })
               .then(
                   function (res) {
                        if(res.data==1){
                            scope.response = scope.languagePack.sendRequests.send;
                        }else {
                            scope.response = scope.languagePack.sendRequests.notSend;
                        }
                   },
                   function (err) {
                       console.log(err);
                   }
               )
       }
   }
});
