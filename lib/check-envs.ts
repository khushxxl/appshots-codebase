export const hasEnvVars =
  process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY;

// console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
// console.log("SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY);
// console.log("hasEnvVars:", hasEnvVars);