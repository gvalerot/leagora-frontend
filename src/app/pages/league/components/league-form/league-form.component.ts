import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { League } from 'src/app/models/league';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  ModalController
} from '@ionic/angular/standalone';

@Component({
  selector: 'fs-league-form',
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.scss'],
  imports: [ReactiveFormsModule, IonItem, IonLabel, IonInput, IonButton, IonList],
})
export class LeagueFormComponent implements OnInit, OnChanges {
  form!: FormGroup;

  toggled = false;
  exists = false;
  logoPreview: string | ArrayBuffer | null = null;

  @Input() league!: League;

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      logo: [''],
      participants: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    if (this.league && this.league.name) {
      this.exists = true;
      const value = this.league;
      this.logoPreview = this.league?.urlLogo? this.league.urlLogo : null;
      this.form.patchValue(value);
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("editing")
    if (this.league && this.league.name) {
      console.log("editing")
      this.exists = true;
      const value = this.league;
      this.form.patchValue(value);
    }
  }

  get participants() {
    return this.form.get('participants') as FormArray;
  }

  addParticipant(username: string) {
    this.participants.push(this.fb.control(username.trim()));
  }

  removeParticipant(index: number) {
    this.participants.removeAt(index);
  }

   async onLogoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result as string;
      this.form.patchValue({ logo: this.logoPreview });
    };
    reader.readAsDataURL(file);
  }

  onSubmit(){
    if (this.form.valid) {
      const data  = {...this.league, ...this.form.value};
      const role = this.exists ? 'update' : 'create';
      this.modalCtrl.dismiss(data, role);
    }
  }
}
