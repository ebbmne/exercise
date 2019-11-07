const postData = require("../../../data/posts-data.js");

Page({
  onLoad: function(option) {
    this.setData({
      ...postData.postList[option.id]
    });
  }
});