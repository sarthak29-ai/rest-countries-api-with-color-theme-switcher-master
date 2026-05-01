
 


class HomeCache {
  constructor() {
    this.cache = {
      noCard : 10,
      topSrcoll: 0
    };
  }
  
  getScroll(){
    return this.cache.topSrcoll;
  }
  getCount(){
    
    return this.cache.noCard;
  }
  
  setScroll(scroll){
    this.cache.topSrcoll = scroll;
  }
  setCount(noCard){
    this.cache.noCard = noCard;
  }
}

export const homeCache = new HomeCache();