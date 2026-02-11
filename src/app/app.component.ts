import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  homeOutline,
  trophyOutline,
  calendarOutline,
  personOutline,
  createOutline,
  addCircleOutline,
  addOutline,
  logOut,
  person,
  checkmark,
  close,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      homeOutline,
      trophyOutline,
      calendarOutline,
      personOutline,
      createOutline,
      addCircleOutline,
      addOutline,
      logOut,
      person,
      checkmark,
      close,
    });
  }
}
