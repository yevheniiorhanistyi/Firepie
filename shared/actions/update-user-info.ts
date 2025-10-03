'use server';

import { prisma } from '@/prisma/prisma-client';
import { Prisma } from '@prisma/client';
import { hash } from 'bcryptjs';
import { getUserSession } from '@/shared/lib/get-user-session';

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('User not found');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    const hashedPassword = await hash(body.password as string, 10);

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashedPassword : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}