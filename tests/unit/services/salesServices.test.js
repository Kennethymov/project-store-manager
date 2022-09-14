const { expect } = require('chai');
const sinon = require('sinon');
const { connection } = require('../../../src/models/connection');
const saleModel = require('../../../src/models/saleModel');
const saleService = require('../../../src/services/saleService');
const { getAll, getById } = require('../mocks/sales.mock');

describe('Teste de unidade da camada Model', function () {
  describe('SalesModel', function () {
    afterEach(sinon.restore);

    it('Verifica getAll', async function () {
      sinon.stub(connection, 'execute').resolves([getAll]);
      sinon.stub(saleModel, 'getAll').resolves([getAll])
      const [result] = await saleService.getAll();

      expect(result).to.be.equal(getAll);
    })

    it('Verifica getById', async function () {
      sinon.stub(connection, 'execute').resolves([getById]);
      sinon.stub(saleModel, 'getById').resolves([getById])
      const [result] = await saleService.getById(1);

      expect(result).to.be.equal(getById);
    })
  })
})
