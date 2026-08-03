import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.client.upsert({
    where: {
      apiKey: 'hr_dev_change_me',
    },
    update: {},
    create: {
      id: 'default',
      name: 'Development Client',
      apiKey: 'hr_dev_change_me',
      active: true,
      rateLimit: 100,
      channels: [
        'whatsapp',
        'telegram',
        'email',
        'discord',
      ],
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });