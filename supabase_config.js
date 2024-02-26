
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://acprtmcegjmctytrhkom.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjcHJ0bWNlZ2ptY3R5dHJoa29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4ODk4MjUsImV4cCI6MjAyMjQ2NTgyNX0.YPM2Wc5pr9oX7MeYlErumCn4vw58DyzuLJdofn6BDYw"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;