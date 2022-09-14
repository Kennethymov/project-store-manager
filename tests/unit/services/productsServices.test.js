const { expect } = require('chai');
const sinon = require('sinon');
const { connection } = require('../../../src/models/connection');
const productModel = require('../../../src/models/productModel')
const productService = require('../../../src/services/productService')
const { getAll, getById, create, update, remove } = require('../mocks/products.mock')

describe('Teste de unidade da camada Service', function () {
  describe('ProductService', function () {
    afterEach(sinon.restore);

    it('Verifica getAll', async function () {
      sinon.stub(connection, 'execute').resolves([getAll]);
      const result = await productService.getAll();

      expect(result).to.be.equal(getAll);
    })

    it('Verifica getById', async function () {
      sinon.stub(connection, 'execute').resolves([getById]);
      const result = await productService.getById(1);
      console.log(result);

      expect(result).to.be.equal(getById);
    })

    it('Verifica create', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      const result = await productService.create("Martelo do Batman")
      const obj = {
        id: 4,
        name: "Martelo do Batman"
      }

      expect(result).to.be.deep.equal(create);
    })

    it('Verifica update', async function () {
      sinon.stub(connection, 'execute');
      sinon.stub(productModel, 'getById').resolves(update)
      await productService.update(4, 'Force Staff')
      const product = await productModel.getById(4)

      expect(product).to.be.deep.equal(update);
    })

    it('Verifica remove', async function () {
      sinon.stub(connection, 'execute');
      sinon.stub(productModel, 'getAll').resolves(remove)
      await productService.remove(1)
      const products = await productModel.getAll()

      expect(products).to.be.deep.equal(remove);
    })




  })
})