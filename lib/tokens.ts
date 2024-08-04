import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/db';
import { getVerificationTokenByEmail } from '@/utils/verification-token';
import { getResetPasswordTokenByEmail } from '@/utils/reset-password-token';
import { getTwoFactorTokenByEmail } from '@/utils/two-factor-token';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }
  
  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      email,
      expires,
    }
  })

  return verificationToken;
}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getResetPasswordTokenByEmail(email);
  if (existingToken) {
    await db.resetPasswordToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }
  
  const resetPasswordToken = await db.resetPasswordToken.create({
    data: {
      token,
      email,
      expires,
    }
  })

  return resetPasswordToken;
}

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

  const existingToken = await getTwoFactorTokenByEmail(email)
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      token,
      email,
      expires,
    }
  })

  return twoFactorToken;
}