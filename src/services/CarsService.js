const CarsService = {
  getCars: async (req, res) => {
    return res.status(200).json([
      {
        id: 1,
        marca: 'Toyota',
        modelo: 'Corolla',
        ano: 2022,
        cor: 'Prata',
        preco: 120000,
        disponivel: true,
      },
      {
        id: 2,
        marca: 'Honda',
        modelo: 'Civic',
        ano: 2021,
        cor: 'Preto',
        preco: 115000,
        disponivel: false,
      },
      {
        id: 3,
        marca: 'Ford',
        modelo: 'Mustang',
        ano: 2020,
        cor: 'Vermelho',
        preco: 250000,
        disponivel: true,
      },
      {
        id: 4,
        marca: 'Chevrolet',
        modelo: 'Onix',
        ano: 2023,
        cor: 'Branco',
        preco: 85000,
        disponivel: true,
      },
      {
        id: 5,
        marca: 'Volkswagen',
        modelo: 'Golf',
        ano: 2019,
        cor: 'Azul',
        preco: 95000,
        disponivel: false,
      },
    ])
  },
}
module.exports = CarsService
