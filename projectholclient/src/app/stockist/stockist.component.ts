import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';

@Component({
  selector: 'app-stockist',
  templateUrl: './stockist.component.html',
  styleUrls: ['./stockist.component.css']
})
export class StockistComponent implements OnInit {

  constructor(private data: SawtoothService) { }
 
  FAMILYNAME = 'transfer'
  FROMTYPE = 'STK'
  
  ngOnInit() {
    
  }

  
  onSubmit(f)
  {
    
    const bottleID = f.value.bottle_id;
    const warehouseID= f.value.warehouse_id;
    const transferTime = new Date()
    this.data.sendData('transfer',[bottleID,this.FROMTYPE,warehouseID, transferTime],this.FAMILYNAME);
    

  }



}
