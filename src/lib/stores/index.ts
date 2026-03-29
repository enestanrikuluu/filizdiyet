import { writable, derived } from 'svelte/store';
import type { Appointment, BlogPost } from '$lib/types';

// Mobile menu state
export const isMobileMenuOpen = writable(false);

// Admin authentication state
export const isAdminAuthenticated = writable(false);

// Appointments store (in-memory for now, would connect to Supabase)
export const appointments = writable<Appointment[]>([]);

// Blog search/filter state
export const blogSearchQuery = writable('');
export const blogActiveCategory = writable<string>('all');

// Contact form submission state
export const isSubmitting = writable(false);
export const submissionSuccess = writable(false);

// Scroll position for header behavior
export const scrollY = writable(0);

// Header visibility derived from scroll
export const isHeaderScrolled = derived(scrollY, ($scrollY) => $scrollY > 50);

// Toggle mobile menu
export function toggleMobileMenu(): void {
  isMobileMenuOpen.update((value) => !value);
}

// Close mobile menu
export function closeMobileMenu(): void {
  isMobileMenuOpen.set(false);
}
