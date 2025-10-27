import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY! // use service key para back-end
export const supabase = createClient(supabaseUrl, supabaseKey)
