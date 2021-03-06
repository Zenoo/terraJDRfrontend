import {Action} from './action';
import {Area} from '../../area';
import {Dialog} from '../../../dialog';
import {GetResourceComponent} from '../../../../game/dialogs/get-resource/get-resource.component';
import {Net} from '../../../net';
import {Box} from '../../model/box';
import {View} from '../../view/view';

export class A_spellRain extends Action{

  religions = ['demeter','athena'];
  spellTargets = ['well'];

  constructor(){
    super();
  }
  readKey(){
    return "spellRain";
  }
  matchInteraction(user, key1, target, key2, contextViews : View[]){

    if ( user.faith >= 10
      && user.id === target.id
      && user.id === Area.character.id ){
      return false ;
    }else{
      return false ;
    }
  }
  use(user, target){
    const self = this ;

    Net.emitAction( self.readKey(), {
      user : user,
      target : target,
    }, function(waterRes) {

    });


  }

}
