/**
 * Created by Qiushuo on 4/22/2016.
 */
var User_Bar = function(user_name){
    var user_bar = this;
    user_bar.current_user = user_name;
    var Login_Sates = {
        NOT_LOGIN: 0,
        LOGIN: 1
    }
    var login_state = Login_Sates.NOT_LOGIN;


    //user bar model
    function user_bar_model(user_id, user_name, login_state){
        var self = this;
        self._user_id = user_id;
        self._user_name = user_name;
        self._login_state = login_state;
        self._json;
    };


    $(document).ready(function(){
        $(".user").hide();

        if(false){
            $(".user").show();
            $(".guest").hide();
        }

        //ko binding
        var user_bar = new user_bar_model(0, user_bar.current_user, Login_Sates.NOT_LOGIN);

        ko.applyBindings(user_bar, $(".user_bar")[0]);

        $("button#Sinup_user ").click(function(){
            //console.log("")
            $("section.fullpage_cover").toggle();
            $("input#widget_type").prop('checked', true);
        });
        $("button#Signin_user").click(function(){
            $("section.fullpage_cover").toggle();
            $("input#widget_type").prop('checked', false);
        });
    })


}

var user_name = $("noscript#info").find("p#cuserid").text();

User_Bar(user_name);