import { Component, Inject, inject, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicbookService } from '../../services/comicbook.service';
import { CreateCompanyService } from '../../services/create-company.service';

interface Character{
  id: number;
  name: string;
  imageName: string;
}

@Component({
  selector: 'app-add-character',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css'
})
export class AddCharacterComponent {

  
      
      addPublisher: string = ""
      imageFile:  File | null = null;
      imageName: string ="";  
      
      comicbookService = inject(ComicbookService)
      companyService = inject(CreateCompanyService)
      
      companys:Company[] = [];
    
      constructor(private createCompanyService: CreateCompanyService) {
        
        this.comicbookService.getCompanys().subscribe({
          next: (data) => {
            this.companys = data;
          },
          error: (err) => {
            console.log(err);
          }
        });
      };
    
      onFileChange(event: any): void {
        const file = event.target.files[0];
        if (file) {
          this.imageFile = file;
          this.imageName = file.name;
        }
      }
      
    
        addCompany(){
         
          
          if (this.imageFile) {
            this.createCompanyService.createCompany(          
              this.addPublisher,this.imageFile, this.imageName).subscribe(
                response => {
                  console.log("Upload looks Good!!", response);
                },
                error => {
                  console.error('Upload failed', error);
                }
              );
            
            } else {
              console.error('No file selected');
            }
        }
    
        deleteCompany(){};

}
