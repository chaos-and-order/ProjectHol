import { Component, OnInit } from '@angular/core';
import { SawtoothService } from '../sawtooth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private data: SawtoothService) { }
  
  ngOnInit() {
    
  }

  onSubmit(f)
  {
    // let assetCreateProto
    // protobuf.load('../../../protofiles/HolStructure.proto', function(err,root)
    // {
    //   if (err)
    // {
    //   throw (err);
    // }
    // assetCreateProto = root.lookupType("HolStructure.holStructure");

    // });
    // let protohandle = protobuf.roots.lookupType("HolStructure.holStructure");

    // let handler = protobuf.load('../protofiles/HolStructure.proto',function(err,root){
    //   if(err)
    //   {
    //     throw (err);
    //   }
    //   protohandle = root.lookupType("HolStructure.holStructure");
    // })

    const address = this.data.hash(f.value.bottle_id).substr(0, 70)
    let response = this.data.getState(address);
    response.subscribe((resp)=>{console.log("RESPONSE: ", Object.values(resp)[0])
    let dataFromState = Object.values(resp)[0]
    console.log("DECODED RESPONSE: ",atob(dataFromState))
  },
    (error)=>{console.log("ERROR !: ",error)})
    
  }

}
