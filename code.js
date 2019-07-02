var app = new Vue({
  el: "#app",
  
  data: {
    page: "blog",
    drawer: false,
    blogs: [],
    categories: [
      "Daily Life",
      "Dog Problems",
      "Playtime",
      "Excitement",
      "Misc.",
      "All",
    ],
    selectedCategory: "All",
    newTitle: "",
    newCategory: "",
    newName:"",
    newPicture: "",
    newPost:"",
    url: "http://localhost:3000",
    //url: "https://dog-blog-server.herokuapp.com"
    show_delete: false,
    editing: false,
    editId: "",
  },
  created: function () {
    this.loadPosts();
    window.addEventListener("keyup", this.keyEvents);

  },

  methods: {
    keyEvents: function(event){
      console.log(event.which);
      if (event.which == 68) {
        this.show_delete = !this.show_delete
      } else if (event.which == 46 || event.which == 8) {
        this.show_delete = !this.show_delete
      } else {
        this.show_delete = !this.show_delete
      };

    },
    /* newBlog: function () {
      var newBlogPost = {
        title: this.newTitle,
        author: this.newName,
        category: this.newCategory,
        date: new Date(),
        image: this.newPicture,
        text: this.newPost,
      };
      console.log("Post:", newBlogPost)
      if (this.newTitle == "" || this.newCategory == "" || this.newName == "" || this.newPicture == "" || this.newPost== "") {
        return alert("Please enter all required fields.");
      } else {
        this.blogs.push(newBlogPost);
        this.newTitle = "";
        this.newName = "";
        this.newCategory = "";
        this.newPicture = "";
        this.newPost = "";
      };

    }, */
    newBlog: function () {
      var datenum = new Date();
      var req_body = {
        blog: {
          title: this.newTitle,
          author: this.newName,
          category: this.newCategory,
          date: datenum.toString(),
          image: this.newPicture,
          text: this.newPost
        }
      };
      //req body is correct.
      fetch(this.url+"/blogs", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify( req_body )
      }).then(function (response) {
        if (response.status == 201) {
          console.log("Added.");
          app.loadPosts();
          app.newTitle = "";
          app.newName = "";
          app.newCategory = "";
          app.newPicture = "";
          app.newPost = "";
        } else {
          response.json().then(function ( data ) {
          console.log(data);
        });
        };
      });
    },
    clearPost: function () {
      this.newTitle = "";
      this.newName = "";
      this.newCategory = "";
      this.newPicture = "";
      this.newPost = "";
    },
    loadPosts: function () {
      fetch(this.url+"/blogs").then(function (response) {
        response.json().then(function ( data ) {
          app.blogs = data.blogs;
        });
      });
    },
    deletePost: function (postID) {
      console.log("Post ID: ", postID)
      fetch(this.url+"/blogs/"+`${postID}`, {
        method: "DELETE",
      }).then(function (response) {
        if (response.status == 204) {
          console.log("it worked");
          app.loadPosts();
        } else if (response.status == 400) {
          response.json().then(function (data) {
            alert(data.msg);
          });
        };
      });
    },
    editPost: function (postID) {
      this.page = "post";
      this.editing = true;
      this.editId = postID;
      fetch(this.url+"/blogs/"+`${postID}`, {
        method: "GET",
      }).then(function (response) {
        if (response.status == 201){
          response.json().then(function (data) {
            this.newName = data.blog.author;
            this.newTitle = data.blog.title;
            this.newPicture = data.blog.image;
            this.newCategory = data.blog.category;
            this.newPost = data.blog.text;
          });
        } else if (response.status == 400) {
          response.json().then(function (data) {
            alert(data.msg);
          });
        };
      });
    },
    updatePost: function () {
      fetch(this.url+"/blogs/"+`${this.editId}`, {
        method: "PUT",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify( req_body )
      }).then(function (response) {
        if (response.status == 204) {
          console.log("it worked");
          app.loadPosts();
        } else if (response.status == 400) {
          response.json().then(function (data) {
            alert(data.msg);
          });
        };
      });
    }



  },
  computed: {
    sortedPosts: function () {
      if (this.selectedCategory == "All") {
        return this.blogs;
      } else {
        var sorted_post = this.blogs.filter(function(post) {
          return (post.category == app.selectedCategory);
        });
        return sorted_post;
      };
    },
  },
});
