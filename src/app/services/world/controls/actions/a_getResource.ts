import {Action} from './action';
import {Area} from '../../area';
import {Dialog} from '../../../dialog';
import {GiveResourceComponent} from '../../../../game/dialogs/give-resource/give-resource.component';
import {Translator} from '../../model/translator/translator';
import {Net} from '../../../net';
import {Box} from '../../model/box';
import {GetResourceComponent} from '../../../../game/dialogs/get-resource/get-resource.component';
import {MatDialogRef} from '@angular/material';
import {View} from '../../view/view';
import {DialogueService} from '../../../../game/dialogs/dialogue.service';

export class A_getResource extends Action{


  fileNameDialogRef: MatDialogRef<GetResourceComponent>;

  constructor(){
    super();
  }
  readKey(){
    return "getResource";
  }
  isActive(): boolean {
    return true;
  }
  matchActive(user): boolean {
    if ( user.actions > 0 ){
      return true ;
    }else{
      return false ;
    }
  }
  matchInteraction(user, key1, target, key2, contextViews : View[]){
    if ( Box.isResource(key1) && Box.isGround(target[key2])
      && target.x == user.x && target.y == user.y
      && user.id === Area.character.id
      && user.actions > 0 ){
      return true ;
    }else{
      return false ;
    }
  }
  getCosts(){
    return [
      {
        key : "actions",
        value : 1,
        nom : `point d'action`,
      }
    ];
  }

  use(user, target){
    const self = this ;
    DialogueService.open = true ;
    this.fileNameDialogRef = Dialog.dialog.open(GetResourceComponent);
    this.fileNameDialogRef.afterClosed().subscribe(()=>{
      DialogueService.open = false ;
    });
    GetResourceComponent.user = user ;
    GetResourceComponent.target = target ;

    let tree = Box.isInPositionOf("tree", user.x, user.y );
    if ( tree ){
      GetResourceComponent.canGetMaterial = true ;
    }else{
      GetResourceComponent.canGetMaterial = false ;
    }
  }
}
