import { supabase } from '$lib/supabase';

export interface AppointmentInput {
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  serviceType: string;
  message?: string;
}

export async function createAppointment(input: AppointmentInput) {
  const { error } = await supabase
    .from('appointments')
    .insert({
      full_name: input.fullName,
      email: input.email,
      phone: input.phone,
      preferred_date: input.preferredDate,
      preferred_time: input.preferredTime,
      service_type: input.serviceType,
      message: input.message ?? ''
    });

  if (error) {
    console.error('Error creating appointment:', error);
    throw new Error('Randevu oluşturulamadı. Lütfen tekrar deneyin.');
  }

  // Send email notification (fire-and-forget, don't block appointment creation)
  try {
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    }).catch((err) => console.warn('Email notification failed:', err));
  } catch (e) {
    console.warn('Email notification error:', e);
  }

  return true;
}

export async function getAppointments() {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }

  return data ?? [];
}

export async function updateAppointmentStatus(id: string, status: string) {
  const { error } = await supabase
    .from('appointments')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Error updating appointment:', error);
    throw new Error('Randevu güncellenemedi.');
  }
}
