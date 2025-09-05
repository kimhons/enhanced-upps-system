import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST() {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Step 1: Drop existing tables using individual queries
    const dropOperations = [
      // Drop tables in reverse dependency order
      { table: 'subscription_history', type: 'table' },
      { table: 'usage_log', type: 'table' },
      { table: 'predictions', type: 'table' },
      { table: 'users', type: 'table' }
    ]

    for (const op of dropOperations) {
      try {
        // Use the from() method to check if table exists, then delete if it does
        const { error: checkError } = await supabase.from(op.table).select('id').limit(1)
        if (!checkError) {
          // Table exists, we can't drop it directly via client, so we'll recreate the schema
          console.log(`Table ${op.table} exists`)
        }
      } catch (error) {
        console.log(`Table ${op.table} doesn't exist or error checking:`, error)
      }
    }

    // Step 2: Create the new schema by inserting into the users table
    // This will create the table if it doesn't exist (via Supabase dashboard setup)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database schema needs to be reset manually via Supabase dashboard. Please follow the instructions provided.' 
    })

  } catch (error) {
    console.error('Database reset error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

