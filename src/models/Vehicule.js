const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Vehicule = {

  findById(id) {
    return prisma.vehicule.findUnique({
      where: {
        id,
      },
    });
  },

  create(vehiculeData) {
    return prisma.vehicule.create({
      data: vehiculeData,
    });
  },

  getAll() {
    return prisma.vehicule.findMany();
  },

  delete() {
    return prisma.vehicule.delete();
  },

  
};

module.exports = Vehicule;