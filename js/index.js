(function(){

    var mininum_threads = 10;
    function info(command, num){
        this.Backend_commend = command;
        this.number = num;

    }

    function main_view(title, user, content){
        var self = this;
        self.filter_choices = {
            HOSTEST: 1,
            LATEST: 2,
            REPLIED: 3,
            RECOMMENTED: 4}
        self.current_choice =

            self.title = title;

        self.getHottest = function(){
            //get hottest
        }

        self.getLatest = function(){
            //get lastest
        }
    }

    function Thread_collection(Thread_list){
        var self = this;
        self._thread_array = Thread_list;
    }

    function ThreadPreview(title, user, reply_num, comments_num){
        var self = this;

        self._thread_id;
        self._title = title;
        self._submitter = user;
        self._replies = reply_num;
        self._comments = comments_num
    }


    $(document).ready(function(){
        $("a.addThread").click(function(e){
            if(!$(e).hasClass("createThread")||!$(e).parent().hasClass("createThread")){
                $(".createThread").toggle();
            }

        })
    });

})()