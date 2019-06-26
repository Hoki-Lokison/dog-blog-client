var app = new Vue({
  el: "#app",

  data: {
    page: "blog",
    drawer: false,
    blogs: [
      {
        title: "Day in the Woods", author: "Robin",
        category: "Misc.",
        date: "Wed Jun 26 2019 11:03:30 GMT-0600 (Mountain Daylight Time)",
        image: "https://images.unsplash.com/photo-1540180573456-803776ac2ac3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
        text: "Rodger taking a rest during our walk today in the forest near my house."
      },
      {
        title: "Summer Day Fun",
        author: "Hoki",
        category: "Dog Problems",
        date:"today",
        image:"https://images.unsplash.com/photo-1505556416927-8a8666cf4a1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1833&q=80",
        text:"It's just too darn hot today, and that calls for a nice relaxing nap to pass the time. Jojo decided to come out and sit on her favorite chair."
      },
      {
        title: "Would You Look at That",
        author: "Jim",
        category: "Daily Life",
        date:"August 5, 2017",
        image:"https://images.unsplash.com/photo-1504971830027-6b7256b5bb2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        text:"What a neat and unexpected photo! Chili was looking very cute today and came to jump up on my lap. I couldn't resist taking the shot!"
      },
      {
        title: "The end of Stick Fren",
        author: "Richard",
        category: "Playtime",
        date:"today",
        image:"https://images.unsplash.com/photo-1540690280903-410fcab2ab47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        text:"Rex finished chewing up his stick today. At least we had a good run with it!"
      },
      {
        title: "LA Airport",
        author: "Susan",
        category: "Excitement",
        date:"June 5, 2019",
        image:"https://images.unsplash.com/photo-1554346219-e09faf34555a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        text:"Pablo is so excited for his first plane ride! Just a cute selfie while we are waiting to board. "
      },
    ],
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
  },


  methods: {
    newBlog: function () {
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

    },
    clearPost: function () {
      this.newTitle = "";
      this.newName = "";
      this.newCategory = "";
      this.newPicture = "";
      this.newPost = "";
    },


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
