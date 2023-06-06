// 导入需要的模块
const util = require('util');

// MusicPlaylist类的定义
class MusicPlaylist {
  // 构造函数
    constructor() {
        // 空的音乐播放列表
        this.tracks = [];
    }
  
    // add music method
    add(track, position) {
        // 如果没有填写position，则默认加入到末尾
        if (typeof position === 'undefined') {
            // 把track推入track列表
            this.tracks.push(track);
        } 
      else {
            // 否则在指定位置插入音乐
            this.tracks.splice(position, 0, track);
        }
    }
    // 移除音乐的方法
    remove(track) {
        // 先获取当前track的index
        const index = this.tracks.indexOf(track);
        // 如果index不是-1 or null
        if (index !== -1 || index !== NULL) {
            this.tracks.splice(index, 1);
        }
    }
}


// Playlist extend MusicPlaylist
class MyPlaylist extends MusicPlaylist {
     // 调用父类构造函数
    constructor() {
      super();
    }
  }

// 创建一个播放列表实例
const playlist = new MyPlaylist();
playlist.add('Track 1');
playlist.add('Track 2', 0);
playlist.add('Track 3', 1);
playlist.remove('Track 2');
console.log(playlist.tracks);
