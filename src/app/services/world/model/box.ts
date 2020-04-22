export class Box{

  static lastUpdate = new Date().getTime() ;


  static BOXES = [];

  static PROTECTED_KEYS = [
    'id',
    'key',
    'x',
    'y'
  ];

  static SKILLS = [
    {
      key : "attack",
      nom : "attaque"
    },
    {
      key : "defense",
      nom :  "défense"
    },
    {
      key : "getWater",
      nom :  "sourcier"
    },
    {
      key : "getFood",
      nom :  "chasseur cueilleur"
    },
    {
      key : "getMaterial",
      nom :  "bûcheron"
    },
    {
      key : "getFaith",
      nom :  "prier"
    }
  ];


  static isProtectedKey(key){
    let isProtected = false ;
    for ( let pk of Box.PROTECTED_KEYS ){
      if ( pk == key ){
        isProtected = true ;
        break ;
      }
    }
    return isProtected;
  }
  static getSkillFromKey(key){
    let res = null ;
    for ( let skill of Box.SKILLS ){
      if ( skill.key == key ){
        res = skill;
        break ;
      }
    }
    return res ;
  }
  static isInPositionOf(key, x, y){
    let bool = false ;
    for ( let box of Box.BOXES ){
      if ( box.key == key && box.x == x && box.y == y ){
        bool = true ;
        break ;
      }
    }
    return bool ;
  }

  static reset(){
    while ( Box.BOXES.length > 0 ){
      Box.BOXES.splice(0,1);
    }
  }
  static adds(boxesJson, callBack){
    for ( let box of boxesJson ){
        Box.BOXES.push(box);
    }
    callBack(boxesJson);
  }
  static updateValues(array, callBack){

    let updateds = [] ;
    for ( let keyVal of array ){
      for ( let box of Box.BOXES ){
        if ( 'id' in box && box.id == keyVal.id ){
          box[keyVal.key] = keyVal.value ;
          Box.lastUpdate = new Date().getTime();
        }
      }
    }

  }
  static updatePositions(array, callBack){
    let updateds = [] ;
    for ( let keyVal of array ){
      let found = false ;
      for ( let box of Box.BOXES ){
        if ( 'id' in box && box.id == keyVal.id ){
          box.x = keyVal.x ;
          box.y = keyVal.y ;
          updateds.push(box);
          found = true ;
        }
      }
      if ( !found ){
        keyVal.state = "notfound";
        updateds.push(keyVal);
      }
    }
    callBack(updateds);
  }

  static removeByPosition(x,y){
    for ( let i = Box.BOXES.length-1 ; i >= 0 ; i -- ){
      let box = Box.BOXES[i] ;
      if ( 'x' in box && 'y'in box && box.x == x && box.y == y ){
        Box.BOXES.splice(i, 1);
      }
    }
  }
  static removeById(id){
    for ( let i = Box.BOXES.length-1 ; i >= 0 ; i -- ){
      let box = Box.BOXES[i] ;
      if ( 'id' in box && box.id == id ){
        Box.BOXES.splice(i, 1);
      }
    }
  }
  static removeByIds(ids){
    for ( let id of ids ){
      Box.removeById(id);
    }
  }

  constructor(){}

}
