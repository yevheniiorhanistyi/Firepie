'use server';

import { prisma } from '@/prisma/prisma-client';
import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import { sendEmail } from '@/shared/lib';
import { VerificationUserTemplate } from '@/shared/components/common';

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    let user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (user && !user.verified) {
      const code = String(Math.floor(100000 + Math.random() * 900000)).padStart(6, '0');

      await prisma.verificationCode.upsert({
        where: { userId: user.id },
        update: { code },
        create: { code, userId: user.id },
      });

      const verificationTemplate = await VerificationUserTemplate({ code });

      try {
        await sendEmail(user.email, 'Firepie | Verification code', verificationTemplate);
      } catch (err) {
        console.error('Failed to send verification email', err);
      }

      throw new Error('Your account is not verified. A new verification code has been sent!');
    }

    if (user && user.verified) {
      throw new Error('User already exists!');
    }

    const hashedPassword = await hash(body.password, 10);
    user = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashedPassword,
      },
    });

    const code = String(Math.floor(100000 + Math.random() * 900000)).padStart(6, '0');

    await prisma.verificationCode.create({
      data: {
        code,
        userId: user.id,
      },
    });

    const verificationTemplate = await VerificationUserTemplate({ code });

    try {
      await sendEmail(user.email, 'Firepie | Verification code', verificationTemplate);
    } catch (err) {
      console.error('Failed to send verification email', err);
    }

    return { id: user.id, email: user.email };
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}
