const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const User = {
  findByEmail(mail) {
    return prisma.utilisateur.findUnique({
      where: {
        mail,
      },
    });
  },

  findById(id) {
    return prisma.utilisateur.findUnique({
      where: {
        id,
      },
    });
  },

  create(userData) {
    return prisma.utilisateur.create({
      data: userData,
    });
  },

  getAll() {
    return prisma.utilisateur.findMany();
  },
};

module.exports = User;
