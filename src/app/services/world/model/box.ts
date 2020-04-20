export class Box{

  static PATTERNS = [] ;

  static BOXES = [];

  static PROTECTED_KEYS = [
    'id',
    'key',
    'x',
    'y'
  ];

  static RESOURCES = [
    {
      key : "life",
      nom : "vie"
    },
    {
      key : "water",
      nom :  "eau"
    },
    {
      key : "food",
      nom :  "nourriture"
    },
    {
      key : "material",
      nom :  "materiel"
    },
    {
      key : "faith",
      nom :  "foi"
    },
    {
      key : "actions",
      nom :  "actions"
    },
    {
      key : "xp",
      nom :  "xp"
    }
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
  static ACTIONS_ACTIVE = [
    {
      key : "getWater",
      nom : "puiser de l'eau"
    },
    {
      key: "getFood",
      nom : "chercher de la nourriture"
    },
    {
      key: "getMaterial",
      nom : "couper du bois"
    },
    {
      key: "getFaith",
      nom : "trouver la foi"
    },
    {
      key: "defense",
      nom : "se soigner"
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
  static getRessourceFromKey(key){
    let res = null ;
    for ( let resource of Box.RESOURCES ){
      if ( resource.key == key ){
        res = resource;
        break ;
      }
    }
    return res ;
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
  static getActiveFromKey(key){
    let res = null ;
    for ( let active of Box.ACTIONS_ACTIVE ){
      if ( active.key == key ){
        res = active;
        break ;
      }
    }
    return res ;
  }
  static getActivesFromObj(obj){
    let actives = [] ;
    for ( let i = 0 ; i < Object.keys(obj).length ; i ++ ){
      let active = Box.getActiveFromKey( Object.keys(obj)[i] );
      if ( active ){
        actives.push(active);
      }
    }
    return actives ;
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


  constructor(){}

}
