const { expect } = require('chai');
const sinon = require('sinon');
const { connection } = require('../../../src/models/connection');
const productModel = require('../../../src/models/productModel')
const productService = require('../../../src/services/productService')
const { getAll, getById } = require('../mocks/products.mock')

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



  })
})