function BlogPost(data) {
    var self = this;

    self.id = data.id;
    self.title = data.title;
    self.url = data.url;
}

function WebServiceViewModel() {

    var baseServiceUrl = 'http://localhost:8085/BlogService';
    var self = this;

    self.id = ko.observable(0);
    self.title = ko.observable('');
    self.url = ko.observable('');

    self.blogPosts = ko.observableArray([]);
    self.editing = ko.observable(false);
    self.selectedPost = null;

    self.add = function () {

        var blogPost = new BlogPost({
            id: self.id(),
            title: self.title(),
            url: self.url()
        });

        if (self.editing()) {
            self.blogPosts.replace(self.selectedPost, blogPost);
            self.update(blogPost);
        } else {
            self.blogPosts.push(blogPost);
            self.create(blogPost);
        }

        self.reset();
    };

    self.edit = function (blogPost) {
        self.id(blogPost.id);
        self.title(blogPost.title);
        self.url(blogPost.url);

        self.editing(true);
        self.selectedPost = blogPost;
    };

    self.create = function (blogPost) {
        $.ajax({
            type: "POST",
            url: baseServiceUrl + "/Post",
            contentType: "application/json",
            data: JSON.stringify(blogPost),
            dataType: "json",
            success: function (data) {
                blogPost.id = data.id;
                self.reset();
            }
        });
    };

    self.read = function () {

        $.ajax({
            url: baseServiceUrl + "/Posts",
            contentType: "application/json",
            accept: "application/json",
            type: "GET",
            success: function (data) {
                $.each(data, function(index, item) {

                    var blogPost = new BlogPost({
                        id: item.id,
                        title: item.title,
                        url: item.url
                    });

                    self.blogPosts.push(blogPost);
                });

                self.reset();
            }
        });
    };

    self.update = function (blogPost) {
        $.ajax({
            url: baseServiceUrl + "/Post",
            type: "PUT",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(blogPost),
            dataType: "json",
            complete: self.reset
        });
    };

    self.delete = function (blogPost) {

        self.blogPosts.destroy(blogPost);

        $.ajax({
            url: baseServiceUrl + "/Post/" + blogPost.id,
            type: "DELETE",
            contentType: "application/json;charset=UTF-8"
        });

        self.reset();
    };

    self.reset = function () {
        self.id(0);
        self.title('');
        self.url('');

        self.editing(false);
        self.selectedPost = null;
    };

    self.read();
}

ko.applyBindings(new WebServiceViewModel());