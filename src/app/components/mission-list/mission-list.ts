import { Component, signal, computed } from '@angular/core';
import { SpacexService } from '../../services/spacex';

@Component({
  standalone: false,
  selector: 'app-mission-list',
  templateUrl: './mission-list.html',
  styleUrls: ['./mission-list.css'],
})
export class MissionList {
  missionData = signal<any[]>([]);

  yearFilter = signal<string>('');

  filteredMissions = computed(() => {
    const year = this.yearFilter().trim();
    if (!year) return this.missionData();
    return this.missionData().filter((m) => m.launch_year.includes(year));
  });

  constructor(private apiService: SpacexService) {
    this.fetchMissions();
  }

  fetchMissions(): void {
    this.apiService.getMissions().subscribe({
      next: (res) => {
        //console.log('Fetched missions:', res); //debugging
        this.missionData.set(res);
      },
      error: (err) => console.error('Error fetching missions:', err),
    });
  }
}
