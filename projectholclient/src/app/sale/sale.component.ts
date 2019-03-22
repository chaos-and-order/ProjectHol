import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';


@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  constructor(private data: SawtoothService) { }

  FAMILYNAME ='sales'
  ngOnInit() {
  }

  onSubmit(f)
  {
   
    const bottleID = f.value.bottle_id;
    const saleTime = new Date()
    this.data.sendData('sale',[bottleID, saleTime],this.FAMILYNAME);
   
  }


}
