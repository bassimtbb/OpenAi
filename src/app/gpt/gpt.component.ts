import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gpt',
  templateUrl: './gpt.component.html',
  styleUrls: ['./gpt.component.css']
})
export class GptComponent {
  result: any;
  messages=[
    {
      role: "user",
      content: "You are a helpful assistant."
    }
  ];
  queryFormGroup!:FormGroup;
  constructor(private fb:FormBuilder ,private httpClient:HttpClient) {}
    
  ngOnInit() {
    this.queryFormGroup = this.fb.group({
      query: this.fb.control("")
    });
  }
handleAskGPT() {
  let httpsHeaders=new HttpHeaders().set("Authorization","Bearer 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")
  let url="https://api.openai.com/v1/chat/completions"
  let payload={model:"gpt-3.5-turbo",messages:this.messages,temperature: 0.7}
  this.httpClient.post(url,payload,{headers:httpsHeaders})
  .subscribe({
    next:(resp)=>{
      this.result =resp;
    },
    error(err) {
        console.log("not working")
    },
  } )
}

}
