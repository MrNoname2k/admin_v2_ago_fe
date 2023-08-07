import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AdvBoard, BoarDataCommon, FriendBoard, ItemDataCommon, NewBoard, PageBoard, notifiBoard } from '../../models/data-config';
import { clone } from 'lodash';




@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnChanges{

  @Input() public boarData!: BoarDataCommon;



  public boardConfig: BoarDataCommon = {
    itemData: {}
  };
  public itemData: ItemDataCommon = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['boarData'] && changes['boarData'].currentValue) {
      this.boarData = clone(changes?.['boarData'].currentValue);
      this.boardConfig = this.boarData;
      this.itemData = this.boardConfig.itemData;
    }

    // if (changes['newBoard'] && changes['newBoard'].currentValue) {
    //   this.newBoard = clone(changes?.['newBoard'].currentValue);
    //   this.boardConfig = this.newBoard;
    //   this.itemData = this.boardConfig.itemData;
    // }

    // if (changes['notifiBoard'] && changes['notifiBoard'].currentValue) {
    //   this.notifiBoard = clone(changes?.['notifiBoard'].currentValue);
    //   this.boardConfig = this.notifiBoard;
    //   this.itemData = this.boardConfig.itemData;
    // }

    // if (changes['advertisement'] && changes['advertisement'].currentValue) {
    //   this.advertisement = clone(changes?.['advertisement'].currentValue);
    //   this.boardConfig = this.advertisement;
    //   this.itemData = this.boardConfig.itemData;
    // }

    // if (changes['friendBoard'] && changes['friendBoard'].currentValue) {
    //   this.friendBoard = clone(changes?.['friendBoard'].currentValue);
    //   this.boardConfig = this.friendBoard;
    //   this.itemData = this.boardConfig.itemData;
    // }
  }

}
