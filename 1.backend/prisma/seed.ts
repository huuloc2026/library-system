import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { faker } from '@faker-js/faker';

function createRandomUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    // phone: faker.phone.imei(),
  };
}
function createBook(){
  return {
    title: faker.book.title(),
    author: faker.book.author(),
    isbn: faker.database.mongodbObjectId(),
    publishedAt: new Date('1999-10-20'),
    totalCopies: faker.number.int(20),
    availableCopies: faker.number.int(20),
  };
}
const generateUser = (numUsers = 50) => {
  return Array(numUsers).fill(null).map(createRandomUser);
};
const generateBook = (numUsers = 50) => {
  return Array(numUsers).fill(null).map(createBook);
};

async function clearAllWarning(){
  await prisma.borrowing.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.book.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.user.deleteMany();
}

async function main() {
  console.clear()
  clearAllWarning()
  await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE`;
  console.log('Data cleared and ready for seeding!');
  // Seed books
  await prisma.book.createMany({
    data: generateBook()})
  console.log('Books seeded');
  // Seed employees
  await prisma.employee.createMany({
    data: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123-456-7890',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phoneNumber: '987-654-3210',
      },
      {
        id: 3,
        firstName: 'David',
        lastName: 'Lee',
        email: 'david.lee@example.com',
        phoneNumber: '555-123-4567',
      },
      {
        id: 4,
        firstName: 'Sarah',
        lastName: 'Jones',
        email: 'sarah.jones@example.com',
        phoneNumber: '555-789-0123',
      },
      {
        id: 5,
        firstName: 'Michael',
        lastName: 'Brown',
        email: 'michael.brown@example.com',
        phoneNumber: '555-456-7890',
      },
      {
        id: 6,
        firstName: 'Emily',
        lastName: 'Clark',
        email: 'emily.clark@example.com',
        phoneNumber: '111-222-3333',
      },
      {
        id: 7,
        firstName: 'Daniel',
        lastName: 'Wilson',
        email: 'daniel.wilson@example.com',
        phoneNumber: '444-555-6666',
      },
      {
        id: 8,
        firstName: 'Sophia',
        lastName: 'Martinez',
        email: 'sophia.martinez@example.com',
        phoneNumber: '777-888-9999',
      },
      {
        id: 9,
        firstName: 'Oliver',
        lastName: 'Taylor',
        email: 'oliver.taylor@example.com',
        phoneNumber: '222-333-4444',
      },
      {
        id: 10,
        firstName: 'Hannah',
        lastName: 'Walker',
        email: 'hannah.walker@example.com',
        phoneNumber: '333-444-5555',
      },
      {
        id: 11,
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        phoneNumber: '000-111-2222',
      },
    ],
  });
  console.log('Employees seeded');
  await prisma.user.createMany({
    data: generateUser(),
  });


  // await prisma.user.createMany({
  //   data: [
  //     {
  //       id: 1,
  //       firstName: 'Loc',
  //       lastName: 'Huu',
  //       email: 'huuloc2026@gmail.com',
  //       password: 'huuloc123', // Ideally, hash the password before saving
  //       role: 'ADMIN',
  //     },
  //     {
  //       id: 2,
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       email: 'john.doe@example.com',
  //       password: 'johndoe123', // Hashed password in real implementation
  //       role: 'USER',
  //     },
  //     {
  //       id: 3,
  //       firstName: 'Jane',
  //       lastName: 'Smith',
  //       email: 'jane.smith@example.com',
  //       password: 'janesmith123',
  //       role: 'USER',
  //     },
  //     {
  //       id: 4,
  //       firstName: 'David',
  //       lastName: 'Lee',
  //       email: 'david.lee@example.com',
  //       password: 'davidlee123',
  //       role: 'USER',
  //     },
  //     {
  //       id: 5,
  //       firstName: 'Sarah',
  //       lastName: 'Connor',
  //       email: 'sarah.connor@example.com',
  //       password: 'sarahconnor123',
  //       role: 'USER',
  //     },
  //   ],
  // });

  console.log('Users seeded successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
