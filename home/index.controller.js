'use strict';
angular.module('app')
    .controller('Home.IndexController', ['$scope','$timeout', 'AuthenticationService', '$location',
    function ($scope, $timeout, AuthenticationService, $location) {
        
      $scope.isShowForm = false;
    
       $scope.AbsoluteImageUrl = "./images.png";
        
     /*
     * On click of add or edit of employee details this method is called to set the form values.
     */
    $scope.showEmployeeDetails = function(type, data){
        if(type === 'Add'){
            $scope.employeeDetails = {};
             $scope.isShowForm = true;
        }else{
            $scope.employeeDetails = data;
            
            if ($scope.employeeDetails.dob != undefined) {
                $scope.employeeDetails.dob = new Date($scope.employeeDetails.dob);
            }
            $scope.isShowForm = true;
        }
    }
            
    $scope.logout= function() {
        $location.path('/login');
    }
    
    /*
     *  On click of save button this method is called save the Employee details.
     */
    $scope.createTrailParts = function () {
        if ($scope.validation($scope.employeeDetails)) {
            $scope.showValidationError = false;
            $scope.errorMessage = '';

             AuthenticationService.saveEmployee($scope.employeeDetails, function (result) {
                if (result === true) {
                    $scope.isShowForm = false;
                } else {
                    $scope.isShowForm = true;
                }
            });                    

     }else {
            $('#validationMessage').html($scope.errorMessage);
            $scope.showValidationError = true;
            $timeout(function () {
                $scope.showValidationError = false;
            }, 3000);
        }

    };
        
    /*
     *  To validate employee feilds
     */        
    $scope.validation = function (data) {
        var validationFlag = true;
        $scope.errorMessage = '';
        if (data !== undefined) {
            if (data.firstName === '' || data.firstName === undefined) {
                $scope.errorMessage += 'Please enter the First Name value <br />';
                validationFlag = false;
            }
            if (data.lastName === '' || data.lastName === undefined) {
                $scope.errorMessage += 'Please enter the Last Name value';
                validationFlag = false;
            }
        } else {
            $scope.errorMessage += 'Could you please enter the form fields';
            validationFlag = false;
        }
        return validationFlag;
    };

    /*
     * On click of cancel retutn to listing page.
     */ 
    $scope.cancelDetails = function () {
        $scope.isShowForm = false;
    };
            
    }]);