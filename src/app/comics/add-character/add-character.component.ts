import { Component, Inject, inject, NgZone } from '@angular/core';
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
      editCharacter: Character | null = null;
      imageFile:  File | null = null;
      imageName: string ="";
      isSortedAsc: boolean | undefined = undefined;
      
      comicbookService = inject(ComicbookService)
      characterService = inject(CreateCharacterService)
      characters:Character[] = [];
      filteredCharacters: Character[] = [];

      scrollToTop(): void {
        const formElement = document.getElementById('characterForm');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    
      constructor(private createCharacterService: CreateCharacterService, private ngZone: NgZone) {
        this.loadCharacters();
      };

      sortById(): void {

        this.comicbookService.getCharacters().subscribe({
          next: (data) => {
            this.characters = data;
            this.filteredCharacters = data.filter((characters: Character) => characters.imageName);
            if (this.isSortedAsc === undefined || this.isSortedAsc === false) {
              this.filteredCharacters.sort((a, b) => a.id - b.id);
              this.isSortedAsc = true;
            } else {
              this.filteredCharacters.sort((a, b) => b.id - a.id);
              this.isSortedAsc = false;
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
      }

      sortByName(): void {
        this.comicbookService.getCharacters().subscribe({
          next: (data) => {
            this.characters = data;
            this.filteredCharacters = data.filter((character: Character) => character.imageName);
            if (this.isSortedAsc === undefined || this.isSortedAsc === false) {
              this.filteredCharacters.sort((a, b) => a.name.localeCompare(b.name));
              this.isSortedAsc = true;
            } else {
              this.filteredCharacters.sort((a, b) => b.name.localeCompare(a.name));
              this.isSortedAsc = false;
            }
          },
          error: (err) => {
            console.log(err);
          }
        });
      }

      loadCharacters(): void {
        
        // this.comicbookService.getCharacters().subscribe({
        //   next: (data) => {
        //     this.characters = data;
        //   },
        //   error: (err) => {
        //     console.log(err);
        //   }
        // });

        // Above is no filter...  below is filter without imageName


        this.comicbookService.getCharacters().subscribe({
          next: (data) => {
            this.characters = data;
            this.filteredCharacters = data.filter((characters: Character) => characters.imageName);
            this.filteredCharacters.sort((a, b) => b.id - a.id);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }

      
    
      onFileChange(event: any): void {
        const file = event.target.files[0];
        if (file) {
          this.imageFile = file;
          this.imageName = file.name;
        }
      }
      
    
      addCharacters() {
        if (!this.addCharacter) return;
    
        if (this.editCharacter) {
          // Update existing character
          this.createCharacterService.updateCharacter(
            this.editCharacter.id,
            this.addCharacter,
            this.imageFile || undefined,
            this.imageName || undefined
          ).subscribe({
            next: (response) => {
              console.log("Update successful", response);
              this.resetForm();
              this.loadCharacters();
            },
            error: (error) => {
              console.error('Update failed', error);
            }
          });
        } else {
          // Create new character
          if (this.imageFile) {
            this.createCharacterService.createCharacter(
              this.addCharacter, this.imageFile, this.imageName
            ).subscribe({
              next: (response) => {
                console.log("Upload successful", response);
                this.resetForm();
                this.loadCharacters();
              },
              error: (error) => {
                console.error('Upload failed', error);
              }
            });
          } else {
            console.error('No file selected for new character');
          }
        }
      }
    
      editExistingCharacter(character: Character): void {
        this.editCharacter = character;
        this.addCharacter = character.name;
        // Reset file input
        this.imageFile = null;
        this.imageName = "";

        this.ngZone.run(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }
      viewCharacter(character: Character): void {
        // Implement view functionality if needed 
      }
    
      resetForm(): void {
        this.addCharacter = "";
        this.editCharacter = null;
        this.imageFile = null;
        this.imageName = "";
        this.scrollToTop();
        // You might need to reset the file input element here as well
      }
    
      deleteCharacter(character: Character): void {
        // Implement delete functionality if needed
      }

      

}
