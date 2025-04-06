import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class ZohoService {
  constructor(private readonly httpService: HttpService) {}
  async getTokens(code: string): Promise<any> {
    const tokenUrl = 'https://accounts.zoho.in/oauth/v2/token';
    const params = new URLSearchParams();
    params.append('code', code);
    if (process.env.ZOHO_CLIENT_ID)
      params.append('client_id', process.env.ZOHO_CLIENT_ID);
    if (process.env.ZOHO_CLIENT_SECRET)
      params.append('client_secret', process.env.ZOHO_CLIENT_SECRET);
    if (process.env.ZOHO_REDIRECT_URI)
      params.append('redirect_uri', process.env.ZOHO_REDIRECT_URI);
    params.append('grant_type', 'authorization_code');

    const response = await firstValueFrom(
      this.httpService.post(tokenUrl, params.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    );
    return response.data;
  }
}
