// Supabase Client Configuration
// Replace these with your actual Supabase credentials
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if we have valid Supabase credentials
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Only create real client if we have valid credentials
const hasValidCredentials = isValidUrl(supabaseUrl) && supabaseAnonKey.length > 0;

export const supabase = hasValidCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Check if Supabase is configured
export const isSupabaseConfigured = () => hasValidCredentials;

// Helper function to upload photo to Supabase Storage
export async function uploadPhoto(photoDataUrl, sessionId) {
  if (!photoDataUrl) return null;
  if (!supabase) {
    console.log('Supabase not configured - skipping photo upload');
    return null;
  }

  try {
    // Convert base64 to blob
    const response = await fetch(photoDataUrl);
    const blob = await response.blob();

    // Generate unique filename
    const fileName = `${sessionId}_${Date.now()}.jpg`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('candidate-photos')
      .upload(fileName, blob, {
        contentType: 'image/jpeg',
        upsert: false
      });

    if (error) {
      console.error('Photo upload error:', error);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('candidate-photos')
      .getPublicUrl(fileName);

    return urlData?.publicUrl || null;
  } catch (err) {
    console.error('Photo upload failed:', err);
    return null;
  }
}

// Submit test results to Supabase
export async function submitTestResults(testData) {
  if (!supabase) {
    console.log('Supabase not configured - results not saved to cloud');
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('test_results')
      .insert([testData])
      .select();

    if (error) {
      console.error('Submit error:', error);
      throw error;
    }

    return { success: true, data };
  } catch (err) {
    console.error('Failed to submit test results:', err);
    return { success: false, error: err.message };
  }
}

// Fetch all test results (for admin dashboard)
export async function fetchAllTestResults() {
  if (!supabase) {
    console.log('Supabase not configured - cannot fetch results');
    return { success: false, error: 'Supabase not configured', data: [] };
  }

  try {
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to fetch test results:', err);
    return { success: false, error: err.message, data: [] };
  }
}

// Fetch single test result by session ID
export async function fetchTestResultBySession(sessionId) {
  if (!supabase) {
    return { success: false, error: 'Supabase not configured', data: null };
  }

  try {
    const { data, error } = await supabase
      .from('test_results')
      .select('*')
      .eq('session_id', sessionId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('Failed to fetch test result:', err);
    return { success: false, error: err.message, data: null };
  }
}

