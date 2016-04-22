/**
 * Created by Qiushuo on 4/22/2016.
 */
var Login_success = {
    request: "user_login",
    state: "success",
    user_name: "John"
}

var Login_fail = {
    request: "user_login",
    state: "failed",
    user_name: null
}

var Signin_success = {
    request: "user_signin",
    state: "success",
    user_name: "John"
}

var Signin_failed = {
    request: "user_signin",
    state: "success",
    user_name: null
}

function SigninInfo(identity_info, password){
    var self = this;
    self._identity_info = ko.observable(identity_info);
    self._password = ko.observable(password);
    self._signin_date; //date
    self.SignIn = function(){
        //console.log("sign in");
        var cur_date = new Date();
        self._signin_date = cur_date;
        var json = ko.toJSON(self);
        console.log(json);
    }
}

function SignupInfo(email, user_name, password){
    var self = this;
    self._email = ko.observable(email);
    self._user_name = ko.observable(user_name);
    self._password = ko.observable(password);
    self.Signup = function(){
        console.log("signup");
        var json = ko.toJSON(self);
        console.log(json);
    }
}

$(document).ready(function(){

    $("#widget_type").bind('change', function () {

        if ($(this).is(':checked'))
        {
            $("#signin-widget").css("display", "none");
            $("#signup-widget").css("display", "flex");
        }
        else
        {
            $("#signin-widget").css("display", "flex");
            $("#signup-widget").css("display", "none");
        }

        var signin_form = new SigninInfo("","","");
        var signup_form = new SignupInfo("","");

        ko.applyBindings(signin_form, $("#signin-widget")[0]);
        ko.applyBindings(signup_form, $("#signup-widget")[0]);

    });

    //

})