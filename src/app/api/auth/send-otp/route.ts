import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhoneNumber) {
  throw new Error('Missing Twilio credentials');
}

const client = twilio(accountSid, authToken);

// Function to send OTP via SMS
async function sendOTP(phoneNumber: string): Promise<string> {
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    // Send SMS using Twilio
    await client.messages.create({
      body: `Your NexLearn verification code is: ${otp}. This code will expire in 5 minutes.`,
      from: twilioPhoneNumber,
      to: `+91${phoneNumber}` // Format for Indian numbers
    });

    // In production, you should:
    // 1. Store the OTP in your database with an expiration time
    // 2. Implement rate limiting
    // 3. Add security measures
    
    return otp;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw new Error('Failed to send SMS');
  }
}

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber || phoneNumber.length !== 10) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const otp = await sendOTP(phoneNumber);

    // In production, don't send the OTP in the response
    return NextResponse.json({ 
      success: true,
      message: 'OTP sent successfully'
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
} 