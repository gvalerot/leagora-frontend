import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { homeOutline, trophyOutline, calendarOutline, personOutline } from 'ionicons/icons';

addIcons({ homeOutline, trophyOutline, calendarOutline, personOutline });

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, RouterModule],
  templateUrl: `tabs.component.html`,
})
export class TabsPage {}
