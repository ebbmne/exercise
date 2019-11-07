const postsData = require('../../data/posts-data.js')

Page({
  data: {
    swiperImgs: ["iqiyi.png", "vr.png", "wx.png"]
  },
  onLoad: function() {
    this.setData({
      postsData
    });
  },
  gotoDetail: (event) => {
    const postId = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/post/post-detail/post-detail?id=' + postId,
    })

  }
});