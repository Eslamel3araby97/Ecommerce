import { Component, OnInit } from '@angular/core';
import { EcommdataService } from 'src/app/shared/service/ecommdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(private EcommdataService:EcommdataService){}
  
  categories:any[]=[]
  ngOnInit(): void {
   this.EcommdataService.getAllCategories().subscribe({
    next:(response)=>{console.log(response.data);
      this.categories= response.data
    

    }
   })
  }

} 

