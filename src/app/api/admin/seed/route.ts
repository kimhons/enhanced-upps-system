import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json();
    
    const adminEmail = email || 'president@aliennova.com';
    const adminPassword = password || 'AdminPass123!';
    const adminName = fullName || 'Admin User';
    
    // Create admin user using regular signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: {
          full_name: adminName,
          role: 'admin'
        }
      }
    });

    if (authError) {
      console.error('Auth creation error:', authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 400 });
    }

    // Create user profile with unlimited tokens
    const { error: profileError } = await supabase
      .from('users')
      .upsert({
        id: authData.user.id,
        email: authData.user.email,
        full_name: adminName,
        subscription_tier: 'admin',
        subscription_status: 'active',
        daily_analyses_limit: 999999, // Unlimited
        daily_analyses_used: 0,
        cosmic_intelligence_active: true,
        claude_nexus_active: true,
        premium_enhancement_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      return NextResponse.json({ error: profileError.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Admin account created successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        full_name: adminName,
        subscription_tier: 'admin',
        daily_analyses_limit: 999999
      }
    });

  } catch (error) {
    console.error('Seed admin error:', error);
    return NextResponse.json(
      { error: 'Failed to seed admin account' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Admin seeding endpoint',
    usage: 'POST with { email?, password?, fullName? } to create admin account'
  });
}

