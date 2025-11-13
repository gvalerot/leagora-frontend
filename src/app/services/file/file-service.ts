import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private minioBaseUrl = '192.168.0.105:9000';
  private bucketName = 'fsmashbucket';

  constructor(){}

  getFileUrl(filePath: string): string{
    return `http://${this.minioBaseUrl}/${this.bucketName}/${filePath}`;
  }

  getLeagueLogoUrl(logoPath: string): string {
    return this.getFileUrl(logoPath);
  }
}
