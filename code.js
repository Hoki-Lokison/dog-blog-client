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
    secret_keycode: "",

  },
  created: function () {
    this.loadPosts();
    window.addEventListener("keyup", this.keyEvents);

  },

  methods: {
    keyEvents: function(event){
      console.log(event.which);
      if (event.which == 68) {
        if (this.secret_keycode = "") {
          this.secret_keycode += "D";
        }
      } else if (event.which == 69) {
        if (this.secret_keycode = "") {
          this.secret_keycode = "DE";
        }
      } else if (event.which == 76) {
        if (this.secret_keycode = "") {
          this.secret_keycode = "DEL";
        }
      } else if (event.which == 46 || event.which == 8) {
        this.secret_keycode = "DEL";
      } else {
        this.secret_keycode = "";
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
    deletePost: function () {
      fetch(this.url+"/blogs"+blog._id, {
        method: "DELETE",
      }).then(function (response) {
        if (response.status == 204) {
          console.log("it worked");
          app.loadPosts;
        } else if (response.status == 400) {
          response.json().then(function (data) {
            alert(data.msg);
          })
        }
      })
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
    show_delete: function () {
        return this.secret_keycode=="DEL";
    },
  },
});
