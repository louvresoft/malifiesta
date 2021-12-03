import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery'
import { faCoffee, faLocationArrow, faSignOutAlt, faBoxes, faCartArrowDown,
  faShoppingCart, faDollyFlatbed, faTruck, faHandshake, faTruckLoading, faRedoAlt} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  faCoffee = faCoffee;
  faLocationArrow = faLocationArrow;
  faSignOutAlt = faSignOutAlt;
  faBoxes = faBoxes;
  faCartArrowDown = faCartArrowDown;
  faShoppingCart=faShoppingCart;
  faDollyFlatbed=faDollyFlatbed;
  faTruck=faTruck;
  faHandshake=faHandshake;
  faTruckLoading=faTruckLoading;
  faRedoAlt=faRedoAlt;

  constructor() { }

  ngOnInit(): void {
    $(function(){
      var $btn      = $('.btn'),
          $menuBtn  = $('.menu-btn'),
          $icon     = $('.icon');

          $(this).toggleClass('active');
          $icon.toggleClass('show');
          $btn.toggleClass('active');
    
      $menuBtn.on('click', function(){
        $(this).toggleClass('active');
        $icon.toggleClass('show');
        $btn.toggleClass('active');
      });
    });
  }


  

}
