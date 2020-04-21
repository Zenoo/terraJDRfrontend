import {Net} from './net';
import {environment} from '../../environments/environment';
import {Account} from './account';
import {Area} from './world/area';
import {View} from './world/view/view';
import {Box} from './world/model/box';
import {V_ground} from './world/view/v_ground';
import {V_character} from './world/view/v_character';
import {V_neutral} from './world/view/v_neutral';
import {V_squeleton} from './world/view/v_squeleton';
import {Controls} from './world/controls/controls';

export class Worlds{

  static worlds = [] ;

  static init(callBack){

    View.init([
      new V_ground(),
      new V_neutral(),
      new V_character(),
      new V_squeleton()
    ]);
    Controls.init();

    Net.http.get(`${environment.backURL}/readWorlds`, {responseType:"json", headers: Net.headers}).subscribe((res)=>{

      Worlds.worlds = res ;
      Area.init();
      if ( Area.world !== null ){

        Worlds.enterIn( Area.world, function(enterInRes) {
          callBack(res);
        });
      }else{
        Worlds.enterIn(Worlds.worlds[0], function(enterInRes) {
          callBack(res);
        });
      }

    });

    Net.socket.on('addWorld', function(worldJson) {
      if ( worldJson !== null ){
        Worlds.worlds.push(worldJson);
      }
    });

    Net.socket.on('instructions', function (instructions){

      for ( let instruction of instructions ){
        if ( instruction.key === "add" ){

          Box.adds( instruction.boxes, function(boxes) {
            View.adds(boxes);
            Box.lastUpdate = new Date().getTime();
          });
        }else if ( instruction.key === "updateValues" ){

          Area.updateValues( instruction.array);
          Box.updateValues( instruction.array, function(res) {});
          Box.lastUpdate = new Date().getTime();

        }else if ( instruction.key === "updatePositions"){

          Area.updatePositions(instruction.array);
          Box.updatePositions( instruction.array, function(res) {
            View.updatePositions(res);
            Box.lastUpdate = new Date().getTime();
          });
        }else if ( instruction.key === "delete"){

          Box.removeByIds(instruction.array);
          View.removeByIds(instruction.array);
          Box.lastUpdate = new Date().getTime();

        }
      }

    });

  }



  static enterIn(world, callBack){

    Net.socket.emit('enterInWorld',  world, Account.user.id, function(res) {
      if ( res ){
        Area.setWorld(world);
        View.reset();
        callBack(res);
      }
    });

  }
  static getOut(callBack){

    Net.socket.emit('getOutOfWorld', function(getOutRes) {

      Area.leaveWorld() ;
      callBack('done');

    });

  }



}
