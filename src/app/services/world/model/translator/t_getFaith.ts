import {Translator} from './translator';
import {Box} from '../box';

export class T_getFaith extends Translator{

  info = "prière" ;
  default = "trouver la foi" ;
  skill = "prêtre" ;

  readKey(){
    return 'getFaith' ;
  }

  asMessage(user, json, language) {

    let message = '' ;

    if ( user.id == json.user ){
      message += `${user.name} a trouvé ${json.power} de foi.`;
    }


    return message ;
  }


  /*asMessage(user, json, language) {

    let message = '' ;
    let userBox = Box.readById(json.user);


    if ( userBox !== null ){

      message = `tu as trouvé ${json.power} de foi avec un D100 de ${json.D100}.`;

    }else{
      message = null ;
    }


    return message ;
  }*/

}
