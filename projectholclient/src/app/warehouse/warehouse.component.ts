import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  constructor(private data: SawtoothService) { }

  ngOnInit() {
  }
  FAMILYNAME = 'transfer'
  FROMTYPE = 'WRH'
  onSubmit(f)
  {
    
    const bottleID = f.value.bottle_id;
    const posID= f.value.pos_id;
    const transferTime = new Date()
    this.data.sendData('transfer',[bottleID,this.FROMTYPE,posID, transferTime],this.FAMILYNAME);
    

  }

}
