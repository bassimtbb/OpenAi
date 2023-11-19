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
      content: "Hello! How can I assist you today?"
    }
  ];
  queryFormGroup!:FormGroup;
  constructor(private fb:FormBuilder ,private httpClient:HttpClient) {}
    
  ngOnInit() {
    this.queryFormGroup = this.fb.group({
      query: this.fb.control("")
    });
  }
   // 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

handleAskGPT() {
  this.messages.push(
    {
      role: "user",
      content:this.queryFormGroup.value.query
    }
  )
  let httpsHeaders=new HttpHeaders().set("Authorization","Bearer 8570f3f33c905261631e645faeca33a51fcade545fa0d7a9c6c291f23a079c22 ")
  let url="https://api.together.xyz/inference"
  let payload={model: "togethercomputer/llama-2-70b-chat", 
              prompt: this.queryFormGroup.value.query, 
              temperature: 0.7, 
              top_p: 0.7, 
              top_k: 50, 
              repetition_penalty: 1
            }
  this.httpClient.post(url,payload,{headers:httpsHeaders})
  .subscribe({
    next:(resp)=>{
      this.result =resp;
      this.result.output.choices.forEach((choice :any) => {      
      this.messages.push(
        {
          role: "AI",
          content:choice.text
        }
      )});
    },
    error(err) {
        console.log("not working")
    },
  } )
}



// handleAskGPT() {
//   this.messages.push(
//     {
//       role: "user",
//       content:this.queryFormGroup.value.query
//     }
//   )
//   let httpsHeaders=new HttpHeaders().set("Authorization","Bearer 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")
//   let url="https://api.openai.com/v1/chat/completions"
//   let payload={model:"gpt-3.5-turbo",messages:this.messages,temperature: 0.7}
//   this.httpClient.post(url,payload,{headers:httpsHeaders})
//   .subscribe({
//     next:(resp)=>{
//       this.result =resp;
//     },
//     error(err) {
//         console.log("not working")
//     },
//   } )
// }


}