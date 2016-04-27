var Thread = function(){


//sample json


    var thread_sample = {
        current_user: "not_john_smith",
        user_name: "john smith",
        submit_time: 10,
        score: 10,
        content: "You know, whatever that is ?",
        comment_block:
            [
                {
                    user_name: "amy doe",
                    submit_time: 20,
                    score: 1,
                    content: "Good"
                },
                {
                    user_name: "amy doe",
                    submit_time: 20,
                    score: 1,
                    content: "Good"
                }
            ]
    };


    function request_Thread_JSON(thread_id){
        this.request = "get_Thread_by_id",
            this.Thread_id = thread_id
    }

    var sortbycomments = function(left, right){
        return left._comment_list().length == right._comment_list().length ? 0 : (left._comment_list().length < right._comment_list().length ? -1 : 1);
    };

    var sortbyscore = function(left, right){
        return left._likes == right._likes ? 0 : (left._likes < right._likes ? -1 : 1);
    };

    function pastTime(old_time, current_time){
        var time_last ={
            "second" : " seconds ago",
            "minute" : " mintes ago",
            "hour": " hours ago",
            "day": " days ago",
            "month": "monthes ago",
            "year": "years ago",
            "second-offset": 6,
            "mintes-offset": 5
        };

        var result;

        if(old_time.getFullYear()!= current_time.getFullYear()){
            var year_differ = current_time.getFullYear() - old_time.getFullYear();
            result = year_differ + time_last.year;
        }
        if(old_time.getMonth()!=current_time.getMonth()){
            var month_differ = current_time.getMonth() - old_time.getMonth();
            result = month_differ + time_last.month;
        }
        if(old_time.getDay()!=current_time.getDay()){
            var day_differ = current_time.getDay()- old_time.getDay();
            result = day_differ + time_last.day;
        }
        if(old_time.getHours()!=current_time.getHours()){
            var hour_differ = current_time.getHours() - old_time.getHours();
            result = hour_differ + time_last.hour;
        }
        if(old_time.getMinutes()!=current_time.getMinutes()){
            var minutes_differ = current_time.getMinutes() - old_time.getMinutes();
            result = minutes_differ + time_last.mintues;
        }

        return result;
    }

//


    function user_info_viewmodel(user_name){
        this._current_user = user_name;
    }

    function thread_viewmodel(user_name, user_image, like, entry, comment_list, filter, order, json, voted_users){
        var self = this;
        self.AUTHORIZTION_TYPE = ["Guest", "Author", "User"];
        self._id;
        self._current_user = "Jack";
        self._user_name = user_name;
        self._user_image_url = user_image;
        self._likes = ko.observable(like);
        self._vote_by = ko.observableArray(voted_users);
        self._entry = ko.observable(entry);
        self._comment_list = ko.observableArray(comment_list);
        self._authorization;
        self._filter = filter;
        self._order = order;
        self._posted_time;
        self._voted_user = ko.observableArray();

        //
        self._current_reply = ko.observable("");

        self._json = json;

        self.updateBackend = function(){
            var updatedJSON = ko.mapping.toJSON(self);
            $.ajax({
                type: "POST",
                url: url,
                data: updatedJSON,
                success: success,
                dataType: 'json'
            });
        }

        self.reply2Thread = function(){
            var replay_date = new Date();
            var replay_date_string;
            var reply_content = this._current_reply();
            console.log(reply_content);
            var current_time = new Date();
            var reply = new comment_viewmodel(this._current_user, undefined, 0, false, false, reply_content, false, this, current_time)
            self._comment_list.push(reply);


            self.updateBackend();
        };

        self.reply2comment = function(comment){
            var replay_date = new Date();
            var replay_date_string;
            var reply_content;
            var reply = new comment_viewmodel
            self._comment_list.push(this._current_user, undefined, 0, false, false, false, reply_content);

            self.updateBackend();
        };

        self.upvote = function(){
            self._likes(self._likes()+1);

            self.updateBackend();
        };

        self.downvote = function(){
            self._likes(self._likes()-1);

            self.updateBackend();
        };

        self.resetReply = function(){
            //
            self._current_reply("");

            self.updateBackend();
        };

        self.reverseSort = function(){
            self._comment_list.reverse();

            self.updateBackend();
        };
        self.deleteComment = function(item){
            //console.log(item);
            var entry = item._entry();
            console.log(entry);
            self._comment_list.remove(function(item){
                return item._entry() == entry;
            });
            //self._comment_list.removeAll();

            self.updateBackend();
        };
        //load from Json
        self.loadFromJson = function(){
            var thread_id = getQueryVariable(id);
            var request = request_JSON(thread_id);
            var request_json = ko.toJSON(request)
            $.ajax({
                type: "POST",
                url: url,
                data: request_json,
                success: function(data){
                    self = ko.mapping.fromJSON(data);
                },
                dataType: 'json'
            });
        };

        self.testLoadJSON = function(){
            var result;
            $.ajax({
                type: "GET",
                url: url,
                data: request_json,
                success: function(data){
                    self = ko.mapping.fromJSON(data);
                },
                dataType: 'json'
            });
        }
    }


    function comment_viewmodel(user_id, user_image, like, saved, edit, entry, parent, thread, posted_time){
        this._id;
        this._user_name = ko.observable(user_id);
        this._user_image_url = user_image;
        this._like = ko.observable(like);
        this._entry = ko.observable(entry);
        this._parent = parent;
        this._thread = thread;
        this._reply_num = ko.observable(0);
        this._reply_list = [];
        this._isedited= ko.observable(false);
        this._posted_time = posted_time;
        this._comment_list = ko.observableArray();
        this._current_time = new Date();
        //this._time_past = pastTime(posted_time, this._current_time);

    };
    comment_viewmodel.prototype = {
        upvote: function(){
            this._like(this._like() + 1);
        },
        downvote: function(){
            this._like(this._like() - 1)
        },
        deleteComment: function(item){
            this.comment_list.remove(item);
        }
    }

//ko.applyBindings(new comment_model("john smith", "none", 2, false, false, "something you know"));

    $("a#filter").click(function(){
        $(".filter-types").toggle();
    })

    $("a#sort").click(function(){
        $(".sort-types").toggle();
    })

    function toggleSortingOrder(icon){
        if(icon.hasClass("fa-sort-amount-desc")){
            icon.removeClass("fa-sort-amount-desc");
            icon.addClass("fa-sort-amount-asc");
        }
        else{
            icon.removeClass("fa-sort-amount-asc");
            icon.addClass("fa-sort-amount-desc");
        }
    }





//functions
    function like(item, model){
        item.css("color","red");

    }

    function update(message){

    }



    $(document).ready(function(){

        $("a#sort-order").click(function(){
            toggleSortingOrder($("a#sort-order > i"));
        })

        $("button.edit_button").click(function(){
            $(".comment-view").css("display", "none");
            $(".edit-view").css("display", "flex");
        })

        $("button.submit_change").click(function(){
            $(".comment-view").css("display", "block");
            $(".edit-view").css("display", "none");
        })


        var comment_list = [];
        var comment1 = new comment_viewmodel("mary Sue",undefined, 0, false, false, "hahaha");
        var comment2 = new comment_viewmodel("John Doe",undefined, 1, false, false, "Any way");
        comment_list.push(comment1);
        comment_list.push(comment2);

        var cur_thread = new thread_viewmodel("Joe_Doe",undefined, 0, "anything\n to now",comment_list, false, false, undefined);

        ko.applyBindings(cur_thread, $(".thread")[0]);

        var testJSON = ko.toJSON(cur_thread);
        console.log(testJSON);
    });

}

Thread();
console.log("Thread JS loaded!");

$(document).ready(function(){
    Thread();
});



console.log("Thread JS loaded!");