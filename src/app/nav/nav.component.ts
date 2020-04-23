import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from '../services/account';
import {Router} from '@angular/router';
import {Worlds} from '../services/worlds';
import {View} from '../services/world/view/view';
import {Characters} from '../services/characters';
import {Area} from '../services/world/area';
import {Net} from '../services/net';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  static functionInit = null ;
  static initialized = false ;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if ( Account.user === null ){
      this.router.navigate(['/login']);
    }else{

      Worlds.init(function(worlds) {
        Characters.init(function(characters) {
          NavComponent.initialized = true ;
          if ( NavComponent.functionInit !== null ){
            NavComponent.functionInit();
          }
        });
      });

    }
  }
  static setInitCallBack(callBackFunction){
    if ( NavComponent.initialized ){
      callBackFunction();
    }else{
      NavComponent.functionInit = callBackFunction;
    }
  }


  isAdmin(){
    return Account.isAdmin();
  }
  getUserPseudo(){
    if ( Account.user !== null && 'pseudo' in Account.user ){
      return Account.user.pseudo ;
    }else{
      return '' ;
    }
  }
  deconnexion(){
    const self = this ;
    Net.socket.emit('deconnexion', function(res) {

      Account.deconnexion();
      Area.reset();
      Worlds.reset();
      self.router.navigate(['/login']);

      Net.reset();

    });

  }

}
