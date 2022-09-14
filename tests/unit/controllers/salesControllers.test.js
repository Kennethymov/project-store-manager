const { expect } = require('chai');
const sinon = require('sinon');
const { connection } = require('../../../src/models/connection');
const saleModel = require('../../../src/models/saleModel');
const saleService = require('../../../src/services/saleService');
const saleController = require('../../../src/controllers/saleController');
const { getAll, getById } = require('../mocks/sales.mock');

describe('Teste de unidade da camada Model', function () {
  describe('SalesModel', function () {
    afterEach(sinon.restore);

    it('Verifica getAll', async function () {
      sinon.stub(connection, 'execute').resolves([getAll]);
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.getAll(req, res);

      expect(res.json.calledWith(getAll)).to.be.true;
    })

    it('Verifica getById', async function () {
      sinon.stub(connection, 'execute').resolves([getById]);
      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await saleController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(getById)).to.be.true;
    })
  })
})
