import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { League } from 'src/app/models/league';
import {
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  ModalController,
} from '@ionic/angular/standalone';
import { User } from 'src/app/models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fs-league-form',
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    CommonModule,
  ],
})
export class LeagueFormComponent implements OnInit, OnChanges {
  form!: FormGroup;

  toggled = false;
  exists = false;
  logoPreview: string | ArrayBuffer | null = null;

  @Input() league!: League;
  @Input() friends!: User[];

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      logo: [''],
      participants: this.fb.control([]),
    });
  }

  ngOnInit(): void {
    if (this.league && this.league.name) {
      this.exists = true;
      const value = {
        ...this.league,
        participants: this.league.participants?.map((p) => p.id) || [],
      };
      this.logoPreview = this.league?.urlLogo ? this.league.urlLogo : null;
      this.form.patchValue(value);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('editing');
    if (this.league && this.league.name) {
      console.log('editing');
      this.exists = true;
      const value = {
        ...this.league,
        participants: this.league.participants?.map((p) => p.id) || [],
      };
      this.form.patchValue(value);
    }
  }

  get participants() {
    return this.form.get('participants') as FormControl;
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

  onSubmit() {
    if (this.form.valid) {
      const data = { ...this.league, ...this.form.value };
      const role = this.exists ? 'update' : 'create';
      this.modalCtrl.dismiss(data, role);
    }
  }
}
