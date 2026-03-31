import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Resend } from 'resend';

const NOTIFICATION_EMAIL = 'filizdiyet@gmail.com';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const resendApiKey = import.meta.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY not configured, skipping email notification');
      return json({ success: false, message: 'Email service not configured' }, { status: 200 });
    }

    const resend = new Resend(resendApiKey);
    const appointment = await request.json();

    const serviceLabels: Record<string, string> = {
      'genel-beslenme': 'Genel Beslenme Danışmanlığı',
      'kilo-yonetimi': 'Kilo Yönetimi',
      'sporcu-beslenmesi': 'Sporcu Beslenmesi',
      'hamilelik-beslenmesi': 'Hamilelik & Emzirme Beslenmesi',
      'cocuk-beslenmesi': 'Çocuk & Ergen Beslenmesi',
      'hastalik-beslenmesi': 'Hastalıklara Özel Beslenme'
    };

    const serviceName = serviceLabels[appointment.serviceType] || appointment.serviceType;

    const { data, error } = await resend.emails.send({
      from: 'Filiz Diyet <onboarding@resend.dev>',
      to: [NOTIFICATION_EMAIL],
      subject: `🗓️ Yeni Randevu Talebi — ${appointment.fullName}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8faf8; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #22785a, #2ea064); padding: 24px 32px; color: white;">
            <h1 style="margin: 0; font-size: 22px;">🗓️ Yeni Randevu Talebi</h1>
            <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">filizdiyet.vercel.app üzerinden yeni bir randevu talebi geldi</p>
          </div>

          <div style="padding: 24px 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8efe8; color: #666; width: 140px; font-size: 14px;">Ad Soyad</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8efe8; font-weight: 600; font-size: 14px;">${appointment.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8efe8; color: #666; font-size: 14px;">E-posta</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8efe8; font-size: 14px;"><a href="mailto:${appointment.email}" style="color: #22785a;">${appointment.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8efe8; color: #666; font-size: 14px;">Telefon</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8efe8; font-size: 14px;"><a href="tel:${appointment.phone}" style="color: #22785a;">${appointment.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8efe8; color: #666; font-size: 14px;">Hizmet</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8efe8; font-size: 14px;">${serviceName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8efe8; color: #666; font-size: 14px;">Tarih</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8efe8; font-size: 14px; font-weight: 600;">${appointment.preferredDate}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8efe8; color: #666; font-size: 14px;">Saat</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8efe8; font-size: 14px; font-weight: 600;">${appointment.preferredTime}</td>
              </tr>
              ${appointment.message ? `
              <tr>
                <td style="padding: 12px 0; color: #666; font-size: 14px; vertical-align: top;">Mesaj</td>
                <td style="padding: 12px 0; font-size: 14px;">${appointment.message}</td>
              </tr>
              ` : ''}
            </table>

            <div style="margin-top: 24px; padding: 16px; background: #eef5ee; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #555; font-size: 13px;">Bu randevuyu yönetmek için admin panelini kullanabilirsiniz:</p>
              <a href="https://filizdiyet.vercel.app/admin" style="display: inline-block; margin-top: 8px; padding: 10px 24px; background: #22785a; color: white; text-decoration: none; border-radius: 6px; font-size: 14px;">Admin Paneli</a>
            </div>
          </div>

          <div style="padding: 16px 32px; background: #f0f5f0; text-align: center; font-size: 12px; color: #999;">
            Filiz Diyet — Diyetisyen Başak Filiz Tanrıkulu
          </div>
        </div>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return json({ success: false, message: error.message }, { status: 200 });
    }

    return json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Notification error:', err);
    return json({ success: false, message: 'Notification failed' }, { status: 200 });
  }
};
