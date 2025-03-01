import { Component, Inject, inject, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComicbookService } from '../../services/comicbook.service';
import { CreateCharacterService } from '../../services/create-character.service';

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

  
      
      addCharacter: string = ""
      imageFile:  File | null = null;
      imageName: string ="";  
      
      comicbookService = inject(ComicbookService)
      characterService = inject(CreateCharacterService)
      
      characters:Character[] = [];
    
      constructor(private createCharacterService: CreateCharacterService) {
        
        this.comicbookService.getCharacters().subscribe({
          next: (data) => {
            this.characters = data;
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
      
    
        addCharacters(){
         
          
          if (this.imageFile) {
            this.createCharacterService.createCharacter(          
              this.addCharacter,this.imageFile, this.imageName).subscribe(
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
    
        deleteCharacter(){};

}
