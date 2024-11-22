import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            firstName: 'Trí',
            lastName: 'Đỗ',
            phoneNumber: '0123456789', 
            passWord: '123',
            address:'abcd',
            email: 'TriDo@gmail.com',
          },
    })
    console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
