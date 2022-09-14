const { expect } = require('chai');
const sinon = require('sinon');
const { connection } = require('../../../src/models/connection');
const productModel = require('../../../src/models/productModel')
const productService = require('../../../src/services/productService')
const productController = require('../../../src/controllers/productController')
const { getAll, getById, create } = require('../mocks/products.mock')

describe('Teste de unidade da camada Controller', function () {
  describe('ProductController', function () {
    afterEach(sinon.restore);

    it('Verifica getAll', async function () {
      sinon.stub(connection, 'execute').resolves([getAll]);
      const req = {};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getAll(req, res);

      expect(res.json.calledWith(getAll)).to.be.true;
    })

    it('Verifica getById', async function () {
      sinon.stub(connection, 'execute').resolves([[getById]]);
      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(getById)).to.be.true;
    })

    it('Verifica create', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      const req = {};
      const res = {};

      req.body = { name: "Martelo do Batman" }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productController.create(req, res)
      
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(create)).to.be.true;
    })


  })
})