import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';


@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
//sawtooth services being imported for usage
  constructor(private data: SawtoothService) { }

  ngOnInit() {

  }
  FAMILYNAMECREATE = 'manufacturing'
  FAMILYNAMETRANSFER = 'transfer'
  FROMTYPE = 'MFR'
  BOTTLEARRAY = new Array()
  
  onSubmit(f)
  {
    const bottleID = f.value.bottle_id;
    const bottleType= f.value.bottle_type;
    const mfrTime = new Date();
    const mfrID = 'MFR001'
    this.data.storeBottleID(bottleID);
    this.BOTTLEARRAY = this.data.bottleArray;
    this.data.sendData('create',[bottleID, bottleType,mfrID, mfrTime],this.FAMILYNAMECREATE);
    
    
  }

  

  onTransfer(t)
  {
    const bottleID2 = t.value.list_bottleid;
    console.log("bottleID: ", bottleID2)
    const stockistID= t.value.list_stockistid;
    const transferTime = new Date();
    console.log("STOCKISTID", stockistID)
    this.data.sendData('transfer',[bottleID2,this.FROMTYPE,stockistID, transferTime],this.FAMILYNAMETRANSFER);

}

}
