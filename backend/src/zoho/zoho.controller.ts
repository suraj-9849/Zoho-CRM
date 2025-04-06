import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ZohoService } from './zoho.service';

@Controller('zoho')
export class ZohoController {
  constructor(private readonly zohoService: ZohoService) {}
  @Get('auth')
  redirectToZoho(@Res() res: Response) {
    const clientId = process.env.ZOHO_CLIENT_ID;
    const redirectUri = process.env.ZOHO_REDIRECT_URI;
  
    if (!clientId || !redirectUri) {
      console.error('Missing Zoho configuration:', {
        clientId: !!clientId,
        redirectUri: !!redirectUri,
      });
      return res
        .status(500)
        .json({ error: 'Zoho configuration is incomplete' });
    }
    const scope = 'ZohoCRM.modules.all';
    const authUrl = `https://accounts.zoho.in/oauth/v2/auth?scope=${encodeURIComponent(
      scope,
    )}&client_id=${clientId}&response_type=code&access_type=offline&redirect_uri=${encodeURIComponent(redirectUri)}`;
  
    return res.redirect(authUrl);
  }
  @Get('callback')
  async handleCallback(@Query('code') code: string, @Res() res: Response) {
    try {
      const tokenData = await this.zohoService.getTokens(code);
      const { access_token, refresh_token } = tokenData;
      return res.json({ access_token, refresh_token });
    } catch (error) {
      console.error('Error obtaining tokens:', error);
      return res.status(500).json({ error: 'Failed to obtain tokens' });
    }
  }
}
