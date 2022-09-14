const { expect } = require('chai');
const sinon = require('sinon');
const { connection } = require('../../../src/models/connection');
const saleModel = require('../../../src/models/saleModel');
const { getAll, getById } = require('../mocks/sales.mock');

describe('Teste de unidade da camada Model', function () {
  describe('SalesModel', function () {
    afterEach(sinon.restore);

    it('Verifica getAll', async function () {
      sinon.stub(connection, 'execute').resolves([getAll]);
      const result = await saleModel.getAll();

      expect(result).to.be.equal(getAll);
    })

    it('Verifica getById', async function () {
      sinon.stub(connection, 'execute').resolves([getById]);
      const result = await saleModel.getById(1);

      expect(result).to.be.equal(getById);
    })
  })
})
