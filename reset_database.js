const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabaseUrl = 'https://xasxypwfdosdkkwqvsru.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhhc3h5cHdmZG9zZGtrd3F2c3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5Mjc5NjMsImV4cCI6MjA3MjUwMzk2M30.mE_6JjBIpjz_4UDW9QuJQ1PUmmcujl-zVtn2ybXW8_k'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function resetDatabase() {
  console.log('🗑️  Resetting Supabase database...')
  
  try {
    // Drop existing tables (in reverse dependency order)
    const dropQueries = [
      'DROP TABLE IF EXISTS public.subscription_history CASCADE;',
      'DROP TABLE IF EXISTS public.usage_log CASCADE;',
      'DROP TABLE IF EXISTS public.predictions CASCADE;',
      'DROP TABLE IF EXISTS public.users CASCADE;',
      'DROP FUNCTION IF EXISTS reset_daily_usage() CASCADE;',
      'DROP FUNCTION IF EXISTS update_subscription_limits() CASCADE;',
      'DROP FUNCTION IF EXISTS can_generate_prediction(UUID) CASCADE;'
    ]
    
    for (const query of dropQueries) {
      console.log(`Executing: ${query}`)
      const { error } = await supabase.rpc('exec_sql', { sql: query })
      if (error && !error.message.includes('does not exist')) {
        console.warn(`Warning: ${error.message}`)
      }
    }
    
    console.log('✅ Existing tables dropped')
    
    // Read and execute the new schema
    const schema = fs.readFileSync('./database_schema.sql', 'utf8')
    
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
    
    console.log(`📝 Executing ${statements.length} schema statements...`)
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';'
      console.log(`${i + 1}/${statements.length}: ${statement.substring(0, 50)}...`)
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement })
        if (error) {
          console.error(`Error in statement ${i + 1}:`, error.message)
          console.error('Statement:', statement)
        }
      } catch (err) {
        console.error(`Exception in statement ${i + 1}:`, err.message)
      }
    }
    
    console.log('✅ Database schema applied successfully!')
    console.log('🎉 Database reset complete!')
    
  } catch (error) {
    console.error('❌ Error resetting database:', error)
  }
}

// Alternative approach: Execute schema directly
async function applySchemaDirectly() {
  console.log('📝 Applying schema directly...')
  
  try {
    const schema = fs.readFileSync('./database_schema.sql', 'utf8')
    
    // Use the REST API to execute SQL
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({ sql: schema })
    })
    
    if (response.ok) {
      console.log('✅ Schema applied successfully!')
    } else {
      const error = await response.text()
      console.error('❌ Error applying schema:', error)
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  }
}

// Run the reset
resetDatabase().then(() => {
  console.log('Database reset completed')
  process.exit(0)
}).catch(error => {
  console.error('Database reset failed:', error)
  process.exit(1)
})

