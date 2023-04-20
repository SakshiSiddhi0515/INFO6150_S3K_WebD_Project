import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as streamSaver from 'streamsaver';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent implements OnInit {

  selectedFile: File;
  public token;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.http.post('http://localhost:3000/upload', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
