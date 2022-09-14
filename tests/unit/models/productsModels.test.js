const { expect } = require('chai');
const sinon = require('sinon');
const { connection } = require('../../../src/models/connection');
const productModel = require('../../../src/models/productModel')
const { getAll, getById } = require('../mocks/products.mock')

describe('Teste de unidade da camada Model', function () {
  describe('ProductModels', function () {
    afterEach(sinon.restore);

    it('Verifica getAll', async function () {
      sinon.stub(connection, 'execute').resolves([getAll]);
      const result = await productModel.getAll();

      expect(result).to.be.equal(getAll);
    })

    it('Verifica getById', async function () {
      sinon.stub(connection, 'execute').resolves([getById]);
      const result = await productModel.getById(1);
      console.log(result);

      expect(result).to.be.equal(getById);
    })



  })
})