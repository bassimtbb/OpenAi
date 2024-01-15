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
      role: "AI",
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
  this.messages.push(
    {
      role: "user",
      content:this.queryFormGroup.value.query
    }
  )
  let httpsHeaders= new HttpHeaders({ 'Content-Type': 'application/json' });
  let url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCR7m76_8vpbj2gv3ntRFeboaJED-HgOqE';
  let payload={"contents": [{"parts": [{"text": this.queryFormGroup.value.query}]}]};

  this.httpClient.post(url,payload,{headers:httpsHeaders})
  .subscribe({
    next: (resp) => {
      this.result = resp;
      this.messages.push({
        role: "AI",
        content: this.result.candidates[0].content.parts[0].text
      });
    },
    
    error(err) {
        console.log("not working")
    },
  } )
}

}